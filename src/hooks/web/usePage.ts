import type { RouteLocationRaw, Router } from 'vue-router';

import { unref } from 'vue';
import { PageEnum } from '/@/enums/pageEnum';
import { isString } from '/@/utils/is';
import { useRouter } from 'vue-router';
import { REDIRECT_NAME } from '/@/router/constant';

export type RouteLocationRawEx = Omit<RouteLocationRaw, 'path'> & { path: PageEnum };

const handleError = (e: Error) => console.log(e); // eslint-disable-line no-console

export function useGo(_router?: Router) {
  let router;
  if (!_router)
    router = useRouter();
    // console.log(router);

  const { push, replace } = _router || router;
  function go(opt: PageEnum | RouteLocationRawEx | string = PageEnum.BASE_HOME, isReplace = false) {
    if (!opt)
      return;

    if (isString(opt)) {
      isReplace ? replace(opt).catch(handleError) : push(opt).catch(handleError);
    }
    else {
      const o = opt as RouteLocationRaw;
      isReplace ? replace(o).catch(handleError) : push(opt).catch(handleError);
    }
  }
  return go;
}

/**
 * @description: redo current page
 */
export const useRedo = (_router?: Router) => {
  const { push, currentRoute } = _router || useRouter();
  const { query, params = {}, name, fullPath } = unref(currentRoute.value);
  function redo(): Promise<boolean> {
    return new Promise(resolve => {
      if (name === REDIRECT_NAME) {
        resolve(false);
        return;
      }
      if (name && Object.keys(params).length > 0) {
        params._redirect_type = 'name';
        params.path = String(name);
      }
      else {
        params._redirect_type = 'path';
        params.path = fullPath;
      }
      push({ name: REDIRECT_NAME, params, query }).then(() => resolve(true));
    });
  }
  return redo;
};
