<script lang="ts" setup>
  import { ref } from 'vue';
  import { Select } from 'ant-design-vue';
  import { allocateRole, getRolesById } from '/@/api/sys/role';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';

  defineEmits(['register', 'success']);
  const selected = ref<number[]>([]);
  const rowId = ref<number>(-1);
  const selectArr = ref<{ label: string; value: number }[]>([]);
  const [registerModal, { closeModal, setModalProps }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false });
    selectArr.value = [];
    selected.value = [];
    rowId.value = data.id;
    const res = await getRolesById(data.id);
    res.forEach((item) => {
      selectArr.value.push({ label: item.name, value: item.id });
      if (item.hasPermission) {
        selected.value.push(item.id);
      }
    });
  });

  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      const res = await allocateRole({ userId: rowId.value, roleIdList: selected.value });
      if (res) {
        const { createMessage } = useMessage();
        createMessage.success('分配成功');
        closeModal();
      }
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>

<template>
  <BasicModal @register="registerModal" title="分配角色" @ok="handleSubmit">
    <Select mode="multiple" :options="selectArr" v-model:value="selected" style="width: 100%" />
  </BasicModal>
</template>
