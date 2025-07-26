import * as React from 'react';
import { ButtonHTMLAttributes, useEffect } from 'react';

import { TB303Pattern } from '@/api/generated/model';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  MidiOutput,
  MidiOutputsStateType,
  useMidiOutputs,
  useMidiPlayer,
} from '@/features/midi-player/webmidi';
import { TempoInput } from '@/features/midi-player/tempo-input';

interface MidiPlayerProps {
  pattern: TB303Pattern;
}

type PlayButtonProps = {
  isPlaying: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const PlayButton = (props: PlayButtonProps) => {
  const { isPlaying, ...rest } = props;
  return (
    <Button {...rest} variant="secondary">
      <div className="flex gap-2">
        <div className="grow min-w-4">
          {isPlaying ? <>&#9632;</> : <>&#9658;</>}
        </div>
        <div>MIDI</div>
      </div>
    </Button>
  );
};

const MidiOutputSelect = (props: {
  selected: MidiOutput;
  all: MidiOutput[];
  onChange: (midiOutput: MidiOutput) => void;
  className?: string;
}) => {
  const handleValueChange = (id: string) => {
    const newSelected = props.all.find(item => item.id === id);
    if (newSelected !== undefined) props.onChange(newSelected);
  };
  return (
    <div className={props.className}>
      <Select value={props.selected.id} onValueChange={handleValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select MIDI output" />
          <SelectContent>
            <SelectGroup>
              <SelectLabel>MIDI Outputs</SelectLabel>
              {props.all.map(o => (
                <SelectItem key={o.id} value={o.id}>
                  {o.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </SelectTrigger>
      </Select>
    </div>
  );
};

type State = {
  selectedMidiOutput: MidiOutput | undefined;
  playing: boolean;
};

type Action =
  | { type: 'select-midi-output'; midiOutput: MidiOutput }
  | { type: 'play' }
  | { type: 'stop' };

const reducer = (state: State, action: Action): State => {
  if (action.type === 'select-midi-output') {
    console.log(action);
    return { ...state, selectedMidiOutput: action.midiOutput };
  }
  if (action.type === 'play') {
    return { ...state, playing: true };
  }
  if (action.type === 'stop') {
    return { ...state, playing: false };
  }
  return state;
};

const MidiPlayerControls = (props: MidiPlayerProps) => {
  const { state: midiOutputsState, requestMidiAccess } = useMidiOutputs();
  const [state, dispatch] = React.useReducer(reducer, {
    selectedMidiOutput: undefined,
    playing: false,
  });
  useMidiPlayer(props.pattern, state.selectedMidiOutput, state.playing);
  useEffect(() => {
    if (
      midiOutputsState.type === MidiOutputsStateType.Ready &&
      state.selectedMidiOutput === undefined
    ) {
      dispatch({
        type: 'select-midi-output',
        midiOutput: midiOutputsState.firstOutput,
      });
    }
  }, [midiOutputsState, state.selectedMidiOutput]);
  const handleClickPlayButton = () =>
    state.playing ? dispatch({ type: 'stop' }) : dispatch({ type: 'play' });
  const handleSelectMidiOutput = (midiOutput: MidiOutput) =>
    dispatch({ type: 'select-midi-output', midiOutput });
  if (midiOutputsState.type === MidiOutputsStateType.NoOutputs) {
    return (
      <>
        <PlayButton isPlaying={false} disabled />
        <Label>No MIDI outputs found.</Label>
      </>
    );
  }
  if (midiOutputsState.type === MidiOutputsStateType.PendingMidiAccess) {
    return (
      <>
        <PlayButton isPlaying={false} disabled />
        <Button onClick={requestMidiAccess} variant="secondary">
          Click to enable MIDI
        </Button>
      </>
    );
  }
  if (midiOutputsState.type === MidiOutputsStateType.MidiAccessRejected) {
    return (
      <>
        <PlayButton isPlaying={false} disabled />
        <Label>No MIDI access.</Label>
      </>
    );
  }
  if (midiOutputsState.type === MidiOutputsStateType.Ready) {
    return state.selectedMidiOutput === undefined ? (
      <>
        <PlayButton isPlaying={false} disabled />
        <Label>Waiting for MIDI access...</Label>
      </>
    ) : (
      <>
        <div className="flex gap-2 w-full">
          <PlayButton
            isPlaying={state.playing}
            onClick={handleClickPlayButton}
          />
          <TempoInput />
          <MidiOutputSelect
            selected={state.selectedMidiOutput}
            all={midiOutputsState.outputs}
            onChange={handleSelectMidiOutput}
            className="grow"
          />
        </div>
      </>
    );
  }
};

export const MidiPlayer = (props: MidiPlayerProps) => {
  return (
    <div className="flex mt-2 gap-2">
      <MidiPlayerControls pattern={props.pattern} />
    </div>
  );
};
