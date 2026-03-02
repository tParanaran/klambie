import { getOneProduct } from '@/api/product';
import ProductView from '@/views/pages/product';

export default async function Product({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const product = await getOneProduct(slug);

  return <ProductView product={product} />;
}
