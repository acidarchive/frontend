import {
  MIDI_MESSAGE_PPQN,
  MidiMessage,
  Step,
  StepGate,
  stepMidiNoteOff,
  stepMidiNoteOn,
} from '@/features/midi-player/pattern-parser';

const HALF_STEP = MIDI_MESSAGE_PPQN / 8;
const FULL_STEP = MIDI_MESSAGE_PPQN / 4;

/**
 * Tag type for the state of sequencer state machine.
 * See `State` for the possible states.
 */
enum StateType {
  Idle,
  SingleNoteHeld,
  TwoNotesHeld,
}

/**
 * State of the sequencer state machine.
 *
 * When playing steps with slides the sequencer emits overlapping
 * MIDI notes to make use of the "legato"/"glide" feature which is
 * a common way to implement smooth pitch transitions in synths.
 *
 * The state here keeps track of which two notes are being held
 * and the order they were pressed in.
 *
 * The `base` step in the state is the step which started the slide.
 * The note with its pitch is held throughout the slide, up until a
 * point when a step with `gate:true, slide:false` or `gate:false` is played.
 * During the slide steps with different pitches are stored in `target`.
 * Note ons/offs are emitted as the pitch of the `target` step changes.
 */
type State =
  | {
      type: StateType.Idle;
    }
  | {
      type: StateType.SingleNoteHeld;
      base: StepGate;
    }
  | {
      type: StateType.TwoNotesHeld;
      base: StepGate;
      target: StepGate;
    };

export type SequencerState = State;
/**
 * Create an empty sequencer state.
 */
export const sequencerInit = (): State => ({ type: StateType.Idle });

/**
 * Result of each step advanced by the sequencer.
 */
interface SequencerStepResult {
  state: State;
  messages: MidiMessage[];
}

const IDLE: State = { type: StateType.Idle };

/**
 * Returns note-off messages for any currently held notes.
 * Used to cancel the notes when the playback is interrupted.
 */
export const sequencerNoteOffs = (state: State): MidiMessage[] => {
  switch (state.type) {
    case StateType.Idle: {
      return [];
    }
    case StateType.SingleNoteHeld: {
      return [stepMidiNoteOff(state.base, 0)];
    }
    case StateType.TwoNotesHeld: {
      return [stepMidiNoteOff(state.base, 0), stepMidiNoteOff(state.target, 0)];
    }
  }
};

/**
 * Advances the sequencer by a single step.
 * A step is considered to be 1/16th note long.
 */
export const sequencerAdvance = (
  state: State,
  step: Step,
): SequencerStepResult => {
  if (!step.gate) {
    switch (state.type) {
      case StateType.Idle: {
        return { state, messages: [] };
      }
      case StateType.SingleNoteHeld: {
        const messages = [stepMidiNoteOff(state.base, 0)];
        return { state: IDLE, messages };
      }
      case StateType.TwoNotesHeld: {
        const messages = [
          stepMidiNoteOff(state.base, 0),
          stepMidiNoteOff(state.target, 0),
        ];
        return { state: IDLE, messages };
      }
    }
  } else if (step.slide) {
    switch (state.type) {
      case StateType.Idle: {
        const messages = [stepMidiNoteOn(step, 0)];
        return {
          state: { type: StateType.SingleNoteHeld, base: step },
          messages,
        };
      }
      case StateType.SingleNoteHeld: {
        if (step.pitch === state.base.pitch) {
          return { state, messages: [] };
        } else {
          const messages = [stepMidiNoteOn(step, 0)];
          return {
            state: {
              type: StateType.TwoNotesHeld,
              base: state.base,
              target: step,
            },
            messages,
          };
        }
      }
      case StateType.TwoNotesHeld: {
        if (step.pitch === state.base.pitch) {
          const messages = [stepMidiNoteOff(state.target, 0)];
          return {
            state: {
              type: StateType.SingleNoteHeld,
              base: state.base,
            },
            messages,
          };
        } else {
          const messages = [
            stepMidiNoteOff(state.target, 0),
            stepMidiNoteOn(step, 0),
          ];
          return {
            state: {
              type: StateType.TwoNotesHeld,
              base: state.base,
              target: step,
            },
            messages,
          };
        }
      }
    }
  } else {
    switch (state.type) {
      case StateType.Idle: {
        const messages = [
          stepMidiNoteOn(step, 0),
          stepMidiNoteOff(step, HALF_STEP),
        ];
        return { state, messages };
      }
      case StateType.SingleNoteHeld: {
        if (step.pitch === state.base.pitch) {
          const messages = [stepMidiNoteOff(state.base, HALF_STEP)];
          return { state: IDLE, messages };
        } else {
          const messages = [
            stepMidiNoteOn(step, 0),
            stepMidiNoteOff(state.base, HALF_STEP),
            stepMidiNoteOff(step, HALF_STEP),
          ];
          return { state: IDLE, messages };
        }
      }
      case StateType.TwoNotesHeld: {
        const messages = [
          stepMidiNoteOff(state.target, 0),
          stepMidiNoteOn(step, 0),
          stepMidiNoteOff(step, HALF_STEP),
          stepMidiNoteOff(state.base, HALF_STEP),
        ];
        return { state: IDLE, messages };
      }
    }
  }
};

/**
 * Produces a step result for a list of steps.
 * FIXME: this should also add messages from `sequencerNoteOffs` as final messages.
 */
const advanceN = (init: State, steps: Step[]): SequencerStepResult =>
  steps.reduce(
    (result: SequencerStepResult, step: Step, index: number) => {
      const { state: newState, messages } = sequencerAdvance(
        result.state,
        step,
      );
      return {
        state: newState,
        messages: [
          ...result.messages,
          ...messages.map(m => ({
            data: m.data,
            tick: m.tick + index * FULL_STEP,
          })),
        ],
      };
    },
    { state: init, messages: [] },
  );

export const stepsToMessages = (steps: Step[]): MidiMessage[] =>
  advanceN(IDLE, steps).messages;

export type SequencerIterator = Iterator<SequencerStepResult> & {
  getState(): State;
};

export interface SequencerIterable {
  [Symbol.iterator](): SequencerIterator;
}

/**
 * Infinitely loops over the given steps producing state updates with midi messages.
 * This should play the "infinity" note correctly.
 */
export const makeSequencerIterable = (steps: Step[]): SequencerIterable => {
  return {
    [Symbol.iterator]() {
      let state = sequencerInit();
      let index = 0;
      return {
        getState() {
          return state;
        },
        next() {
          const x = sequencerAdvance(state, steps[index % steps.length]);
          state = x.state;
          index++;
          return {
            value: x,
          };
        },
      };
    },
  };
};
