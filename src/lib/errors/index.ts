export enum ErrorCode {
  COGNITO_NOT_AUTHORIZED = 'COGNITO_NOT_AUTHORIZED',
  COGNITO_USER_NOT_FOUND = 'COGNITO_USER_NOT_FOUND',
  COGNITO_USERNAME_EXISTS = 'COGNITO_USERNAME_EXISTS',
  COGNITO_CODE_MISMATCH = 'COGNITO_CODE_MISMATCH',
  COGNITO_EXPIRED_CODE = 'COGNITO_EXPIRED_CODE',
  COGNITO_LIMIT_EXCEEDED = 'COGNITO_LIMIT_EXCEEDED',
  COGNITO_INVALID_PASSWORD = 'COGNITO_INVALID_PASSWORD',
  COGNITO_ALREADY_AUTHENTICATED = 'COGNITO_ALREADY_AUTHENTICATED',
  API_BAD_REQUEST = 'API_BAD_REQUEST',
  API_FORBIDDEN = 'API_FORBIDDEN',
  API_NOT_FOUND = 'API_NOT_FOUND',
  API_UNAUTHORIZED = 'API_UNAUTHORIZED',
  API_INTERNAL_ERROR = 'API_INTERNAL_ERROR',
  API_UPLOAD_FORBIDDEN = 'API_UPLOAD_FORBIDDEN',
  API_UPLOAD_TOO_LARGE = 'API_UPLOAD_TOO_LARGE',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export class AppError extends Error {
  constructor(
    public readonly code: ErrorCode,
    message: string,
    public readonly status: number = 500,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = 'AppError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }

  isClientError(): boolean {
    return this.status >= 400 && this.status < 500;
  }

  isServerError(): boolean {
    return this.status >= 500 && this.status < 600;
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) {
    return error.message;
  }

  if (error instanceof Error) {
    if (process.env.NODE_ENV === 'production') {
      return 'An unexpected error occurred';
    }
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'An unexpected error occurred';
}
