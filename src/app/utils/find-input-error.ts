/* eslint-disable import/named */
import { FieldErrors, FieldValues } from 'react-hook-form';

export function findInputError(errors: FieldErrors<FieldValues>, name: string) {
  const filtered = Object.keys(errors)
    .filter(key => key.includes(name))
    .reduce(
      (current, key) => {
        return Object.assign(current, { error: errors[key] });
      },
      {} as { error?: { message: string } },
    );

  return filtered;
}
