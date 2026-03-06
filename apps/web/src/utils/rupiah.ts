export default function Rupiah(price: string) {
  return new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 0,
    style: 'currency',
    currency: 'IDR',
  }).format(Number(price));
}
