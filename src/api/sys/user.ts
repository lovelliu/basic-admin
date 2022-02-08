import { defHttp } from '/@/utils/request';
import { LoginParams, LoginResultModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';
import { UserInfo } from '/#/store';
import { GetUserListParams } from './model/systemModel';
import { VAxios } from '/@/utils/request/Axios';

enum Api {
  Login = '/auth/login',
  GetUserInfo = '/user/getInfo',
  GetPermCode = '/getPermCode',
  RefreshToken = '/auth/refreshToken',
  GetUserPages = '/user/getAll',
  ForbidUser = '/user/forbidUser',
  EnableUser = '/user/enableUser',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
      withToken: false,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<UserInfo>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function refreshToken(axiosInstance: VAxios) {
  return axiosInstance.get({ url: Api.RefreshToken });
}

export const getUserList = (data: Partial<GetUserListParams>) =>
  defHttp.get({ url: Api.GetUserPages, data });

export const forbidUser = (id: number) =>
  defHttp.post({ url: Api.ForbidUser, params: { id } }, { isReturnNativeResponse: true });

export const enableUser = (id: number) =>
  defHttp.post(
    {
      url: Api.EnableUser,
      params: {
        id,
      },
    },
    { isReturnNativeResponse: true },
  );
