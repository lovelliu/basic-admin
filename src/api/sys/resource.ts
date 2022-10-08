import type {
  AddOrUpdateMenuParams,
  AddOrUpdateResourceCate,
  ResourceCateList,
  ResourceList,
  ResourceParams,
  RoleResourceList,
} from './model/systemModel'
import { defHttp } from '@/utils/request'

enum Api {
  GetResourceList = '/resource/getResourcePages',
  GetResourceCate = '/resource/category/getAll',
  AddOrUpdate = '/resource/saveOrUpdate',
  DeleteResource = '/resource',
  AddOrUpdateResourceCate = '/resource/category/saveOrderUpdate',
  DeleteResourceCate = '/resource/category',
  GetAllResource = '/resource/getAll',
  GetRoleResource = '/resource/getRoleResources',
  AllocateRoleResource = '/resource/allocateRoleResources',
}

export const getResourceList = (data: Partial<ResourceParams>) =>
  defHttp.post<ResourceList>({ url: Api.GetResourceList, data })

export const getResourceCate = () => defHttp.get<ResourceCateList>({ url: Api.GetResourceCate })

export const addOrUpdate = (data: AddOrUpdateMenuParams) =>
  defHttp.post({ url: Api.AddOrUpdate, data })

export const deleteResource = (id: number) =>
  defHttp.delete({ url: `${Api.DeleteResource}/${id}` })

export const addOrUpdateCate = (data: AddOrUpdateResourceCate) =>
  defHttp.post({ url: Api.AddOrUpdateResourceCate, data })

export const deleteResourceCate = (id: number) =>
  defHttp.delete({ url: `${Api.DeleteResourceCate}/${id}` })

export const getAllResource = () => defHttp.get<ResourceList>({ url: Api.GetAllResource })

export const getRoleResource = (id: number) =>
  defHttp.get<RoleResourceList>({
    url: Api.GetRoleResource,
    params: { roleId: id },
  })

export const allocateRoleResource = (data: { roleId: number; resourceIdList: number[] }) =>
  defHttp.post({ url: Api.AllocateRoleResource, data })
