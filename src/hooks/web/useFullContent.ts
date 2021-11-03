import { computed, unref } from 'vue';
import { useAppStore } from '/@/store/modules/app';
import { useRouter } from 'vue-router';

/**
 * @description: Full screen display content
 */
export const useFullContent = () => {
  const appStore = useAppStore();
  const router = useRouter();
  const { currentRoute } = router;

  const getFullContent = computed(() => {
    const route = unref(currentRoute);
    const query = route.query;
    if (query && Reflect.has(query, '__full__')) {
      return true;
    }
    return appStore.getProjectConfig.fullContent;
  });

  return { getFullContent };
};
