/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * acid
 * API for acidarchive.com
 * OpenAPI spec version: 0.0.1-alpha.9
 */
import type { CreateTB303StepAccent } from './createTB303StepAccent';
import type { CreateTB303StepNote } from './createTB303StepNote';
import type { CreateTB303StepSlide } from './createTB303StepSlide';
import type { Time } from './time';
import type { CreateTB303StepTranspose } from './createTB303StepTranspose';

export interface CreateTB303Step {
  accent?: CreateTB303StepAccent;
  note?: CreateTB303StepNote;
  number: number;
  slide?: CreateTB303StepSlide;
  time: Time;
  transpose?: CreateTB303StepTranspose;
}
