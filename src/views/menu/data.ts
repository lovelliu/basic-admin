import { Tag } from 'ant-design-vue';
import { h } from 'vue';
import { FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '菜单名称',
    dataIndex: 'name',
    width: 100,
  },
  {
    title: '图标',
    dataIndex: 'icon',
    width: 50,
  },
  {
    title: '菜单级数',
    dataIndex: 'level',
    width: 30,
  },
  {
    title: '排序',
    dataIndex: 'orderNum',
    width: 50,
  },
  {
    title: '状态',
    dataIndex: 'shown',
    width: 80,
    customRender: ({ record }) => {
      const shown = record.shown;
      const color = shown ? 'green' : 'red';
      const text = shown ? '启用' : '停用';
      return h(Tag, { color }, () => text);
    },
  },
];

// const isDir = (type: string) => type === '0';
// const isMenu = (type: string) => type === '1';
const isButton = (type: string) => type === '2';

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '菜单名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'href',
    label: '菜单路径',
    component: 'Input',
  },
  {
    field: 'parentId',
    label: '上级菜单',
    component: 'TreeSelect',
    componentProps: {
      replaceFields: {
        title: 'name',
        key: 'id',
        value: 'id',
        children: 'subMenuList',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
  },
  {
    field: 'orderNum',
    label: '排序',
    component: 'InputNumber',
  },
  {
    field: 'icon',
    label: '图标',
    component: 'IconPicker',
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'shown',
    label: '是否展示',
    component: 'RadioButtonGroup',
    defaultValue: true,
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
  },
  {
    field: 'description',
    label: '描述',
    component: 'InputTextArea',
  },
];
