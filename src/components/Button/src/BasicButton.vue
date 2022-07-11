<script lang="ts" setup>
/* eslint-disable import/no-duplicates */
import { computed, unref } from 'vue';
import { Button } from 'ant-design-vue';
import Icon from '/@/components/Icon/src/Icon.vue';
import { buttonProps } from './props';
import { useAttrs } from '/@/hooks/core/useAttrs';
const props = defineProps(buttonProps);

// get component class
const attrs = useAttrs({ excludeDefaultKeys: false });
const getButtonClass = computed(() => {
  const { color, disabled } = props;
  return [
    {
      [`ant-btn-${color}`]: !!color,
      'is-disabled': disabled,
    },
  ];
});

// get inherit binding value
const getBindValue = computed(() => ({ ...unref(attrs), ...props }));
</script>

<script lang="ts">
import { defineComponent } from 'vue'; // eslint-disable-line import/order, import/first
export default defineComponent({
  name: 'AButton',
  inheritAttrs: false,
});
</script>

<template>
  <Button v-bind="getBindValue" :class="getButtonClass" @click="onClick">
    <template #default="data">
      <Icon v-if="preIcon" :icon="preIcon" :size="iconSize" />
      <slot v-bind="data || {}" />
      <Icon v-if="postIcon" :icon="postIcon" :size="iconSize" />
    </template>
  </Button>
</template>
