import { Avatar, Switch } from 'ant-design-vue';
import { h } from 'vue';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Form';
import { formatToDateTime } from '/@/utils/dateUtil';
import { useMessage } from '/@/hooks/web/useMessage';
import { enableUser, forbidUser } from '/@/api/sys/user';
import { UserInfo } from '/@/api/sys/model/userModel';

export const columns: BasicColumn<UserInfo>[] = [
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
    dataIndex: 'username',
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
        checked: record.status,
        checkedChildren: '已启用',
        unCheckedChildren: '已禁用',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? true : false;
          const { createMessage } = useMessage();
          if (newStatus === true) {
            enableUser(record.id)
              .then((res) => {
                if (res.data.status === 'success') {
                  createMessage.success('修改成功');
                  record.status = true;
                }
              })
              .finally(() => (record.pendingStatus = false));
          } else {
            forbidUser(record.id)
              .then((res) => {
                if (res.data.status === 'success') {
                  record.status = false;
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
