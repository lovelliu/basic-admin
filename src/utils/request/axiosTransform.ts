import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { RequestOptions, Result } from '/#/axios';

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
