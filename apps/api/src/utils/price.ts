import Decimal from 'decimal.js';

type Price = {
  bPrice: Decimal;
  cPrice: Decimal;
  variantPrice:
    | {
        basePrice: Decimal;
        comparePrice: Decimal;
        productVariantAttributes: {
          attributeValue: {
            hexUrl: string | null;
          };
        }[];
      }[]
    | null;
};

export function Price(price: Price) {
  const { bPrice, cPrice, variantPrice } = price;

  let minBasePrice = bPrice;
  let minComparePrice = cPrice;

  if (variantPrice) {
    const allBasePrices = [
      bPrice,
      ...variantPrice.map((v) => v.basePrice),
    ].filter(Boolean);
    const allComparePrices = [
      cPrice,
      ...variantPrice.map((v) => v.comparePrice),
    ].filter(Boolean);

    minBasePrice = Decimal.min(...allBasePrices);
    minComparePrice = Decimal.max(...allComparePrices);
  }

  const basePrice = String(minBasePrice);
  const comparePrice =
    minComparePrice && !minComparePrice.isZero()
      ? String(minComparePrice)
      : null;
  const discountPercentage =
    minComparePrice && !minComparePrice.isZero()
      ? minComparePrice
          .minus(minBasePrice)
          .dividedBy(minComparePrice)
          .times(100)
          .toFixed(1)
      : null;

  return { basePrice, comparePrice, discountPercentage };
}
