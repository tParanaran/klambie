import { IProducts, ITag } from '../p/types/product.types';
import ShopByCard from './components/shopByCard';

export default async function GroomityView({
  products,
  tags,
}: {
  products: IProducts[];
  tags: ITag[];
}) {
  return (
    <div>
      <ShopByCard products={products} tags={tags} />
    </div>
  );
}
