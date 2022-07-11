import { Switch } from 'ant-design-vue';
import { h } from 'vue';
import { changeCourseState, uploadImg } from '/@/api/business/course';
import { MarkDown } from '/@/components/Markdown';
import type { BasicColumn, FormSchema } from '/@/components/Table';
import { useMessage } from '/@/hooks/web/useMessage';

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 50,
  },
  {
    title: '课程名称',
    dataIndex: 'courseName',
    width: 100,
  },
  {
    title: '价格',
    dataIndex: 'price',
    width: 50,
    customRender: ({ record }: any) => {
      return `¥${record.price}`;
    },
  },
  {
    title: '排序',
    dataIndex: 'sortNum',
    width: 80,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 50,
    customRender: ({ record }: any) => {
      if (!Reflect.has(record, 'pendingStatus'))
        record.pendingStatus = false;

      return h(Switch, {
        checked: record.status === 1,
        checkedChildren: '上架',
        unCheckedChildren: '下架',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? 1 : 0;
          const { createMessage } = useMessage();
          changeCourseState(record.id, newStatus)
            .then(() => {
              record.status = newStatus;
              createMessage.success('修改课程状态成功');
            })
            .finally(() => (record.pendingStatus = false));
        },
      });
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'courseName',
    label: '课程名称',
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
        { label: '上架', value: 1 },
        { label: '下架', value: 0 },
      ],
    },
    colProps: { span: 8 },
  },
];

export const BasicFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: '',
    component: 'InputNumber',
    show: false,
  },
  {
    field: 'courseName',
    label: '名称',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
    componentProps: {
      size: 'large',
      maxlength: 50,
    },
  },
  {
    field: 'brief',
    label: '简介',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
    componentProps: {
      size: 'large',
      maxlength: 100,
    },
  },
  {
    field: 'teacherName',
    label: '讲师姓名',
    required: true,
    component: 'Input',
    colProps: { span: 24 },
    componentProps: {
      size: 'large',
      maxlength: 50,
    },
  },
  {
    field: 'position',
    label: '职位',
    required: true,
    component: 'Input',
    colProps: { span: 24 },
    componentProps: {
      size: 'large',
      maxlength: 50,
    },
  },
  {
    field: 'description',
    label: '讲师简介',
    required: true,
    component: 'Input',
    colProps: { span: 24 },
    componentProps: {
      size: 'large',
      maxlength: 100,
    },
  },
  {
    field: 'previewFirstField',
    label: '课程概述',
    required: true,
    component: 'Input',
    colProps: { span: 10 },
    componentProps: {
      size: 'large',
      maxlength: 20,
    },
  },
  {
    field: 'previewSecondField',
    component: 'Input',
    rules: [{ required: true, message: '请输入课程概述' }],
    label: ' ',
    colProps: { span: 10, style: { marginLeft: '20px' } },
    componentProps: {
      maxlength: 20,
      size: 'large',
    },
  },
  {
    field: 'courseListImg',
    label: '课程封面',
    component: 'Upload',
    componentProps: {
      api: uploadImg,
      maxNumber: 1,
      maxSize: 1,
    },
    colProps: { span: 8 },
  },
  {
    field: 'courseImgUrl',
    label: '解锁封面',
    component: 'Upload',
    componentProps: {
      api: uploadImg,
      maxNumber: 1,
      maxSize: 1,
    },
    colProps: { span: 8 },
  },
  {
    field: 'sortNum',
    label: '课程排序',
    component: 'InputNumber',
    componentProps: {
      size: 'large',
    },
    helpMessage: '数字越大排序越靠后',
    colProps: { span: 24 },
  },
];

export const SalesFormSchema: FormSchema[] = [
  {
    field: 'discounts',
    label: '销售价格(元)',
    component: 'Input',
    componentProps: {
      size: 'large',
    },
    required: true,
  },
  {
    field: 'price',
    label: '商品原价(元)',
    component: 'InputNumber',
    colProps: { offset: 2 },
    componentProps: {
      size: 'large',
    },
  },
  {
    field: 'sales',
    label: '销量(单)',
    component: 'InputNumber',
    componentProps: {
      size: 'large',
    },
  },
  {
    field: 'discountsTag',
    label: '活动标签',
    component: 'Input',
    componentProps: {
      size: 'large',
    },
    colProps: { span: 24 },
  },
];

export const activityFormSchema: FormSchema[] = [
  {
    field: 'activityCourse',
    label: '限时秒杀开关',
    component: 'Switch',
    defaultValue: false,
  },
  {
    field: 'beginTime',
    label: '开始时间',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
    },
    ifShow: ({ model }) => model.activityCourse,
  },
  {
    field: 'endTime',
    label: '结束时间',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
    },
    ifShow: ({ model }) => model.activityCourse,
  },
  {
    field: 'amount',
    label: '秒杀价',
    component: 'InputNumber',
    ifShow: ({ model }) => model.activityCourse,
  },
  {
    field: 'stock',
    label: '库存',
    component: 'InputNumber',
    ifShow: ({ model }) => model.activityCourse,
  },
];

export const detailFormSchema: FormSchema[] = [
  {
    field: 'courseDescriptionMarkDown',
    label: '',
    component: 'Input',
    render: ({ model, field }) => {
      return h(MarkDown, {
        value: model[field],
        onChange: (value: string) => {
          model[field] = value;
        },
      });
    },
  },
];

export const editCourseFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: '',
    component: 'InputNumber',
    show: false,
  },
  {
    field: 'courseId',
    label: '',
    component: 'InputNumber',
    show: false,
  },
  {
    field: 'courseName',
    label: '课程名称',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'sectionName',
    label: '章节名称',
    component: 'Input',
  },
  {
    field: 'description',
    label: '章节描述',
    component: 'InputTextArea',
  },
  {
    field: 'orderNum',
    label: '章节排序',
    component: 'InputNumber',
    helpMessage: '数字越大越靠后',
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '已隐藏', value: 0 },
        { label: '待更新', value: 1 },
        { label: '已更新', value: 2 },
      ],
    },
  },
];

export const editLessonFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: '',
    component: 'InputNumber',
    show: false,
  },
  {
    field: 'courseId',
    label: '',
    component: 'InputNumber',
    show: false,
  },
  {
    field: 'sectionId',
    label: '',
    component: 'InputNumber',
    show: false,
  },
  {
    field: 'sectionName',
    label: '',
    component: 'Input',
    show: false,
  },
  {
    field: 'theme',
    label: '课时名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'duration',
    label: '课程时长',
    component: 'InputNumber',
    required: true,
    helpMessage: '分钟',
  },
  {
    field: 'isFree',
    label: '是否开放试听',
    component: 'Switch',
  },
  {
    field: 'orderNum',
    label: '课时排序',
    component: 'InputNumber',
    helpMessage: '数字越大越靠后',
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '已隐藏', value: 0 },
        { label: '待更新', value: 1 },
        { label: '已更新', value: 2 },
      ],
    },
    required: true,
  },
];
