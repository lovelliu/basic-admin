<script lang="ts">
import type {
  CSSProperties,
  PropType,
} from 'vue';
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  ref,
  unref,
  watch,
} from 'vue';
import SvgIcon from './SvgIcon.vue';
// import Iconify from '@purge-icons/generated';
import { isString } from '/@/utils/is';
import { propTypes } from '/@/utils/propTypes';

const SVG_END_WITH_FLAG = '|svg';
export default defineComponent({
  name: 'Icon',
  components: { SvgIcon },
  props: {
    icon: propTypes.string,
    color: propTypes.string,
    size: {
      type: [String, Number] as PropType<string | number>,
      default: 16,
    },
    spin: propTypes.bool.def(false),
    prefix: propTypes.string.def(''),
  },
  setup(props) {
    const elRef = ref<ElRef>(null);

    const isSvgIcon = computed(() => props.icon?.endsWith(SVG_END_WITH_FLAG));
    const getSvgIcon = computed(() => props.icon.replace(SVG_END_WITH_FLAG, ''));
    const getIconRef = computed(
      () => `${props.prefix ? `${props.prefix}:` : ''}${props.icon}`,
    );

    const update = async () => {
      if (unref(isSvgIcon))
        return;

      const el = unref(elRef);
      if (!el)
        return;

      await nextTick();
      const icon = unref(getIconRef);
      if (!icon)
        return;

      // const svg = Iconify.renderSVG(icon, {});
      // if (svg) {
      //   el.textContent = '';
      //   el.appendChild(svg);
      // }
      // else {
      const span = document.createElement('span');
      span.className = 'iconify';
      span.dataset.icon = icon;
      el.textContent = '';
      el.appendChild(span);
      // }
    };

    const getWrapStyle = computed((): CSSProperties => {
      const { size, color } = props;
      let fs = size;
      if (isString(size))
        fs = parseInt(size, 10);

      return {
        fontSize: `${fs}px`,
        color,
        display: 'inline-flex',
      };
    });

    watch(() => props.icon, update, { flush: 'post' });
    onMounted(update);
    return {
      elRef,
      getWrapStyle,
      isSvgIcon,
      getSvgIcon,
    };
  },
});
</script>

<template>
  <SvgIcon
    v-if="isSvgIcon"
    :size="size"
    :name="getSvgIcon"
    class="action" :class="[$attrs.class]"
    :spin="spin"
  />
  <span
    v-else
    ref="elRef"
    class="app-iconify anticon" :class="[$attrs.class, spin && 'app-iconify-spin']"
    :style="getWrapStyle"
  />
</template>

<style lang="less" scoped>
  .app-iconify {
    display: inline-block;

    &-spin {
      svg {
        animation: loadingCircle 1s infinite linear;
      }
    }
  }

  span.iconify {
    display: block;
    min-width: 1em;
    min-height: 1em;
    background-color: @iconify-bg-color;
    border-radius: 100%;
  }
</style>
