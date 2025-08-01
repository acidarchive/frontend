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
  InitializingMidi,
  Playing,
  Finished,
  Error,
}

enum SeqActionT {
  Stop,
  Timeout,
  InitializeOk,
  UpdateTempo,
}

interface State {
  state: SeqState;
  params: SeqParams;
}

type TimeoutId = ReturnType<typeof setTimeout>;

type SeqState =
  | { type: SeqStateT.InitializingMidi }
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
  | { type: SeqActionT.UpdateTempo; tempo: number }
  | { type: SeqActionT.Timeout }
  | { type: SeqActionT.InitializeOk; midiAccess: MIDIAccess };

interface Seq {
  stop: () => void;
  updateTempo: (newTempo: number) => void;
  getParams: () => SeqParams;
}

const update = (
  state: State,
  action: SeqAction,
  dispatch: (action: SeqAction) => void,
): State => {
  switch (action.type) {
    case SeqActionT.InitializeOk: {
      if (state.state.type !== SeqStateT.InitializingMidi) {
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
    case SeqActionT.UpdateTempo: {
      switch (state.state.type) {
        case SeqStateT.Playing: {
          return {
            ...state,
            state: {
              ...state.state,
              tempo: action.tempo,
            },
          };
        }
        case SeqStateT.InitializingMidi: {
          return {
            ...state,
            params: { ...state.params, tempo: action.tempo },
          };
        }
        case SeqStateT.Finished:
        case SeqStateT.Error: {
          return state;
        }
      }
    }
    case SeqActionT.Stop: {
      switch (state.state.type) {
        case SeqStateT.Playing: {
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
        case SeqStateT.InitializingMidi: {
          return { ...state, state: { type: SeqStateT.Finished } };
        }
        case SeqStateT.Error: {
          return state;
        }
      }
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
  let state: State = { params, state: { type: SeqStateT.InitializingMidi } };
  const dispatch = (action: SeqAction) => {
    state = update(state, action, dispatch);
  };
  navigator.requestMIDIAccess().then(midiAccess => {
    dispatch({ type: SeqActionT.InitializeOk, midiAccess });
  });
  return {
    stop: () => dispatch({ type: SeqActionT.Stop }),
    updateTempo: (newTempo: number) => {
      dispatch({ type: SeqActionT.UpdateTempo, tempo: newTempo });
    },
    getParams: () => state.params,
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
    console.log('teardown midi player');
    if (seqRef.current !== undefined) {
      seqRef.current.stop();
      seqRef.current = undefined;
    }
  };
  useEffect(() => {
    if (midiOutput !== undefined && playing) {
      const params = { pattern, midiOutput, tempo };
      console.log(params, seqRef.current);
      if (seqRef.current === undefined) {
        seqRef.current = createSeq(params);
      } else {
        const currentParams = seqRef.current.getParams();
        if (
          currentParams.midiOutput.id === params.midiOutput.id &&
          currentParams.pattern.id === params.pattern.id &&
          currentParams.tempo !== params.tempo
        ) {
          seqRef.current.updateTempo(params.tempo);
        } else {
          teardown();
          seqRef.current = createSeq(params);
        }
      }
    }
    return () => {
      console.log('aaa');
      teardown();
    };
  }, [pattern, midiOutput, playing, tempo]);
};
