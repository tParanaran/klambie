'use client';
import { IProducts } from '../p/types/product.types';
import { ICategories } from './types';
import SearchNotFound from '../d/components/notfound';
import SideNavbar from './components/sideNavbar';
import ProductCard from './components/card';
import useDetectIsMobile from '../template/hooks/useDetectIsMobile';
import TopNavbar from './components/topNavbar';
import Pagination from './components/pagination';
import Footer from './components/footer';

interface ICategoryView {
  products: IProducts[];
  filters: ICategories[];
  totalItems: number;
}

export default function CategoryView({
  products,
  filters,
  totalItems,
}: ICategoryView) {
  const { isMobile } = useDetectIsMobile({ widthScreen: 1024, maxWitdh: 850 });

  console.log(products);

  return (
    <div>
      <div className="my-2 flex lg:items-center items-end">
        <TopNavbar totalItems={totalItems} />
      </div>

      <div className="flex gap-2 min-h-screen">
        <SideNavbar filters={filters} />

        <div className="flex-1 flex flex-col">
          {products.length > 0 ? (
            <div className="flex-1">
              <div
                className={`grid grid-cols-2 ${isMobile ? 'grid-cols-3 text-sm' : 'lg:grid-cols-3 text-[15px]'} gap-2`}
              >
                <ProductCard products={products} />
              </div>{' '}
            </div>
          ) : (
            <div className="flex-1">
              <SearchNotFound children={undefined} />
            </div>
          )}
          <div>
            {products.length > 0 && (
              <nav className="flex justify-between items-center w-full lg:w-1/2 mx-auto font-semibold space-x-1 my-5">
                <Pagination totalItems={totalItems} />
              </nav>
            )}
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
