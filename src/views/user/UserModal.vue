<script lang="ts" setup>
import { computed, ref, unref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { useMessage } from '/@/hooks/web/useMessage';
import { useForm } from '/@/components/Form';
import BasicForm from '/@/components/Form/src/BasicForm.vue';
import { userFormSchema } from './data';
import { addUser, updateUser } from '/@/api/sys/user';

const emit = defineEmits(['register', 'success']);
const isUpdate = ref(true);

// user form
const [registerForm, { setFieldsValue, validate, resetFields }] = useForm({
  schemas: userFormSchema,
  showActionButtonGroup: false,
  labelWidth: 80,
});

const [registerModal, { closeModal, setModalProps }] = useModalInner(async data => {
  resetFields();
  setModalProps({ confirmLoading: false });
  isUpdate.value = !!data?.isUpdate;
  if (unref(isUpdate))
    setFieldsValue({ ...data.record });
});

const getTitle = computed(() => (!unref(isUpdate) ? '添加用户' : '更新用户'));

async function handleSubmit() {
  try {
    setModalProps({ confirmLoading: true });
    const data = await validate();
    const res = unref(isUpdate) ? await updateUser(data) : await addUser(data);
    if (res) {
      const { createMessage } = useMessage();
      const msg = unref(isUpdate) ? '更新用户成功' : '添加用户成功';
      createMessage.success(msg);
      closeModal();
      emit('success', {
        isUpdate: unref(isUpdate),
        values: { ...data },
      });
    }
  }
  finally {
    setModalProps({ confirmLoading: false });
  }
}
</script>

<template>
  <BasicModal
    :title="getTitle"
    v-bind="$attrs"
    @register="registerModal"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
