<script lang="ts">
  export default {
    inheritAttrs: false,
  };
</script>
<script lang="ts" setup>
  import { ref, toRefs } from 'vue';
  import { createAppProviderContext } from './useAppContext';
  // import { createBreakpointListen } from '/@/hooks/event/useBreakpoint';
  import { prefixCls as defaultValue } from '/@/settings/designSetting';

  interface Props {
    prefixCls?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    prefixCls: defaultValue,
  });
  const isMobile = ref(false);
  const { prefixCls } = toRefs(props);
  createAppProviderContext({ prefixCls, isMobile });
  // createBreakpointListen(({ screenMap, sizeEnum, width }) => {
  //   const lgWidth = screenMap.get(sizeEnum.LG);
  //   if (lgWidth) {
  //     isMobile.value = width.value - 1 < lgWidth;
  //   }
  // });
</script>

<template>
  <slot></slot>
</template>
