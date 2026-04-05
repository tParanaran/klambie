import ErrorMessage from '@/views/components/error';
import { IProductDashboard } from './types';
import ProductTable from './components/productsTable';
import ProductTableMobile from './components/productTableMobile';

export interface IProductView {
  products: IProductDashboard[];
  error?: string;
}
export default function ProductsDahsboardView({
  products,
  error,
}: IProductView) {
  return (
    <div className="px-3 my-5 sm:my-15 overflow-x-scroll scrollbar-hide max-w-screen">
      <ProductTable products={products} />
      <ProductTableMobile products={products} />
      {error && <ErrorMessage error={error} />}
    </div>
  );
}
