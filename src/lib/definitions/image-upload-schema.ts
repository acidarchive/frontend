export const IMAGE_UPLOAD_CONFIG = {
  avatar: {
    maxSizeBytes: 5 * 1024 * 1024,
    maxSizeMB: 5,
    acceptedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'] as const,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif'] },
  },
  banner: {
    maxSizeBytes: 10 * 1024 * 1024,
    maxSizeMB: 10,
    acceptedTypes: ['image/jpeg', 'image/png', 'image/webp'] as const,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
  },
} as const;

export type ImageUploadType = keyof typeof IMAGE_UPLOAD_CONFIG;

export const getUploadErrorMessage = (
  errorCode: string,
  uploadType: ImageUploadType,
): string => {
  const config = IMAGE_UPLOAD_CONFIG[uploadType];

  const messages: Record<string, string> = {
    'file-too-large': `File exceeds ${config.maxSizeMB}MB limit`,
    'file-invalid-type': 'Invalid file type',
    'too-many-files': 'Only one file allowed',
  };

  return messages[errorCode] ?? 'Invalid file';
};
