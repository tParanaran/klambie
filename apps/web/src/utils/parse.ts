export function Parse(priceStr: string): number | null {
  if (!priceStr) return null;

  const match = priceStr.match(/[\d.,]+/);
  if (!match) return null;

  const normalized = match[0].replace(/[.,]/g, '');
  const number = Number(normalized);

  return isNaN(number) ? null : number;
}
