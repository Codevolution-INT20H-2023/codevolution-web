export enum TOAST_STATUS {
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface ToastStore {
  status: TOAST_STATUS;
  message: string;
  open: boolean;
}

export interface ShowToastAction {
  message: string;
  status: TOAST_STATUS;
}
