import type { Menu, MenuModule } from '/@/router/types';
import type { RouteRecordNormalized } from 'vue-router';

import { PermissionModeEnum } from '/@/enums/appEnum';
import { useAppStoreWithOut } from '/@/store/modules/app';
import { usePermissionStore } from '/@/store/modules/permission';
import { filter } from '/@/utils/helper/treeHelper';
import { isUrl } from '/@/utils/is';
import { getAllParentPath, transformMenuModule } from '/@/router/helper/menuHelper';
import { router } from '/@/router';
import { pathToRegexp } from 'path-to-regexp';

const modules = import.meta.globEager('./modules/**/*.ts');

const menuModules: MenuModule[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modeList = Array.isArray(mod) ? [...mod] : [mod];
  menuModules.push(...modeList);
});

const getPermissionMode = () => {
  const appStore = useAppStoreWithOut();
  return appStore.getProjectConfig.permissionMode;
};

const isBackMode = () => {
  return getPermissionMode() === PermissionModeEnum.BACK;
};

const isRouteMappingMode = () => {
  return getPermissionMode() === PermissionModeEnum.ROUTE_MAPPING;
};

const isRoleMode = () => {
  return getPermissionMode() === PermissionModeEnum.ROLE;
};

const staticMenus: Menu[] = [];
(() => {
  menuModules.sort((a, b) => {
    return (a.orderNo || 0) - (b.orderNo || 0);
  });
  for (const menu of menuModules) {
    staticMenus.push(transformMenuModule(menu));
  }
})();

async function getAsyncMenus() {
  const permissionStore = usePermissionStore();
  if (isBackMode()) {
    return permissionStore.getBackMenuList.filter((item) => !item.meta?.hideMenu && !item.hideMenu);
  }

  if (isRouteMappingMode()) {
    return permissionStore.getFrontMenuList.filter((item) => !item.hideMenu);
  }
  return staticMenus;
}

export async function getCurrentParentPath(currentPath: string) {
  const menus = await getAsyncMenus();
  const allParentPath = await getAllParentPath(menus, currentPath);
  return allParentPath?.[0];
}

export const getMenus = async (): Promise<Menu[]> => {
  const menus = await getAsyncMenus();
  if (isRoleMode()) {
    const routes = router.getRoutes();
    return filter(menus, basicFilter(routes));
  }
  return menus;
};

function basicFilter(routes: RouteRecordNormalized[]) {
  return (menu: Menu) => {
    const matchRoute = routes.find((route) => {
      if (isUrl(menu.path)) return true;

      if (route.meta?.carryParam) {
        return pathToRegexp(route.path).test(menu.path);
      }
      const isSame = route.path === menu.path;
      if (!isSame) return false;

      if (route.meta?.ignoreAuth) return true;

      return isSame || pathToRegexp(route.path).test(menu.path);
    });

    if (!matchRoute) return false;
    menu.icon = (menu.icon || matchRoute.meta.icon) as string;
    menu.meta = matchRoute.meta;
    return true;
  };
}
