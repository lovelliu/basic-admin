// import { RoleInfo } from '../src/api/sys/model/userModel';
import { ErrorTypeEnum } from '/@/enums/exceptionEnum';
import { MenuModeEnum, MenuTypeEnum } from '/@/enums/menuEnum';

export interface LockInfo {
  pwd?: string | undefined;
  isLock?: boolean;
}

export interface ErrorLogInfo {
  type: ErrorTypeEnum;
  file: string;
  name?: string;
  message: string;
  stack?: string;
  detail: string;
  url: string;
  time?: string;
}

export interface UserInfo {
  userName: string;
  isUpdatedPassword: boolean;
  portrait: string;
}

export interface BeforeMiniState {
  menuCollapsed?: boolean;
  menuSplit?: boolean;
  menuMode?: MenuModeEnum;
  menuType?: MenuTypeEnum;
}
