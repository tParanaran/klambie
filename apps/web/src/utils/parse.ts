export function Parse(priceStr: string): number | null {
  if (!priceStr) return null;

  const match = priceStr.match(/[\d,.]+/);
  if (!match) return null;

  const number = Number(match[0].replace(/,/g, ''));
  return isNaN(number) ? null : number;
}
