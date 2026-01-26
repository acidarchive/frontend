enum UploadActionTypes {
  SET_FILE = 'SET_FILE',
  RESET = 'RESET',
  SET_ERROR = 'SET_ERROR',
  SET_UPLOADING = 'SET_UPLOADING',
}

interface UploadState {
  selectedFile: File | null;
  preview: string | undefined;
  isUploading: boolean;
  error: string | undefined;
}

interface SetFileAction {
  type: UploadActionTypes.SET_FILE;
  payload: {
    file: File;
    preview: string;
  };
}

interface SetErrorAction {
  type: UploadActionTypes.SET_ERROR;
  payload: string | undefined;
}

interface SetUploadingAction {
  type: UploadActionTypes.SET_UPLOADING;
  payload: boolean;
}

interface ResetAction {
  type: UploadActionTypes.RESET;
}

type UploadAction =
  | SetFileAction
  | SetErrorAction
  | SetUploadingAction
  | ResetAction;

export { type UploadAction, UploadActionTypes, type UploadState };
