<script lang="ts">
// @ts-nocheck
import type { PropType } from 'vue'
import { computed, defineComponent, ref, unref, watch, watchEffect } from 'vue'
import { Select as AntdSelect } from 'ant-design-vue'
import { get, omit } from 'lodash-es'
import { LoadingOutlined } from '@ant-design/icons-vue'
import { isFunction } from '@/utils/is'
import { useRuleFormItem } from '@/hooks/component/useFormItem'
import { useAttrs } from '@/hooks/core/useAttrs'
import { useI18n } from '@/hooks/web/useI18n'
import { propTypes } from '@/utils/propTypes'

interface OptionsItem { label: string; value: string; disabled?: boolean }

export default defineComponent({
  name: 'ApiSelect',
  components: {
    AntdSelect,
    LoadingOutlined,
  },
  inheritAttrs: false,
  props: {
    value: [Array, Object, String, Number],
    numberToString: propTypes.bool,
    api: {
      type: Function as PropType<(arg?: Recordable) => Promise<OptionsItem[]>>,
      default: null,
    },
    // api params
    params: {
      type: Object as PropType<Recordable>,
      default: () => ({}),
    },
    // support xxx.xxx.xx
    resultField: propTypes.string.def(''),
    labelField: propTypes.string.def('label'),
    valueField: propTypes.string.def('value'),
    immediate: propTypes.bool.def(true),
    alwaysLoad: propTypes.bool.def(false),
  },
  emits: ['optionsChange', 'change'],
  setup(props, { emit }) {
    const options = ref<OptionsItem[]>([])
    const loading = ref(false)
    const isFirstLoad = ref(true)
    const emitData = ref<any[]>([])
    const attrs = useAttrs()
    const { t } = useI18n()

    // Embedded in the form, just use the hook binding to perform form verification
    const [state] = useRuleFormItem(props, 'value', 'change', emitData)

    const getOptions = computed(() => {
      const { labelField, valueField, numberToString } = props

      return unref(options).reduce((prev, next: Recordable) => {
        if (next) {
          const value = next[valueField]
          prev.push({
            ...omit(next, [labelField, valueField]),
            label: next[labelField],
            value: numberToString ? `${value}` : value,
          })
        }
        return prev
      }, [] as OptionsItem[])
    })

    watchEffect(() => {
      props.immediate && !props.alwaysLoad && fetch()
    })

    watch(
      () => props.params,
      () => {
        !unref(isFirstLoad) && fetch()
      },
      { deep: true },
    )

    async function fetch() {
      const api = props.api
      if (!api || !isFunction(api))
        return
      options.value = []
      try {
        loading.value = true
        const res = await api(props.params)
        if (Array.isArray(res)) {
          options.value = res
          emitChange()
          return
        }
        if (props.resultField)
          options.value = get(res, props.resultField) || []

        emitChange()
      }
      catch (error) {
        console.warn(error)
      }
      finally {
        loading.value = false
      }
    }

    async function handleFetch(visible) {
      if (visible) {
        if (props.alwaysLoad) {
          await fetch()
        }
        else if (!props.immediate && unref(isFirstLoad)) {
          await fetch()
          isFirstLoad.value = false
        }
      }
    }

    function emitChange() {
      emit('optionsChange', unref(getOptions))
    }

    function handleChange(_, ...args) {
      emitData.value = args
    }

    return { state, attrs, getOptions, loading, t, handleFetch, handleChange }
  },
})
</script>

<template>
  <AntdSelect
    v-bind="$attrs"
    v-model:value="state"
    :options="getOptions"
    @dropdown-visibleChange="handleFetch"
    @change="handleChange"
  >
    <template v-for="item in Object.keys($slots)" #[item]="data">
      <slot :name="item" v-bind="data || {}" />
    </template>
    <template v-if="loading" #suffixIcon>
      <LoadingOutlined spin />
    </template>
    <template v-if="loading" #notFoundContent>
      <span>
        <LoadingOutlined spin class="mr-1" />
        {{ t('component.form.apiSelectNotFound') }}
      </span>
    </template>
  </AntdSelect>
</template>
