<script lang="ts" setup>
  import { ref } from 'vue';
  import { CheckboxGroup } from 'ant-design-vue';
  import { allocateRoleMenus, getEditMenuInfo, getRoleMenus } from '/@/api/sys/menu';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { EditMenuInfo } from '/@/api/sys/model/systemModel';
  import { useMessage } from '/@/hooks/web/useMessage';
  import {
    allocateRoleResource,
    getAllResource,
    getResourceCate,
    getRoleResource,
  } from '/@/api/sys/resource';

  const treeData = ref<TreeItem[]>([]);
  const checkedList = ref<number[]>([]);
  const checkboxData = ref();
  const isMenu = ref(true);
  const roleId = ref<number>(-1);
  const selectedArr = ref<number[]>([]);
  defineEmits(['register']);

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    setDrawerProps({ confirmLoading: false });
    treeData.value = [];
    checkedList.value = [];

    isMenu.value = data.allocateMenu;
    const arr: number[] = [];

    roleId.value = data.record.id;
    let isAddParentId = true;
    function getId<T>(menuList: T, children = 'subMenuList') {
      if (Array.isArray(menuList)) {
        menuList.forEach((item) => {
          if (item[children]) {
            getId(item[children]);
            isAddParentId && item.selected && arr.push(item.id);
            isAddParentId = true;
            return;
          }
          if (item.selected) {
            isAddParentId = false;
            arr.push(item.id);
          }
        });
      }
    }
    if (isMenu.value) {
      const res = await Promise.all([getEditMenuInfo(), getRoleMenus(roleId.value)]);
      treeData.value = res[0].parentMenuList;
      getId<EditMenuInfo['parentMenuList']>(res[1]);
      selectedArr.value = arr;
    } else {
      const res = await Promise.all([
        getAllResource(),
        getResourceCate(),
        getRoleResource(roleId.value),
      ]);
      res[1].forEach((item) => {
        item.children = [];
      });
      res[0].forEach((item) => {
        res[1].forEach((cate) => {
          if (cate.id === item.categoryId) {
            cate.children.push({ label: item.name, value: item.id });
          }
        });
      });
      checkboxData.value = res[1];
      res[2].forEach((item) => {
        if (item.resourceList) {
          item.resourceList.forEach((resource) => {
            resource.selected && checkedList.value.push(resource.id);
          });
        }
      });
    }
  });

  const { createMessage } = useMessage();
  async function handleSubmit() {
    try {
      setDrawerProps({ confirmLoading: true });
      if (isMenu.value) {
        const res = await allocateRoleMenus({
          roleId: roleId.value,
          menuIdList: selectedArr.value,
        });
        if (res) {
          createMessage.success('菜单分配成功');
          closeDrawer();
        }
      } else {
        const res = await allocateRoleResource({
          roleId: roleId.value,
          resourceIdList: checkedList.value,
        });
        if (res) {
          createMessage.success('资源分配成功');
          closeDrawer();
        }
      }
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>

<template>
  <BasicDrawer
    @register="registerDrawer"
    v-bind="$attrs"
    show-footer
    width="500"
    @ok="handleSubmit"
  >
    <BasicTree
      v-model:value="selectedArr"
      title="菜单分配"
      toolbar
      checkable
      :replace-fields="
        isMenu
          ? { title: 'name', key: 'id', children: 'subMenuList' }
          : { title: 'name', children: 'resourceList', key: 'id' }
      "
      :tree-data="treeData"
      default-expand-all
      v-if="treeData.length"
    />
    <div v-show="!isMenu">
      <div v-for="data of checkboxData" :key="data.id" class="mt-4">
        <div class="border-b border-b-gray-400 text-lg"> {{ data.name }}</div>
        <br />
        <CheckboxGroup :options="data.children" v-model:value="checkedList" />
      </div>
    </div>
  </BasicDrawer>
</template>
