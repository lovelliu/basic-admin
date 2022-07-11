import type { GetMenuListResultModel, RoleItem, RoleList } from './model/systemModel';
import { defHttp } from '/@/utils/request';

enum Api {
  AddRole = '/role/add',
  GetRoleList = '/role/list',
  GetAllRoles = '/role/all',
  DeleteRole = '/role/delete',
  UpdateRole = '/role/update',
  AllocateRole = '/role/allocateUserRoles',
  GetMenuList = '/role/menu',
  GetPermCode = '/role/perms',
}

export const getRoleList = () => defHttp.get<RoleList>({ url: Api.GetRoleList });

export const getAllRoles = () =>
  defHttp.get<(RoleItem & { menus: number })[]>({ url: Api.GetAllRoles });

export const getMenuList = () =>
  defHttp.get<GetMenuListResultModel>({ url: Api.GetMenuList });

export const getPermCode = () => defHttp.get<string[]>({ url: Api.GetPermCode });

export const addRole = data => defHttp.post({ url: Api.AddRole, data });

export const updateRole = data => defHttp.put({ url: Api.UpdateRole, data });

export const deleteRole = (id: number) =>
  defHttp.delete({ url: Api.DeleteRole, data: { id } });

export const allocateRole = (data: { userId: number; roleIdList: number[] }) =>
  defHttp.post({ url: Api.AllocateRole, data });
