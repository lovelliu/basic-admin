import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface CreateAxiosOptions extends AxiosRequestConfig {
  authenticationScheme?: string;
  transform?: AxiosTransform;
  requestOptions?: RequestOptions;
}

export abstract class AxiosTransform {
  beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;

  transformRequestHook?: (res: AxiosResponse<Result>, options: RequestOptions) => any;

  requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>;

  requestInterceptors?: (
    config: AxiosRequestConfig,
    options: CreateAxiosOptions,
  ) => AxiosRequestConfig;

  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

  requestInterceptorsCatch?: (error: Error) => void;

  responseInterceptorsCatch?: (error: Error) => void;
}

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
  status: string;
  message: string;
  result: T;
}

export interface UploadFileParams {
  data?: Record<string, any>;
  name?: string;
  file: File | Blob;
  fileName?: string;
  [key: string]: any;
}
