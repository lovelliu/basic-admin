<script lang="ts" setup>
import { Card, Tag } from 'ant-design-vue'
import { Icon } from '@/components/Icon'
import { CountTo } from '@/components/CountTo'
import { growCardList } from '../data'

defineProps({
  loading: {
    type: Boolean,
  },
})
</script>

<template>
  <div class="md:flex">
    <template v-for="(item, index) in growCardList" :key="item.title">
      <Card
        size="small"
        :loading="loading"
        :title="item.title"
        class="md:w-1/4 w-full !md:mt-0 !mt-4"
        :class="[index + 1 < 4 && '!mr-4']"
      >
        <template #extra>
          <Tag :color="item.color">
            {{ item.action }}
          </Tag>
        </template>

        <div class="p-4 flex justify-between items-center">
          <CountTo prefix="$" :start-val="1" :end-val="item.value" class="text-2xl" />
          <Icon :icon="item.icon" :size="40" />
        </div>

        <div class="p-2 px-4 flex justify-between">
          <span>总{{ item.title }}</span>
          <CountTo prefix="$" :start-val="1" :end-val="item.total" />
        </div>
      </Card>
    </template>
  </div>
</template>
