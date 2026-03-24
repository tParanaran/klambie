import ErrorMessage from '@/views/components/error';
import ShopByCard from './components/shopByCard';
import { IDepartementView } from './types';
import ShopByCategory from './components/shopByCategory';

export default async function MenView({
  products,
  error,
  slug,
}: IDepartementView) {
  return (
    <div>
      <ShopByCategory slug={slug} />
      <ShopByCard products={products} slug={slug}/>
      {error && <ErrorMessage error={error} />}
    </div>
  );
}
