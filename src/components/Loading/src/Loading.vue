<script lang="ts" setup>
import { Spin } from 'ant-design-vue'
import { SizeEnum } from '/@/enums/sizeEnum'

interface Props {
  tip?: string
  size?: SizeEnum
  absolute?: boolean
  loading?: boolean
  background?: string
  theme?: 'light' | 'dark'
}

withDefaults(defineProps<Props>(), {
  tip: '',
  size: SizeEnum.LARGE,
  absolute: false,
  loading: false,
  theme: 'light',
})
</script>

<template>
  <section
    v-show="loading"
    class="full-loading"
    :class="{ absolute, [theme]: !!theme }"
    :style="[background ? `background-color: ${background}` : '']"
  >
    <Spin v-bind="$attrs" :tip="tip" :size="size" :spinning="loading" />
  </section>
</template>

<style lang="less" scoped>
  .full-loading {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: rgb(240 242 245 / 40%);

    &.absolute {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 300;
    }
  }

  html[data-theme='dark'] {
    .full-loading:not(.light) {
      background-color: @modal-mask-bg;
    }
  }

  .full-loading.dark {
    background-color: @modal-mask-bg;
  }
</style>
