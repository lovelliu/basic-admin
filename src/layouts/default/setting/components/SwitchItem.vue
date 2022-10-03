<script lang="ts">
// @ts-nocheck
import type { PropType } from 'vue'
import type { HandlerEnum } from '../enum'
import { computed, defineComponent } from 'vue'

import { Switch } from 'ant-design-vue'
import { useDesign } from '/@/hooks/web/useDesign'
import { useI18n } from '/@/hooks/web/useI18n'
import { baseHandler } from '../handler'

export default defineComponent({
  name: 'SwitchItem',
  components: { Switch },
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
      type: Boolean,
    },
  },
  setup(props) {
    const { prefixCls } = useDesign('setting-switch-item')
    const { t } = useI18n()

    const getBindValue = computed(() => {
      return props.def ? { checked: props.def } : {}
    })
    function handleChange(e: ChangeEvent) {
      props.event && baseHandler(props.event, e)
    }
    return {
      prefixCls,
      t,
      handleChange,
      getBindValue,
    }
  },
})
</script>

<template>
  <div :class="prefixCls">
    <span> {{ title }}</span>
    <Switch
      v-bind="getBindValue"
      :disabled="disabled"
      :checked-children="t('layout.setting.on')"
      :un-checked-children="t('layout.setting.off')"
      @change="handleChange"
    />
  </div>
</template>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-setting-switch-item';

  .@{prefix-cls} {
    display: flex;
    justify-content: space-between;
    margin: 16px 0;
  }
</style>
