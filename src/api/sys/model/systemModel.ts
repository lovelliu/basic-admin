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
  subMenuList: Nullable<MenuTreeItem>;
}
