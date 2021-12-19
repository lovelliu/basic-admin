import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const course: AppRouteModule = {
  path: '/course',
  name: 'Course',
  component: LAYOUT,
  redirect: '/course/index',
  meta: {
    orderNo: 3000,
    hideChildrenInMenu: true,
    icon: 'ant-design:read-outlined',
    title: t('routes.demo.course.course'),
  },
  children: [
    {
      path: 'index',
      name: 'CourseManagement',
      meta: {
        title: t('routes.demo.course.course'),
        ignoreKeepAlive: true,
        hideMenu: true,
      },
      component: () => import('/@/views/course/index.vue'),
    },
    {
      path: 'basic-course',
      name: 'BasicCourse',
      meta: {
        title: t('routes.demo.course.edit_course'),
        ignoreKeepAlive: true,
        hideMenu: true,
        hideTab: true,
      },
      component: () => import('/@/views/course/BasicCourse.vue'),
    },
    {
      path: 'lesson',
      name: 'Lesson',
      meta: {
        title: t('routes.demo.course.lesson'),
        ignoreKeepAlive: true,
        hideMenu: true,
        hideTab: true,
      },
      component: () => import('/@/views/course/Lesson.vue'),
    },
  ],
};

export default course;
