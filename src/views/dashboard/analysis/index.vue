<script lang="ts" setup>
  import { ref } from 'vue';
  import GrowCardVue from './components/GrowCard.vue';

  const loading = ref(true);
  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>

<template>
  <div class="p-4">
    <GrowCardVue :loading="loading" class="enter-y" />
  </div>
</template>
