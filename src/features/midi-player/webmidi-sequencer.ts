import { useRef } from 'react';

import {
  parseSteps,
  Step,
  stepDurationSeconds,
  tempoToTicksPerSecond,
} from '@/features/midi-player/pattern-parser';
import {
  sequencerAdvance,
  sequencerInit,
  sequencerNoteOffs,
  SequencerState,
} from '@/features/midi-player/sequencer';
import { TB303Pattern } from '@/types/api';

import { MidiOutput } from './webmidi';

interface SeqParams {
  pattern: TB303Pattern;
  midiOutput: MidiOutput;
  tempo: number;
}

enum SeqStateT {
  Initializing,
  Playing,
  Idle,
  Error,
}

enum SeqActionT {
  Stop,
  Timeout,
  InitializeOk,
  UpdateParams,
}

interface State {
  state: SeqState;
  params: SeqParams;
}

type TimeoutId = ReturnType<typeof setTimeout>;

interface Clock {
  stop: () => void;
  setInterval: (newInterval: number) => void;
}

export const createClock = (
  callback: (drift: number) => void,
  interval: number,
): Clock => {
  let stopped = false;
  let nextTime = performance.now();
  let timeoutId: TimeoutId | undefined = undefined;
  let inCallback = false;
  const next = () => {
    const now = performance.now();
    const drift = nextTime - now;
    if (stopped) return;
    inCallback = true;
    callback(drift);
    inCallback = false;
    if (stopped) return;
    nextTime = nextTime + interval;
    timeoutId = setTimeout(next, Math.max(0, nextTime - performance.now()));
  };
  timeoutId = setTimeout(next, 0);
  return {
    setInterval: (newInterval: number) => {
      if (stopped) return;
      if (inCallback) {
        interval = newInterval;
      } else {
        const now = performance.now();
        const remaining = Math.max(0, nextTime - now);
        const amount = remaining / interval;
        nextTime = now + newInterval * amount;
        interval = newInterval;
        clearTimeout(timeoutId);
        setTimeout(next, Math.max(0, nextTime - now));
      }
    },
    stop: () => {
      stopped = true;
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
      }
    },
  };
};

type SeqState =
  | { type: SeqStateT.Initializing }
  | {
      type: SeqStateT.Playing;
      steps: Step[];
      sequencerState: SequencerState;
      currentStep: number;
      tempo: number;
      output: MIDIOutput;
      clock: Clock;
    }
  | { type: SeqStateT.Idle }
  | { type: SeqStateT.Error; error: string };

type SeqAction =
  | { type: SeqActionT.Stop }
  | { type: SeqActionT.UpdateParams; newParams: SeqParams }
  | { type: SeqActionT.Timeout; drift: number }
  | { type: SeqActionT.InitializeOk; midiAccess: MIDIAccess };

interface Seq {
  stop: () => void;
  updateParams: (newParams: SeqParams) => void;
}

const finishPlaying = (state: State): State => {
  if (state.state.type === SeqStateT.Playing) {
    const s = state.state;
    state.state.clock.stop();
    for (const message of sequencerNoteOffs(s.sequencerState)) {
      s.output.send(
        message.data,
        performance.now() +
          (message.tick / tempoToTicksPerSecond(s.tempo)) * 1000,
      );
    }
    return { ...state, state: { type: SeqStateT.Idle } };
  }
  return state;
};

const initialize = (
  state: State,
  dispatch: (action: SeqAction) => void,
): State => {
  if (state.state.type === SeqStateT.Idle) {
    navigator.requestMIDIAccess().then(midiAccess => {
      dispatch({
        type: SeqActionT.InitializeOk,
        midiAccess,
      });
    });
    return {
      ...state,
      state: { type: SeqStateT.Initializing },
    };
  }
  return state;
};

const updatePattern = (state: State, pattern: TB303Pattern): State => {
  if (state.state.type === SeqStateT.Playing) {
    const s = state.state;
    const steps = parseSteps(pattern.steps);
    return {
      ...state,
      params: { ...state.params, pattern },
      state: {
        ...s,
        steps,
        currentStep: 0,
      },
    };
  }
  return state;
};

