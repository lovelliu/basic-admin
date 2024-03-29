<script lang="ts" setup>
import { computed, ref, unref } from 'vue'
import { BasicModal, useModalInner } from '@/components/Modal'
import { BasicForm, useForm } from '@/components/Form'
import { addOrUpdate } from '@/api/sys/resource'
import { useMessage } from '@/hooks/web/useMessage'
import { ResourceFormSchema } from './data'

const emit = defineEmits(['register', 'success'])
const isUpdate = ref(true)
const rowId = ref('')

const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
  labelWidth: 100,
  schemas: ResourceFormSchema,
  showActionButtonGroup: false,
  actionColOptions: {
    span: 23,
  },
})

const [registerModal, { setModalProps, closeModal }] = useModalInner(data => {
  resetFields()
  setModalProps({ confirmLoading: false })
  isUpdate.value = !!data?.isUpdate

  if (unref(isUpdate)) {
    rowId.value = data.record.id
    setFieldsValue({
      ...data.record,
    })
  }

  updateSchema([
    {
      field: 'categoryId',
      componentProps: {
        options: data.resourceCate,
      },
    },
  ])
})
const getTitle = computed(() => (!unref(isUpdate) ? '新增资源' : '更新资源'))

const { createMessage } = useMessage()
async function handleSubmit() {
  try {
    const values = await validate()
    setModalProps({ confirmLoading: true })
    const res = await addOrUpdate({ id: rowId.value, ...values })
    if (res) {
      isUpdate.value ? createMessage.success('修改成功') : createMessage.success('添加成功')
      closeModal()
      emit('success')
    }
  }
  finally {
    setModalProps({ confirmLoading: false })
  }
}
</script>

<template>
  <BasicModal v-bind="$attrs" :title="getTitle" @register="registerModal" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
