import type { Dayjs } from 'dayjs';

export interface CaptchaModel {
  img: string;
  id: string;
}

/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
  captchaId: string;
  verifyCode: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  user_id: number;
  access_token: string;
  refresh_token: string;
}

export interface UserInfo {
  id: number;
  username: string;
  avatar?: string;
  desc?: string;
  status: boolean;
  create_at: Dayjs;
  pendingStatus?: boolean;
}
