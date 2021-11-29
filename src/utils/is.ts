const toString = Object.prototype.toString;

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

export function isFunction(val: unknown): val is Function {
  return typeof val === 'function';
}

export function isNumber(val: unknown): val is number {
  return is(val, 'Number');
}

export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== 'undefined';
}

export function isUndef<T = unknown>(val?: T): val is T {
  return !isDef(val);
}

export function isNull(val: unknown): val is null {
  return val === null;
}

export function isNullAndUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) && isNull(val);
}

export function isNullOrUndef(val: unknown): val is null | undefined {
  return isUndef(val) || isNull(val);
}

export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object');
}

export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean');
}

export function isString(val: unknown): val is string {
  return is(val, 'String');
}

export function isMap(val: unknown): val is Map<any, any> {
  return is(val, 'Map');
}

export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val);
}

export function isUrl(path: string): boolean {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
}

export function isUnDef<T = unknown>(val?: T): val is T {
  return !isDef(val);
}

export const isServer = typeof window === 'undefined';
