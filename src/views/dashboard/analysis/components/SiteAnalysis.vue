<script lang="ts" setup>
  import { ref } from 'vue';
  import { Card } from 'ant-design-vue';

  const activeKey = ref('tab1');

  const tabListTitle = [
    {
      key: 'tab1',
      tab: '流量趋势',
    },
    {
      key: 'tab2',
      tab: '访问量',
    },
  ];

  const onTabChange = (key) => {
    activeKey.value = key;
  };
</script>

<template>
  <Card
    :tab-list="tabListTitle"
    v-bind="$attrs"
    :active-tab-key="activeKey"
    @tab-change="onTabChange"
  >
    <p v-if="activeKey === 'tab1'"></p>
    <p v-if="activeKey === 'tab2'"></p>
  </Card>
</template>

<style lang="less" scoped></style>
