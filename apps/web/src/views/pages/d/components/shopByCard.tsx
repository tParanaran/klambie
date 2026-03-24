'use client';
import ProductCard from '../../c/components/card';
import SearchNotFound from './notfound';
import ShopByButton from './shopByButton';
import { IShopByCard } from '../types';
import HorizontalScrollButton from './buttonScroll';

export default function ShopByCard({ products, slug }: IShopByCard) {
  return (
    <div className="relative z-10 ">
      <ShopByButton slug={slug} />
      {products?.length > 0 ? (
        <HorizontalScrollButton>
          <div className="flex gap-2 lg:grid lg:grid-cols-5 my-3 text-sm!">
            <ProductCard
              products={products}
              style="w-40 sm:w-48 lg:w-auto sm:h-fit"
              cardStyle="h-40! sm:h-56!"
            />
          </div>
        </HorizontalScrollButton>
      ) : (
        <SearchNotFound children={undefined} />
      )}
    </div>
  );
}
