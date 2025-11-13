import * as React from 'react';
import { ButtonHTMLAttributes, useEffect, useRef } from 'react';
import * as Tone from 'tone';

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
import { TB303Pattern } from '@/types/api';
import {
  MIDI_MESSAGE_PPQN,
  MidiMessage,
  parseSteps,
} from '@/features/midi-player/pattern-parser';
import {
  sequencerAdvance,
  sequencerInit,
  sequencerIterable,
  SequencerStepResult,
} from '@/features/midi-player/sequencer';
import { MidiNote } from 'tone/Tone/core/type/NoteUnits';

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
    tempo: props.pattern?.tempo ?? 120,
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

type TonePlayerState =
  | { type: 'playing'; repeatId: number }
  | { type: 'stopped' };
type TonePlayerAction = { type: 'play'; repeatId: number } | { type: 'stop' };

const tonePlayerReducer = (
  state: TonePlayerState,
  action: TonePlayerAction,
): TonePlayerState => {
  switch (action.type) {
    case 'play': {
      return { type: 'playing', repeatId: action.repeatId };
    }
    case 'stop': {
      return { type: 'stopped' };
    }
  }
};

interface TonePlayerProps {
  pattern: TB303Pattern;
}

export const TonePlayer = (props: TonePlayerProps) => {
  const synthRef = useRef<Tone.MonoSynth | undefined>(undefined);
  const repeatIdRef = useRef<number | undefined>(undefined);
  const [state, dispatch] = React.useReducer(tonePlayerReducer, {
    type: 'stopped',
  });
  enum MidiEventKind {
    NoteOn,
    NoteOff,
    Unknown,
  }
  type MidiEvent =
    | {
        kind: MidiEventKind.NoteOn;
        note: Tone.Unit.Note;
        velocity: number;
      }
    | {
        kind: MidiEventKind.NoteOff;
        note: Tone.Unit.Note;
      }
    | {
        kind: MidiEventKind.Unknown;
        data: number[];
      };
  const parseMidi = (msg: number[]): MidiEvent => {
    if (msg.length === 3) {
      switch (msg[0]) {
        case 0x90: {
          return {
            kind: msg[2] === 0 ? MidiEventKind.NoteOff : MidiEventKind.NoteOn,
            note: Tone.Frequency(msg[1], 'midi').toNote(),
            velocity: msg[2],
          };
        }
        case 0x80: {
          return {
            kind: MidiEventKind.NoteOff,
            note: Tone.Frequency(msg[1], 'midi').toNote(),
          };
        }
      }
    }
    return {
      kind: MidiEventKind.Unknown,
      data: msg,
    };
  };
  useEffect(() => {
    return () => {
      if (synthRef.current) {
        synthRef.current.dispose();
        synthRef.current = undefined;
      }
      if (repeatIdRef.current !== undefined) {
        Tone.getTransport().cancel(repeatIdRef.current);
        repeatIdRef.current = undefined;
      }
      Tone.getTransport().stop();
    };
  }, []);

  const playAudio = async () => {
    if (state.type === 'playing') {
      if (synthRef.current === undefined) {
        throw new Error('DEBUG: Playing but synthRef is destroyed!');
      }
      synthRef.current.dispose();
      synthRef.current = undefined;
      console.log('STOP', state.type, state.repeatId);
      if (repeatIdRef.current !== undefined) {
        Tone.getTransport().cancel(repeatIdRef.current);
        repeatIdRef.current = undefined;
      }
      Tone.getTransport().stop();
      dispatch({ type: 'stop' });
    } else if (state.type === 'stopped') {
      console.log('START');
      if (synthRef.current !== undefined) {
        throw new Error('DEBUG: Not playing but synthRef is here?');
      }
      
      await Tone.start();
      
      Tone.getTransport().stop();
      Tone.getTransport().cancel();
      Tone.getTransport().position = 0;
      
      synthRef.current = new Tone.MonoSynth({
        volume: -18,
        oscillator: { type: 'sawtooth' },
        envelope: { decay: 1, release: 0.1 },
        filter: { Q: 5, type: 'lowpass', rolloff: -24 },
        filterEnvelope: {
          attack: 0.001,
          decay: 0.01,
          baseFrequency: 700,
          octaves: 0.6,
        },
      });

      Tone.getTransport().bpm.value = 100;
      Tone.getTransport().timeSignature = 4;

      const tickRatio = MIDI_MESSAGE_PPQN / Tone.getTransport().PPQ;
      const sequencer = sequencerIterable(parseSteps(props.pattern.steps))[
        Symbol.iterator
      ]();
      const scheduleAhead = Tone.Time('16n').toTicks() * 8;
      const scheduleMargin = Tone.Time('16n').toTicks() * 8;
      let lastScheduledTick = 0;

      const scheduleMessage = (msg: MidiMessage) => {
        const event = parseMidi(msg.data);
        const t = Tone.Ticks(msg.tick);
        if (synthRef.current === undefined) throw new Error('FIXMe3');
        switch (event.kind) {
          case MidiEventKind.NoteOff: {
            const t = Tone.Ticks(msg.tick);
            synthRef.current.triggerRelease(t.toBarsBeatsSixteenths());
            break;
          }
          case MidiEventKind.NoteOn: {
            synthRef.current.triggerAttack(event.note, t.toBarsBeatsSixteenths());
            break;
          }
          case MidiEventKind.Unknown: {
            console.warn('Unknown MIDI message', event.data);
            break;
          }
        }
      };

      const schedule = () => {
        const now = tickRatio * Tone.getTransport().ticks;
        if (now + scheduleAhead >= lastScheduledTick) {
          while (lastScheduledTick <= scheduleAhead + now + scheduleMargin) {
            const messages = sequencer.next().value.messages;
            for (const msg of messages) {
              scheduleMessage(msg);
              lastScheduledTick = msg.tick;
            }
          }
        }
      };

      const repeatId = Tone.getTransport().scheduleRepeat(schedule, `4n`);
      repeatIdRef.current = repeatId;
      dispatch({ type: 'play', repeatId });

      synthRef.current.toDestination();
      Tone.getTransport().start();
    }
  };
  const label = state.type === 'playing' ? 'Stop' : 'Play';
  return (
    <div className="flex mt-2 gap-2">
      <Button onClick={playAudio}>{label}</Button>
    </div>
  );
};
export const MidiPlayer = (props: MidiPlayerProps) => {
  return (
    <div className="flex mt-2 gap-2">
      <MidiPlayerControls pattern={props.pattern} />
    </div>
  );
};
