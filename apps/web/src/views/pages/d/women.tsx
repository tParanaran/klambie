import ErrorMessage from '@/views/components/error';
import ShopByCard from './components/shopByCard';
import IDepartementView from './types';

export default async function WomenView({
  products,
  tags,
  error,
}: IDepartementView) {
  return (
    <div>
      <ShopByCard products={products} tags={tags} />
      {error && <ErrorMessage error={error} />}
    </div>
  );
}
