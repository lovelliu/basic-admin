import {
  AddOrUpdateMenuParams,
  ResourceCateList,
  ResourceList,
  ResourceParams,
} from './model/systemModel';
import { defHttp } from '/@/utils/request';

enum Api {
  GetResourceList = '/resource/getResourcePages',
  GetResourceCate = '/resource/category/getAll',
  AddOrUpdate = '/resource/saveOrUpdate',
  DeleteResource = '/resource',
}

export const getResourceList = (data: Partial<ResourceParams>) =>
  defHttp.post<ResourceList>({ url: Api.GetResourceList, data });

export const getResourceCate = () => defHttp.get<ResourceCateList>({ url: Api.GetResourceCate });

export const addOrUpdate = (data: AddOrUpdateMenuParams) =>
  defHttp.post({ url: Api.AddOrUpdate, data });

export const deleteResource = (id: number) =>
  defHttp.delete({ url: `${Api.DeleteResource}/${id}` });
