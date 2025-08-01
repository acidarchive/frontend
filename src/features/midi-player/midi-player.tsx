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
import { TempoInput } from '@/features/midi-player/tempo-input';
import {
  MidiOutput,
  MidiOutputsStateType,
  useMidiOutputs,
} from '@/features/midi-player/webmidi';
import { useMidiPlayer } from '@/features/midi-player/webmidi-sequencer';

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
  tempo: number;
  playing: boolean;
};

type Action =
  | { type: 'select-midi-output'; midiOutput: MidiOutput }
  | { type: 'update-tempo'; newTempo: number }
  | { type: 'play' }
  | { type: 'stop' };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'select-midi-output': {
      return { ...state, selectedMidiOutput: action.midiOutput };
    }
    case 'play': {
      return { ...state, playing: true };
    }
    case 'stop': {
      return { ...state, playing: false };
    }
    case 'update-tempo': {
      return { ...state, tempo: action.newTempo };
    }
  }
};

const MidiPlayerControls = (props: MidiPlayerProps) => {
  const { state: midiOutputsState, requestMidiAccess } = useMidiOutputs();
  const [state, dispatch] = React.useReducer(reducer, {
    selectedMidiOutput: undefined,
    playing: false,
    tempo: props.pattern.tempo ?? 120,
  });
  useMidiPlayer(
    props.pattern,
    state.selectedMidiOutput,
    state.playing,
    state.tempo,
  );
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
  const handleChangeTempo = (newTempo: number) =>
    dispatch({ type: 'update-tempo', newTempo });
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
          <TempoInput tempo={state.tempo} onChange={handleChangeTempo} />
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
