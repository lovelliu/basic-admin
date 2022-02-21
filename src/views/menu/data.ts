import { Tag } from 'ant-design-vue';
import { h } from 'vue';
import { MenuItem } from '/@/api/sys/model/systemModel';
import Icon from '/@/components/Icon';
import { FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table';

export const columns: BasicColumn<MenuItem>[] = [
  {
    title: '菜单ID',
    dataIndex: 'id',
    defaultHidden: true,
    width: 30,
    align: 'left',
  },
  {
    title: '菜单名称',
    dataIndex: 'name',
    width: 50,
    align: 'left',
  },
  {
    title: '图标',
    dataIndex: 'icon',
    width: 30,
    customRender: ({ record }) => {
      return h(Icon, { icon: record.icon });
    },
  },
  {
    title: '权限标识',
    dataIndex: 'perms',
    width: 50,
  },
  {
    title: '路由',
    dataIndex: 'route',
    width: 50,
  },
  {
    title: '组件',
    dataIndex: 'component',
    width: 50,
  },
  {
    title: '排序',
    dataIndex: 'order_num',
    width: 20,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 30,
    customRender: ({ record }) => {
      const status = record.status;
      const color = status ? 'green' : 'red';
      const text = status ? '启用' : '停用';
      return h(Tag, { color }, () => text);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '菜单名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
    },
    colProps: { span: 8 },
  },
];

const isMenu = (type: number) => type === 1;
const isButton = (type: number) => type === 2;

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    component: 'InputNumber',
    label: '',
    show: false,
  },
  {
    field: 'type',
    label: '菜单类型',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [
        { label: '目录', value: 0 },
        { label: '菜单', value: 1 },
        { label: '按钮', value: 2 },
      ],
    },
    defaultValue: 0,
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'name',
    label: '菜单名称',
    component: 'Input',
    required: true,
  },

  {
    field: 'parent_id',
    label: '上级菜单',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'name',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'order_num',
    label: '排序',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'component',
    label: '组件',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'perms',
    label: '权限标识',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => isButton(values.type),
  },
  {
    field: 'route',
    label: '菜单路由',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'is_ext',
    label: '是否外链',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [
        { label: '否', value: false },
        { label: '是', value: true },
      ],
    },
    defaultValue: false,
  },
  {
    field: 'keepalive',
    label: '缓存',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [
        { label: '否', value: false },
        { label: '是', value: true },
      ],
    },
    defaultValue: false,
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'icon',
    label: '图标',
    component: 'IconPicker',
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: true,
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
  },
];
