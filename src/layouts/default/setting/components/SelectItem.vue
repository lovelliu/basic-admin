<script lang="ts">
// @ts-nocheck
import type { PropType } from 'vue'
import type { HandlerEnum } from '../enum'
import { computed, defineComponent } from 'vue'

import { Select } from 'ant-design-vue'
import { useDesign } from '@/hooks/web/useDesign'
import { baseHandler } from '../handler'

export default defineComponent({
  name: 'SelectItem',
  components: { Select },
  props: {
    event: {
      type: Number as PropType<HandlerEnum>,
    },
    disabled: {
      type: Boolean,
    },
    title: {
      type: String,
    },
    def: {
      type: [String, Number] as PropType<string | number>,
    },
    initValue: {
      type: [String, Number] as PropType<string | number>,
    },
    options: {
      type: Array as PropType<LabelValueOptions>,
      default: () => [],
    },
  },
  setup(props) {
    const { prefixCls } = useDesign('setting-select-item')
    const getBindValue = computed(() => {
      return props.def ? { value: props.def, defaultValue: props.initValue || props.def } : {}
    })

    function handleChange(e: ChangeEvent) {
      props.event && baseHandler(props.event, e)
    }
    return {
      prefixCls,
      handleChange,
      getBindValue,
    }
  },
})
</script>

<template>
  <div :class="prefixCls">
    <span> {{ title }}</span>
    <Select
      v-bind="getBindValue"
      :class="`${prefixCls}-select`"
      :disabled="disabled"
      size="small"
      :options="options"
      @change="handleChange"
    />
  </div>
</template>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-setting-select-item';

  .@{prefix-cls} {
    display: flex;
    justify-content: space-between;
    margin: 16px 0;

    &-select {
      width: 126px;
    }
  }
</style>
