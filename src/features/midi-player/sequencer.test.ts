import { stepsToMessages } from '@/features/midi-player/sequencer';
import { TB303Step } from '@/types/api';

import {
  MIDI_MESSAGE_PPQN,
  MidiMessage,
  parseSteps,
  patternDurationInTicks,
  patternTicksPerSecond,
} from './pattern-parser';

interface PianoRollRow {
  key: number;
  gates: boolean[];
  ascii: string;
}

const gatesToAscii = (gates: boolean[]): string =>
  gates.map(x => (x ? 'x' : '.')).join('');

type AsciiPianoRoll = { [key: number]: string };
const toObject = (rows: PianoRollRow[]): AsciiPianoRoll =>
  Object.fromEntries(rows.map(row => [row.key, row.ascii]));

const asciiPianoRoll = (
  messages: MidiMessage[],
  lengthInSixteenthNotes: number,
): PianoRollRow[] => {
  const live = new Map();
  const rows = new Map<number, boolean[]>();
  for (const message of messages) {
    if (message.data.length !== 3) continue;
    const [status, key, velocity] = message.data;
    const index = message.tick / 3;
    if (Math.floor(index) - index !== 0) {
      throw new Error(
        `MIDI: message at tick ${message.tick} is not a 16th note`,
      );
    }
    if (status === 0x90 && velocity > 0) {
      if (live.has(key)) throw new Error(`Played key ${key} twice`);
      live.set(key, index);
      if (!rows.has(key)) {
        const g = Array.from({ length: lengthInSixteenthNotes * 2 }).fill(
          false,
        ) as boolean[];
        rows.set(key, g);
      }
    }
    if ((status === 0x80 || status === 0x90) && velocity === 0) {
      const since = live.get(key);
      if (since === undefined) throw new Error(`Released key ${key} twice`);
      live.delete(key);
      const gatesArray = rows.get(key);
      if (gatesArray === undefined)
        throw new Error(`Released key ${key} twice`);
      for (let index_ = since; index_ < index; index_++) {
        gatesArray[index_] = true;
      }
    }
  }
  const temporary = rows
    .entries()
    .map(([key, gates]) => ({
      key,
      gates,
      ascii: gatesToAscii(gates),
    }))
    .toArray();
  temporary.sort((a, b) => a.key - b.key);
  return temporary;
};

const mkPattern = (steps: Partial<TB303Step>[]) => ({
  tempo: 150,
  name: '',
  steps: steps.map((s, index) => {
    const time =
      typeof s.time === 'string'
        ? s.time
        : typeof s.note === 'string'
          ? 'note'
          : 'rest';
    return { id: '0', number: index + 1, time, ...s };
  }),
});

describe('patternDurationInTicks', () => {
  it("should assume step's length to be 16th note", () => {
    const pattern = mkPattern([
      { note: 'C' },
      { note: 'D' },
      { note: 'E' },
      { note: 'F' },
      { note: 'E' },
      { note: 'F' },
    ]);
    const quarterNotes = 6 / 4;
    expect(patternDurationInTicks(pattern)).toEqual(
      quarterNotes * MIDI_MESSAGE_PPQN,
    );
  });
});

describe('patternTicksPerSecond', () => {
  it('should convert quarter notes per minute (BPM) to ticks per second', () => {
    const beatsPerMinute = 120;
    const pattern = { ...mkPattern([]), tempo: beatsPerMinute };
    const ticksPerMinute = beatsPerMinute * MIDI_MESSAGE_PPQN;
    const ticksPerSecond = ticksPerMinute / 60;
    expect(patternTicksPerSecond(pattern)).toEqual(ticksPerSecond);
  });
});

describe('parseStep', () => {
  it('should parse a steps', () => {
    const parsed = parseSteps([
      {
        id: '0',
        number: 1,
        note: 'C',
        time: 'note',
        accent: false,
        slide: false,
      },
      {
        id: '0',
        number: 2,
        note: 'D',
        time: 'tied',
        accent: false,
        slide: false,
      },
      {
        id: '0',
        number: 3,
        time: 'rest',
      },
      {
        id: '0',
        number: 4,
        note: 'D',
        time: 'note',
        accent: false,
        slide: false,
      },
    ]);

    expect(parsed).toEqual([
      { gate: true, pitch: 36, slide: true, velocity: 1 },
      { gate: true, pitch: 36, slide: false, velocity: 1 },
      { gate: false },
      { gate: true, pitch: 38, slide: false, velocity: 1 },
    ]);
  });
  it('should throw on tied before step', () => {
    expect(() => {
      parseSteps(mkPattern([{ time: 'tied' }, { note: 'C' }]).steps);
    }).toThrow();
  });
});
const pianoRoll = (steps: Partial<TB303Step>[]): AsciiPianoRoll => {
  const patt = mkPattern(steps);
  return toObject(
    asciiPianoRoll(stepsToMessages(parseSteps(patt.steps)), patt.steps.length),
  );
};

describe('compare', () => {
  it('simple steps', () => {
    const r = pianoRoll([
      { note: 'C' },
      { note: 'C' },
      { note: 'C' },
      { note: 'C' },
    ]);
    expect(r).toEqual({
      36: 'x.x.x.x.',
    });
  });

  it('few normal steps', () => {
    const r = pianoRoll([
      { note: 'C' },
      { note: 'C#' },
      { note: 'D' },
      { note: 'D#' },
    ]);
    expect(r).toEqual({
      36: 'x.......',
      37: '..x.....',
      38: '....x...',
      39: '......x.',
    });
  });

  it('tied', () => {
    const r = pianoRoll([
      { note: 'C' },
      { time: 'tied' },
      { time: 'tied' },
      { time: 'tied' },
      { time: 'rest' },
    ]);
    expect(r).toEqual({
      36: 'xxxxxxx...',
    });
  });

  it('normal after tied steps', () => {
    const pattern = pianoRoll([
      { note: 'C' },
      { time: 'tied' },
      { time: 'tied' },
      { time: 'tied' },
      { note: 'C' },
      { note: 'D' },
    ]);
    expect(pattern).toEqual({
      36: 'xxxxxxx.x...',
      38: '..........x.',
    });
  });

  it('slide', () => {
    const r = pianoRoll([{ note: 'C', slide: true }, { note: 'D' }]);
    expect(r).toEqual({
      36: 'xxx.',
      38: '..x.',
    });
  });

  it('more complex slide', () => {
    const r = pianoRoll([
      { note: 'C' },
      { note: 'C', slide: true },
      { note: 'C', slide: true },
      { note: 'D', slide: true },
      { note: 'C', slide: true },
      { note: 'D' },
    ]);
    expect(r[36]).toEqual('x.xxxxxxxxx.');
    expect(r[38]).toEqual('......xx..x.');
  });

  it('rests', () => {
    const r = pianoRoll([
      { time: 'rest' },
      { time: 'rest' },
      { time: 'rest' },
      { time: 'rest' },
    ]);
    expect(r).toEqual({});
  });
});
