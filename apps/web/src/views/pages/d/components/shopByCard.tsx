import { IProducts, ITag } from '../../p/types/product.types';
import ProductCard from '../../c/components/card';
import SearchNotFound from './notfound';
import ShopByButton from './shopByButton';

interface IShopByCard {
  products: IProducts[];
  tags: ITag[];
}

export default function ShopByCard({ products, tags }: IShopByCard) {
  return (
    <div>
      <ShopByButton tags={tags} />
      {products?.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 my-5 text-sm!">
          <ProductCard products={products} />
        </div>
      ) : (
        <SearchNotFound children={undefined} />
      )}{' '}
    </div>
  );
}
