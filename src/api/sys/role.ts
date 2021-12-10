import {
  AddOrUpdateRoleParams,
  RoleList,
  RoleParms,
  RoleWithPermission,
} from './model/systemModel';
import { defHttp } from '/@/utils/request';

enum Api {
  AddOrUpdateRole = '/role/saveOrUpdate',
  GetAllRole = '/role/all',
  GetSearchRole = '/role/getRolePages',
  DeleteRole = '/role',
  GetRolesWithUserPermission = '/role/getRolesWithUserPermission',
  AllocateRole = '/role/allocateUserRoles',
}

export const getRoleList = () => defHttp.get<RoleList>({ url: Api.GetAllRole });

export const getSearchRole = (data: RoleParms) => defHttp.post({ url: Api.GetSearchRole, data });

export const addOrUpdateRole = (data: AddOrUpdateRoleParams) =>
  defHttp.post({ url: Api.AddOrUpdateRole, data }, { isTransformResponse: false });

export const deleteRole = (id: number) => defHttp.delete({ url: `${Api.DeleteRole}/${id}` });

export const getRolesById = (id: number) =>
  defHttp.get<RoleWithPermission[]>({
    url: Api.GetRolesWithUserPermission,
    params: { userId: id },
  });

export const allocateRole = (data: { userId: number; roleIdList: number[] }) =>
  defHttp.post({ url: Api.AllocateRole, data });
