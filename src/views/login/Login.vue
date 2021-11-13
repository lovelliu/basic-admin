<template>
  <div :class="prefixCls" class="relative w-full h-full px-4">
    <AppLocalePicker
      class="absolute text-white top-4 right-4 enter-x xl:text-gray-600"
      :showText="false"
      v-if="!sessionTimeout && showLocale"
    />
    <AppDarkModeToggle class="absolute top-3 right-7 enter-x" v-if="!sessionTimeout" />

    <span class="-enter-x xl:hidden">
      <AppLogo :alwaysShowTitle="false" />
    </span>
    <div></div>
  </div>
</template>

<script lang="ts" setup>
  // import { computed } from 'vue';
  import { AppLogo } from '/@/components/Application';
  import { AppLocalePicker, AppDarkModeToggle } from '/@/components/Application';
  // import { useGlobSetting } from '/@/hooks/setting';
  import { useDesign } from '/@/hooks/web/useDesign';
  // import { useI18n } from '/@/hooks/web/useI18n';
  import { useLocaleStore } from '/@/store/modules/locale';

  defineProps({
    sessionTimeout: {
      type: Boolean,
    },
  });

  // const globSetting = useGlobSetting();
  const { prefixCls } = useDesign('login');
  // const { t } = useI18n;
  const localStore = useLocaleStore();
  const showLocale = localStore.getShowPicker;
  // const title = computed(() => globSetting?.title ?? '');
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-login';
  @logo-prefix-cls: ~'@{namespace}-app-logo';
  @countdown-prefix-cls: ~'@{namespace}-countdown-input';

  .@{prefix-cls} {
    min-height: 100%;
    overflow: hidden;
    @media (max-width: @screen-xl) {
      background-color: #293146;

      .@{prefix-cls}-form {
        background-color: #fff;
      }
    }

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin-left: -48%;
      background-image: url(/@/assets/svg/login-bg.svg);
      background-position: 100%;
      background-repeat: no-repeat;
      background-size: auto 100%;
      content: '';
      @media (max-width: @screen-xl) {
        display: none;
      }
    }

    .@{logo-prefix-cls} {
      position: absolute;
      top: 12px;
      height: 30px;

      &__title {
        font-size: 16px;
        color: #fff;
      }

      img {
        width: 32px;
      }
    }
  }
</style>
