import { BasicColumn, FormSchema } from '/@/components/Table';
import { formatToDateTime } from '/@/utils/dateUtil';

export const columns: BasicColumn[] = [
  {
    title: '编号',
    dataIndex: 'id',
    width: 30,
  },
  {
    title: '角色名称',
    dataIndex: 'name',
    width: 80,
  },
  {
    title: '描述',
    dataIndex: 'description',
    width: 120,
  },
  {
    title: '添加时间',
    dataIndex: 'createdTime',
    width: 100,
    customRender: ({ record }) => formatToDateTime(record.createdTime),
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '角色名称',
    component: 'Input',
    colProps: {
      span: 10,
    },
  },
];

export const RoleFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '角色名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'code',
    label: '角色编码',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'description',
    label: '描述',
    component: 'InputTextArea',
  },
];
