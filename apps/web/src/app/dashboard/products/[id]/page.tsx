import axiosInstanceServer from '@/lib/axios/server';
import AddProductDahsboardView from '@/views/pages/dashboard/products/addProduct';
import { notFound } from 'next/navigation';

export default async function Product({ params }: { params: { id: string } }) {
  const { id } = await params;

  let product;

  try {
    const { data } = await axiosInstanceServer.get(
      `/product/fetchForEdit/${id}`,
    );
    product = data;
  } catch (error) {
    product = null;
  }

  if (!product) return notFound();

  return (
    <AddProductDahsboardView
      type={product.status}
      mode={'EDIT'}
      product={product}
    />
  );
}
