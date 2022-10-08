<script lang="ts" setup>
import { getCourseList } from '@/api/business/course'
import { BasicTable, TableAction, useTable } from '@/components/Table'
import { useGo } from '@/hooks/web/usePage'
import { PageEnum } from '@/enums/pageEnum'
import { columns, searchFormSchema } from './data'

const go = useGo()
const [registerTable] = useTable({
  title: '课程管理',
  api: getCourseList,
  useSearchForm: true,
  columns,
  showIndexColumn: false,
  pagination: true,
  showTableSetting: true,
  fetchSetting: {
    pageField: 'currentPage',
    listField: 'records',
  },
  bordered: true,
  formConfig: {
    labelWidth: 120,
    showAdvancedButton: false,
    schemas: searchFormSchema,
  },
  canResize: false,
  actionColumn: {
    title: '操作',
    dataIndex: 'action',
    slots: { customRender: 'action' },
    width: 80,
  },
})
</script>

<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="go('/course/basic-course')">
          添加课程
        </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '编辑',
              // @ts-ignore
              onClick: () => go({ path: PageEnum.BASIC_COURSE, query: { id: record.id } }),
            },
            {
              label: '内容管理',
              onClick: () =>
                // @ts-ignore
                go({ path: PageEnum.LESSON, query: { id: record.id, name: record.courseName } }),
            },
          ]"
        />
      </template>
    </BasicTable>
  </div>
</template>
