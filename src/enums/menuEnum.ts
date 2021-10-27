export enum MenuTypeEnum {
  SIDEBAR = 'sidebar',

  MIX_SIDEBAR = 'mix-sidebar',

  MIX = 'mix',
  TOP_MENU = 'top-menu',
}

export enum TriggerEnum {
  NONE = 'NONE',
  FOOTER = 'FOOTER',
  HEADER = 'HEADER',
}

export type Mode = 'vertical' | 'vertical-right' | 'horizontal' | 'inline';

export enum MenuModeEnum {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
  VERTICAL_RIGHT = 'vertical-right',
  INLINE = 'inline',
}

export enum MenuSplitTypeEnum {
  NONE,
  TOP,
  LEFT,
}

export enum TopMenuAlignEnum {
  CENTER = 'center',
  START = 'start',
  END = 'end',
}

export enum MixSidebarTriggerEnum {
  HOVER = 'hover',
  CLICK = 'click',
}
