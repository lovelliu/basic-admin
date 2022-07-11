import { Tag } from 'ant-design-vue';
import { h } from 'vue';
import type { BasicColumn, FormSchema } from '/@/components/Table';
import { formatToDateTime } from '/@/utils/dateUtil';

export const columns: BasicColumn<any>[] = [
  {
    title: '角色ID',
    dataIndex: 'id',
    width: 50,
    customRender: ({ value }) => value.toString(),
  },
  {
    title: '角色名称',
    dataIndex: 'name',
    width: 80,
  },
  {
    title: '角色标识',
    dataIndex: 'label',
    width: 100,
  },
  {
    title: '角色描述',
    dataIndex: 'desc',
    width: 120,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 50,
    customRender: ({ value }) => {
      const color = value ? 'green' : 'red';
      const text = value ? '启用' : '禁用';
      return h(Tag, { color }, () => text);
    },
  },
  {
    title: '添加时间',
    dataIndex: 'create_at',
    width: 100,
    customRender: ({ record }) => formatToDateTime(record.create_at),
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
    field: 'id',
    label: '',
    component: 'InputNumber',
    show: false,
  },
  {
    field: 'name',
    label: '角色名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'label',
    label: '角色标识',
    component: 'Input',
    required: true,
  },
  {
    field: 'desc',
    label: '角色描述',
    component: 'InputTextArea',
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: true,
    componentProps: {
      options: [
        { label: '启用', value: true },
        { label: '禁用', value: false },
      ],
    },
  },
  {
    field: 'menus',
    label: '',
    component: 'Input',
    slot: 'menu',
  },
];
