declare interface Fn<T = any, R = T> {
  (...args: T[]): R;
}

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;
