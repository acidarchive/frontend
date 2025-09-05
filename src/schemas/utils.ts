export const emptyToUndefined = <T>(value: T | '' | null): T | undefined =>
  value === '' || value === null ? undefined : value;

export const cleanUndefined = <T extends Record<string, unknown>>(
  object: T,
): T =>
  Object.fromEntries(
    Object.entries(object).filter(([, value]) => value !== undefined),
  ) as T;

export const applyEmptyToUndefinedTransform = <
  T extends Record<string, unknown>,
>(
  data: T,
  fields: (keyof T)[],
): T => {
  const transformed = { ...data };
  for (const field of fields) {
    transformed[field] = emptyToUndefined(transformed[field]) as T[keyof T];
  }
  return transformed;
};
