import type { ComponentRenderProxy, VNode, PropType as VueProType } from 'vue';

declare global {
  declare type Recordable<T = any> = Record<string, T>;
  declare type Nullable<T> = T | null;
  declare type TimeoutHandle = ReturnType<typeof setTimeout>;
  declare type PropType<T> = VueProType<T>;
  declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
  };
  interface ImportMetaEnv extends ViteEnv {
    __: unknown;
  }

  interface Window {
    AliyunUpload: any;
  }

  declare interface ViteEnv {
    VITE_PORT: number;
    VITE_USE_MOCK: boolean;
    VITE_USE_PWA: boolean;
    VITE_PUBLIC_PATH: string;
    VITE_PROXY: [string, string][];
    VITE_GLOB_APP_TITLE: string;
    VITE_GLOB_APP_SHORT_NAME: string;
    VITE_USE_CDN: boolean;
    VITE_DROP_CONSOLE: boolean;
    VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
    VITE_LEGACY: boolean;
    VITE_USE_IMAGEMIN: boolean;
    VITE_GENERATE_UI: string;
  }

  declare interface ChangeEvent extends Event {
    target: HTMLInputElement;
  }

  declare function parseInt(s: string | number, radix?: number): number;

  namespace JSX {
    // tslint:disable no-empty-interface
    type Element = VNode;
    // tslint:disable no-empty-interface
    type ElementClass = ComponentRenderProxy;
    interface ElementAttributesProperty {
      $props: any;
    }
    interface IntrinsicElements {
      [elem: string]: any;
    }
    interface IntrinsicAttributes {
      [elem: string]: any;
    }
  }
}

declare module 'vue' {
  export type JSXComponent<Props = any> =
    | { new (): ComponentPublicInstance<Props> }
    | FunctionalComponent<Props>;
}
