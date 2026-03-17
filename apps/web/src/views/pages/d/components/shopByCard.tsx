import { Suspense } from 'react';
import { IProducts, ITag } from '../../p/types/product.types';
import SearchNotFound from './notfound';
import ShopByButton from './shopByButton';
import Loading from '@/views/components/loading';
import ProductCard from '../../c/components/card';

export default function ShopByCard({
  products,
  tags,
}: {
  products: IProducts[];
  tags: ITag[];
}) {
  return (
    <div>
      <ShopByButton tags={tags} />
      <Suspense fallback={<Loading />}>
        {products?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 my-5">
            <ProductCard products={products} />
          </div>
        ) : (
          <SearchNotFound children={undefined} />
        )}
      </Suspense>
    </div>
  );
}
