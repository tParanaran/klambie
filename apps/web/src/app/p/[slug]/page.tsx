import { getOneProduct } from '@/api/product';
import ProductView from '@/views/pages/product';
import { notFound } from 'next/navigation';

export default async function Product({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const product = await getOneProduct(slug);

  if (!product) return notFound();

  return <ProductView product={product} />;
}
