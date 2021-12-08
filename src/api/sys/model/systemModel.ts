export type MenuList = MenuItem[];
export interface EditMenuInfo {
  menuInfo: null;
  parentMenuList: MenuTreeItem[];
}

export interface AddOrUpdateMenuParams {
  id?: number;
  parentId: number;
  name: string;
  href: string;
  icon?: string;
  description?: string;
  shown?: boolean;
  orderNum?: number;
}

export interface MenuItem {
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
}

export type ResourceList = ResourceItem[];
export type RoleResourceList = (ResourceItem & { resourceList: ResourceList })[];
export interface ResourceParams {
  id: number;
  name: string;
  url: string;
  current: number;
  size: number;
  categoryId: number;
}
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

export type RoleParms = Partial<Omit<ResourceParams, 'url' & 'categoryId'>>;

export interface AddOrUpdateRoleParams {
  id?: number;
  code: number;
  name: string;
  description?: string;
}

export interface GetUserListParams {
  phone: number;
  userId: number;
  startCreateTime: string;
  endCreateTime: string;
}

export interface RoleWithPermission {
  id: number;
  name: string;
  hasPermission: boolean;
}

interface RoleItem {
  id: number;
  createdBy: string;
  updatedBy: string;
  createdTime: string;
  updatedTime: string;
  operatorId: Nullable<number>;
  code: string;
  name: string;
  description: string;
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
