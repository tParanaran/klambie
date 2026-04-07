import ErrorMessage from '@/views/components/error';
import { IProductDashboard } from './types';
import ProductsTableMobile from './components/productsTableMobile';
import ProductsTable from './components/productsTable';
import Pagination from '../c/components/pagination';
import { IPagination } from '../c/types';

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
  return (
    <div className="relative px-3 pt-15 sm:pt-18 md:pt-20">
      <ProductsTable products={products} />
      <ProductsTableMobile products={products} />
      {error && <ErrorMessage error={error} />}
      <nav className="flex justify-between items-center w-full lg:w-1/2 mx-auto font-semibold space-x-1 py-5">
        <Pagination {...pages} />
      </nav>
    </div>
  );
}
