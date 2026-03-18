'use client';
import { IProducts } from '../p/types/product.types';
import { ICategories } from './types';
import SearchNotFound from '../d/components/notfound';
import SideNavbar from './components/sideNavbar';
import ProductCard from './components/card';
import useDetectIsMobile from '../template/hooks/useDetectIsMobile';

interface ICategoryView {
  products: IProducts[];
  filters: ICategories[];
}

export default function CategoryView({ products, filters }: ICategoryView) {
  const { isMobile } = useDetectIsMobile({ widthScreen: 1024, maxWitdh: 850 });
  return (
    <div className="flex gap-2">
      <SideNavbar filters={filters} />

      {products?.length > 0 ? (
        <div
          className={`flex-1 grid grid-cols-2 ${isMobile ? 'grid-cols-3 text-sm' : 'lg:grid-cols-3 text-sm md:text-base'} gap-2 `}
        >
          <ProductCard products={products} />
        </div>
      ) : (
        <div className="flex-1">
          <SearchNotFound children={undefined} />
        </div>
      )}
    </div>
  );
}
