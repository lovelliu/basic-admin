<script lang="ts" setup name="AButton">
import { computed, unref } from 'vue'
import { Button } from 'ant-design-vue'
import Icon from '@/components/Icon'
import { useAttrs } from '@/hooks/core/useAttrs'

interface ButtonProps {
  color?: 'error' | 'warning' | 'success' | ''
  loading?: boolean
  disabled?: boolean
  /**
   * Text before icon.
   */
  preIcon?: string
  /**
   * Text after icon.
   */
  postIcon?: string
  /**
   * preIcon and postIcon icon size.
   * @default: 14
   */
  iconSize?: number
  onClick?: (e: MouseEvent) => void
}

const props = withDefaults(defineProps<ButtonProps>(), {
  iconSize: 14,
})

// get component class
const attrs = useAttrs({ excludeDefaultKeys: false })
const getButtonClass = computed(() => {
  const { color, disabled } = props
  return [
    {
      [`ant-btn-${color}`]: !!color,
      'is-disabled': disabled,
    },
  ]
})

// get inherit binding value
const getBindValue = computed(() => ({ ...unref(attrs), ...props }))
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
