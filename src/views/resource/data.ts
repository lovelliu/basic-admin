import type { BasicColumn, FormSchema } from '@/components/Table'
import { formatToDateTime } from '@/utils/dateUtil'

export const columns: BasicColumn[] = [
  {
    title: '编号',
    dataIndex: 'id',
    width: 50,
  },
  {
    title: '资源名称',
    dataIndex: 'name',
    width: 100,
  },
  {
    title: '资源路径',
    dataIndex: 'url',
    width: 125,
  },
  {
    title: '描述',
    dataIndex: 'description',
    width: 150,
  },
  {
    title: '添加时间',
    dataIndex: 'createdTime',
    width: 150,
    customRender: ({ record }: any) => formatToDateTime(record.createdTime),
  },
]

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '资源名称',
    component: 'Input',
    colProps: { span: 10 },
  },
  {
    field: 'url',
    label: '资源路径',
    component: 'Input',
    colProps: { span: 10 },
  },
  {
    field: 'categoryId',
    label: '资源分类',
    component: 'Select',
    colProps: { span: 10 },
  },
]

export const ResourceFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '资源名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'url',
    label: '资源路径',
    component: 'Input',
    required: true,
  },
  {
    field: 'categoryId',
    label: '资源分类',
    component: 'Select',
    required: true,
  },
  {
    field: 'description',
    label: '描述',
    component: 'InputTextArea',
  },
]

export const ResourceCateColumns: BasicColumn[] = [
  {
    title: '编号',
    dataIndex: 'id',
    width: 50,
  },
  {
    title: '名称',
    dataIndex: 'name',
    width: 100,
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    width: 100,
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 25,
  },
]

export const ResourceCateFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'sort',
    label: '排序',
    component: 'InputNumber',
    required: true,
  },
]
