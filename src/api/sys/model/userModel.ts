import { Dayjs } from 'dayjs';

/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
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
  // role: RoleInfo;
}

export interface UserInfo {
  id: number;
  username: string;
  portrait?: string;
  desc?: string;
  status: boolean;
  createTime: Dayjs;
  pendingStatus?: boolean;
}
