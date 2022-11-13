<script lang="ts" setup name="PageWrapper">
import type { CSSProperties } from 'vue'

import { computed, provide, ref, unref, useAttrs, useSlots, watch } from 'vue'
import { omit } from 'lodash-es'
import { PageHeader } from 'ant-design-vue'
import { useDesign } from '@/hooks/web/useDesign'
import { useContentHeight } from '@/hooks/web/useContentHeight'
import { PageWrapperFixedHeightKey } from '..'
import PageFooter from './PageFooter.vue'

interface Props {
  title?: string
  dense?: boolean
  ghost?: boolean
  content?: string
  contentStyle?: CSSProperties
  contentBackground?: boolean
  contentFullHeight?: boolean
  contentClass?: string
  fixedHeight?: boolean
  upwardSpace?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  upwardSpace: 0,
})

const wrapperRef = ref(null)
const headerRef = ref(null)
const contentRef = ref(null)
const footerRef = ref(null)

const getIsContentFullHeight = computed(() => props.contentFullHeight)
const getUpwardSpace = computed(() => props.upwardSpace)
const getClass = computed(() => {
  return [
    prefixCls,
    {
      [`${prefixCls}--dense`]: props.dense,
    },
    attrs.class ?? {},
  ]
})
const getShowFooter = computed(() => slots?.leftFooter || slots?.rightFooter)
const getHeaderSlots = computed(() => {
  return Object.keys(omit(slots, 'default', 'leftFooter', 'rightFooter', 'headerContent'))
})
const getContentStyle = computed((): CSSProperties => {
  const { contentFullHeight, contentStyle, fixedHeight } = props
  if (!contentFullHeight)
    return { ...contentStyle }
  const height = `${unref(contentHeight)}px`
  return {
    ...contentStyle,
    minHeight: height,
    ...(fixedHeight ? { height } : {}),
  }
})
const getContentClass = computed(() => {
  const { contentBackground, contentClass } = props
  return [
          `${prefixCls}-content`,
          contentClass,
          {
            [`${prefixCls}-content-bg`]: contentBackground,
          },
  ]
})

const attrs = useAttrs()
const slots = useSlots()
const { prefixCls } = useDesign('page-wrapper')
const { redoHeight, setCompensation, contentHeight } = useContentHeight(
  getIsContentFullHeight,
  wrapperRef,
  [headerRef, footerRef],
  [contentRef],
  getUpwardSpace,
)

provide(PageWrapperFixedHeightKey, computed(() => props.fixedHeight))

setCompensation({ useLayoutFooter: true, elements: [footerRef] })

watch(
  () => [getShowFooter.value],
  () => {
    redoHeight()
  },
  {
    flush: 'post',
    immediate: true,
  },
)
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div ref="wrapperRef" :class="getClass">
    <PageHeader
      v-if="content || $slots.headerContent || title || getHeaderSlots.length"
      v-bind="omit($attrs, 'class')"
      ref="headerRef"
      :ghost="ghost"
      :title="title"
    >
      <template #default>
        <template v-if="content">
          {{ content }}
        </template>
        <slot v-else name="headerContent" />
      </template>
      <template v-for="item in getHeaderSlots" #[item]="data">
        <slot :name="item" v-bind="data || {}" />
      </template>
    </PageHeader>

    <div ref="contentRef" class="overflow-hidden" :class="getContentClass" :style="getContentStyle">
      <slot />
    </div>

    <PageFooter v-if="getShowFooter" ref="footerRef">
      <template #left>
        <slot name="leftFooter" />
      </template>
      <template #right>
        <slot name="rightFooter" />
      </template>
    </PageFooter>
  </div>
</template>

<style lang="less">
  @prefix-cls: ~'@{namespace}-page-wrapper';

  .@{prefix-cls} {
    position: relative;

    .@{prefix-cls}-content {
      margin: 16px;
    }

    .ant-page-header {
      &:empty {
        padding: 0;
      }
    }

    &-content-bg {
      background-color: @component-background;
    }

    &--dense {
      .@{prefix-cls}-content {
        margin: 0;
      }
    }
  }
</style>
