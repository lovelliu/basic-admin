<script lang="ts" setup>
import { Menu } from 'ant-design-vue'
import { itemProps } from '../props'
import MenuItemContent from './MenuItemContent.vue'

defineProps(itemProps)
const MenuItem = Menu.Item
</script>

<template>
  <MenuItem :key="item.path">
    <MenuItemContent v-bind="$props" :item="item" />
  </MenuItem>
</template>
