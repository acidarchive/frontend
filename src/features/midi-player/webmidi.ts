import { useRef, useState } from 'react';

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
