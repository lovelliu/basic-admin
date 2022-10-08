<script lang="ts" setup>
import type { CSSProperties } from 'vue'

import { computed } from 'vue'
import { useDesign } from '@/hooks/web/useDesign'

interface Props {
  prefix?: string
  name: string
  size?: number | string
  spin?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  prefix: 'icon',
  size: 16,
  spin: false,
})

const { prefixCls } = useDesign('svg-icon')
const symbolId = computed(() => `#${props.prefix}-${props.name}`)

const getStyle = computed((): CSSProperties => {
  const { size } = props
  let s = `${size}`
  s = `${s.replace('px', '')}px`
  return {
    width: s,
    height: s,
  }
})
</script>

<template>
  <svg
    :class="[prefixCls, spin && 'svg-icon-spin']"
    :style="getStyle"
    aria-hidden="true"
  >
    <use :href="symbolId" />
  </svg>
</template>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-svg-icon';
  .@{prefix-cls} {
    display: inline-block;
    overflow: hidden;
    vertical-align: -0.15em;
    fill: currentColor;
  }
  .svg-icon-spin {
    animation: loadingCircle 1s infinite linear;
  }
</style>
