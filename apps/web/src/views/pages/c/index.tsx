import SearchNotFound from '../d/components/notfound';
import { IProducts } from '../p/types/product.types';
import ProductCard from './components/card';
import SideNavbar from './components/sideNavbar';
import { IFilters } from './types';

export default function CategoryView({
  products,
  filters,
}: {
  products: IProducts[];
  filters: IFilters[];
}) {
  return (
    <div className="flex gap-6">
      <SideNavbar filters={filters} />

      {products?.length > 0 ? (
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-0.5 h-screen">
          <ProductCard products={products} />
        </div>
      ) : (
        <SearchNotFound children={undefined} />
      )}
    </div>
  );
}
