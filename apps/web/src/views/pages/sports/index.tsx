import ShopByEssenstials from '../men/components/shopByEssential';
import ProductCard from '../men/components/card';
import { IProducts, ITag } from '../product/types/product.types';

export default async function SportsView({
  products,
  tags,
}: {
  products: IProducts[];
  tags: ITag[];
}) {
  return (
    <div>
      <ShopByEssenstials tags={tags} />
      <ProductCard products={products} />
    </div>
  );
}
