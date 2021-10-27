<script setup lang="ts">
  import { AppProvider } from './components/Application';
  import { Button } from 'ant-design-vue';
  import { nextTick, ref } from 'vue';
  import Icon from './components/Icon/src/Icon.vue';
  const message = ref('hello');
  const changeMessage = async (newMessage) => {
    message.value = newMessage;
    await nextTick();
    console.log('change');
  };
</script>
<template>
  <AppProvider class="ok">
    <div class="text-gray-500">{{ message }}</div
    ><Button type="primary" @click="changeMessage('world')">按 钮</Button>
    <!-- <SvgIcon size="30" name="moon" /> -->
    <Icon icon="ion:language" />
  </AppProvider>
</template>

<style lang="less" scoped></style>
