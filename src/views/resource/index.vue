<script lang="ts" setup>
  import { deleteResource, getResourceCate, getResourceList } from '/@/api/sys/resource';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { columns, searchFormSchema } from './data';
  import { onMounted, ref } from 'vue';
  import ResourceModal from './ResourceModal.vue';
  import { useMessage } from '/@/hooks/web/useMessage';

  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload, getForm }] = useTable({
    title: '资源列表',
    api: getResourceList,
    fetchSetting: {
      listField: 'records',
      pageField: 'current',
      sizeField: 'size',
    },
    columns,
    useSearchForm: true,
    formConfig: {
      schemas: searchFormSchema,
      labelWidth: 120,
      autoSubmitOnEnter: true,
    },
    pagination: true,
    striped: false,
    bordered: true,
    showIndexColumn: false,
    canResize: true,
    showTableSetting: true,
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: undefined,
    },
  });

  const resourceCate = ref<{ label: string; value: number }[]>([]);
  onMounted(async () => {
    const res = await getResourceCate();
    const options = res.map((item) => ({ label: item.name, value: item.id }));
    resourceCate.value = options;
    const { updateSchema } = getForm();
    updateSchema({
      field: 'categoryId',
      componentProps: {
        options,
      },
    });
  });

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
      resourceCate: resourceCate.value,
    });
  }

  function handleSuccess() {
    reload();
  }

  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
      resourceCate: resourceCate.value,
    });
  }

  const { createMessage } = useMessage();
  async function handleDelete(record: Recordable) {
    const res = await deleteResource(record.id);
    if (res) {
      createMessage.success('删除成功');
      reload();
    }
  }
</script>

<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 添加资源 </a-button>
        <a-button type="primary"> 新增资源分类 </a-button>
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
                title: '是否要删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <ResourceModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
