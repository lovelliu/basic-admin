<script lang="ts" setup name="MenuManagement">
  import { nextTick } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { deleteMenu, getAllMenu } from '/@/api/sys/menu';
  import { columns } from './data';
  import MenuDrawer from './MenuDrawer.vue';
  import { useDrawer } from '/@/components/Drawer';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { searchFormSchema } from './data';
  import { usePermission } from '/@/hooks/web/usePermission';

  const { hasPermission } = usePermission();
  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { reload, expandAll }] = useTable({
    title: '菜单列表',
    api: getAllMenu,
    columns,
    pagination: false,
    bordered: true,
    rowKey: 'id',
    showIndexColumn: false,
    isTreeTable: true,
    canResize: false,
    showTableSetting: true,
    useSearchForm: true,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
    },
    actionColumn: {
      width: 50,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: undefined,
    },
  });

  function handleCreate() {
    openDrawer(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  }

  const { createMessage } = useMessage();

  async function handleDelete(record: Recordable) {
    const res = await deleteMenu(record.id);
    if (res) {
      createMessage.success('删除成功');
      reload();
    }
  }

  function handleSuccess() {
    reload();
  }

  function onFetchSuccess() {
    // 演示默认展开所有表项
    nextTick(expandAll);
  }
</script>

<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button
          type="primary"
          @click="handleCreate"
          :disabled="!hasPermission('api:menu:add')"
          >新增菜单</a-button
        >
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
              disabled: !hasPermission('api:menu:update'),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
              disabled: !hasPermission('api:menu:delete'),
            },
          ]"
        />
      </template>
    </BasicTable>
    <MenuDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
