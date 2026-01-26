'use client';

import { useCallback, useState } from 'react';
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
  onFileSelect: (file: File, preview: string) => void;
  onError: (message: string) => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function ImageDropzone({
  uploadType,
  onFileSelect,
  onError,
  disabled = false,
  children,
}: ImageDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const config = IMAGE_UPLOAD_CONFIG[uploadType];

  const onDropAccepted = useCallback(
    (files: File[]) => {
      const file = files[0];
      if (!file) return;

      const preview = URL.createObjectURL(file);
      onFileSelect(file, preview);
    },
    [onFileSelect],
  );

  const onDropRejected = useCallback(
    (fileRejections: FileRejection[]) => {
      const rejection = fileRejections[0];
      const errorCode = rejection?.errors[0]?.code ?? 'unknown';
      onError(getUploadErrorMessage(errorCode, uploadType));
    },
    [onError, uploadType],
  );

  const onDragEnter = useCallback(() => setIsDragging(true), []);
  const onDragLeave = useCallback(() => setIsDragging(false), []);
  const onDrop = useCallback(() => setIsDragging(false), []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: config.accept,
    maxSize: config.maxSizeBytes,
    multiple: false,
    disabled,
    onDropAccepted,
    onDropRejected,
    onDragEnter,
    onDragLeave,
    onDrop,
  });

  const isActive = isDragActive || isDragging;

  return (
    <div
      {...getRootProps()}
      className={cn(
        'cursor-pointer rounded-lg border-2 border-dashed p-4 transition-colors',
        isActive
          ? 'border-primary bg-primary/5'
          : 'border-muted-foreground/25 hover:border-muted-foreground/50',
        disabled && 'pointer-events-none opacity-50',
      )}
    >
      <input {...getInputProps()} />
      {children ?? (
        <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
          <Icons.cloudUpload className="text-muted-foreground h-10 w-10" />
          <p className="text-sm font-medium">
            {isActive ? 'Drop image here' : 'Click or drag to upload'}
          </p>
          <p className="text-muted-foreground text-xs">
            Max size: {config.maxSizeMB}MB
          </p>
        </div>
      )}
    </div>
  );
}
