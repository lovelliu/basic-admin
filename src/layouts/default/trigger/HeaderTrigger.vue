<script lang="ts">
import { defineComponent } from 'vue';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { useDesign } from '/@/hooks/web/useDesign';
import { propTypes } from '/@/utils/propTypes';

export default defineComponent({
  name: 'HeaderTrigger',
  components: { MenuUnfoldOutlined, MenuFoldOutlined },
  props: {
    theme: propTypes.oneOf(['light', 'dark']),
  },
  setup() {
    const { getCollapsed, toggleCollapsed } = useMenuSetting();
    const { prefixCls } = useDesign('layout-header-trigger');
    return { getCollapsed, toggleCollapsed, prefixCls };
  },
});
</script>

<template>
  <span :class="[prefixCls, theme]" @click="toggleCollapsed">
    <MenuUnfoldOutlined v-if="getCollapsed" /> <MenuFoldOutlined v-else />
  </span>
</template>
