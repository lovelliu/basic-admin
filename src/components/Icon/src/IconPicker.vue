<script lang="ts" setup>
import { ref, unref, watch, watchEffect } from 'vue'
import { Empty, Input, Pagination, Popover } from 'ant-design-vue'
import { useDebounceFn } from '@vueuse/core'
import svgIcons from 'virtual:svg-icons-names'
import { ScrollContainer } from '@/components/Container'
import { useDesign } from '@/hooks/web/useDesign'
import { usePagination } from '@/hooks/web/usePagination'
import { useI18n } from '@/hooks/web/useI18n'
import { useCopyToClipboard } from '@/hooks/web/useCopyToClipboard'
import { useMessage } from '@/hooks/web/useMessage'
import iconsData from '../data/icons.data'
import SvgIcon from './SvgIcon.vue'
import Icon from './Icon.vue'

interface Props {
  value: string
  width: string
  pageSize: number
  copy: boolean
  mode: 'svg' | 'iconify'
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  pageSize: 140,
  copy: false,
  mode: 'iconify',
})

const emit = defineEmits(['change', 'update:value'])

const AInput = Input
const APopover = Popover
const APagination = Pagination
const AEmpty = Empty

function getIcons() {
  const data = iconsData
  const prefix: string = data?.prefix ?? ''
  let result: string[] = []
  if (prefix)
    result = (data?.icons ?? []).map(item => `${prefix}:${item}`)
  else if (Array.isArray(iconsData))
    result = iconsData as string[]

  return result
}

function getSvgIcons() {
  return svgIcons.map(icon => icon.replace('icon-', ''))
}

const isSvgMode = props.mode === 'svg'
const icons = isSvgMode ? getSvgIcons() : getIcons()

const currentSelect = ref('')
const visible = ref(false)
const currentList = ref(icons)

const { t } = useI18n()
const { prefixCls } = useDesign('icon-picker')

const debounceHandleSearchChange = useDebounceFn(handleSearchChange, 100)
const { clipboardRef, isSuccessRef } = useCopyToClipboard(props.value)
const { createMessage } = useMessage()

const { getPaginationList, getTotal, setCurrentPage } = usePagination(
  currentList,
  props.pageSize,
)

watchEffect(() => {
  currentSelect.value = props.value
})

watch(
  () => currentSelect.value,
  v => {
    emit('update:value', v)
    return emit('change', v)
  },
)

function handlePageChange(page: number) {
  setCurrentPage(page)
}

function handleClick(icon: string) {
  currentSelect.value = icon
  if (props.copy) {
    clipboardRef.value = icon
    if (unref(isSuccessRef))
      createMessage.success(t('component.icon.copy'))
  }
}

function handleSearchChange(e: ChangeEvent) {
  const value = e.target.value
  if (!value) {
    setCurrentPage(1)
    currentList.value = icons
    return
  }
  currentList.value = icons.filter(item => item.includes(value))
}
</script>

<template>
  <AInput
    v-model:value="currentSelect"
    disabled
    :style="{ width }"
    :placeholder="t('component.icon.placeholder')"
    :class="prefixCls"
  >
    <template #addonAfter>
      <APopover
        v-model="visible"
        placement="bottomLeft"
        trigger="click"
        :overlay-class-name="`${prefixCls}-popover`"
      >
        <template #title>
          <div class="flex justify-between">
            <AInput
              :placeholder="t('component.icon.search')"
              allow-clear
              @change="debounceHandleSearchChange"
            />
          </div>
        </template>

        <template #content>
          <div v-if="getPaginationList.length">
            <ScrollContainer class="border border-solid border-t-0">
              <ul class="flex flex-wrap px-2">
                <li
                  v-for="icon in getPaginationList"
                  :key="icon"
                  :class="currentSelect === icon ? 'border border-primary' : ''"
                  class="
                    p-2
                    w-1/8
                    cursor-pointer
                    mr-1
                    mt-1
                    flex
                    justify-center
                    items-center
                    border border-solid
                    hover:border-primary
                  "
                  :title="icon"
                  @click="handleClick(icon)"
                >
                  <!-- <Icon :icon="icon" :prefix="prefix" /> -->
                  <SvgIcon v-if="isSvgMode" :name="icon" />
                  <Icon v-else :icon="icon" />
                </li>
              </ul>
            </ScrollContainer>
            <div v-if="getTotal >= pageSize" class="flex py-2 items-center justify-center">
              <APagination
                show-less-items
                size="small"
                :page-size="pageSize"
                :total="getTotal"
                @change="handlePageChange"
              />
            </div>
          </div>
          <template v-else>
            <div class="p-5">
              <AEmpty />
            </div>
          </template>
        </template>

        <span v-if="isSvgMode && currentSelect" class="cursor-pointer px-2 py-1 flex items-center">
          <SvgIcon :name="currentSelect" />
        </span>
        <Icon v-else :icon="currentSelect || 'ion:apps-outline'" class="cursor-pointer px-2 py-1" />
      </APopover>
    </template>
  </AInput>
</template>

<style lang="less">
  @prefix-cls: ~'@{namespace}-icon-picker';

  .@{prefix-cls} {
    .ant-input-group-addon {
      padding: 0;
    }

    &-popover {
      width: 300px;

      .ant-popover-inner-content {
        padding: 0;
      }

      .scrollbar {
        height: 220px;
      }
    }
  }
</style>
