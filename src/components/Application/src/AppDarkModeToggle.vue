<script lang="ts" setup>
  import { computed, unref } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  import {
    updateHeaderBgColor,
    updateSidebarBgColor,
  } from '/@/logics/theme/updateBackground';
  import { updateDarkTheme } from '/@/logics/theme/dark';
  import { ThemeEnum } from '/@/enums/appEnum';

  const { prefixCls } = useDesign('dark-switch');
  const { getDarkMode, setDarkMode, getShowDarkModeToggle } = useRootSetting();

  const isDark = computed(() => getDarkMode.value === ThemeEnum.DARK);

  const getClass = computed(() => [prefixCls, { [`${prefixCls}--dark`]: unref(isDark) }]);

  function toggleDarkMode() {
    const darkMode =
      getDarkMode.value === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK;
    setDarkMode(darkMode);
    updateDarkTheme(darkMode);
    updateHeaderBgColor();
    updateSidebarBgColor();
  }
</script>

<template>
  <div v-if="getShowDarkModeToggle" :class="getClass">
    <span class="toggle" @click="toggleDarkMode">
      <span class="toggle-handler">
        <span class="crater crater--1"></span>
        <span class="crater crater--2"></span>
        <span class="crater crater--3"></span>
      </span>
      <span class="star star--1"></span>
      <span class="star star--2"></span>
      <span class="star star--3"></span>
      <span class="star star--4"></span>
      <span class="star star--5"></span>
      <span class="star star--6"></span>
    </span>
  </div>
</template>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-dark-switch';

  .@{prefix-cls} {
    .toggle {
      cursor: pointer;
      display: inline-block;
      position: relative;
      text-align: start;
      width: 55px;
      height: 30px;
      background-color: #83d8ff;
      border-radius: 50px - 6;
      transition: background-color 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);

      .toggle-handler {
        display: inline-block;
        position: relative;
        z-index: 1;
        top: 3px;
        left: 3px;
        width: 30px - 6;
        height: 30px - 6;
        background-color: #ffcf96;
        border-radius: 30px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        transition: all 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
        transform: rotate(-45deg);

        .crater {
          position: absolute;
          background-color: #e8cda5;
          opacity: 0;
          transition: opacity 200ms ease-in-out;
          border-radius: 100%;

          &--1 {
            top: 12px;
            left: 5px;
            width: 2px;
            height: 2px;
          }

          &--2 {
            top: 15px;
            left: 13px;
            width: 3px;
            height: 3px;
          }

          &--3 {
            top: 6px;
            left: 15px;
            width: 4px;
            height: 4px;
          }
        }
      }

      .star {
        position: absolute;
        background-color: #ffffff;
        transition: all 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
        border-radius: 50%;

        &--1 {
          top: 6px;
          left: 18px;
          z-index: 0;
          width: 20px;
          height: 2px;
        }

        &--2 {
          top: 12px;
          left: 16px;
          z-index: 1;
          width: 20px;
          height: 2px;
        }

        &--3 {
          top: 18px;
          left: 25px;
          z-index: 0;
          width: 20px;
          height: 2px;
        }

        &--4,
        &--5,
        &--6 {
          opacity: 0;
          transition: all 300ms 0 cubic-bezier(0.445, 0.05, 0.55, 0.95);
        }

        &--4 {
          top: 10px;
          left: 6px;
          z-index: 0;
          width: 1px;
          height: 1px;
          transform: translate3d(3px, 0, 0);
        }

        &--5 {
          top: 22px;
          left: 7px;
          z-index: 0;
          width: 2px;
          height: 2px;
          transform: translate3d(3px, 0, 0);
        }

        &--6 {
          top: 23px;
          left: 15px;
          z-index: 0;
          width: 1px;
          height: 1px;
          transform: translate3d(3px, 0, 0);
        }
      }
    }

    &--dark {
      .toggle {
        background-color: #749dd6;

        &:before {
          color: #749ed7;
        }

        &:after {
          color: #ffffff;
        }

        .toggle-handler {
          background-color: #ffe5b5;
          transform: translate3d(25px, 0, 0) rotate(0);

          .crater {
            opacity: 1;
          }
        }

        .star--1 {
          width: 1px;
          height: 1px;
        }

        .star--2 {
          width: 3px;
          height: 3px;
          transform: translate3d(-5px, 0, 0);
        }

        .star--3 {
          width: 1px;
          height: 1px;
          transform: translate3d(-7px, 0, 0);
        }

        .star--4,
        .star--5,
        .star--6 {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .star--4 {
          transition: all 300ms 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
        }

        .star--5 {
          transition: all 300ms 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
        }

        .star--6 {
          transition: all 300ms 400ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
        }
      }
    }
  }
</style>
