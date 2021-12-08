import { defHttp, otherHttp } from '/@/utils/request';
import { LoginParams } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';
import { UserInfo } from '/#/store';
import { GetUserListParams } from './model/systemModel';

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/getInfo',
  GetPermCode = '/getPermCode',
  RefreshToken = '/refresh_token',
  GetUserPages = '/user/getUserPages',
  ForbidUser = '/user/forbidUser',
  EnableUser = '/user/enableUser',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return otherHttp.post<string>(
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
  return otherHttp.get<UserInfo>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return otherHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return otherHttp.post({ url: Api.Logout });
}

export function refreshToken(params: { refreshtoken: string }) {
  return otherHttp.post({ url: Api.RefreshToken, params });
}

export const getUserList = (data: Partial<GetUserListParams>) =>
  defHttp.post({ url: Api.GetUserPages, data });

export const forbidUser = (data: { userId: number }) => defHttp.post({ url: Api.ForbidUser, data });

export const enableUser = (id: number) =>
  defHttp.get({
    url: Api.EnableUser,
    params: {
      userId: id,
    },
  });
