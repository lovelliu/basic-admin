import { otherHttp } from '/@/utils/request';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return otherHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return otherHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return otherHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return otherHttp.get({ url: Api.Logout });
}
