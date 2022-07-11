<script lang="ts" setup>
import { computed, ref, unref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form';
import { ResourceCateFormSchema } from './data';
import { addOrUpdateCate } from '/@/api/sys/resource';
import { useMessage } from '/@/hooks/web/useMessage';

const emit = defineEmits(['register', 'success']);
const isUpdate = ref(true);
const rowId = ref<Nullable<number>>(null);

const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
  labelWidth: 100,
  schemas: ResourceCateFormSchema,
  showActionButtonGroup: false,
  actionColOptions: {
    span: 23,
  },
});

const [registerModal, { setModalProps, closeModal }] = useModalInner(data => {
  resetFields();
  setModalProps({ confirmLoading: false });
  isUpdate.value = !!data?.isUpdate;

  if (unref(isUpdate)) {
    rowId.value = data.record.id;
    setFieldsValue({
      ...data.record,
    });
  }
});
const getTitle = computed(() => (!unref(isUpdate) ? '新增分类' : '更新分类'));

const { createMessage } = useMessage();
async function handleSubmit() {
  try {
    const values = await validate();
    setModalProps({ confirmLoading: true });
    const res = await addOrUpdateCate({ ...values, id: rowId.value });
    if (res) {
      isUpdate.value ? createMessage.success('修改成功') : createMessage.success('添加成功');
      closeModal();
      emit('success');
    }
  }
  finally {
    setModalProps({ confirmLoading: false });
  }
}
</script>

<template>
  <BasicModal v-bind="$attrs" :title="getTitle" @register="registerModal" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
