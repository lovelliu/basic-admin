<script lang="ts" setup>
import { computed, ref, unref } from 'vue';
import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
import { BasicForm, useForm } from '/@/components/Form';
import { formSchema } from './data';

import { addMenu, getAllMenu, updateMenu } from '/@/api/sys/menu';
import { useMessage } from '/@/hooks/web/useMessage';

const emit = defineEmits(['success', 'register']);
const isUpdate = ref(true);
const rowId = ref(-1);
const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
  labelWidth: 100,
  schemas: formSchema,
  showActionButtonGroup: false,
  baseColProps: { lg: 12, md: 24 },
});

const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(
  async data => {
    resetFields();
    setDrawerProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      rowId.value = data.record.id;
      setFieldsValue({
        ...data.record,
      });
    }
    const treeData = await getAllMenu();
    updateSchema({
      field: 'parent_id',
      componentProps: { treeData },
    });
  },
);

const getTitle = computed(() => (!unref(isUpdate) ? '添加菜单' : '更新菜单'));

const { createMessage } = useMessage();
async function handleSubmit() {
  try {
    const values = await validate();
    setDrawerProps({ confirmLoading: true });
    const res = unref(isUpdate) ?
      await updateMenu({ ...values, id: unref(rowId) }) :
      await addMenu(values);
    if (res) {
      const msg = unref(isUpdate) ? '更新菜单成功' : '添加菜单成功';
      createMessage.success(msg);
      closeDrawer();
      emit('success', {
        isUpdate: unref(isUpdate),
        values: { ...values },
      });
    }
  }
  finally {
    setDrawerProps({ confirmLoading: false });
  }
}
</script>

<template>
  <BasicDrawer
    v-bind="$attrs"
    show-footer
    :title="getTitle"
    width="50%"
    @register="registerDrawer"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
