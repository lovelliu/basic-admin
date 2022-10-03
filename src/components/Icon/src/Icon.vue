<script lang="ts" setup>
import type { CSSProperties } from 'vue'

import { computed } from 'vue'
import SvgIcon from './SvgIcon.vue'
import { isString } from '/@/utils/is'

interface Props {
  icon: string
  color?: string
  size?: number | string
  spin?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 16,
  spin: false,
})

const SVG_END_WITH_FLAG = '|svg'

const isSvgIcon = computed(() => props.icon?.endsWith(SVG_END_WITH_FLAG))
const getSvgIcon = computed(() => props.icon.replace(SVG_END_WITH_FLAG, ''))

const getWrapStyle = computed((): CSSProperties => {
  const { size, color } = props
  let fs = size
  if (isString(size))
    fs = parseInt(size, 10)

  return {
    fontSize: `${fs}px`,
    color,
    display: 'inline-flex',
  }
})
</script>

<template>
  <SvgIcon
    v-if="isSvgIcon"
    :size="size"
    :name="getSvgIcon"
    class="action" :class="[$attrs.class]"
    :spin="spin"
  />
  <span
    v-else
    class="app-iconify anticon" :class="$attrs.class"
    :style="getWrapStyle"
  >
    <span :class="[`i-${props.icon}`, spin && 'app-iconify-spin']" />
  </span>
</template>

<style lang="less" scoped>
  .app-iconify {
    display: inline-block;

    &-spin {
      animation: loadingCircle 1s infinite linear;
    }
  }
</style>

