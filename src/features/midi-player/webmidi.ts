import { useEffect, useRef, useState } from 'react';

import { TB303Pattern } from '@/api/generated/model';
import {
  MIDI_MESSAGE_PPQN,
  MidiMessage,
  parseSteps,
  patternTicksPerSecond,
} from '@/features/midi-player/pattern-parser';
import {
  SequencerMidiIter,
  sequencerMidiIter,
  sequencerNoteOffs,
} from '@/features/midi-player/sequencer';

interface Cancellable {
  cancel: () => void;
}

interface CancellableDelay extends Cancellable {
  delay: (duration: number) => Promise<boolean>;
}

interface SeqParams {
  pattern: TB303Pattern;
  midiOutput: MidiOutput;
  tempo: number;
}

type SeqState =
  | { type: 'initializing'; pattern: TB303Pattern }
  | {
      type: 'playing';
      iter: SequencerMidiIter;
      midiOutput: MIDIOutput;
      params: SeqParams;
    }
  | { type: 'finished' }
  | { type: 'failed'; error: string };

type SeqCtion =
  | { type: 'stop' }
  | { type: 'set-tempo'; tempo: number }
  | { type: 'initialize-err'; error: string }
  | { type: 'initialize-ok'; params: SeqParams; midiOutput: MIDIOutput };

interface Seq {
  dispatch: (action: SeqCtion) => void;
}

const update = (state: SeqState, action: SeqCtion): SeqState => {
  switch (state.type) {
    case 'initializing': {
      switch (action.type) {
        case 'initialize-ok': {
          return {
            type: 'playing',
            iter: sequencerMidiIter(parseSteps(state.pattern.steps)),
            midiOutput: action.midiOutput,
            params: action.params,
          };
        }
        case 'initialize-err': {
          return { type: 'failed', error: action.error };
        }
        default: {
          return state;
        }
      }
    }
    case 'playing': {
      switch (action.type) {
        case 'stop': {
          throw new Error('not implemented');
        }
        case 'set-tempo': {
          throw new Error('not implemented');
        }
        default: {
          throw new Error('not implemented');
        }
      }
    }
    case 'finished': {
      return state;
    }
  }
  return state;
};

const init = async (seq: Seq, params: SeqParams) => {
  const midiAccess = await navigator.requestMIDIAccess();
  const midiOutputs = midiAccess.outputs
    .entries()
    .map(([, midiOutput]) => midiOutput)
    .toArray();
  const output = midiOutputs.find(item => item.id === params.midiOutput.id);
  if (output === undefined) {
    const avail = midiOutputs
      .map(midiOutput => `"${midiOutput.name}"`)
      .join(', ');
    seq.dispatch({
      type: 'initialize-err',
      error: `Could not find a midi output "${params.midiOutput.name}". Available outputs are: ${avail}.`,
    });
  } else {
    seq.dispatch({
      type: 'initialize-ok',
      midiOutput: output,
      params,
    });
  }
};

const createSeq = (params: SeqParams): Seq => {
  let state: SeqState = { type: 'initializing' };
  const seq = {
    dispatch: (action: SeqCtion) => {
      state = update(state, action);
    },
  };
  init(seq, params);
  return seq;
};

const createCancellableDelay = (): CancellableDelay => {
  let cancelled = false;
  return {
    cancel: () => (cancelled = true),
    delay: (duration: number): Promise<boolean> => {
      if (cancelled) return Promise.resolve(true);
      return new Promise(resolve => {
        setTimeout(() => {
          if (cancelled) return resolve(true);
          resolve(false);
        }, duration * 1000);
      });
    },
  };
};

export const playPatternOverMidi = (
  pattern: TB303Pattern,
  midiOutput: MidiOutput,
): Cancellable => {
  const { delay, cancel } = createCancellableDelay();
  const play = async () => {
    const midiAccess = await navigator.requestMIDIAccess();
    const midiOutputs = midiAccess.outputs
      .entries()
      .map(([, midiOutput]) => midiOutput)
      .toArray();
    const output = midiOutputs.find(item => item.id === midiOutput.id);
    if (output === undefined) {
      const avail = midiOutputs
        .map(midiOutput => `"${midiOutput.name}"`)
        .join(', ');
      throw new Error(
        `Could not find a midi output "${midiOutput.name}". Available outputs are: ${avail}.`,
      );
    }

    const steps = parseSteps(pattern.steps);
    const ticksPerSecond = patternTicksPerSecond(pattern);
    const stepDuration = MIDI_MESSAGE_PPQN / 4 / ticksPerSecond;
    const send = (message: MidiMessage) =>
      output.send(
        message.data,
        performance.now() + (message.tick / ticksPerSecond) * 1000,
      );

    for (const { state, messages } of sequencerMidiIter(steps)) {
      for (const message of messages) send(message);
      const cancelled = await delay(stepDuration);
      if (cancelled) {
        for (const message of sequencerNoteOffs(state)) send(message);
        return;
      }
    }
  };
  play();
  return {
    cancel,
  };
};

export interface MidiOutput {
  id: string;
  name: string | null;
}

export enum MidiOutputsStateType {
  PendingMidiAccess,
  MidiAccessRejected,
  NoOutputs,
  Ready,
}

export type MidiOutputsState =
  | {
      type: MidiOutputsStateType.Ready;
      firstOutput: MidiOutput;
      outputs: MidiOutput[];
    }
  | {
      type: MidiOutputsStateType.MidiAccessRejected;
    }
  | {
      type: MidiOutputsStateType.NoOutputs;
    }
  | {
      type: MidiOutputsStateType.PendingMidiAccess;
    };

export const useMidiOutputs = (): {
  state: MidiOutputsState;
  requestMidiAccess: () => void;
} => {
  const [state, setState] = useState<MidiOutputsState>({
    type: MidiOutputsStateType.PendingMidiAccess,
  });
  const busy = useRef(false);
  const fetch = async () => {
    if (busy.current) return;
    busy.current = true;
    try {
      const access = await navigator.requestMIDIAccess();
      const outputs = access.outputs
        .entries()
        .map(([, entry]) => ({ id: entry.id, name: entry.name }))
        .toArray();
      if (outputs.length > 0) {
        setState({
          type: MidiOutputsStateType.Ready,
          firstOutput: outputs[0],
          outputs: outputs,
        });
      } else {
        setState({
          type: MidiOutputsStateType.NoOutputs,
        });
      }
    } catch (error) {
      console.error(error);
      setState({ type: MidiOutputsStateType.MidiAccessRejected });
    } finally {
      busy.current = false;
    }
  };
  return {
    state,
    requestMidiAccess: () => fetch(),
  };
};

export const useMidiPlayer = (
  pattern: TB303Pattern,
  midiOutput: MidiOutput | undefined,
  playing: boolean,
) => {
  const cancellableRef = useRef<Cancellable | undefined>(undefined);
  const teardown = () => {
    if (cancellableRef.current !== undefined) {
      cancellableRef.current.cancel();
      cancellableRef.current = undefined;
    }
  };

  useEffect(() => {
    teardown();
    if (playing && midiOutput !== undefined) {
      cancellableRef.current = playPatternOverMidi(pattern, midiOutput);
    }
    return teardown;
  }, [pattern, midiOutput, playing]);
};
