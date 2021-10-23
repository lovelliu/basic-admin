/**
 * @description: It is a development mode
 */
export function isDevMode(): boolean {
  return import.meta.env.DEV;
}
