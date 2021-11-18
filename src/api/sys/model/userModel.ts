/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  phone: string;
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
  userId: string | number;
  access_token: string;
  role: RoleInfo;
}
