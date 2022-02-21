import type { RouteMeta } from 'vue-router';
export interface RouteItem {
  path: string;
  component: any;
  meta: RouteMeta;
  name?: string;
  alias?: string | string[];
  redirect?: string;
  caseSensitive?: boolean;
  children?: RouteItem[];
}

/**
 * @description: Get menu return value
 */
export type GetMenuListResultModel = RouteItem[];

export type MenuList = MenuItem[];
export interface EditMenuInfo {
  menuInfo: null;
  parentMenuList: MenuTreeItem[];
}

export interface AddOrUpdateMenuParams {
  id?: number;
  parent_id?: number;
  name: string;
  route?: string;
  icon?: string;
  status: boolean;
  order_num: number;
  component?: string;
  is_ext?: boolean;
  type: 0 | 1 | 2;
}

export interface MenuItem {
  id: number;
  created_at: string;
  updated_at: string;
  parent_id: Nullable<number>;
  is_ext: boolean;
  name: string;
  route: string;
  icon?: string;
  order_num: number;
  type: 0 | 1 | 2;
  status: boolean;
  keepalive: boolean;
}

export type ResourceList = ResourceItem[];
export type RoleResourceList = (ResourceItem & { resourceList: ResourceList })[];
export type ResourceCateList = ResourceCate[];

export interface AddOrUpdateResourceParams {
  id?: number;
  name: string;
  url: string;
  categoryId: number;
  description?: string;
}

export interface AddOrUpdateResourceCate {
  id?: number;
  name: string;
  sort: number;
}

export type RoleList = RoleItem[];

export interface GetUserListParams {
  username?: string;
  status: boolean;
}

export interface RoleWithPermission {
  id: number;
  name: string;
  hasPermission: boolean;
}

export interface RoleItem {
  id: number;
  create_at: string;
  update_at: string;
  label: string;
  status: boolean;
  name: string;
  desc?: string;
}

interface MenuTreeItem {
  id: number;
  createdBy: string;
  updatedBy: string;
  createdTime: string;
  updatedTime: string;
  operatorId: Nullable<number>;
  parentId: number;
  name: string;
  href: string;
  icon: string;
  orderNum: number;
  description: string;
  shown: boolean;
  level: number;
  selected: boolean;
  subMenuList: Nullable<MenuTreeItem[]>;
}

interface ResourceItem {
  id: number;
  createdBy: string;
  updatedBy: string;
  createdTime: string;
  updatedTime: string;
  operatorId: null;
  name: string;
  categoryId: number;
  url: string;
  description: string;
  selected: boolean;
}

interface ResourceCate {
  id: number;
  createdBy: string;
  updatedBy: string;
  createdTime: string;
  updatedTime: string;
  operatorId: Nullable<number>;
  name: string;
  sort: number;
  selected: boolean;
  children: Array<{ label: string; value: number }>;
}
