import { defHttp } from '/@/utils/request';
import { CaptchaModel, LoginParams, LoginResultModel } from './model/userModel';

import { UserInfo } from '/#/store';
import { GetUserListParams } from './model/systemModel';
import { VAxios } from '/@/utils/request/Axios';

enum Api {
  GetCaptcha = '/auth/captcha/img',
  Login = '/auth/login',
  GetUserInfo = '/user/getInfo',
  RefreshToken = '/auth/refreshToken',
  GetUserPages = '/user/All',
  ForbidUser = '/user/forbid',
  EnableUser = '/user/enable',
  isUserExist = '/user/exist',
  AddUser = '/user/add',
  UpdateUser = '/user/update',
  GetUsername = '/user',
}

/**
 * @description: get captcha img
 */
export const getCaptcha = () =>
  defHttp.get<CaptchaModel>(
    {
      url: Api.GetCaptcha,
    },
    {
      withToken: false,
    },
  );

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams) {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
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

export function refreshToken(axiosInstance: VAxios) {
  return axiosInstance.get({ url: Api.RefreshToken });
}

export const getUserList = (params: Partial<GetUserListParams>) =>
  defHttp.get({ url: Api.GetUserPages, params });

export const forbidUser = (id: number) =>
  defHttp.patch({ url: Api.ForbidUser, params: { id } }, { isReturnNativeResponse: true });

export const enableUser = (id: number) =>
  defHttp.patch(
    {
      url: Api.EnableUser,
      params: {
        id,
      },
    },
    { isReturnNativeResponse: true },
  );

export const isUserExist = (username: string) =>
  defHttp.post({ url: Api.isUserExist, data: { username } });

export const addUser = (data) => defHttp.post({ url: Api.AddUser, data });

export const updateUser = (data) => defHttp.put({ url: Api.UpdateUser, data });

export const getUsername = (id) => defHttp.get({ url: `${Api.GetUsername}/${id}` });
