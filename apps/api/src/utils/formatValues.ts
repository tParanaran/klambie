import Decimal from 'decimal.js';

type PriceFormatOption = 'number' | 'string' | 'rupiah' | 'percent';

export function FormatValues<T extends Record<string, Decimal>>(
  obj: T,
  formatMap: { [K in keyof T]?: PriceFormatOption } = {},
) {
  const result: any = {};
  for (const key in obj) {
    const value = obj[key];
    const option = formatMap[key] ?? 'number';

    switch (option) {
      case 'number':
        result[key] = value.toNumber();
        break;
      case 'string':
        result[key] = value.toString();
        break;
      case 'rupiah':
        result[key] = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          maximumFractionDigits: 0,
        }).format(value.toNumber());
        break;
      case 'percent':
        result[key] = `${value.toNumber()}%`;
        break;
    }
  }
  return result as { [K in keyof T]: string | number };
}
