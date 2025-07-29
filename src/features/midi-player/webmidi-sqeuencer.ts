import { TB303Pattern } from '@/api/generated/model';
import { MidiOutput } from '@/features/midi-player/webmidi';

interface SeqParams {
  pattern: TB303Pattern;
  midiOutput: MidiOutput;
  tempo: number;
}

enum SeqStateT {
  Initializing,
  Playing,
  Finished,
}

enum SeqActionT {
  Stop,
  SetTempo,
  Advance,
  InitializeOk,
}

type SeqState =
  | { type: SeqStateT.Initializing; params: SeqParams }
  | { type: SeqStateT.Playing; params: SeqParams; output: MIDIOutput }
  | { type: SeqStateT.Finished };

type SeqAction =
  | { type: SeqActionT.Stop }
  | { type: SeqActionT.SetTempo; tempo: number }
  | { type: SeqActionT.InitializeOk; output: MIDIOutput }
  | { type: SeqActionT.Advance };

type Dispatch = (action: SeqAction) => void;

export interface Seq {
  stop: () => void;
  setTempo: (tempo: number) => void;
}

const update = (state: SeqState, action: SeqAction): SeqState => {
  if (state.type === SeqStateT.Initializing) {
    if (action.type === SeqActionT.InitializeOk) {
      return {
        type: SeqStateT.Playing,
        params: state.params,
        output: action.output,
      };
    }
    return state;
  }
  return state;
};

const init = async (dispatch: Dispatch, midiOutput: MidiOutput) => {
  const output = await getWebMidiOutput(midiOutput);
  dispatch({ type: SeqActionT.InitializeOk, output });
};

const playPatternOverMidi = (params: SeqParams): Seq => {
  let state: SeqState = { type: SeqStateT.Initializing, params };
  const dispatch = (action: SeqAction) => {
    state = update(state, action);
  };
  init(dispatch, params.midiOutput);
  return {
    stop: () => dispatch({ type: SeqActionT.Stop }),
    setTempo: (tempo: number) => dispatch({ type: SeqActionT.SetTempo, tempo }),
  };
};

const getWebMidiOutput = async (
  midiOutput: MidiOutput,
): Promise<MIDIOutput> => {
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
  return output;
};
