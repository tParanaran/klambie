export function normalizeParams(
  param: string | string[] | undefined,
  toNumber = false,
): (string | number)[] {
  if (!param) return [];

  const arr = Array.isArray(param) ? param : [param];
  return toNumber ? arr.map((v) => Number(v)) : arr;
}
