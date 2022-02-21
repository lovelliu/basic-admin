<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { getUserList } from '/@/api/sys/user';
  import { searchFormSchema, columns } from './data';
  import { formatToDate } from '/@/utils/dateUtil';
  import UserModal from './UserModal.vue';
  import { usePermission } from '/@/hooks/web/usePermission';

  const { hasPermission } = usePermission();
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload, updateTableDataRecord }] = useTable({
    title: '用户管理',
    api: getUserList,
    handleSearchInfoFn: (params) => {
      if (!params.phone && !params.startCreateTime) return;
      return {
        phone: params.phone,
        startCreateTime: params.startCreateTime?.[0],
        endCreateTime: params.startCreateTime?.[1],
      };
    },
    showIndexColumn: false,
    rowKey: 'id',
    columns,
    bordered: true,
    showTableSetting: true,
    pagination: true,
    useSearchForm: true,
    formConfig: {
      labelWidth: 120,
      autoSubmitOnEnter: true,
      schemas: searchFormSchema,
      transformDateFunc: (date) => formatToDate(date),
      showAdvancedButton: false,
    },
    actionColumn: {
      width: 60,
      slots: { customRender: 'action' },
      title: '操作',
      dataIndex: 'action',
    },
  });

  function handleAdd() {
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  function handleSuccess({ isUpdate, values }) {
    if (isUpdate) {
      updateTableDataRecord(values.id, values);
    } else {
      reload();
    }
  }
</script>

<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          type="primary"
          @click="handleAdd"
          :disabled="!hasPermission('api:user:add')"
          >新增用户</a-button
        >
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '编辑',
              onClick: handleEdit.bind(null, record),
              disabled: !hasPermission('api:user:update'),
            },
          ]"
        />
      </template>
    </BasicTable>
    <UserModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
