<script lang="ts">
import { defineComponent } from 'vue';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons-vue';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';

export default defineComponent({
  name: 'SiderTrigger',
  components: { DoubleRightOutlined, DoubleLeftOutlined },
  setup() {
    const { getCollapsed, toggleCollapsed } = useMenuSetting();

    return { getCollapsed, toggleCollapsed };
  },
});
</script>

<template>
  <div @click.stop="toggleCollapsed">
    <DoubleRightOutlined v-if="getCollapsed" />
    <DoubleLeftOutlined v-else />
  </div>
</template>
