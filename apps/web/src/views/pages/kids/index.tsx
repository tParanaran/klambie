import ShopByEssenstials from '../men/components/shopByEssential';
import ProductCard from '../men/components/card';
import { IProducts } from '../product/types/product.types';
import { ITag } from '../men/types';

export default async function KidsView({
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
