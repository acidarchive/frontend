import { Select } from '@headlessui/react';
import * as React from 'react';
import { ButtonHTMLAttributes, ChangeEvent, useEffect } from 'react';

import { TB303Pattern } from '@/api/generated/model';
import { Button } from '@/components/ui/button';
import {
  MidiOutput,
  MidiOutputsStateType,
  useMidiOutputs,
  useMidiPlayer,
} from '@/features/midi-player/webmidi';

interface PlayerControlsProps {
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
}) => (
  <Select
    value={props.selected.id}
    onChange={(event: ChangeEvent<HTMLSelectElement>) => {
      const id = event.currentTarget.value;
      const selected = props.all.find(x => x.id === id);
      if (selected !== undefined) {
        props.onChange(selected);
      }
    }}
  >
    {props.all.map(o => (
      <option key={o.id} value={o.id}>
        {o.name}
      </option>
    ))}
  </Select>
);

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

interface PlayerProps {
  pattern: TB303Pattern;
  selectedMidiOutput: MidiOutput;
  allMidiOutputs: MidiOutput[];
  playing: boolean;
  onSelectMidiOutput: (midiOutput: MidiOutput) => void;
  onClickPlay: () => void;
  onClickStop: () => void;
}

const Player = (props: PlayerProps) => {
  useMidiPlayer(props.pattern, props.selectedMidiOutput, props.playing);
  return (
    <div>
      <PlayButton
        isPlaying={props.playing}
        onClick={() =>
          props.playing ? props.onClickStop() : props.onClickPlay()
        }
      />
      <MidiOutputSelect
        selected={props.selectedMidiOutput}
        all={props.allMidiOutputs}
        onChange={midiOutput => props.onSelectMidiOutput(midiOutput)}
      />
    </div>
  );
};

export const MidiPlayer = (props: PlayerControlsProps) => {
  const { state: midiOutputsState, requestAccess } = useMidiOutputs();
  const [state, dispatch] = React.useReducer(reducer, {
    selectedMidiOutput: undefined,
    playing: false,
  });
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
  const render = () => {
    switch (midiOutputsState.type) {
      case MidiOutputsStateType.NoOutputs: {
        return <div>No MIDI outputs found.</div>;
      }
      case MidiOutputsStateType.PendingMidiAccess: {
        return (
          <Button onClick={requestAccess} variant="secondary">
            Click to enable MIDI
          </Button>
        );
      }
      case MidiOutputsStateType.MidiAccessRejected: {
        return <div>No MIDI access.</div>;
      }
      case MidiOutputsStateType.Ready: {
        return state.selectedMidiOutput === undefined ? (
          <div>Waiting for MIDI access...</div>
        ) : (
          <Player
            pattern={props.pattern}
            playing={state.playing}
            allMidiOutputs={midiOutputsState.outputs}
            onSelectMidiOutput={midiOutput =>
              dispatch({
                type: 'select-midi-output',
                midiOutput: midiOutput,
              })
            }
            onClickPlay={() => dispatch({ type: 'play' })}
            onClickStop={() => dispatch({ type: 'stop' })}
            selectedMidiOutput={state.selectedMidiOutput}
          />
        );
      }
    }
  };
  return <> {render()} </>;
};
