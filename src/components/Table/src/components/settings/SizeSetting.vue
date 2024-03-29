<script lang="ts">
// @ts-nocheck
import type { SizeType } from '../../types/table'
import { defineComponent, ref } from 'vue'
import { Dropdown, Menu, Tooltip } from 'ant-design-vue'
import { ColumnHeightOutlined } from '@ant-design/icons-vue'
import { useI18n } from '@/hooks/web/useI18n'
import { getPopupContainer } from '@/utils'
import { useTableContext } from '../../hooks/useTableContext'

export default defineComponent({
  name: 'SizeSetting',
  components: {
    ColumnHeightOutlined,
    Tooltip,
    Dropdown,
    Menu,
    MenuItem: Menu.Item,
  },
  setup() {
    const table = useTableContext()
    const { t } = useI18n()

    const selectedKeysRef = ref<SizeType[]>([table.getSize()])

    function handleTitleClick({ key }: { key: SizeType }) {
      selectedKeysRef.value = [key]
      table.setProps({
        size: key,
      })
    }

    return {
      handleTitleClick,
      selectedKeysRef,
      getPopupContainer,
      t,
    }
  },
})
</script>

<template>
  <Tooltip placement="top">
    <template #title>
      <span>{{ t('component.table.settingDens') }}</span>
    </template>

    <Dropdown placement="bottom" :trigger="['click']" :get-popup-container="getPopupContainer">
      <ColumnHeightOutlined />
      <template #overlay>
        <Menu v-model:selectedKeys="selectedKeysRef" selectable @click="handleTitleClick">
          <MenuItem key="default">
            <span>{{ t('component.table.settingDensDefault') }}</span>
          </MenuItem>
          <MenuItem key="middle">
            <span>{{ t('component.table.settingDensMiddle') }}</span>
          </MenuItem>
          <MenuItem key="small">
            <span>{{ t('component.table.settingDensSmall') }}</span>
          </MenuItem>
        </Menu>
      </template>
    </Dropdown>
  </Tooltip>
</template>
