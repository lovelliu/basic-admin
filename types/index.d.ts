declare interface Fn<T = any, R = T> {
  (...args: T[]): R;
}
