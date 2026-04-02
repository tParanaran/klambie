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
  query?: string;
}

export default function CategoryView({
  products,
  filters,
  totalItems,
  query,
}: ICategoryView) {
  const { isMobile } = useDetectIsMobile({ widthScreen: 1024, maxWitdh: 850 });

  return (
    <>
      <div className="mt-5 md:mt-0 relative">
        <TopNavbar totalItems={totalItems} filters={filters} query={query} />
      </div>

      <div className="flex gap-2 min-h-screen">
        <aside className="w-50 md:w-3xs lg:w-2xs mb-5 hidden sm:block">
          <nav className="sticky top-24 max-h-[calc(100vh-5rem)] overflow-y-auto space-y-3 scrollbar-hide">
            <SideNavbar filters={filters} />
          </nav>
        </aside>

        <div className="flex-1 flex flex-col">
          {products.length > 0 ? (
            <div className="flex-1">
              <div
                className={`grid grid-cols-2 ${isMobile ? 'grid-cols-3 text-sm' : 'lg:grid-cols-3 text-[15px]'} gap-5`}
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
    </>
  );
}
