<script lang="ts">
import type { PropType } from 'vue'
import type { ColumnChangeParam, TableSetting } from '../../types/table'
import { computed, defineComponent, unref } from 'vue'
import { useTableContext } from '../../hooks/useTableContext'
import ColumnSetting from './ColumnSetting.vue'
import SizeSetting from './SizeSetting.vue'
import RedoSetting from './RedoSetting.vue'
import FullScreenSetting from './FullScreenSetting.vue'
import { useI18n } from '/@/hooks/web/useI18n'

export default defineComponent({
  name: 'TableSetting',
  components: {
    ColumnSetting,
    SizeSetting,
    RedoSetting,
    FullScreenSetting,
  },
  props: {
    setting: {
      type: Object as PropType<TableSetting>,
      default: () => ({}),
    },
  },
  emits: ['columnsChange'],
  setup(props, { emit }) {
    const { t } = useI18n()
    const table = useTableContext()

    const getSetting = computed((): TableSetting => {
      return {
        redo: true,
        size: true,
        setting: true,
        fullScreen: false,
        ...props.setting,
      }
    })

    function handleColumnChange(data: ColumnChangeParam[]) {
      emit('columnsChange', data)
    }

    function getTableContainer() {
      return table ? unref(table.wrapRef) : document.body
    }

    return { getSetting, t, handleColumnChange, getTableContainer }
  },
})
</script>

<template>
  <div class="table-settings">
    <RedoSetting v-if="getSetting.redo" :get-popup-container="getTableContainer" />
    <SizeSetting v-if="getSetting.size" :get-popup-container="getTableContainer" />
    <ColumnSetting
      v-if="getSetting.setting"
      :get-popup-container="getTableContainer"
      @columnsChange="handleColumnChange"
    />
    <FullScreenSetting v-if="getSetting.fullScreen" :get-popup-container="getTableContainer" />
  </div>
</template>

<style lang="less">
  .table-settings {
    & > * {
      margin-right: 12px;
    }

    svg {
      width: 1.3em;
      height: 1.3em;
    }
  }
</style>
