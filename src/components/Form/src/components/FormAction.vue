<script lang="ts">
import type { ColEx } from '../types/index'
// import type { ButtonProps } from 'ant-design-vue/es/button/buttonTypes';
import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'
import { Col, Form } from 'ant-design-vue'
import type { ButtonProps } from '/@/components/Button'
import { Button as AntdButton } from '/@/components/Button'
import { BasicArrow } from '/@/components/Basic'
import { useFormContext } from '../hooks/useFormContext'
import { useI18n } from '/@/hooks/web/useI18n'
import { propTypes } from '/@/utils/propTypes'

  type ButtonOptions = Partial<ButtonProps> & { text: string }

export default defineComponent({
  name: 'BasicFormAction',
  components: {
    FormItem: Form.Item,
    AntdButton,
    BasicArrow,
    [Col.name]: Col,
  },
  props: {
    showActionButtonGroup: propTypes.bool.def(true),
    showResetButton: propTypes.bool.def(true),
    showSubmitButton: propTypes.bool.def(true),
    showAdvancedButton: propTypes.bool.def(true),
    resetButtonOptions: {
      type: Object as PropType<ButtonOptions>,
      default: () => ({}),
    },
    submitButtonOptions: {
      type: Object as PropType<ButtonOptions>,
      default: () => ({}),
    },
    actionColOptions: {
      type: Object as PropType<Partial<ColEx>>,
      default: () => ({}),
    },
    actionSpan: propTypes.number.def(6),
    isAdvanced: propTypes.bool,
    hideAdvanceBtn: propTypes.bool,
  },
  emits: ['toggleAdvanced'],
  setup(props, { emit }) {
    const { t } = useI18n()

    const actionColOpt = computed(() => {
      const { showAdvancedButton, actionSpan: span, actionColOptions } = props
      const actionSpan = 24 - span
      const advancedSpanObj = showAdvancedButton
        ? { span: actionSpan < 6 ? 24 : actionSpan }
        : {}
      const actionColOpt: Partial<ColEx> = {
        style: { textAlign: 'right' },
        span: showAdvancedButton ? 6 : 4,
        ...advancedSpanObj,
        ...actionColOptions,
      }
      return actionColOpt
    })

    const getResetBtnOptions = computed((): ButtonOptions => {
      return Object.assign(
        {
          text: t('common.resetText'),
        },
        props.resetButtonOptions,
      )
    })

    const getSubmitBtnOptions = computed(() => {
      return Object.assign(
        {
          text: t('common.queryText'),
        },
        props.submitButtonOptions,
      )
    })

    function toggleAdvanced() {
      emit('toggleAdvanced')
    }

    return {
      t,
      actionColOpt,
      getResetBtnOptions,
      getSubmitBtnOptions,
      toggleAdvanced,
      ...useFormContext(),
    }
  },
})
</script>

<template>
  <a-col v-if="showActionButtonGroup" v-bind="actionColOpt">
    <div style="width: 100%" :style="{ textAlign: actionColOpt.style.textAlign }">
      <FormItem>
        <slot name="resetBefore" />
        <AntdButton
          v-if="showResetButton"
          type="default"
          class="mr-2"
          v-bind="getResetBtnOptions"
          @click="resetAction"
        >
          {{ getResetBtnOptions.text }}
        </AntdButton>
        <slot name="submitBefore" />

        <AntdButton
          v-if="showSubmitButton"
          type="primary"
          class="mr-2"
          v-bind="getSubmitBtnOptions"
          @click="submitAction"
        >
          {{ getSubmitBtnOptions.text }}
        </AntdButton>

        <slot name="advanceBefore" />
        <AntdButton
          v-if="showAdvancedButton && !hideAdvanceBtn"
          type="link"
          size="small"
          @click="toggleAdvanced"
        >
          {{ isAdvanced ? t('component.form.putAway') : t('component.form.unfold') }}
          <BasicArrow class="ml-1" :expand="!isAdvanced" up />
        </AntdButton>
        <slot name="advanceAfter" />
      </FormItem>
    </div>
  </a-col>
</template>
