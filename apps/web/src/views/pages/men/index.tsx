import { getProducts, getTags } from '@/api/product';
import ProductCard from './components/card';
import ShopByEssenstials from './components/shopByEssential';

export default async function MenView({ slug }: { slug: string }) {
  const products = await getProducts(slug);
  const tags = await getTags();

  return (
    <div>
      <ShopByEssenstials tags={tags} />
      <ProductCard products={products} />
    </div>
  );
}
