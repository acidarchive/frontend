'use client';

import { ReactNode, useCallback } from 'react';
import { type FileRejection, useDropzone } from 'react-dropzone';

import { Icons } from '@/components/atoms/icons';
import {
  getUploadErrorMessage,
  IMAGE_UPLOAD_CONFIG,
  type ImageUploadType,
} from '@/lib/definitions/image-upload-schema';
import { cn } from '@/lib/utils';

export interface ImageDropzoneProps {
  uploadType: ImageUploadType;
  onFileSelect: (file: File, previewUrl: string) => void;
  onError: (message: string) => void;
  disabled?: boolean;
  children?: ReactNode;
}

interface DropzoneDefaultContentProps {
  isActive: boolean;
  maxSizeMB: number;
}

function DropzoneDefaultContent({
  isActive,
  maxSizeMB,
}: DropzoneDefaultContentProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Icons.UploadSharp className="size-8 text-muted-foreground" />
      <p className="text-sm font-medium">
        {isActive ? 'Drop image here' : 'Click or drag to upload'}
      </p>
      <p className="text-muted-foreground text-xs">Max size: {maxSizeMB}MB</p>
    </div>
  );
}

export function ImageDropzone({
  uploadType,
  onFileSelect,
  onError,
  disabled = false,
  children,
}: ImageDropzoneProps) {
  const config = IMAGE_UPLOAD_CONFIG[uploadType];

  const onDropAccepted = useCallback(
    (files: File[]) => {
      const file = files[0];
      if (!file) return;
      onFileSelect(file, URL.createObjectURL(file));
    },
    [onFileSelect],
  );

  const onDropRejected = useCallback(
    (fileRejections: FileRejection[]) => {
      const code = fileRejections[0]?.errors[0]?.code ?? 'unknown';
      onError(getUploadErrorMessage(code, uploadType));
    },
    [onError, uploadType],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: config.accept,
    maxSize: config.maxSizeBytes,
    multiple: false,
    disabled,
    onDropAccepted,
    onDropRejected,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'cursor-pointer rounded-lg border-2 border-dashed p-4 transition-colors',
        isDragActive
          ? 'border-primary bg-primary/5'
          : 'border-muted-foreground/25 hover:border-muted-foreground/50',
        disabled && 'pointer-events-none opacity-50',
      )}
    >
      <input {...getInputProps()} />
      {children ?? (
        <DropzoneDefaultContent
          isActive={isDragActive}
          maxSizeMB={config.maxSizeMB}
        />
      )}
    </div>
  );
}
