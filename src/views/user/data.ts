import { Avatar, Switch } from 'ant-design-vue';
import { h } from 'vue';
import type { BasicColumn } from '/@/components/Table';
import type { FormSchema } from '/@/components/Form';
import { formatToDateTime } from '/@/utils/dateUtil';
import { useMessage } from '/@/hooks/web/useMessage';
import { enableUser, forbidUser, isUserExist } from '/@/api/sys/user';
import { getRoleList } from '/@/api/sys/role';
import { usePermission } from '/@/hooks/web/usePermission';

const { hasPermission } = usePermission();

export const columns: BasicColumn[] = [
  {
    title: '用户ID',
    dataIndex: 'id',
    width: 50,
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    width: 30,
    customRender: ({ record }: any) => h(Avatar, { src: record.avatar }),
  },
  {
    title: '用户名',
    dataIndex: 'username',
    width: 80,
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    width: 100,
  },
  {
    title: '创建时间',
    dataIndex: 'create_at',
    width: 120,
    customRender: ({ record }: any) => formatToDateTime(record.create_at),
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 50,
    customRender: ({ record }: any) => {
      if (!Reflect.has(record, 'pendingStatus'))
        record.pendingStatus = false;

      return h(Switch, {
        checked: record.status,
        checkedChildren: '已启用',
        unCheckedChildren: '已禁用',
        loading: record.pendingStatus,
        disabled: record.status ?
            !hasPermission('api:user:forbid') :
            !hasPermission('api:user:enable'),
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = !!checked;
          const { createMessage } = useMessage();
          if (newStatus === true) {
            enableUser(record.id)
              .then(res => {
                if (res.data.status === 'success') {
                  createMessage.success('修改成功');
                  record.status = true;
                }
              })
              .finally(() => (record.pendingStatus = false));
          }
          else {
            forbidUser(record.id)
              .then(res => {
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
    field: 'username',
    label: '用户名',
    component: 'Input',
    colProps: {
      span: 8,
    },
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
    colProps: {
      span: 6,
    },
  },
];
let timer;
export const userFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: '',
    component: 'InputNumber',
    show: false,
  },
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    dynamicRules: ({ values }) => [
      {
        required: true,
        message: '请输入用户名',
      },
      {
        validator(_, value) {
          return new Promise<void>((resolve, reject) => {
            if (timer)
              clearTimeout(timer);
            timer = setTimeout(() => {
              isUserExist(value)
                .then(isExist => {
                  isExist && isExist !== values.id ?
                    reject(new Error('该用户名称已存在')) :
                    resolve();
                })
                .catch(err => {
                  reject(err.message || '验证失败');
                });
            }, 500);
          });
        },
      },
    ],
  },
  {
    field: 'role',
    label: '角色',
    required: true,
    component: 'ApiSelect',
    defaultValue: 1,
    componentProps: {
      api: getRoleList,
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
  },
  {
    field: 'desc',
    label: '描述',
    component: 'Input',
  },
];
