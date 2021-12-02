<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { deleteResourceCate, getResourceCate } from '/@/api/sys/resource';
  import { ResourceCateColumns } from './data';
  import { useGo } from '/@/hooks/web/usePage';
  import { useModal } from '/@/components/Modal';
  import ResourceCateModal from './ResourceCateModal.vue';
  import { useMessage } from '/@/hooks/web/useMessage';

  const go = useGo();
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    title: '资源分类列表',
    api: getResourceCate,
    columns: ResourceCateColumns,
    pagination: false,
    striped: false,
    bordered: true,
    showTableSetting: true,
    showIndexColumn: false,
    actionColumn: {
      width: 80,
      title: '操作',
      slots: { customRender: 'action' },
      fixed: false,
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

  function handleEdit() {
    openModal(true, {
      isUpdate: true,
    });
  }

  const { createMessage } = useMessage();
  async function handleDelete(record: Recordable) {
    const res = await deleteResourceCate(record.id);
    if (res) {
      createMessage.success('删除成功');
      reload();
    }
  }
</script>

<template>
  <PageWrapper title="资源分类" @back="go('/permission/resource')">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">添加分类</a-button>
      </template>
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
                title: '是否删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <ResourceCateModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
