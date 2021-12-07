<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { deleteRole, getSearchRole } from '/@/api/sys/role';
  import { columns, searchFormSchema } from './data';
  import RoleModal from './RoleModal.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useDrawer } from '/@/components/Drawer';
  import RoleDrawer from './RoleDrawer.vue';

  const [registerModal, { openModal }] = useModal();
  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { reload }] = useTable({
    title: '角色列表',
    api: getSearchRole,
    columns,
    showTableSetting: true,
    canResize: false,
    showIndexColumn: false,
    useSearchForm: true,
    pagination: true,
    fetchSetting: {
      listField: 'records',
      pageField: 'current',
      sizeField: 'size',
    },
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,

      autoSubmitOnEnter: true,
    },
    bordered: true,
    actionColumn: {
      slots: { customRender: 'action' },
      title: '操作',
      width: 120,
      dataIndex: 'action',
    },
  });

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleSuccess() {
    reload();
  }

  function handleEdit(record: Recordable) {
    openModal(true, {
      isUpdate: true,
      record,
    });
  }

  const { createMessage } = useMessage();
  async function handleDelete(record: Recordable) {
    const res = await deleteRole(record.id);
    if (res) {
      createMessage.success('删除成功');
      reload();
    }
  }

  function handleAssign(record: Recordable) {
    openDrawer(true, {
      allocateMenu: true,
      record,
    });
  }

  function handleAllocateResource(record: Recordable) {
    openDrawer(true, {
      record,
      allocateMenu: false,
    });
  }
</script>

<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar
        ><a-button type="primary" @click="handleCreate">新增角色</a-button></template
      >
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outline',
              color: 'error',
              popConfirm: {
                title: '是否要删除',
                confirm: handleDelete.bind(null, record),
              },
            },
            {
              label: '分配菜单',
              onClick: handleAssign.bind(null, record),
            },
            {
              label: '分配资源',
              onClick: handleAllocateResource.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <RoleModal @register="registerModal" @success="handleSuccess" />
    <RoleDrawer @register="registerDrawer" />
  </div>
</template>
