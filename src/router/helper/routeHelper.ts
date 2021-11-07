// import { cloneDeep } from 'lodash-es';
// import type { AppRouteModule, AppRouteRecordRaw } from '/@/router/types';
// import {} from '/@/router/constant';

// const LayoutMap = new Map<string, () => Promise<typeof import('*.vue')>>();

// export function transformObjToRoute<T = AppRouteModule>(routeList: AppRouteModule[]): T[] {
//   routeList.forEach((route) => {
//     const component = route.component as string;
//     if (component) {
//       if (component.toUpperCase() === 'LAYOUT') {
//         route.component = LayoutMap.get(component.toUpperCase());
//       } else {
//         route.children = [cloneDeep(route)];
//         route.component = L;
//       }
//     }
//   });
// }
