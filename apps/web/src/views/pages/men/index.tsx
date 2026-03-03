import ProductCard from './components/card';
import ShopByEssenstials from './components/shopByEssential';
import { IProducts, ITag } from '../product/types/product.types';

export default async function MenView({
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
