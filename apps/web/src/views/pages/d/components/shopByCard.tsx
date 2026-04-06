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
          <div className="gap-2 md:gap-3 grid grid-flow-col auto-cols-[200px] lg:grid-cols-5 md:grid-rows-2 text-sm mt-5">
            <ProductCard products={products} style="aspect-square" />
          </div>
        </HorizontalScrollButton>
      ) : (
        <SearchNotFound children={undefined} />
      )}
    </div>
  );
}
