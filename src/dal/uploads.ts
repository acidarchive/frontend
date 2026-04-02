import { client } from '@/api/client';
import type {
  PresignUploadRequest,
  PresignUploadResponse,
} from '@/types/uploads';

interface ApiError {
  response?: { data?: { message?: string } };
  status?: number;
}

export function getApiErrorMessage(error: unknown): string {
  const error_ = error as ApiError;

  if (error_.response?.data?.message) return error_.response.data.message;
  if (error_.status === 403) return 'Upload link expired. Please try again.';
  if (error_.status === 413) return 'File is too large to upload.';
  if (!error_.response && !error_.status)
    return 'Network error. Check your connection.';

  return 'Upload failed. Please try again.';
}

export async function getPresignedUploadUrl(
  data: PresignUploadRequest,
): Promise<PresignUploadResponse> {
  return client<PresignUploadResponse>({
    url: '/v1/uploads/presign',
    method: 'POST',
    data,
  });
}

export async function uploadFileToS3(
  presignedUrl: string,
  file: File,
): Promise<void> {
  const response = await fetch(presignedUrl, {
    method: 'PUT',
    body: file,
  });

  if (!response.ok) {
    throw new Error(`Upload failed with status: ${response.status}`);
  }
}
