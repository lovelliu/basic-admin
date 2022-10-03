<script lang="ts" setup>
import { ref } from 'vue'
import GrowCardVue from './components/GrowCard.vue'
import SiteAnalysis from './components/SiteAnalysis.vue'
import VisitRadar from './components/VisitRadar.vue'
import VisitSource from './components/VisitSource.vue'
import SalesProductPie from './components/SalesProductPie.vue'

const loading = ref(true)
setTimeout(() => {
  loading.value = false
}, 1500)
</script>

<template>
  <div class="p-4">
    <GrowCardVue :loading="loading" class="enter-y" />
    <SiteAnalysis class="!my-4 entry-y" :loading="loading" />
    <div class="md:flex entry-y">
      <VisitRadar class="md:w-1/3 w-full" :loading="loading" />
      <VisitSource class="md:w-1/3 !md:mx-4 !md:my-0 !my-4 w-full" :loading="loading" />
      <SalesProductPie class="md:w-1/3 w-full" :loading="loading" />
    </div>
  </div>
</template>
