<script lang="ts" setup>
import { ref } from 'vue';
import { BasicForm, useForm } from '/@/components/Form';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { editCourseFormSchema, editLessonFormSchema } from './data';
import { useRoute } from 'vue-router';
import { saveOrUpdateLesson, saveOrUpdateSection } from '/@/api/business/course';
import { useMessage } from '/@/hooks/web/useMessage';

const emit = defineEmits(['register', 'success']);
const level = ref(-1);
const isAdd = ref(false);
const uploader = ref<Nullable<{ startUpload: Function }>>(null);
const route = useRoute();

const [registerForm, { setFieldsValue, validate, resetSchema, resetFields }] = useForm({
  schemas: editCourseFormSchema,
  showActionButtonGroup: false,
});

const [registerModal, { closeModal }] = useModalInner(data => {
  if (data.level === 1) {
    if (data.isAdd) {
      resetSchema(editLessonFormSchema);
      resetFields();
      setFieldsValue({
        courseId: data.courseId,
        sectionId: data.id,
        sectionName: data.sectionName,
        courseName: route.query.name,
      });
      isAdd.value = data.isAdd;
    }
    else {
      resetSchema(editCourseFormSchema);
      setFieldsValue({
        id: data.id,
        courseId: data.courseId,
        sectionName: data.sectionName,
        description: data.description,
        orderNum: data.orderNum,
        courseName: route.query.name,
        status: data.status,
      });
    }
  }
  else {
    resetSchema(editLessonFormSchema);
    setFieldsValue({
      id: data.id,
      courseId: data.courseId,
      theme: data.theme,
      orderNum: data.orderNum,
      duration: data.duration,
      isFree: data.isFree,
      sectionName: data.sectionName,
      status: data.status,
    });
  }
  level.value = data.level;
});

async function handleSubmit() {
  const data = await validate();
  const { createMessage } = useMessage();
  if (level.value === 1 && !isAdd.value) {
    const res = await saveOrUpdateSection(data);
    if (res.code === '000000') {
      createMessage.success('章节修改成功');
      emit('success');
      closeModal();
    }
  }
  else if (level.value === 2 && !uploader.value) {
    const res = await saveOrUpdateLesson(data);
    if (res) {
      createMessage.success('课时修改成功');
      emit('success');
      closeModal();
    }
  }
  else {
    const res = await saveOrUpdateLesson(data);
    if (res) {
      createMessage.success('课时添加成功');
      emit('success');
      closeModal();
    }
  }
}
</script>

<template>
  <BasicModal title="修改状态" @register="registerModal" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
