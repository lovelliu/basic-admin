import type {
  AddOrUpdateMenuParams,
  EditMenuInfo,
  MenuItem,
  MenuList,
} from './model/systemModel';
import { defHttp } from '/@/utils/request';

enum Api {
  GetAllMenu = '/menu/all',
  AddMenu = '/menu/add',
  UpdateMenu = '/menu/update',
  DeleteMenu = '/menu/delete',
  Menu = '/menu',
  GetRoleMenus = '/menu/getRoleMenus',
  AllocateRoleMenus = '/menu/allocateRoleMenus',
}

export const getAllMenu = (params?: any) =>
  defHttp.get<MenuList>({ url: Api.GetAllMenu, params });

export const addMenu = (data: AddOrUpdateMenuParams) =>
  defHttp.post<boolean>({ url: Api.AddMenu, data });

export const updateMenu = (data: AddOrUpdateMenuParams) =>
  defHttp.put<boolean>({ url: Api.UpdateMenu, data });

export const deleteMenu = id => defHttp.delete({ url: Api.DeleteMenu, data: { id } });

export const getMenuById = id => defHttp.get<MenuItem>({ url: `${Api.Menu}/${id}` });

export const getRoleMenus = (id: number) =>
  defHttp.get<EditMenuInfo['parentMenuList'] & { selected: boolean }>({
    url: Api.GetRoleMenus,
    params: { roleId: id },
  });

export const allocateRoleMenus = (data: { roleId: number; menuIdList: number[] }) =>
  defHttp.post({ url: Api.AllocateRoleMenus, data });
