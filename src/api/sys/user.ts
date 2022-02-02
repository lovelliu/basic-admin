import { defHttp } from '/@/utils/request';
import { LoginParams, LoginResultModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';
import { UserInfo } from '/#/store';
import { GetUserListParams } from './model/systemModel';

enum Api {
  Login = '/auth/login',
  GetUserInfo = '/user/getInfo',
  GetPermCode = '/getPermCode',
  RefreshToken = '/auth/refreshToken',
  GetUserPages = '/user/getUserPages',
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

export function refreshToken() {
  return defHttp.get({ url: Api.RefreshToken });
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
