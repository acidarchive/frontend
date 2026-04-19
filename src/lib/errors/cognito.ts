import { AppError, ErrorCode } from './index';

const COGNITO_ERROR_MAP: Record<
  string,
  { code: ErrorCode; message: string; status: number }
> = {
  NotAuthorizedException: {
    code: ErrorCode.COGNITO_NOT_AUTHORIZED,
    message: 'Invalid credentials.',
    status: 401,
  },
  UserNotFoundException: {
    code: ErrorCode.COGNITO_USER_NOT_FOUND,
    message: 'User not found.',
    status: 401,
  },
  UserAlreadyAuthenticatedException: {
    code: ErrorCode.COGNITO_ALREADY_AUTHENTICATED,
    message: 'Already signed in.',
    status: 400,
  },
  UsernameExistsException: {
    code: ErrorCode.COGNITO_USERNAME_EXISTS,
    message: 'Username already exists.',
    status: 400,
  },
  CodeMismatchException: {
    code: ErrorCode.COGNITO_CODE_MISMATCH,
    message: 'Invalid verification code.',
    status: 400,
  },
  ExpiredCodeException: {
    code: ErrorCode.COGNITO_EXPIRED_CODE,
    message: 'Verification code has expired. Request a new one.',
    status: 400,
  },
  LimitExceededException: {
    code: ErrorCode.COGNITO_LIMIT_EXCEEDED,
    message: 'Too many attempts. Please try again later.',
    status: 429,
  },
  InvalidPasswordException: {
    code: ErrorCode.COGNITO_INVALID_PASSWORD,
    message: 'Password does not meet requirements.',
    status: 400,
  },
};

export function toCognitoError(error: unknown): AppError | null {
  if (!(error instanceof Error)) {
    return null;
  }
  const mapped = COGNITO_ERROR_MAP[error.name];

  if (mapped) {
    return new AppError(mapped.code, mapped.message, mapped.status);
  }

  return null;
}

export function toAppError(
  error: unknown,
  fallbackMessage = 'Something went wrong',
): AppError {
  const cognitoError = toCognitoError(error);
  if (cognitoError) {
    return cognitoError;
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
