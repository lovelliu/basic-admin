<script lang="ts" setup>
  import { computed, ref, unref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getAllMenu } from '/@/api/sys/menu';
  import BasicForm from '/@/components/Form/src/BasicForm.vue';
  import { useForm } from '/@/components/Form';
  import { addRole, updateRole } from '/@/api/sys/role';
  import { RoleFormSchema } from './data';

  const treeData = ref<TreeItem[]>([]);
  const isUpdate = ref(true);

  const emit = defineEmits(['register', 'success']);

  // register drawer
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(
    async (data) => {
      setDrawerProps({ confirmLoading: false });
      resetFields();
      if (unref(treeData).length === 0) {
        treeData.value = (await getAllMenu()) as unknown as TreeItem[];
      }
      isUpdate.value = !!data?.isUpdate;
      if (unref(isUpdate)) {
        setFieldsValue({ ...data.record });
      }
    },
  );

  // register form
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    showActionButtonGroup: false,
    schemas: RoleFormSchema,
    labelWidth: 90,
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '添加角色' : '更新角色'));

  const { createMessage } = useMessage();

  // submit form
  async function handleSubmit() {
    try {
      setDrawerProps({ confirmLoading: true });
      const values = await validate();
      console.log(typeof values.id);

      const res = unref(isUpdate) ? await updateRole(values) : await addRole(values);
      if (res) {
        const msg = !unref(isUpdate) ? '添加角色成功' : '更新角色成功';
        createMessage.success(msg);
        closeDrawer();

        emit('success', {
          isUpdate: unref(isUpdate),
          values,
        });
      }
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>

<template>
  <BasicDrawer
    @register="registerDrawer"
    v-bind="$attrs"
    show-footer
    width="500px"
    @ok="handleSubmit"
    :title="getTitle"
  >
    <BasicForm @register="registerForm">
      <template #menu="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :tree-data="treeData"
          :field-names="{ title: 'name', key: 'id' }"
          checkable
          check-strictly
          toolbar
          title="菜单分配（菜单对应查看权限）"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
