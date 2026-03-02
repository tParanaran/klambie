import { getProducts, getTags } from '@/api/product';
import ShopByEssenstials from '../men/components/shopByEssential';
import ProductCard from '../men/components/card';

export default async function KidsView({ slug }: { slug: string }) {
  const products = await getProducts(slug);
  const tags = await getTags();

  return (
    <div>
      <ShopByEssenstials tags={tags} />
      <ProductCard products={products} />
    </div>
  );
}
