import type { Menu } from '/@/router/types';
import type { MenuMode } from 'ant-design-vue/lib/menu/src/interface';
import type { MenuTheme } from 'ant-design-vue';

import { propTypes } from '/@/utils/propTypes';
import { MenuModeEnum, MenuTypeEnum } from '/@/enums/menuEnum';
import { ThemeEnum } from '/@/enums/appEnum';

export const basicProps = {
  items: {
    type: Array as PropType<Menu[]>,
    default: () => [],
  },
  collapsedShowTitle: propTypes.bool,
  // A multiple of 4 is best
  inlineIndent: propTypes.number.def(20),
  // The mode property of the menu component
  mode: {
    type: String as PropType<MenuMode>,
    default: MenuModeEnum.INLINE,
  },
  type: {
    type: String as PropType<MenuTypeEnum>,
    default: MenuTypeEnum.MIX,
  },
  theme: {
    type: String as PropType<MenuTheme>,
    default: ThemeEnum.DARK,
  },
  inlineCollapsed: propTypes.bool,
  mixSider: propTypes.bool,
  isHorizontal: propTypes.bool,
  accordion: propTypes.bool.def(true),
  beforeClickFn: {
    type: Function as PropType<(key: string) => Promise<boolean>>,
  },
};

export const itemProps = {
  item: {
    type: Object as PropType<Menu>,
    default: {},
  },
  level: propTypes.number,
  theme: propTypes.oneOf(['dark', 'light']),
  showTitle: propTypes.bool,
  isHorizontal: propTypes.bool,
};

export const contentProps = {
  item: {
    type: Object as PropType<Menu>,
    default: null,
  },
  showTitle: propTypes.bool.def(true),
  level: propTypes.number.def(0),
  isHorizontal: propTypes.bool.def(true),
};
