export default function Rupiah(price: string) {
  return new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 0,
    style: 'currency',
    currency: 'IDR',
  }).format(Number(price));
}

export const toNumber = (value: string | number, fallback = 0) => {
  const n = Number(value);
  return isNaN(n) ? fallback : n;
};

export const toNullableNumber = (value: string | null | undefined | number) => {
  if (value === '' || value === null || value === undefined) return null;
  const n = Number(value);
  return isNaN(n) ? null : n;
};
