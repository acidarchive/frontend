import { useEffect, useRef, useState } from 'react';

import { TB303Pattern } from '@/api/generated/model';
import {
  MIDI_MESSAGE_PPQN,
  MidiMessage,
  parseSteps,
  patternTicksPerSecond,
  stepDurationSeconds,
  tempoToTicksPerSecond,
} from '@/features/midi-player/pattern-parser';
import {
  makeSequencerIterable,
  SequencerIterator,
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

type TimeoutId = ReturnType<typeof setTimeout>;

interface Clock {
  stop(): void;

  setInterval(newIntervalMs: number): void;
}

const createClock = (callback: () => void, intervalMs: number): Clock => {
  let clockId: TimeoutId | undefined = undefined;
  let nextAt = performance.now();
  let done = false;
  let inCallback = false;
  const clear = () => {
    if (clockId !== undefined) {
      globalThis.clearTimeout(clockId);
      clockId = undefined;
    }
  };
  const next = () => {
    if (done) return;
    inCallback = true;
    callback();
    inCallback = false;

    // Not using now() should compensate drifting, but will make muhtiple
    // notes to be output instantly. Maybe the sequencer should calculate timestamps?
    nextAt += intervalMs;
    clockId = globalThis.setTimeout(next, intervalMs);
  };
  clockId = globalThis.setTimeout(next, 0);
  return {
    stop: () => {
      done = true;
      clear();
    },
    setInterval: (newIntervalMs: number) => {
      if (done) return;
      if (inCallback) {
        intervalMs = newIntervalMs;
      } else {
        clear();
        const now = performance.now();
        // Calculate the amount of interval that is remaining using old
        // interval and finish the remainder with the new interval
        //
        // Since NoteOn is never scheduled ahead this should be safe but
        // need to test it somehow.
        const remaining = (nextAt - now) / intervalMs;
        const remainingMs = remaining * newIntervalMs;
        nextAt = now + remainingMs;
        intervalMs = newIntervalMs;
        clockId = globalThis.setTimeout(next, remainingMs);
      }
    },
  };
};

const advance = (
  iter: SequencerIterator,
  tempo: number,
  midiOutput: MIDIOutput,
) => {
  const x = iter.next();
  if (x.done === true) {
    throw new Error("didn't expect iterator to finish");
  } else {
    const { messages } = x.value;
    const ticksPerSecond = tempoToTicksPerSecond(tempo);
    for (const message of messages) {
      midiOutput.send(
        message.data,
        performance.now() + (message.tick / ticksPerSecond) * 1000,
      );
    }
  }
};

type SeqState =
  | { type: 'initializing' }
  | {
      type: 'playing';
      iter: SequencerIterator;
      midiOutput: MIDIOutput;
      params: SeqParams;
      clock: Clock;
    }
  | { type: 'finished' }
  | { type: 'failed'; error: string };

type SeqCtion =
  | { type: 'stop' }
  | { type: 'set-tempo'; tempo: number }
  | { type: 'initialize-err'; error: string }
  | { type: 'initialize-ok'; params: SeqParams; midiOutput: MIDIOutput }
  | { type: 'play-next-step' };

interface Seq {
  dispatch: (action: SeqCtion) => void;
}

const update = (seq: Seq, state: SeqState, action: SeqCtion): SeqState => {
  switch (state.type) {
    case 'initializing': {
      switch (action.type) {
        case 'initialize-ok': {
          const iter = makeSequencerIterable(
            parseSteps(action.params.pattern.steps),
          )[Symbol.iterator]();
          // This will only fire on next tick, it would be better that it
          // fired immediately.
          const clock = createClock(
            () => seq.dispatch({ type: 'play-next-step' }),
            stepDurationSeconds(action.params.tempo),
          );
          return {
            type: 'playing',
            iter,
            midiOutput: action.midiOutput,
            params: action.params,
            clock,
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
          const noteOffs = sequencerNoteOffs(state.iter.getState());
          if (noteOffs.length > 0) {
            for (const noteOff of noteOffs) state.midiOutput.send(noteOff.data);
          }
          state.clock.stop();
          return { type: 'finished' };
        }
        case 'set-tempo': {
          state.clock.setInterval(stepDurationSeconds(action.tempo) * 1000);
          return { ...state, params: { ...state.params, tempo: action.tempo } };
        }
        case 'play-next-step': {
          advance(state.iter, state.params.tempo, state.midiOutput);
          return state;
        }
      }
      return state;
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
      state = update(seq, state, action);
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

    for (const { state, messages } of makeSequencerIterable(steps)) {
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
