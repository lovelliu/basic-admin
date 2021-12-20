<script lang="ts" setup>
  import type { LessonData } from '/@/api/business/model/course';

  import { h, ref } from 'vue';
  import { Button as AButton } from 'ant-design-vue';
  import { useRoute } from 'vue-router';
  import { PageWrapper } from '/@/components/Page';
  import { useModal } from '/@/components/Modal';
  import { BasicTree, TreeActionItem } from '/@/components/Tree';
  import { Button } from '/@/components/Button';
  import { getLessonInfoById } from '/@/api/business/course';
  import { useGo } from '/@/hooks/web/usePage';
  import LessonModal from './LessonModal.vue';
  import { rgbToHex } from '/@/utils/color';
  import AliUploadModal from './AliUploadModal.vue';

  const route = useRoute();
  const go = useGo();
  const treeData = ref<LessonData[]>([]);

  const [registerModal, { openModal }] = useModal();
  const [registerUploadModal, { openModal: openUploadModal }] = useModal();

  const actionList: TreeActionItem[] = [
    {
      render: (node: LessonData) => {
        return h(
          AButton,
          {
            type: 'default',
            size: 'small',
            style: { color: rgbToHex(96, 98, 102), marginRight: '5px' },
            onClick: () => {
              openModal(true, node);
            },
          },
          () => '编辑',
        );
      },
    },
    {
      render: (node: LessonData) => {
        return node.level === 1
          ? h(
              Button,
              {
                type: 'primary',
                size: 'small',
                onClick: () => {
                  openModal(true, { ...node, isAdd: true });
                },
              },
              () => '添加课时',
            )
          : h(
              Button,
              {
                color: 'success',
                size: 'small',
                onClick: () => {
                  openUploadModal(true, node);
                },
              },
              () => '上传视频',
            );
      },
    },
  ];

  function repalceTitle(data) {
    data.forEach((item) => {
      item.key = item.id;

      if (item.lessonDTOS) {
        repalceTitle(item.lessonDTOS);
      }
      if (item.theme) item.sectionName = item.theme;
    });
  }
  if (route.query.id) {
    getLessonInfoById(route.query.id).then((res) => {
      repalceTitle(res);
      console.log(res);

      treeData.value = res;
    });
  } else {
    go('/course/index');
  }

  function reload() {
    getLessonInfoById(route.query.id).then((res) => {
      repalceTitle(res);
      treeData.value = res;
    });
  }
</script>

<template>
  <PageWrapper @back="go('/course/index')" title="内容管理">
    <BasicTree
      :field-names="{
        title: 'sectionName',
        children: 'lessonDTOS',
        key: 'id',
      }"
      :tree-data="treeData"
      :action-list="actionList"
    />
    <LessonModal @register="registerModal" @success="reload" />
    <AliUploadModal @register="registerUploadModal" />
  </PageWrapper>
</template>
