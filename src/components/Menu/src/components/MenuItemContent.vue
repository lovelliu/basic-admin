<script lang="ts" setup>
import { computed } from 'vue'
import Icon from '@/components/Icon'
import { useI18n } from '@/hooks/web/useI18n'
import { useDesign } from '@/hooks/web/useDesign'
import { contentProps } from '../props'

const props = defineProps(contentProps)
const { t } = useI18n()
const { prefixCls } = useDesign('basic-menu-item-content')
const getI18nName = computed(() => t(props.item?.name))
const getIcon = computed(() => props.item?.icon)
</script>

<template>
  <span :class="`${prefixCls}- flex item-center`">
    <Icon v-if="getIcon" :icon="getIcon" :size="18" :class="`${prefixCls}-wrapper__icon mr-2`" />
    {{ getI18nName }}
  </span>
</template>
