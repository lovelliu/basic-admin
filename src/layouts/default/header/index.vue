<script lang="ts">
import { computed, defineComponent, unref } from 'vue'

import { Layout } from 'ant-design-vue'
import { propTypes } from '@/utils/propTypes'
import { AppLocalePicker, AppLogo } from '@/components/Application'

// import { AppSearch } from '@/components/Application';

import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useRootSetting } from '@/hooks/setting/useRootSetting'

import { MenuModeEnum, MenuSplitTypeEnum } from '@/enums/menuEnum'
import { SettingButtonPositionEnum } from '@/enums/appEnum'

// import { UserDropDown, LayoutBreadcrumb, FullScreen, Notify, ErrorAction } from './components';
import { useAppInject } from '@/hooks/web/useAppInject'
import { useDesign } from '@/hooks/web/useDesign'

import { createAsyncComponent } from '@/utils/factory/createAsyncComponent'
import { useLocale } from '@/locales/useLocale'
import LayoutTrigger from '../trigger/index.vue'
import LayoutMenu from '../menu/index.vue'
import { LayoutBreadcrumb, UserDropDown } from './components'

export default defineComponent({
  name: 'LayoutHeader',
  components: {
    Header: Layout.Header,
    AppLogo,
    LayoutTrigger,
    LayoutBreadcrumb,
    LayoutMenu,
    UserDropDown,
    AppLocalePicker,
    // FullScreen,
    // Notify,
    // AppSearch,
    // ErrorAction,
    SettingDrawer: createAsyncComponent(
      () => import('@/layouts/default/setting/index.vue'),
      {
        loading: true,
      },
    ),
  },
  props: {
    fixed: propTypes.bool,
  },
  setup(props) {
    const { prefixCls } = useDesign('layout-header')
    const {
      getShowTopMenu,
      getShowHeaderTrigger,
      getSplit,
      getIsMixMode,
      getMenuWidth,
      getIsMixSidebar,
    } = useMenuSetting()
    const { getUseErrorHandle, getShowSettingButton, getSettingButtonPosition }
        = useRootSetting()

    const {
      getHeaderTheme,
      getShowFullScreen,
      getShowNotice,
      getShowContent,
      getShowBread,
      getShowHeaderLogo,
      getShowHeader,
      getShowSearch,
    } = useHeaderSetting()

    const { getShowLocalePicker } = useLocale()

    const { getIsMobile } = useAppInject()

    const getHeaderClass = computed(() => {
      const theme = unref(getHeaderTheme)
      return [
        prefixCls,
        {
          [`${prefixCls}--fixed`]: props.fixed,
          [`${prefixCls}--mobile`]: unref(getIsMobile),
          [`${prefixCls}--${theme}`]: theme,
        },
      ]
    })

    const getShowSetting = computed(() => {
      if (!unref(getShowSettingButton))
        return false

      const settingButtonPosition = unref(getSettingButtonPosition)

      if (settingButtonPosition === SettingButtonPositionEnum.AUTO)
        return unref(getShowHeader)

      return settingButtonPosition === SettingButtonPositionEnum.HEADER
    })

    const getLogoWidth = computed(() => {
      if (!unref(getIsMixMode) || unref(getIsMobile))
        return {}

      const width = unref(getMenuWidth) < 180 ? 180 : unref(getMenuWidth)
      return { width: `${width}px` }
    })

    const getSplitType = computed(() => {
      return unref(getSplit) ? MenuSplitTypeEnum.TOP : MenuSplitTypeEnum.NONE
    })

    const getMenuMode = computed(() => {
      return unref(getSplit) ? MenuModeEnum.HORIZONTAL : null
    })

    return {
      prefixCls,
      getHeaderClass,
      getShowHeaderLogo,
      getHeaderTheme,
      getShowHeaderTrigger,
      getIsMobile,
      getShowBread,
      getShowContent,
      getSplitType,
      getSplit,
      getMenuMode,
      getShowTopMenu,
      getShowLocalePicker,
      getShowFullScreen,
      getShowNotice,
      getUseErrorHandle,
      getLogoWidth,
      getIsMixSidebar,
      getShowSettingButton,
      getShowSetting,
      getShowSearch,
    }
  },
})
</script>

<template>
  <Header :class="getHeaderClass">
    <!-- left start -->
    <div :class="`${prefixCls}-left`">
      <!-- logo -->
      <AppLogo
        v-if="getShowHeaderLogo || getIsMobile"
        :class="`${prefixCls}-logo`"
        :theme="getHeaderTheme"
        :style="getLogoWidth"
      />
      <LayoutTrigger
        v-if="
          (getShowContent && getShowHeaderTrigger && !getSplit && !getIsMixSidebar)
            || getIsMobile
        "
        :theme="getHeaderTheme"
        :sider="false"
      />
      <LayoutBreadcrumb v-if="getShowContent && getShowBread" :theme="getHeaderTheme" />
    </div>
    <!-- left end -->

    <!-- menu start -->
    <div v-if="getShowTopMenu && !getIsMobile" :class="`${prefixCls}-menu`">
      <LayoutMenu
        :is-horizontal="true"
        :theme="getHeaderTheme"
        :split-type="getSplitType"
        :menu-mode="getMenuMode"
      />
    </div>
    <!-- menu-end -->

    <!-- action  -->
    <div :class="`${prefixCls}-action`">
      <!-- <AppSearch :class="`${prefixCls}-action__item `" v-if="getShowSearch" /> -->

      <!-- <ErrorAction v-if="getUseErrorHandle" :class="`${prefixCls}-action__item error-action`" />

      <Notify v-if="getShowNotice" :class="`${prefixCls}-action__item notify-item`" />

      <FullScreen v-if="getShowFullScreen" :class="`${prefixCls}-action__item fullscreen-item`" /> -->

      <AppLocalePicker
        v-if="getShowLocalePicker"
        :reload="true"
        :show-text="false"
        :class="`${prefixCls}-action__item`"
      />

      <UserDropDown :theme="getHeaderTheme" />

      <SettingDrawer v-if="getShowSetting" :class="`${prefixCls}-action__item`" />
    </div>
  </Header>
</template>

<style lang="less">
  @import './index.less';
</style>
