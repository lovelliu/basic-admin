<script setup lang="ts">
  import { ConfigProvider } from 'ant-design-vue';
  import { AppProvider } from '/@/components/Application';
  import { useRootSetting } from './hooks/setting/useRootSetting';
  import { useTitle } from '/@/hooks/web/useTitle';
  import { updateHeaderBgColor, updateSidebarBgColor } from '/@/logics/theme/updateBackground';
  import { updateDarkTheme } from '/@/logics/theme/dark';
  import { useLocale } from '/@/locales/useLocale';
  import 'dayjs/locale/zh-cn';
  import { ThemeEnum } from './enums/appEnum';

  const { getAntdLocale } = useLocale();
  useTitle();
  const { setDarkMode } = useRootSetting();
  if (window.matchMedia('(prefers-color-scheme: dark)')) {
    setDarkMode(ThemeEnum.DARK);
    updateDarkTheme(ThemeEnum.DARK);
    updateHeaderBgColor();
    updateSidebarBgColor();
  } else {
    setDarkMode(ThemeEnum.LIGHT);
    updateDarkTheme(ThemeEnum.LIGHT);
    updateHeaderBgColor();
    updateSidebarBgColor();
  }
</script>
<template>
  <ConfigProvider :locale="getAntdLocale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>
