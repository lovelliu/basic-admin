<script lang="ts" setup>
import { ref } from 'vue';
import { Form, Input, Progress } from 'ant-design-vue';
import { useRoute } from 'vue-router';
import {
  AliyunUploadTransPercent,
  aliyunUploadImg,
  aliyunUploadTransCode,
  aliyunUploadVideo,
} from '/@/api/business/course';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { useMessage } from '/@/hooks/web/useMessage';

const courseName = ref('');
const theme = ref('');
const video = ref<any>(null);
const image = ref<any>(null);
const uploader = ref<any>(null);
const fileName = ref('');
const imageURL = ref('');
const videoId = ref(0);
const uploadPercent = ref(0);
const transCodePercent = ref(0);
const uploadStatus = ref<'active' | 'exception' | 'normal' | 'success'>('normal');
const transCodeStatus = ref<'active' | 'exception' | 'normal' | 'success'>('normal');

const FormItem = Form.Item;

const route = useRoute();

const [registerModal, { closeModal }] = useModalInner(async data => {
  const { createMessage } = useMessage();
  courseName.value = route.query.name as string;
  theme.value = data.theme;
  uploadPercent.value = 0;
  transCodePercent.value = 0;
  uploader.value = new window.AliyunUpload.Vod({
    userId: 1618139964448548,
    region: 'cn-shanghai',
    partSize: 1048576,
    parallel: 5,
    retryCount: 3,
    retryDuration: 2,
    onUploadstarted: async uploadInfo => {
      uploadStatus.value = 'active';
      createMessage.loading('开始上传中，请耐心等待');
      let uploadAuthInfo;
      if (uploadInfo.isImage) {
        // Obtain picture uploading certificate
        const data = await aliyunUploadImg();
        imageURL.value = data.imageURL;
        uploadAuthInfo = data;
      }
      else {
        const data = await aliyunUploadVideo({
          fileName: uploadInfo.file.name,
          imageUrl: imageURL.value,
        });
        uploadAuthInfo = data;
        videoId.value = data.videoId;
        fileName.value = uploadInfo.file.name;
      }

      uploader.value?.setUploadAuthAndAddress(
        uploadInfo,
        uploadAuthInfo.uploadAuth,
        uploadAuthInfo.uploadAddress,
        uploadAuthInfo.imageId || uploadAuthInfo.videoId,
      );
    },
    onUploadSucceed() {
      // console.log('onUploadSucceed', uploadInfo);
    },
    // 文件上传失败
    // @ts-expect-error
    onUploadFailed(uploadInfo, code, message) {
      uploadStatus.value = 'exception';
      createMessage.error(`文件上传失败: ${message}`);
    },
    // @ts-expect-error
    // 文件上传进度，单位：字节
    onUploadProgress(uploadInfo, totalSize, loadedPercent) {
      if (!uploadInfo.isImage)
        uploadPercent.value = ~~loadedPercent * 100;
    },
    // 上传凭证超时
    onUploadTokenExpired() {
      // console.log('onUploadTokenExpired');
      createMessage.warning('上传凭证超时');
    },
    // 全部文件上传结束
    onUploadEnd: async () => {
      uploadStatus.value = 'success';
      createMessage.success('文件上传成功');
      // tranform code
      transCodeStatus.value = 'active';
      createMessage.loading('开始转码，请耐心等待');
      try {
        await aliyunUploadTransCode({
          lessonId: data.id,
          coverImageUrl: imageURL.value,
          fileName: fileName.value,
          fileId: videoId.value,
        });
      }
      catch (error: any) {
        transCodeStatus.value = 'exception';
        createMessage.error(`转码失败:${error.message}`);
      }

      const timer = setInterval(async () => {
        const res = await AliyunUploadTransPercent({ lessonId: data.id });
        transCodePercent.value = res;
        if (res === 100) {
          transCodeStatus.value = 'success';
          createMessage.success('转码成功');
          window.clearInterval(timer);
          closeModal();
        }
      }, 3000);
    },
  });
});

function handleSubmit() {
  const videoFile = video.value?.files;
  const imageFile = image.value?.files;
  uploader.value.addFile(imageFile[0], null, null, null, '{"Vod":{}}');
  uploader.value.addFile(videoFile[0], null, null, null, '{"Vod":{}}');
  fileName.value = videoFile.name;
  uploader.value.startUpload();
}
</script>

<template>
  <BasicModal title="上传视频" @register="registerModal" @ok="handleSubmit">
    <Form label-align="left">
      <FormItem label="课程名称">
        <Input v-model:value="courseName" disabled />
      </FormItem>
      <FormItem label="课时名称">
        <Input v-model:value="theme" disabled />
      </FormItem>
      <FormItem label="视频上传">
        <input ref="video" type="file">
      </FormItem>
      <FormItem label="封面上传">
        <input ref="image" type="file">
      </FormItem>
      <FormItem label="上传进度">
        <Progress :percent="uploadPercent" :status="uploadStatus" />
      </FormItem>
      <FormItem label="转码进度">
        <Progress :percent="transCodePercent" :status="transCodeStatus" />
      </FormItem>
    </Form>
  </BasicModal>
</template>
