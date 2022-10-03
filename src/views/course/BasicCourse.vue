<script lang="ts" setup>
import type { CourseInfo } from '/@/api/business/model/course'
import { Card } from 'ant-design-vue'
import { useRoute } from 'vue-router'
import { PageWrapper } from '/@/components/Page'
import { BasicForm, useForm } from '/@/components/Form'
import { useGo } from '/@/hooks/web/usePage'
import { formatToDateTime } from '/@/utils/dateUtil'
import { getCourseById, saveOrUpdateCourse } from '/@/api/business/course'
import { useMessage } from '/@/hooks/web/useMessage'
import { computed } from 'vue'
import showdown from 'showdown'
import { BasicFormSchema, SalesFormSchema, activityFormSchema, detailFormSchema } from './data'

const go = useGo()
const route = useRoute()
let formValue: CourseInfo
const converter = new showdown.Converter()

const title = computed(() => (route.query.id ? '编辑课程' : '新增课程'))

const [register, { validate, setFieldsValue }] = useForm({
  schemas: BasicFormSchema,
  showActionButtonGroup: false,
})

const [registerSales, { validate: validateSales, setFieldsValue: setSalesFieldValue }] = useForm({
  showActionButtonGroup: false,
  schemas: SalesFormSchema,
  baseColProps: { span: 6 },
})

const [registerActivity, { validate: validateActivity, setFieldsValue: setActivityFieldValue }]
    = useForm({
      showActionButtonGroup: false,
      schemas: activityFormSchema,
      baseColProps: { span: 8 },
    })

const [registerDetail, { validate: validateDetail, setFieldsValue: setDetailFieldValue }]
    = useForm({
      showActionButtonGroup: false,
      schemas: detailFormSchema,
    })

if (route.query.id) {
  getCourseById(route.query.id).then(res => {
    const {
      courseName,
      courseImgUrl,
      courseListImg,
      brief,
      id,
      previewFirstField,
      previewSecondField,
      teacherDTO,
      discounts,
      discountsTag,
      price,
      sales,
      activityCourse,
      activityCourseDTO,
      courseDescriptionMarkDown,
    } = res
    formValue = res

    const basicFormValue = {
      courseName,
      courseImgUrl: [courseImgUrl],
      courseListImg: [courseListImg],
      brief,
      ...teacherDTO,
      id,
      previewFirstField,
      previewSecondField,
    }
    const md = converter.makeMarkdown(courseDescriptionMarkDown)

    setFieldsValue(basicFormValue)
    setSalesFieldValue({ discounts, discountsTag, price, sales })
    setActivityFieldValue({ activityCourse, ...activityCourseDTO })
    setDetailFieldValue({ courseDescriptionMarkDown: md })
  })
}

async function submitAll() {
  const [values, salesValues, activityValues, detailValues] = await Promise.all([
    validate(),
    validateSales(),
    validateActivity(),
    validateDetail(),
  ])
  values.teacherDTO = {}
  if (route.query.id) {
    values.teacherDTO.id = formValue.teacherDTO.id
    values.teacherDTO.courseId = formValue.teacherDTO.courseId
  }
  const keys = Object.keys(values)
  keys.forEach(item => {
    if (item === 'teacherName' || item === 'position' || item === 'description') {
      values.teacherDTO[item] = values[item]
      Reflect.deleteProperty(values, item)
    }
    if ((item === 'courseListImg' || item === 'courseImgUrl') && values[item])
      values[item] = values[item][0]
  })

  if (activityValues.activityCourse) {
    const { amount, stock } = activityValues
    let { beginTime, endTime } = activityValues
    beginTime = formatToDateTime(beginTime)
    endTime = formatToDateTime(endTime)
    activityValues.activityCourseDTO = {}
    activityValues.activityCourseDTO.amount = amount
    activityValues.activityCourseDTO.beginTime = beginTime
    activityValues.activityCourseDTO.endTime = endTime
    activityValues.activityCourseDTO.stock = stock
    activityValues.activityCourseDTO.id = formValue.activityCourseDTO.id
    activityValues.activityCourseDTO.courseId = formValue.activityCourseDTO.courseId
    Reflect.deleteProperty(activityValues, 'amount')
    Reflect.deleteProperty(activityValues, 'beginTime')
    Reflect.deleteProperty(activityValues, 'endTime')
    Reflect.deleteProperty(activityValues, 'stock')
    Reflect.deleteProperty(activityValues, 'id')
    Reflect.deleteProperty(activityValues, 'courseId')
  }
  detailValues.courseDescriptionMarkDown = converter.makeHtml(
    detailValues.courseDescriptionMarkDown,
  )

  const all = {}
  Object.assign(all, values, salesValues, activityValues, detailValues)

  const { code } = await saveOrUpdateCourse(all)

  if (code === '000000') {
    const { createMessage } = useMessage()
    route.query.id ? createMessage.success('修改成功') : createMessage.success('添加成功')
    go('/course/index')
  }
}
</script>

<template>
  <PageWrapper :title="title" class="pb-10" @back="go('/course/index')">
    <Card title="基本信息">
      <BasicForm @register="register" />
    </Card>
    <Card title="销售信息" class="!my-5">
      <BasicForm @register="registerSales" />
    </Card>
    <Card title="秒杀活动" class="!my-5">
      <BasicForm @register="registerActivity" />
    </Card>
    <Card title="课程详情">
      <BasicForm @register="registerDetail" />
    </Card>
    <template #rightFooter>
      <a-button type="primary" @click="submitAll">
        提交
      </a-button>
    </template>
  </PageWrapper>
</template>
