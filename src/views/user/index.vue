<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { getUserList } from '/@/api/sys/user';
  import { searchFormSchema, columns } from './data';
  import { formatToDate } from '/@/utils/dateUtil';
  import UserModal from './UserModal.vue';

  const [registerModal, { openModal }] = useModal();
  const [registerTable] = useTable({
    title: '用户管理',
    api: getUserList,
    fetchSetting: {
      listField: 'records',
      pageField: 'currentPage',
    },
    handleSearchInfoFn: (params) => {
      if (!params.phone && !params.startCreateTime) return;
      return {
        phone: params.phone,
        startCreateTime: params.startCreateTime?.[0],
        endCreateTime: params.startCreateTime?.[1],
      };
    },
    showIndexColumn: false,
    canResize: false,
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

  function handleAllocate(record: Recordable) {
    openModal(true, {
      ...record,
    });
  }
</script>

<template>
  <div>
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '分配角色',
              onClick: handleAllocate.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <UserModal @register="registerModal" />
  </div>
</template>
