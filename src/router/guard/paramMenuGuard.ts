import type { Router } from 'vue-router'
import type { Menu } from '../types'
import { PermissionModeEnum } from '@/enums/appEnum'
import { useAppStoreWithOut } from '@/store/modules/app'

import { usePermissionStoreWithOut } from '@/store/modules/permission'
import { configureDynamicParamsMenu } from '../helper/menuHelper'

export function createParamMenuGuard(router: Router) {
  const permissionStore = usePermissionStoreWithOut()

  const getPermissionMode = () => {
    const appStore = useAppStoreWithOut()
    return appStore.getProjectConfig.permissionMode
  }

  const isBackMode = () => {
    return getPermissionMode() === PermissionModeEnum.BACK
  }

  const isRouteMappingMode = () => {
    return getPermissionMode() === PermissionModeEnum.ROUTE_MAPPING
  }
  router.beforeEach(async (to, _, next) => {
    // filter no name route
    if (!to.name) {
      next()
      return
    }

    // menu has been built.
    if (!permissionStore.getIsDynamicAddedRoute) {
      next()
      return
    }

    let menus: Menu[] = []
    if (isBackMode())
      menus = permissionStore.getBackMenuList
    else if (isRouteMappingMode())
      menus = permissionStore.getFrontMenuList

    menus.forEach(item => configureDynamicParamsMenu(item, to.params))

    next()
  })
}

