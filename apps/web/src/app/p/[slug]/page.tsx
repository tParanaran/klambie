import axiosInstanceServer from '@/lib/axios/server';
import ProductView from '@/views/pages/product';
import { notFound } from 'next/navigation';

export default async function Product({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const { data } = await axiosInstanceServer.get(`/product/${slug}`);

  if (!data) return notFound();

  return <ProductView product={data} />;
}
