import { IProducts } from '../p/types/product.types';
import { ICategories } from './types';
import SearchNotFound from '../d/components/notfound';
import SideNavbar from './components/sideNavbar';
import ProductCard from './components/card';

interface ICategoryView {
  products: IProducts[];
  filters: ICategories[];
}

export default function CategoryView({ products, filters }: ICategoryView) {
  return (
    <div className="flex gap-3 md:gap-5">
      <SideNavbar filters={filters} />

      {products?.length > 0 ? (
        <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-2 text-sm md:text-base">
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
