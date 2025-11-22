import React, { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import { noteSchema, TB303Pattern, timeSchema, transposeSchema } from '@/types';
import * as z from 'zod';
import {
  MIDI_MESSAGE_PPQN,
  parseSteps,
} from '@/features/midi-player/pattern-parser';
import {
  sequencerAdvance,
  sequencerInit,
  StateType,
} from '@/features/midi-player/sequencer';

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
      synthRef.current?.dispose();
      sequenceRef.current?.dispose();
      synthRef.current = new Tone.MonoSynth({
        oscillator: {
          type: 'sawtooth',
        },
        volume: -24,
        filter: {
          Q: 12,
          frequency: 1500.0,
          rolloff: -24,
          type: 'lowpass',
        },
        filterEnvelope: {
          baseFrequency: 'C1',
          octaves: 5,
          exponent: 1.5,
          attack: 0.01,
          decay: 0.61,
        },
        envelope: {
          attack: 0.01,
          release: 0.1,
        },
      }).toDestination();

      const steps = parseSteps(pattern.steps);
      let state = sequencerInit();
      sequenceRef.current = new Tone.Sequence(
        (time, step) => {
          const { state: newState, messages } = sequencerAdvance(state, step);
          const tickRatio = Tone.getTransport().PPQ / MIDI_MESSAGE_PPQN;
          for (const msg of messages) {
            if (msg.data.length !== 3) continue;
            const [command, pitch, velocity] = msg.data;
            const note = Tone.Midi(pitch + 12).toNote();
            const noteOn = command === 0x90 && velocity > 0;
            const noteOff =
              command === 0x80 || (command === 0x90 && velocity === 0);
            const seconds = Tone.Ticks(msg.tick * tickRatio).toSeconds();
            const t = time + seconds;
            if (noteOn) {
              if (state.type === StateType.Idle) {
                synthRef.current?.triggerAttack(note, t);
              } else {
                synthRef.current?.setNote(note, t);
              }
            } else if (noteOff) {
              synthRef.current?.triggerRelease(t);
            }
          }
          state = newState;
        },
        steps,
        '16n',
      );
      sequenceRef.current.start();
    } else {
      synthRef.current?.triggerRelease();
    }
  }, [isPlaying, pattern]);

  const togglePlayback = async () => {
    if (Tone.Transport.state === 'started') {
      Tone.Transport.stop();
      setIsPlaying(false);
    } else {
      await Tone.start();
      Tone.Transport.start();
      Tone.getTransport().bpm.value = 90;
      setIsPlaying(true);
    }
  };

  return (
    <button onClick={togglePlayback}>
      {isPlaying ? 'Stop' : 'Play'} Sequence
    </button>
  );
};

export default TonePlayer;
