import React, { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { TB303Pattern } from '@/types';
import { MidiMessage } from '@/features/midi-player/pattern-parser';

//interface Schedule {
//  tickRatio: number;
//  lastScheduleTick: number;
//  scheduleAhead: number;
//  scheduleMargin: number;
//}
//
//enum MidiEventKind {
//  NoteOn,
//  NoteOff,
//  Unknown,
//}
//type MidiEvent =
//  | {
//      kind: MidiEventKind.NoteOn;
//      note: Tone.Unit.Note;
//      velocity: number;
//    }
//  | {
//      kind: MidiEventKind.NoteOff;
//      note: Tone.Unit.Note;
//    }
//  | {
//      kind: MidiEventKind.Unknown;
//      data: number[];
//    };

///const parseMidi = (msg: number[]): MidiEvent => {
///  if (msg.length === 3) {
///    switch (msg[0]) {
///      case 0x90: {
///        return {
///          kind: msg[2] === 0 ? MidiEventKind.NoteOff : MidiEventKind.NoteOn,
///          note: Tone.Frequency(msg[1], 'midi').toNote(),
///          velocity: msg[2],
///        };
///      }
///      case 0x80: {
///        return {
///          kind: MidiEventKind.NoteOff,
///          note: Tone.Frequency(msg[1], 'midi').toNote(),
///        };
///      }
///    }
///  }
///  return {
///    kind: MidiEventKind.Unknown,
///    data: msg,
///  };
///};

const createSynth = () => {
  return new Tone.MonoSynth({}).toDestination();
};

export const TonePlayer = ({ pattern }: { pattern: TB303Pattern }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const synthRef = useRef<Tone.MonoSynth | undefined>(undefined);
  const sequenceRef = useRef<Tone.Sequence | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (synthRef.current) {
        synthRef.current.dispose();
      }
      if (sequenceRef.current) {
        sequenceRef.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      console.log('HERE');
      synthRef.current?.dispose();
      sequenceRef.current?.dispose();
      const freqEnv = new Tone.FrequencyEnvelope({
        attack: 0.2,
        baseFrequency: 'C2',
        octaves: 4,
      });
      synthRef.current = new Tone.MonoSynth({
        oscillator: {
          type: 'sawtooth',
        },
        volume: -24,
        filter: {
          Q: 10,
          frequency: 2000.0,
          rolloff: -24,
          type: 'lowpass',
        },
        filterEnvelope: {
          baseFrequency: 'C2',
          octaves: 6,
          exponent: 1.0,
          attack: 0.01,
          decay: 0.11,
        },
        envelope: {
          attack: 0.01,
          release: 0.1,
        },
      }).toDestination();
      const notes = ['c3', 'c4'];
      sequenceRef.current = new Tone.Sequence(
        (time, note) => {
          synthRef.current?.triggerAttackRelease(note, '32n', time);
        },
        notes,
        '16n',
      );
      sequenceRef.current.start();
    }
  }, [isPlaying, pattern]);

  //const scheduleRef = useRef<Schedule | null>(null);

  //  useEffect(() => {
  //    if (synthRef.current) {
  //    }
  //    synthRef.current = createSynth();
  //    console.log('CREATED SYNTH');
  //    const notes = pattern.steps.map(s => {
  //      if (typeof s.note !== 'string') throw new Error('bad');
  //      const transpose =
  //        s.transpose === 'up' ? 1 : s.transpose === 'down' ? -1 : 0;
  //      const note = s.note === 'Chigh' ? 'C' : s.note;
  //      const transposeChigh = s.note === 'Chigh' ? 1 : 0;
  //      const octave = 4 + transpose + transposeChigh;
  //      return note + octave.toString();
  //    });
  //
  //    sequenceRef.current = new Tone.Sequence(
  //      (time, note) => {
  //        synthRef.current?.triggerAttackRelease(note, '32n', time);
  //      },
  //      notes,
  //      '16n',
  //    );
  //
  //    //const schedule = () => {
  //    //  const now = tickRatio * Tone.getTransport().ticks;
  //    //  if (now + scheduleAhead >= lastScheduledTick) {
  //    //    while (lastScheduledTick <= scheduleAhead + now + scheduleMargin) {
  //    //      const messages = sequencer.next().value.messages;
  //    //      for (const msg of messages) {
  //    //        scheduleMessage(msg);
  //    //        lastScheduledTick = msg.tick;
  //    //      }
  //    //    }
  //    //  }
  //    //};
  //
  //    //repeatIdRef.current = Tone.getTransport().scheduleRepeat(schedule, `4n`);
  //
  //    return () => {
  //      if (sequenceRef.current) {
  //        sequenceRef.current.dispose();
  //      }
  //      if (synthRef.current) {
  //        synthRef.current.dispose();
  //      }
  //    };
  //  }, []);

  const togglePlayback = async () => {
    if (Tone.Transport.state === 'started') {
      Tone.Transport.stop();
      //sequenceRef.current?.stop();
      setIsPlaying(false);
      console.log('stop');
    } else {
      await Tone.start();
      //sequenceRef.current?.start(0);
      Tone.Transport.start();
      Tone.getTransport().bpm.value = 90;
      setIsPlaying(true);
      console.log('start');
    }
  };

  return (
    <button onClick={togglePlayback}>
      {isPlaying ? 'Stop' : 'Play'} Sequence
    </button>
  );
};

export default TonePlayer;
