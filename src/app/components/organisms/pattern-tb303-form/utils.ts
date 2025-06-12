import { CreateTB303Pattern, CreateTB303Step } from '@/api/generated/model';

function normalizeValue(value: unknown): unknown {
  if (value === '') return undefined;
  return value;
}

function cleanObject<T extends object>(object: T): T {
  const cleaned = {} as T;

  (Object.keys(object) as Array<keyof T>).forEach(key => {
    const normalized = normalizeValue(object[key]);
    if (normalized !== undefined) {
      cleaned[key] = normalized as T[keyof T];
    }
  });

  return cleaned;
}

function cleanSteps(steps: CreateTB303Step[]): CreateTB303Step[] {
  return steps
    .map((step, index) => ({
      ...step,
      number: index + 1,
    }))
    .filter(step => {
      const note = normalizeValue(step.note);
      const time = step.time;
      if (!note && !time) return false;
      if (time === 'rest' && note) return false;
      return true;
    })
    .map(step => cleanObject(step));
}

export function cleanPattern(data: CreateTB303Pattern): CreateTB303Pattern {
  const cleaned = cleanObject(data);
  if (cleaned.steps) {
    cleaned.steps = cleanSteps(cleaned.steps);
  }
  return cleaned;
}
