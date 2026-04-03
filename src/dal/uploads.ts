import { client } from '@/api/client';
import { getErrorMessage } from '@/lib/errors';
import { toAppError } from '@/lib/errors/uploads';
import type {
  PresignUploadRequest,
  PresignUploadResponse,
} from '@/types/uploads';

export async function getPresignedUploadUrl(
  data: PresignUploadRequest,
): Promise<PresignUploadResponse | { error: string }> {
  try {
    return await client<PresignUploadResponse>({
      url: '/v1/uploads/presign',
      method: 'POST',
      data,
    });
  } catch (error) {
    const appError = toAppError(error);
    return { error: getErrorMessage(appError) };
  }
}

export async function uploadFileToS3(
  presignedUrl: string,
  file: File,
): Promise<{ success: true } | { error: string }> {
  try {
    const response = await fetch(presignedUrl, {
      method: 'PUT',
      body: file,
    });

    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }
    return { success: true };
  } catch (error) {
    const appError = toAppError(error);
    return { error: getErrorMessage(appError) };
  }
}
