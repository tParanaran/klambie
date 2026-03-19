import ErrorMessage from '@/views/components/error';
import ShopByCard from './components/shopByCard';
import { IDepartementView } from './types';

export default async function SportsView({
  products,
  error,
}: IDepartementView) {
  return (
    <div>
      <ShopByCard products={products} />
      {error && <ErrorMessage error={error} />}
    </div>
  );
}
