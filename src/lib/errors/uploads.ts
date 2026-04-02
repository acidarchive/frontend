import { AppError, ErrorCode } from './index';

const UPLOAD_ERROR_MAP: Record<number, { code: ErrorCode; message: string }> = {
  400: {
    code: ErrorCode.API_UPLOAD_TOO_LARGE,
    message: 'File is too large to upload.',
  },
  403: {
    code: ErrorCode.API_UPLOAD_FORBIDDEN,
    message: 'Upload link expired. Please try again.',
  },
};

export function toUploadError(error: unknown): AppError | null {
  if (error instanceof AppError && error.status in UPLOAD_ERROR_MAP) {
    const mapped = UPLOAD_ERROR_MAP[error.status];
    return new AppError(mapped.code, mapped.message, error.status);
  }

  return null;
}

export function toAppError(
  error: unknown,
  fallbackMessage = 'Something went wrong',
): AppError {
  const uploadError = toUploadError(error);
  if (uploadError) {
    return uploadError;
  }

  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(
      ErrorCode.UNKNOWN_ERROR,
      error.message || fallbackMessage,
      500,
    );
  }

  return new AppError(ErrorCode.UNKNOWN_ERROR, fallbackMessage, 500);
}
