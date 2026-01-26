import { z } from 'zod';

import {
  presignUploadBody,
  presignUploadResponse,
} from '@/api/generated/acid.zod';

export type PresignUploadRequest = z.infer<typeof presignUploadBody>;
export type PresignUploadResponse = z.infer<typeof presignUploadResponse>;
