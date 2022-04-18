<script lang="ts">
  export default {
    inheritAttrs: false,
  };
</script>
<script lang="ts" setup>
  import { ref, toRefs, unref } from 'vue';
  import { createAppProviderContext } from './useAppContext';
  import { useAppStore } from '/@/store/modules/app';
  import { createBreakpointListen } from '/@/hooks/event/useBreakpoint';
  import { prefixCls as defaultValue } from '/@/settings/designSetting';
  import { MenuModeEnum, MenuTypeEnum } from '/@/enums/menuEnum';

  interface Props {
    prefixCls?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    prefixCls: defaultValue,
  });
  const isSetState = ref(false);

  const appStore = useAppStore();
  const isMobile = ref(false);
  const { prefixCls } = toRefs(props);
  createAppProviderContext({ prefixCls, isMobile });
  createBreakpointListen(({ screenMap, sizeEnum, width }) => {
    const lgWidth = screenMap.get(sizeEnum.LG);
    if (lgWidth) {
      isMobile.value = width.value - 1 < lgWidth;
    }
    handleRestoreState();
  });
  function handleRestoreState() {
    if (unref(isMobile)) {
      if (!unref(isSetState)) {
        isSetState.value = true;
        const {
          menuSetting: {
            type: menuType,
            mode: menuMode,
            collapsed: menuCollapsed,
            split: menuSplit,
          },
        } = appStore.getProjectConfig;
        appStore.setProjectConfig({
          menuSetting: {
            type: MenuTypeEnum.SIDEBAR,
            mode: MenuModeEnum.INLINE,
            split: false,
          },
        });
        appStore.setBeforeMiniInfo({ menuMode, menuCollapsed, menuType, menuSplit });
      }
    } else {
      if (unref(isSetState)) {
        isSetState.value = false;
        const { menuMode, menuCollapsed, menuType, menuSplit } =
          appStore.getBeforeMiniInfo;
        appStore.setProjectConfig({
          menuSetting: {
            type: menuType,
            mode: menuMode,
            collapsed: menuCollapsed,
            split: menuSplit,
          },
        });
      }
    }
  }
</script>

<template>
  <slot></slot>
</template>
