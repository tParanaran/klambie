import ErrorMessage from '@/views/components/error';
import ShopByCard from './components/shopByCard';
import { IDepartementView } from './types';

export default async function GroomityView({
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
