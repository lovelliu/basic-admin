import type { Menu as MenuType } from '@/router/types'
import type { MenuState } from './types'

import type { Ref } from 'vue'
import { computed, toRaw, unref } from 'vue'
import { uniq } from 'lodash-es'
import { MenuModeEnum } from '@/enums/menuEnum'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { getAllParentPath } from '@/router/helper/menuHelper'
import { useTimeoutFn } from '@/hooks/core/useTimeout'

export function useOpenKeys(
  menuState: MenuState,
  menus: Ref<MenuType[]>,
  mode: Ref<MenuModeEnum>,
  accordion: Ref<boolean>,
) {
  const { getCollapsed, getIsMixSidebar } = useMenuSetting()

  async function setOpenKeys(path: string) {
    if (mode.value === MenuModeEnum.HORIZONTAL)
      return

    const native = unref(getIsMixSidebar)
    useTimeoutFn(
      () => {
        const menuList = toRaw(menus.value)
        if (menuList?.length === 0) {
          menuState.openKeys = []
          return
        }
        if (!unref(accordion))
          menuState.openKeys = uniq([...menuState.openKeys, ...getAllParentPath(menuList, path)])
        else
          menuState.openKeys = getAllParentPath(menuList, path)
      },
      16,
      !native,
    )
  }

  const getOpenKeys = computed(() => {
    const collapse = unref(getIsMixSidebar) ? false : unref(getCollapsed)
    return collapse ? menuState.collapsedOpenKeys : menuState.openKeys
  })

  function resetKeys() {
    menuState.selectedKeys = []
    menuState.openKeys = []
  }

  function handleOpenChange(openKeys: string[]) {
    if (unref(mode) === MenuModeEnum.HORIZONTAL || !unref(accordion) || unref(getIsMixSidebar)) {
      menuState.openKeys = openKeys
    }
    else {
      const rootSubMenuKeys: string[] = []
      for (const { children, path } of unref(menus)) {
        if (children && children.length > 0)
          rootSubMenuKeys.push(path)
      }
      if (!unref(getCollapsed)) {
        const latestOpenkey = openKeys.find(key => !menuState.openKeys.includes(key))
        if (!rootSubMenuKeys.includes(latestOpenkey as string))
          menuState.openKeys = openKeys
        else
          menuState.openKeys = latestOpenkey ? [latestOpenkey] : []
      }
      else {
        menuState.collapsedOpenKeys = openKeys
      }
    }
  }
  return { setOpenKeys, resetKeys, getOpenKeys, handleOpenChange }
}
