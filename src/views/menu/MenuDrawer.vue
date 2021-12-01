<script lang="ts" setup>
  import { computed, ref, unref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema } from './data';

  import { AddOrUpdateMenu, getEditMenuInfo } from '/@/api/sys/menu';
  import { useMessage } from '/@/hooks/web/useMessage';

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const id = ref<Nullable<number>>(null);
  const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: false,
    baseColProps: { lg: 12, md: 24 },
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      id.value = data.record.id;
      setFieldsValue({
        ...data.record,
      });
    }
    const treeData = await getEditMenuInfo();
    updateSchema({
      field: 'parentId',
      componentProps: { treeData: [...treeData.parentMenuList, { name: '无上级菜单', id: -1 }] },
    });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));

  const { createMessage } = useMessage();
  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });

      const res = await AddOrUpdateMenu({ ...values, id: unref(id) });
      if (res) {
        isUpdate.value
          ? createMessage.success('修改菜单成功')
          : createMessage.success('新增菜单成功');
        closeDrawer();
        emit('success');
      }
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>

<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    show-footer
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
