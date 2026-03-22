import ErrorMessage from '@/views/components/error';
import ShopByCard from './components/shopByCard';
import { IDepartementView } from './types';
import ShopByCategory from './components/shopByCategory';

export default async function SportsView({
  slug,
  products,
  error,
}: IDepartementView) {
  return (
    <div>
      <ShopByCategory slug={slug} />
      <ShopByCard products={products} />
      {error && <ErrorMessage error={error} />}
    </div>
  );
}
