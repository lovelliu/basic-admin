<script lang="ts" setup>
import { BasicTable, TableAction, useTable } from '@/components/Table'
import { deleteRole, getAllRoles } from '@/api/sys/role'
import { useMessage } from '@/hooks/web/useMessage'
import { useDrawer } from '@/components/Drawer'
import { usePermission } from '@/hooks/web/usePermission'
import RoleDrawer from './RoleDrawer.vue'
import { columns, searchFormSchema } from './data'

const { hasPermission } = usePermission()
const [registerDrawer, { openDrawer }] = useDrawer()
const [registerTable, { reload, updateTableDataRecord }] = useTable({
  title: '角色列表',
  api: getAllRoles,
  rowKey: 'id',
  columns,
  showTableSetting: true,
  showIndexColumn: false,
  useSearchForm: true,
  pagination: true,
  formConfig: {
    labelWidth: 120,
    schemas: searchFormSchema,
    autoSubmitOnEnter: true,
  },
  bordered: true,
  actionColumn: {
    slots: { customRender: 'action' },
    title: '操作',
    width: 90,
    dataIndex: 'action',
  },
})

function handleCreate() {
  openDrawer(true, {
    isUpdate: false,
  })
}

function handleEdit(record: Recordable) {
  openDrawer(true, {
    isUpdate: true,
    record,
  })
}

function handleSuccess({ isUpdate, values }) {
  if (isUpdate)
    updateTableDataRecord(values.id, values)

  else
    reload()
}

const { createMessage } = useMessage()
async function handleDelete(record: Recordable) {
  const res = await deleteRole(record.id)
  if (res) {
    createMessage.success('删除成功')
    reload()
  }
}
</script>

<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          type="primary"
          :disabled="!hasPermission('api:role:add')"
          @click="handleCreate"
        >
          新增角色
        </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
              disabled: !hasPermission('api:role:update'),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              disabled: !hasPermission('api:role:delete'),
              popConfirm: {
                title: '是否要删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
