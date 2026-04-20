'use client';

import { useCallback, useEffect, useReducer } from 'react';

import { Icons } from '@/components/atoms/icons';
import { UserAvatar } from '@/components/atoms/user-avatar';
import { FormAlert } from '@/components/molecules/form-alert';
import { ImageDropzone } from '@/components/molecules/image-dropzone';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@/context/user-context';
import { getPresignedUploadUrl, patchMe, uploadFileToS3 } from '@/dal';
import { IMAGE_UPLOAD_CONFIG } from '@/lib/definitions';
import { PresignContentType } from '@/types';

import { UploadAction, UploadActionTypes, type UploadState } from './types';

const initialState: UploadState = {
  selectedFile: null,
  preview: undefined,
  isUploading: false,
  error: undefined,
};

function avatarUploadReducer(
  state: UploadState,
  action: UploadAction,
): UploadState {
  switch (action.type) {
    case UploadActionTypes.SET_FILE: {
      return {
        ...state,
        selectedFile: action.payload.file,
        preview: action.payload.preview,
        error: undefined,
      };
    }
    case UploadActionTypes.RESET: {
      return {
        ...state,
        selectedFile: null,
        preview: undefined,
        error: undefined,
      };
    }
    case UploadActionTypes.SET_ERROR: {
      return { ...state, error: action.payload };
    }
    case UploadActionTypes.SET_UPLOADING: {
      return { ...state, isUploading: action.payload };
    }
    default: {
      return state;
    }
  }
}

export function AvatarUpload() {
  const { user, refreshUser } = useUser();
  const [state, dispatch] = useReducer(avatarUploadReducer, initialState);

  const { selectedFile, preview, error, isUploading } = state;

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFileSelect = (file: File, previewUrl: string) => {
    dispatch({
      type: UploadActionTypes.SET_FILE,
      payload: { file, preview: previewUrl },
    });
  };

  const handleError = (message: string) => {
    dispatch({ type: UploadActionTypes.SET_ERROR, payload: message });
    dispatch({ type: UploadActionTypes.RESET });
  };

  const resetState = useCallback(() => {
    dispatch({ type: UploadActionTypes.RESET });
  }, []);

  const handleUpload = useCallback(async () => {
    if (!selectedFile) return;

    dispatch({ type: UploadActionTypes.SET_UPLOADING, payload: true });
    dispatch({ type: UploadActionTypes.SET_ERROR, payload: undefined });

    const presignResult = await getPresignedUploadUrl({
      content_length: selectedFile.size,
      content_type: selectedFile.type as PresignContentType,
      upload_type: 'avatar',
    });

    if ('error' in presignResult) {
      dispatch({
        type: UploadActionTypes.SET_ERROR,
        payload: presignResult.error,
      });
      dispatch({ type: UploadActionTypes.SET_UPLOADING, payload: false });
      return;
    }

    const { upload_url, key } = presignResult;

    const uploadResult = await uploadFileToS3(upload_url, selectedFile);

    if ('error' in uploadResult) {
      dispatch({
        type: UploadActionTypes.SET_ERROR,
        payload: uploadResult.error,
      });
      dispatch({
        type: UploadActionTypes.SET_UPLOADING,
        payload: false,
      });
      return;
    }

    await patchMe({ avatar_key: key });
    await refreshUser();
    resetState();
    dispatch({ type: UploadActionTypes.SET_UPLOADING, payload: false });
  }, [selectedFile, refreshUser, resetState]);

  const config = IMAGE_UPLOAD_CONFIG.avatar;
  const acceptedFormats = Object.values(config.accept)
    .flat()
    .map(extension => extension.replace('.', '').toUpperCase())
    .join(', ');

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <div className="flex-none">
        <h3 className="text-lg font-medium">Avatar</h3>
        <p className="text-muted-foreground text-sm">
          Update your profile picture.
        </p>
      </div>
      <Separator className="my-6 flex-none" />
      <div className="flex flex-col gap-4">
        <div className="flex gap-6">
          <ImageDropzone
            uploadType="avatar"
            onFileSelect={handleFileSelect}
            onError={handleError}
            disabled={isUploading}
          >
            <div className="flex flex-col gap-2 justify-center items-center">
              <UserAvatar
                username={user?.username ?? ''}
                avatarUrl={preview ?? user?.avatar_url}
                className="size-20"
              />
              <p className="text-muted-foreground text-xs">
                Click or drag to upload
              </p>
            </div>
          </ImageDropzone>

          {preview && (
            <div className="flex justify-start items-center">
              <div className="flex gap-2">
                <Button onClick={handleUpload} disabled={isUploading}>
                  {isUploading && (
                    <Icons.RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save
                </Button>
                <Button
                  variant="ghost"
                  onClick={resetState}
                  disabled={isUploading}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
        <p className="text-muted-foreground text-sm">
          Accepted formats: {acceptedFormats}. Maximum size: {config.maxSizeMB}
          MB.
        </p>
        {error && (
          <FormAlert
            variant="destructive"
            title="Upload Error"
            message={error}
          />
        )}
      </div>
    </div>
  );
}
