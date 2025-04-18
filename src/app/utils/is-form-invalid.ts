export const isFormInvalid = (
  error: { error?: { message: string } } | undefined,
): boolean => {
  if (error && Object.keys(error).length > 0) return true;
  return false;
};
