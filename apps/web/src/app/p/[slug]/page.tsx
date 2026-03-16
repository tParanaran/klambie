import axiosInstanceServer from '@/lib/axios/server';
import { Notify } from '@/lib/notify';
import ProductView from '@/views/pages/p';
import { notFound } from 'next/navigation';

export default async function Product({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  let product = null;

  try {
    const { data } = await axiosInstanceServer.get(`/product/${slug}`);
    product = data;
  } catch (error) {
    Notify('Something go wrong');
    product = null;
  }

  if (!product) return notFound();

  return <ProductView product={product} />;
}
