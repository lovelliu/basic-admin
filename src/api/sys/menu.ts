import { AddOrUpdateMenuParams, EditMenuInfo, MenuItem, MenuList } from './model/systemModel';
import { defHttp } from '/@/utils/request';

enum Api {
  GetMenuList = '/menu/getAll',
  GetEditMenuInfo = '/menu/getEditMenuInfo',
  AddOrUpdateMenu = '/menu/saveOrUpdate',
  Menu = '/menu',
}

export const getMenuList = () => defHttp.get<MenuList>({ url: Api.GetMenuList });

export const getEditMenuInfo = () =>
  defHttp.get<EditMenuInfo>({ url: Api.GetEditMenuInfo, params: { id: -1 } });

export const AddOrUpdateMenu = (data: AddOrUpdateMenuParams) =>
  defHttp.post<boolean>({ url: Api.AddOrUpdateMenu, data });

export const deleteMenu = (id) => defHttp.delete({ url: `${Api.Menu}/${id}` });

export const getMenuById = (id) => defHttp.get<MenuItem>({ url: `${Api.Menu}/${id}` });
