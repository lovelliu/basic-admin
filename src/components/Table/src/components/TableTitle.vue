<script lang="ts">
import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'
import { BasicTitle } from '@/components/Basic/index'
import { useDesign } from '@/hooks/web/useDesign'
import { isFunction } from '@/utils/is'

export default defineComponent({
  name: 'BasicTableTitle',
  components: { BasicTitle },
  props: {
    title: {
      type: [Function, String] as PropType<string | ((data: Recordable) => string)>,
    },
    getSelectRows: {
      type: Function as PropType<() => Recordable[]>,
    },
    helpMessage: {
      type: [String, Array] as PropType<string | string[]>,
    },
  },
  setup(props) {
    const { prefixCls } = useDesign('basic-table-title')

    const getTitle = computed(() => {
      const { title, getSelectRows = () => {} } = props
      let tit = title

      if (isFunction(title)) {
        tit = title({
          selectRows: getSelectRows(),
        })
      }
      return tit
    })

    return { getTitle, prefixCls }
  },
})
</script>

<template>
  <BasicTitle v-if="getTitle" :class="prefixCls" :help-message="helpMessage">
    {{ getTitle }}
  </BasicTitle>
</template>

<style lang="less">
  @prefix-cls: ~'@{namespace}-basic-table-title';

  .@{prefix-cls} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
