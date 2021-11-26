<script lang="ts">
  import { basicProps } from './props';
</script>

<script lang="ts" setup>
  import { Ref, useAttrs } from 'vue';
  import type { AdvanceState } from './types/hooks';
  import type { FormSchema, FormActionType, FormProps } from './types/form';

  import { reactive, ref, computed, unref } from 'vue';
  import { Form, Row } from 'ant-design-vue';
  import { useDesign } from '/@/hooks/web/useDesign';

  import { dateItemType } from './helper';
  import { dateUtil } from '/@/utils/dateUtil';
  import useAdvanced from './hooks/useAdvanced';
  import { useFormValues } from './hooks/useFormValues';
  import { useAutoFocus } from './hooks/useAutoFocus';

  const props = defineProps(basicProps);
  const emit = defineEmits(['advanced-change', 'reset', 'submit', 'register']);
  const formModel = reactive<Recordable>({});

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
</script>

<template>
  <Form>
    <Row></Row>
  </Form>
</template>

<style lang="less" scoped></style>
