import { isAxiosError } from 'axios';

import { customInstance } from '@/api/mutator/custom-instance';
import type {
  PresignUploadRequest,
  PresignUploadResponse,
} from '@/types/uploads';

export function getApiErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    if (!error.response) {
      return 'Network error. Check your connection';
    }

    const message = error.response.data?.message;
    if (typeof message === 'string') {
      return message;
    }

    return 'Upload failed. Please try again';
  }

  if (error instanceof Error && error.message.includes('status: 403')) {
    return 'Upload link expired. Please try again';
  }

  return 'Upload failed. Please try again';
}

export const getPresignedUploadUrl = async (data: PresignUploadRequest) => {
  return await customInstance<PresignUploadResponse>({
    url: `/v1/uploads/presign`,
    method: 'POST',
    data,
  });
};

export const uploadFileToS3 = async (
  presignedUrl: string,
  file: File,
): Promise<void> => {
  const response = await fetch(presignedUrl, {
    method: 'PUT',
    body: file,
  });

  if (!response.ok) {
    throw new Error(`Upload failed with status: ${response.status}`);
  }
};
