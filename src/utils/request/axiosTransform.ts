import type { AxiosTransform, Result, RequestOptions } from '/#/axios';

import { RequestEnum } from '/@/enums/httpEnum';
import { AxiosResponse } from 'axios';
import { useMessage } from '/@/hooks/web/useMessage';
import { getRefreshToken, getToken } from '/@/utils/auth';
import { checkStatus } from './checkStatus';
import { useErrorLogStoreWithOut } from '/@/store/modules/errorLog';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatRequestDate, joinTimestamp } from './helper';
import { setObjToUrlParams } from '..';
import { isString } from '../is';
import { useUserStoreWithOut } from '/@/store/modules/user';
import { defHttp } from '.';

const { createErrorModal, createMessage } = useMessage();
let isRefreshing = false;
let requests: Function[] = [];
/**
 * @description: 数据处理，方便区分多种处理方式
 */
export const transform: AxiosTransform = {
  /**
   * @description: 处理请求数据。如果数据不是预期格式，可直接抛出错误
   */
  transformRequestHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { t } = useI18n();
    const { isTransformResponse, isReturnNativeResponse } = options;
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res;
    }
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data;
    }
    // 错误的时候返回

    const { data } = res;

    if (!data) {
      // return '[HTTP] Request has no return value';
      throw new Error(t('sys.api.apiRequestFailed'));
    }

    if ('result' in (data as Result)) {
      const { status, message, result } = data as Result;
      if (status === 'success') return result;
      else createErrorModal({ title: t('sys.api.errorTip'), content: message });
    }

    // 在此处根据自己项目的实际情况对不同的code执行不同的操作
    // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
    // let timeoutMsg = '';
    // switch (state) {
    //   case ResultEnum.TIMEOUT:
    //     timeoutMsg = t('sys.api.timeoutMessage');
    //     const userStore = useUserStoreWithOut();
    //     userStore.setToken(undefined);
    //     userStore.logout(true);
    //     break;
    //   default:
    //     if (message) {
    //       timeoutMsg = message;
    //     }
    // }

    // errorMessageMode=‘modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
    // errorMessageMode='none' 一般是调用时明确表示不希望自动弹出错误提示
    // if (options.errorMessageMode === 'modal') {
    //   createErrorModal({ title: t('sys.api.errorTip'), content: timeoutMsg });
    // } else if (options.errorMessageMode === 'message') {
    //   createMessage.error(timeoutMsg);
    // }

    // throw new Error(timeoutMsg || t('sys.api.apiRequestFailed'));
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options;

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }
    const params = config.params || {};
    const data = config.data || false;
    formatDate && data && !isString(data) && formatRequestDate(data);
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params);
        if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0) {
          config.data = data;
          config.params = params;
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params;
          config.params = undefined;
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data),
          );
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config, options) => {
    // 请求之前处理config
    const token =
      config.url === '/basic-api/api/auth/refreshToken' ? getRefreshToken() : getToken();
    if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
      // jwt token
      (config as Recordable).headers.Authorization = options.authenticationScheme
        ? `${options.authenticationScheme} ${token}`
        : token;
    }
    return config;
  },

  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors: (res: AxiosResponse<any>) => {
    return res;
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    const { t } = useI18n();
    const errorLogStore = useErrorLogStoreWithOut();
    errorLogStore.addAjaxErrorInfo(error);

    const { response, code, message, config } = error || {};
    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none';
    const msg: string = response?.data?.error ?? '';

    const err: string = error?.toString?.() ?? '';
    let errMessage = '';

    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        errMessage = t('sys.api.apiTimeoutMessage');
      }
      if (err?.includes('Network Error')) {
        errMessage = t('sys.api.networkExceptionMsg');
      }

      if (errMessage) {
        if (errorMessageMode === 'modal') {
          createErrorModal({ title: t('sys.api.errorTip'), content: errMessage });
        } else if (errorMessageMode === 'message') {
          createMessage.error(errMessage);
        }
        return Promise.reject(error);
      }
    } catch (error) {
      throw new Error(error as unknown as string);
    }
    if (error.response.status === 401) {
      const userStore = useUserStoreWithOut();
      if (!userStore.getToken) userStore.logout();
      if (!isRefreshing) {
        isRefreshing = true;
        return userStore
          .toTefreshToken()
          .then(() => {
            requests.forEach((cb) => cb());
            requests = [];
            return defHttp.getAxios()(error.config);
          })
          .finally(() => (isRefreshing = false));
      }
      return new Promise((resolve) => {
        requests.push(() => {
          resolve(defHttp.request(error.config));
        });
      });
    }
    checkStatus(error?.response?.status, msg, errorMessageMode);

    return Promise.reject(error);
  },
};
