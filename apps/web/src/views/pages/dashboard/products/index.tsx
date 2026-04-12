'use client';
import { IProductDashboard } from './types';
import { IPagination } from '../../c/types';
import ErrorMessage from '@/views/components/error';
import Pagination from '../../c/components/pagination';
import ProductCard from './components/productCard';
import { useState } from 'react';
import ProductsTable from './components/productsTable';
import ProductsTableMobile from './components/productsTableMobile';
import ViewToggle from './components/viewToggle';
import SortToggle from './components/sortToggle';
import useFilteredParams from '../../c/hooks/useFilteredParams';

interface IProductView {
  products: IProductDashboard[];
  error?: string;
  pages: IPagination;
}
export default function ProductsDahsboardView({
  products,
  error,
  pages,
}: IProductView) {
  const { currentOrderBy, currentSortBy } = useFilteredParams();
  const [view, setView] = useState<'CARD' | 'TABLE'>('CARD');

  const viewHandler = (viewMode: 'CARD' | 'TABLE') => {
    setView(viewMode);
  };
  return (
    <div className="relative px-3">
      <div className="my-1 flex justify-between space-x-1 sticky top-1 z-10 mx-1">
        <div className="bg-primary-opacity backdrop-blur-xl rounded-lg">
          <ViewToggle view={view} setView={viewHandler} />
        </div>
        <div className="overflow-y-scroll scrollbar-hide max-w-108 w-full sm:w-fit bg-primary-opacity backdrop-blur-xl rounded-lg">
          <SortToggle
            view={view}
            sort={'sortBy'}
            order={'orderBy'}
            currentOrder={currentOrderBy}
            currentSort={currentSortBy}
            isScroll={true}
          />
        </div>
      </div>
      <div className="transition-all duration-300">
        {view === 'CARD' ? (
          <ProductCard products={products} />
        ) : (
          <>
            <ProductsTable products={products} />
            <ProductsTableMobile products={products} />
          </>
        )}
      </div>
      {error && <ErrorMessage error={error} />}
      <nav className="flex justify-between items-center w-full lg:w-1/2 mx-auto font-semibold space-x-1 py-5">
        <Pagination {...pages} />
      </nav>
    </div>
  );
}
