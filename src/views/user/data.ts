import { Avatar, Switch } from 'ant-design-vue';
import { h } from 'vue';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Form';
import { formatToDateTime } from '/@/utils/dateUtil';
import { useMessage } from '/@/hooks/web/useMessage';
import { enableUser, forbidUser } from '/@/api/sys/user';

export const columns: BasicColumn[] = [
  {
    title: '用户ID',
    dataIndex: 'id',
    width: 50,
  },
  {
    title: '头像',
    dataIndex: 'portrait',
    width: 30,
    customRender: ({ record }) => h(Avatar, { src: record.portrait }),
  },
  {
    title: '用户名',
    dataIndex: 'name',
    width: 80,
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    width: 80,
  },
  {
    title: '注册时间',
    dataIndex: 'createTime',
    width: 120,
    customRender: ({ record }) => formatToDateTime(record.createTime),
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 50,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) record.pendingStatus = false;

      return h(Switch, {
        checked: record.status === 'ENABLE',
        checkedChildren: '已启用',
        unCheckedChildren: '已禁用',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? 'ENABLE' : 'UNENABLE';
          const { createMessage } = useMessage();
          if (newStatus === 'ENABLE') {
            enableUser(record.id)
              .then((res) => {
                if (res) {
                  createMessage.success('修改成功');
                }
              })
              .finally(() => (record.pendingStatus = false));
          } else {
            forbidUser({ userId: record.id })
              .then((res) => {
                if (res) {
                  createMessage.success('修改成功');
                }
              })
              .finally(() => (record.pendingStatus = false));
          }
        },
      });
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'phone',
    label: '手机号',
    component: 'Input',
    colProps: {
      span: 8,
    },
    rules: [
      {
        validator: async (_, value) => {
          if (!/\d+/.test(value) && value) {
            return Promise.reject('请输入数字');
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ],
  },
  {
    field: 'startCreateTime',
    label: '注册时间',
    component: 'RangePicker',
    colProps: {
      span: 10,
    },
  },
];
