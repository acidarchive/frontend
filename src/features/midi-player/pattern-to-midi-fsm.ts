import {
  MIDI_MESSAGE_PPQN,
  MidiMessage,
  Step,
  StepGate,
  stepMidiNoteOff,
  stepMidiNoteOn,
} from '@/features/midi-player/pattern-to-midi-parse';

enum StateType {
  Idle,
  Slide1,
  Slide2,
}

const HALF_STEP = MIDI_MESSAGE_PPQN / 8;
const FULL_STEP = MIDI_MESSAGE_PPQN / 4;

type State =
  | {
      type: StateType.Idle;
    }
  | {
      type: StateType.Slide1;
      initial: StepGate;
    }
  | {
      type: StateType.Slide2;
      initial: StepGate;
      current: StepGate;
    };

export const patternToMidiInit = (): State => ({ type: StateType.Idle });

interface UpdateResult {
  state: State;
  messages: MidiMessage[];
}

const IDLE: State = { type: StateType.Idle };

export const patternToMidiNoteOffs = (state: State): MidiMessage[] => {
  switch (state.type) {
    case StateType.Idle: {
      return [];
    }
    case StateType.Slide1: {
      return [stepMidiNoteOff(state.initial, 0)];
    }
    case StateType.Slide2: {
      return [
        stepMidiNoteOff(state.initial, 0),
        stepMidiNoteOff(state.current, 0),
      ];
    }
  }
};

export const patternToMidiUpdate = (state: State, step: Step): UpdateResult => {
  if (!step.gate) {
    switch (state.type) {
      case StateType.Idle: {
        return { state, messages: [] };
      }
      case StateType.Slide1: {
        const messages = [stepMidiNoteOff(state.initial, 0)];
        return { state: IDLE, messages };
      }
      case StateType.Slide2: {
        const messages = [
          stepMidiNoteOff(state.initial, 0),
          stepMidiNoteOff(state.current, 0),
        ];
        return { state: IDLE, messages };
      }
    }
  } else if (step.slide) {
    switch (state.type) {
      case StateType.Idle: {
        const messages = [stepMidiNoteOn(step, 0)];
        return { state: { type: StateType.Slide1, initial: step }, messages };
      }
      case StateType.Slide1: {
        if (step.pitch === state.initial.pitch) {
          return { state, messages: [] };
        } else {
          const messages = [stepMidiNoteOn(step, 0)];
          return {
            state: {
              type: StateType.Slide2,
              initial: state.initial,
              current: step,
            },
            messages,
          };
        }
      }
      case StateType.Slide2: {
        if (step.pitch === state.initial.pitch) {
          const messages = [stepMidiNoteOff(state.current, 0)];
          return {
            state: {
              type: StateType.Slide1,
              initial: state.initial,
            },
            messages,
          };
        } else {
          const messages = [
            stepMidiNoteOff(state.current, 0),
            stepMidiNoteOn(step, 0),
          ];
          return {
            state: {
              type: StateType.Slide2,
              initial: state.initial,
              current: step,
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
      case StateType.Slide1: {
        if (step.pitch === state.initial.pitch) {
          const messages = [stepMidiNoteOff(state.initial, HALF_STEP)];
          return { state: IDLE, messages };
        } else {
          const messages = [
            stepMidiNoteOn(step, 0),
            stepMidiNoteOff(state.initial, HALF_STEP),
            stepMidiNoteOff(step, HALF_STEP),
          ];
          return { state: IDLE, messages };
        }
      }
      case StateType.Slide2: {
        const messages = [
          stepMidiNoteOff(state.current, 0),
          stepMidiNoteOn(step, 0),
          stepMidiNoteOff(step, HALF_STEP),
          stepMidiNoteOff(state.initial, HALF_STEP),
        ];
        return { state: IDLE, messages };
      }
    }
  }
};

const updateN = (init: State, steps: Step[]): UpdateResult =>
  steps.reduce(
    (result: UpdateResult, step: Step, index: number) => {
      const { state: newState, messages } = patternToMidiUpdate(
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
  updateN(IDLE, steps).messages;

export const patternToMidiIter = (steps: Step[]) => {
  return {
    [Symbol.iterator]() {
      let state = patternToMidiInit();
      let index = 0;
      return {
        next() {
          const x = patternToMidiUpdate(state, steps[index % steps.length]);
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
