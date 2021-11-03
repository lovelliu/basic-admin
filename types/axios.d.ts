export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

export interface RequestOptions {
  joinParamsToUrl?: boolean;
  formatDate?: boolean;
  isTransformResponse?: boolean;
  isReturnNativeResponse?: boolean;
  joinPrefix?: boolean;
  apiUrl?: string;
  urlPrefix?: string;
  errorMessageMode?: ErrorMessageMode;
  joinTime?: boolean;
  ignoreCancelToken?: boolean;
  withToken?: boolean;
}

export interface Result<T = any> {
  code: string;
  time: string;
  mesg: string;
  data: T;
}

export interface OtherResult<T = any> {
  state: number;
  success: boolean;
  message: string;
  content: T;
}

export interface UploadFileParams {
  data?: Record<string, any>;
  name?: string;
  file: File | Blob;
  fileName?: string;
  [key: string]: any;
}
