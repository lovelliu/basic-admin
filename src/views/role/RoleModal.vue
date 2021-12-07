<script lang="ts" setup>
  import { computed, ref, unref } from 'vue';
  import { useModalInner, BasicModal } from '/@/components/Modal';
  import { useForm, BasicForm } from '/@/components/Form';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { addOrUpdateRole } from '/@/api/sys/role';
  import { RoleFormSchema } from './data';

  const isUpdate = ref(true);
  const rowId = ref(null);
  const emit = defineEmits(['register', 'success']);
  const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
    labelWidth: 100,
    showActionButtonGroup: false,
    schemas: RoleFormSchema,
    actionColOptions: {
      span: 23,
    },
  });
  const [registerModal, { closeModal, setModalProps }] = useModalInner((data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data.isUpdate;

    if (unref(isUpdate)) {
      rowId.value = data.record.id;
      setFieldsValue({
        ...data.record,
      });
    }
  });

  const getTitle = computed(() => (unref(isUpdate) ? '更新角色' : '新增角色'));

  const { createMessage } = useMessage();

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      const res = await addOrUpdateRole({ id: rowId.value, ...values });
      if (res.code === '000000') {
        isUpdate.value ? createMessage.success('修改成功') : createMessage.success('添加成功');
        closeModal();
        emit('success');
      }
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>

<template>
  <BasicModal @register="registerModal" v-bind="$attrs" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
