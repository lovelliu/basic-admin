<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '@/components/Icon'

import { useDrawer } from '@/components/Drawer'
import SettingDrawer from './SettingDrawer'

export default defineComponent({
  name: 'SettingButton',
  components: { SettingDrawer, Icon },
  setup() {
    const [register, { openDrawer }] = useDrawer()

    return {
      register,
      openDrawer,
    }
  },
})
</script>

<template>
  <div @click="openDrawer(true)">
    <Icon icon="ion:settings-outline" />
    <SettingDrawer @register="register" />
  </div>
</template>
