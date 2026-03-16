import { Suspense } from 'react';
import { IProducts, ITag } from '../../p/types/product.types';
import ProductCard from './card';
import SearchNotFound from './notfound';
import ShopByButton from './shopByButton';
import Loading from '@/views/components/loading';

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
          <ProductCard products={products} />
        ) : (
          <SearchNotFound children={undefined} />
        )}
      </Suspense>
    </div>
  );
}
