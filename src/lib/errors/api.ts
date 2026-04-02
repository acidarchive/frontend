import { AppError, ErrorCode } from './index';

const STATUS_CODE_MAP: Record<number, ErrorCode> = {
  400: ErrorCode.API_BAD_REQUEST,
  401: ErrorCode.API_UNAUTHORIZED,
  403: ErrorCode.API_FORBIDDEN,
  404: ErrorCode.API_NOT_FOUND,
  500: ErrorCode.API_INTERNAL_ERROR,
};

export class ApiError extends AppError {
  constructor(
    public readonly status: number,
    public readonly data: unknown,
  ) {
    const code = STATUS_CODE_MAP[status] || ErrorCode.API_INTERNAL_ERROR;

    const message =
      extractMessageFromData(data) || `Request failed with status ${status}`;

    super(code, message, status, data);
    this.name = 'ApiError';
  }
}

function extractMessageFromData(data: unknown): string | null {
  if (!data || typeof data !== 'object') {
    return null;
  }

  const record = data as Record<string, unknown>;

  if (typeof record.message === 'string') {
    return record.message;
  }

  if (typeof record.error === 'string') {
    return record.error;
  }

  if (Array.isArray(record.errors)) {
    const firstError = record.errors[0];
    if (
      firstError &&
      typeof firstError === 'object' &&
      'message' in firstError
    ) {
      return String((firstError as { message: unknown }).message);
    }
  }

  return null;
}
