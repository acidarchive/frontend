import { useEffect, useRef } from 'react';

import { TB303Pattern } from '@/api/generated/model';
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

import { MidiOutput } from './webmidi';

interface SeqParams {
  pattern: TB303Pattern;
  midiOutput: MidiOutput;
  tempo: number;
}

enum SeqStateT {
  New = 'New',
  Initializing = 'Initializing',
  Playing = 'Playing',
  Finished = 'Finished',
  Error = 'Error',
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
    const drift = now - nextTime;
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
      timeoutId: TimeoutId;
    }
  | { type: SeqStateT.Finished }
  | { type: SeqStateT.Error; error: string };

type SeqAction =
  | { type: SeqActionT.Stop }
  | { type: SeqActionT.UpdateParams; newParams: SeqParams }
  | { type: SeqActionT.Timeout }
  | { type: SeqActionT.InitializeOk; midiAccess: MIDIAccess };

interface Seq {
  stop: () => void;
  updateParams: (newParams: SeqParams) => void;
  debug: () => void;
}

const finishPlaying = (state: State): State => {
  if (state.state.type === SeqStateT.Playing) {
    const s = state.state;
    clearTimeout(state.state.timeoutId);
    for (const message of sequencerNoteOffs(s.sequencerState)) {
      s.output.send(
        message.data,
        performance.now() +
          (message.tick / tempoToTicksPerSecond(s.tempo)) * 1000,
      );
    }
    state.state.output.close();
    return { ...state, state: { type: SeqStateT.Finished } };
  }
  return state;
};

const initialize = (
  state: State,
  dispatch: (action: SeqAction) => void,
): State => {
  if (
    state.state.type === SeqStateT.New ||
    state.state.type === SeqStateT.Finished
  ) {
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
        const timeoutId = setTimeout(
          () => dispatch({ type: SeqActionT.Timeout }),
          stepDurationSeconds(tempo),
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
            timeoutId,
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
        const s = state.state;
        const tempo = action.newParams.tempo === s.tempo;
        const pattern = action.newParams.pattern.id === state.params.pattern.id;
        const midiOutput =
          action.newParams.midiOutput.id === state.params.midiOutput.id;
        if (pattern && midiOutput) {
          return {
            ...state,
            params: action.newParams,
            state: {
              ...s,
              tempo: action.newParams.tempo,
            },
          };
        }
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
      const stepDuration = stepDurationSeconds(s.tempo);
      const ticksPerSecond = tempoToTicksPerSecond(s.tempo);
      const step = s.steps[s.currentStep % s.steps.length];
      const update = sequencerAdvance(s.sequencerState, step);
      for (const message of update.messages) {
        s.output.send(
          message.data,
          performance.now() + (message.tick / ticksPerSecond) * 1000,
        );
      }
      return {
        ...state,
        state: {
          ...s,
          sequencerState: update.state,
          currentStep: s.currentStep + 1,
          timeoutId: setTimeout(
            () => dispatch({ type: SeqActionT.Timeout }),
            stepDuration * 1000,
          ),
        },
      };
    }
  }
};

const createSeq = (params: SeqParams) => {
  let state: State = { params, state: { type: SeqStateT.New } };
  const dispatch = (action: SeqAction) => {
    state = update(state, action, dispatch);
  };
  dispatch({ type: SeqActionT.UpdateParams, newParams: params });
  return {
    stop: () => dispatch({ type: SeqActionT.Stop }),
    updateParams: (newParams: SeqParams) => {
      dispatch({ type: SeqActionT.UpdateParams, newParams });
    },
    debug: () => console.log(state.state.type),
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
  seqRef.current?.debug();
};
