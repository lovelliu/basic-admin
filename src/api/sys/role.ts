import { AddOrUpdateRoleParams, RoleList, RoleParms } from './model/systemModel';
import { defHttp } from '/@/utils/request';

enum Api {
  AddOrUpdateRole = '/role/saveOrUpdate',
  GetAllRole = '/role/all',
  GetSearchRole = '/role/getRolePages',
  DeleteRole = '/role',
}

export const getRoleList = () => defHttp.get<RoleList>({ url: Api.GetAllRole });

export const getSearchRole = (data: RoleParms) => defHttp.post({ url: Api.GetSearchRole, data });

export const addOrUpdateRole = (data: AddOrUpdateRoleParams) =>
  defHttp.post({ url: Api.AddOrUpdateRole, data }, { isTransformResponse: false });

export const deleteRole = (id: number) => defHttp.delete({ url: `${Api.DeleteRole}/${id}` });
