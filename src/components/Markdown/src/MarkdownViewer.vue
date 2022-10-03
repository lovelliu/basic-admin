<script lang="ts" setup>
import { computed } from 'vue'
import showdown from 'showdown'

const props = defineProps({
  value: { type: String },
  class: { type: String },
})
const converter = new showdown.Converter()
converter.setOption('tables', true)
const getHtmlData = computed(() => converter.makeHtml(props.value || ''))
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <div :class="$props.class" class="markdown-viewer" v-html="getHtmlData" />
</template>

<style lang="less" scoped>
  .markdown-viewer {
    width: 100%;
  }
</style>
