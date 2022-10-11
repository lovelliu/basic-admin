<script lang="ts" setup>
import { Card, CardGrid } from 'ant-design-vue'
import { Icon } from '@/components/Icon'
import { navItems } from './data'
</script>

<template>
  <Card title="快捷导航" v-bind="$attrs">
    <CardGrid v-for="item in navItems" :key="item.icon">
      <span class="flex flex-col items-center">
        <Icon :icon="item.icon" :color="item.color" size="20" />
        <span class="mt-2 truncate">{{ item.title }}</span>
      </span>
    </CardGrid>
  </Card>
</template>
