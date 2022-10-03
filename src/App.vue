<script setup lang="ts">
import 'dayjs/locale/zh-cn'
import { ConfigProvider } from 'ant-design-vue'
import { AppProvider } from '/@/components/Application'
import { useRootSetting } from './hooks/setting/useRootSetting'
import { useTitle } from '/@/hooks/web/useTitle'
import {
  updateHeaderBgColor,
  updateSidebarBgColor,
} from '/@/logics/theme/updateBackground'
import { updateDarkTheme } from '/@/logics/theme/dark'
import { useLocale } from '/@/locales/useLocale'
import { ThemeEnum } from './enums/appEnum'

const { getAntdLocale } = useLocale()
useTitle()
const { setDarkMode } = useRootSetting()
const lightMedia = window.matchMedia('(prefers-color-scheme: light)')
const darkMedia = window.matchMedia('(prefers-color-scheme: dark)')
if (
  typeof darkMedia.addEventListener === 'function'
    || typeof lightMedia.addEventListener === 'function'
) {
  lightMedia.addEventListener('change', e => {
    if (e.matches) {
      setDarkMode(ThemeEnum.LIGHT)
      updateDarkTheme(ThemeEnum.LIGHT)
      updateHeaderBgColor()
      updateSidebarBgColor()
    }
  })
  darkMedia.addEventListener('change', e => {
    if (e.matches) {
      setDarkMode(ThemeEnum.DARK)
      updateDarkTheme(ThemeEnum.DARK)
      updateHeaderBgColor()
      updateSidebarBgColor()
    }
  })
}
</script>

<template>
  <ConfigProvider :locale="getAntdLocale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>