const updateTempo = (state: State, tempo: number): State => {
  if (state.state.type === SeqStateT.Playing) {
    const s = state.state;
    s.clock.setInterval(stepDurationSeconds(tempo) * 1000);
    return {
      ...state,
      params: { ...state.params, tempo },
      state: {
        ...s,
        tempo,
      },
    };
  }
  return state;
};

const update = (
  state: State,
  action: SeqAction,
  dispatch: (action: SeqAction) => void,
): State => {
  switch (action.type) {
    case SeqActionT.InitializeOk: {
      if (state.state.type !== SeqStateT.Initializing) {
        return state;
      }
      const output = action.midiAccess.outputs
        .entries()
        .find(kv => kv[0] === state.params.midiOutput.id);
      if (output === undefined) {
        const avail = action.midiAccess.outputs
          .values()
          .map(midiOutput => `"${midiOutput.name}"`)
          .toArray()
          .join(', ');
        const error = `Could not find a midi output "${state.params.midiOutput.name}". Available outputs are: ${avail}.`;
        return {
          ...state,
          state: { type: SeqStateT.Error, error },
        };
      } else {
        const tempo = state.params.tempo;
        const sequencerState = sequencerInit();
        const steps = parseSteps(state.params.pattern.steps);
        const clock = createClock(
          drift => dispatch({ type: SeqActionT.Timeout, drift }),
          stepDurationSeconds(tempo) * 1000,
        );
        return {
          ...state,
          state: {
            type: SeqStateT.Playing,
            output: output[1],
            sequencerState,
            currentStep: 0,
            steps,
            tempo,
            clock,
          },
        };
      }
    }
    case SeqActionT.UpdateParams: {
      if (state.state.type === SeqStateT.Initializing) {
        return {
          ...state,
          params: action.newParams,
        };
      }
      if (state.state.type === SeqStateT.Playing) {
        const midiOutput =
          action.newParams.midiOutput.id === state.params.midiOutput.id;
        if (!midiOutput) {
          return initialize(finishPlaying(state), dispatch);
        }
        return updateTempo(
          updatePattern(state, action.newParams.pattern),
          action.newParams.tempo,
        );
      }
      return initialize(finishPlaying(state), dispatch);
    }
    case SeqActionT.Stop: {
      return finishPlaying(state);
    }
    case SeqActionT.Timeout: {
      if (state.state.type !== SeqStateT.Playing) {
        return state;
      }
      const s = state.state;
      const ticksPerSecond = tempoToTicksPerSecond(s.tempo);
      const step = s.steps[s.currentStep % s.steps.length];
      const update = sequencerAdvance(s.sequencerState, step);
      const adjust = Math.max(0, -1 * action.drift);
      const now = performance.now() + adjust;
      for (const message of update.messages) {
        s.output.send(
          message.data,
          now + (message.tick / ticksPerSecond) * 1000,
        );
      }
      return {
        ...state,
        state: {
          ...s,
          sequencerState: update.state,
          currentStep: s.currentStep + 1,
        },
      };
    }
  }
};

const createSeq = (params: SeqParams) => {
  let state: State = { params, state: { type: SeqStateT.Idle } };
  const dispatch = (action: SeqAction) => {
    state = update(state, action, dispatch);
  };
  dispatch({ type: SeqActionT.UpdateParams, newParams: params });
  return {
    stop: () => dispatch({ type: SeqActionT.Stop }),
    updateParams: (newParams: SeqParams) => {
      dispatch({ type: SeqActionT.UpdateParams, newParams });
    },
  };
};

export const useMidiPlayer = (
  pattern: TB303Pattern,
  midiOutput: MidiOutput | undefined,
  playing: boolean,
  tempo: number,
) => {
  const seqRef = useRef<Seq | undefined>(undefined);
  const teardown = () => {
    if (seqRef.current !== undefined) {
      seqRef.current.stop();
      seqRef.current = undefined;
    }
  };

  if (midiOutput === undefined) {
    teardown();
    return;
  }
  if (!playing) {
    teardown();
    return;
  }

  const params: SeqParams = { pattern, midiOutput, tempo };
  if (seqRef.current === undefined) {
    seqRef.current = createSeq(params);
  } else {
    seqRef.current.updateParams(params);
  }
};
