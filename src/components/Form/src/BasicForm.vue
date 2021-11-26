<script lang="ts">
  import { basicProps } from './props';
</script>

<script lang="ts" setup>
  import type { Ref } from 'vue';
  import type { AdvanceState } from './types/hooks';
  import type { FormSchema, FormActionType, FormProps } from './types/form';

  import { reactive, ref, computed, unref, watch, useAttrs, nextTick, onMounted } from 'vue';
  import { Form, Row } from 'ant-design-vue';
  import { useDesign } from '/@/hooks/web/useDesign';

  import { dateItemType } from './helper';
  import { dateUtil } from '/@/utils/dateUtil';
  import useAdvanced from './hooks/useAdvanced';
  import { useFormValues } from './hooks/useFormValues';
  import { useAutoFocus } from './hooks/useAutoFocus';
  import { deepMerge } from '/@/utils';
  import { useFormEvents } from './hooks/useFormEvents';
  import { useModalContext } from '/@/components/Modal';
  import { createFormContext } from './hooks/useFormContext';

  const props = defineProps(basicProps);
  const emit = defineEmits(['advanced-change', 'reset', 'submit', 'register']);
  const formModel = reactive<Recordable>({});
  const modalFn = useModalContext();

  const advanceState = reactive<AdvanceState>({
    isAdvanced: true,
    isLoad: false,
    hideAdvanceBtn: false,
    actionSpan: 6,
  });

  const defaultValueRef = ref<Recordable>({});
  const isInitedDefaultRef = ref(false);
  const propsRef = ref<Partial<FormProps>>({});
  const schemaRef = ref<Nullable<FormSchema[]>>(null);
  const formElRef = ref<Nullable<FormActionType>>(null);

  const { prefixCls } = useDesign('basic-form');

  const getProps = computed((): FormProps => ({ ...props, ...unref(propsRef) } as FormProps));

  const getFormClass = computed(() => {
    return [
      prefixCls,
      {
        [`${prefixCls}--compact`]: unref(getProps).compact,
      },
    ];
  });

  const getRow = computed((): Recordable => {
    const { baseRowStyle = {}, rowProps } = unref(getProps);
    return {
      style: baseRowStyle,
      ...rowProps,
    };
  });

  const attrs = useAttrs();
  const getBindValue = computed(() => ({ ...attrs, ...props, ...unref(getProps) } as Recordable));

  const getSchema = computed((): FormSchema[] => {
    const schemas: FormSchema[] = unref(schemaRef) || (unref(getProps).schemas as any);

    for (const schema of schemas) {
      const { defaultValue, component } = schema;
      // handle date type
      if (defaultValue && dateItemType.includes(component)) {
        if (!Array.isArray(defaultValue)) {
          schema.defaultValue = dateUtil(defaultValue);
        } else {
          const def: moment.Moment[] = [];
          defaultValue.forEach((item) => {
            def.push(dateUtil(item));
          });
          schema.defaultValue = def;
        }
      }
    }
    if (unref(getProps).showAdvancedButton) {
      return schemas.filter((schema) => schema.component !== 'Divider') as FormSchema[];
    } else {
      return schemas as FormSchema[];
    }
  });

  const { handleToggleAdvanced } = useAdvanced({
    advanceState,
    emit,
    getProps,
    getSchema,
    formModel,
    defaultValueRef,
  });

  const { handleFormValues, initDefault } = useFormValues({
    getProps,
    defaultValueRef,
    getSchema,
    formModel,
  });

  useAutoFocus({
    getSchema,
    getProps,
    isInitedDefault: isInitedDefaultRef,
    formElRef: formElRef as Ref<FormActionType>,
  });

  const {
    handleSubmit,
    setFieldsValue,
    clearValidate,
    validate,
    validateFields,
    getFieldsValue,
    updateSchema,
    resetSchema,
    appendSchemaByField,
    removeSchemaByField,
    resetFields,
    scrollToField,
  } = useFormEvents({
    emit,
    getProps,
    formModel,
    getSchema,
    defaultValueRef,
    formElRef: formElRef as Ref<FormActionType>,
    schemaRef: schemaRef as Ref<FormSchema[]>,
    handleFormValues,
  });

  createFormContext({
    resetAction: resetFields,
    submitAction: handleSubmit,
  });

  watch(
    () => unref(getProps).model,
    () => {
      const { model } = unref(getProps);
      if (!model) return;
      setFieldsValue(model);
    },
    {
      immediate: true,
    },
  );

  watch(
    () => unref(getProps).schemas,
    (schemas) => {
      resetSchema(schemas ?? []);
    },
  );

  watch(
    () => getSchema.value,
    (schema) => {
      nextTick(() => {
        modalFn?.redoModalHeight?.();
      });
      if (unref(isInitedDefaultRef)) return;
      if (schema?.length) {
        initDefault();
        isInitedDefaultRef.value = true;
      }
    },
  );

  async function setProps(formProps: Partial<FormProps>): Promise<void> {
    propsRef.value = deepMerge(unref(propsRef) || {}, formProps);
  }

  function setFormModel(key: string, value: any) {
    formModel[key] = value;
    const { validateTrigger } = unref(getBindValue);
    if (!validateTrigger || validateTrigger === 'change') {
      validateFields([key]).catch((_) => {});
    }
  }

  function handleEnterPress(e: KeyboardEvent) {
    const { autoSubmitOnEnter } = unref(getProps);
    if (!autoSubmitOnEnter) return;
    if (e.key === 'Enter' && e.target && e.target instanceof HTMLElement) {
      const target: HTMLElement = e.target as HTMLElement;
      if (target && target.tagName && target.tagName.toUpperCase() == 'INPUT') {
        handleSubmit();
      }
    }
  }

  const formActionType: Partial<FormActionType> = {
    getFieldsValue,
    setFieldsValue,
    resetFields,
    updateSchema,
    resetSchema,
    setProps,
    removeSchemaByField,
    appendSchemaByField,
    clearValidate,
    validateFields,
    validate,
    submit: handleSubmit,
    scrollToField: scrollToField,
  };

  onMounted(() => {
    initDefault();
    emit('register', formActionType);
  });

  const getFormActionBindProps = computed(
    (): Recordable => ({ ...getProps.value, ...advanceState }),
  );
</script>

<template>
  <Form
    v-bind="getBindValue"
    :class="getFormClass"
    ref="formElRef"
    :model="formModel"
    @keypress.enter="handleEnterPress"
  >
    <Row v-bind="getRow">
      <slot name="formHeader"></slot>
      <template v-for="schema in getSchema" :key="schema.field">
        <FormItem
          :tableAction="tableAction"
          :formActionType="formActionType"
          :schema="schema"
          :formProps="getProps"
          :allDefaultValues="defaultValueRef"
          :formModel="formModel"
          :setFormModel="setFormModel"
        >
          <template #[item]="data" v-for="item in Object.keys($slots)">
            <slot :name="item" v-bind="data || {}"></slot>
          </template>
        </FormItem>
      </template>

      <FormAction v-bind="getFormActionBindProps" @toggle-advanced="handleToggleAdvanced">
        <template
          #[item]="data"
          v-for="item in ['resetBefore', 'submitBefore', 'advanceBefore', 'advanceAfter']"
        >
          <slot :name="item" v-bind="data || {}"></slot>
        </template>
      </FormAction>
      <slot name="formFooter"></slot>
    </Row>
  </Form>
</template>

<style lang="less" scoped></style>
