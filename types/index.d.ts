declare interface Fn<T = any, R = T> {
  (...args: T[]): R;
}

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;
declare type TargetContext = '_self' | '_blank';
declare type EmitType = (event: string, ...args: any[]) => void;
