<script lang="ts">
import type { PropType } from 'vue'
import type { RouteLocationNormalized } from 'vue-router'
import type { TabContentProps } from '../types'

import { computed, defineComponent, unref } from 'vue'
import { Dropdown } from '/@/components/Dropdown/index'
import { Icon } from '/@/components/Icon'

import { useDesign } from '/@/hooks/web/useDesign'
import { useI18n } from '/@/hooks/web/useI18n'
import { useTabDropdown } from '../useTabDropdown'

export default defineComponent({
  name: 'TabContent',
  components: { Dropdown, Icon },
  props: {
    tabItem: {
      type: Object as PropType<RouteLocationNormalized>,
      default: null,
    },
    isExtra: Boolean,
  },
  setup(props) {
    const { prefixCls } = useDesign('multiple-tabs-content')
    const { t } = useI18n()

    const getTitle = computed(() => {
      const { tabItem: { meta } = {} } = props
      return meta && t(meta.title as string)
    })

    const getIsTabs = computed(() => !props.isExtra)

    const getTrigger = computed((): ('contextmenu' | 'click' | 'hover')[] =>
      unref(getIsTabs) ? ['contextmenu'] : ['click'],
    )

    const { getDropMenuList, handleMenuEvent, handleContextMenu } = useTabDropdown(
      props as TabContentProps,
      getIsTabs,
    )

    function handleContext(e) {
      props.tabItem && handleContextMenu(props.tabItem)(e)
    }

    return {
      prefixCls,
      getDropMenuList,
      handleMenuEvent,
      handleContext,
      getTrigger,
      getIsTabs,
      getTitle,
    }
  },
})
</script>

<template>
  <Dropdown :drop-menu-list="getDropMenuList" :trigger="getTrigger" @menu-event="handleMenuEvent">
    <div v-if="getIsTabs" :class="`${prefixCls}__info`" @contextmenu="handleContext">
      <span class="ml-1">{{ getTitle }}</span>
    </div>
    <span v-else :class="`${prefixCls}__extra-quick`" @click="handleContext">
      <Icon icon="ion:ios-arrow-down" />
    </span>
  </Dropdown>
</template>
