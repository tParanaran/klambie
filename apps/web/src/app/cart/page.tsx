import axiosInstanceServer from '@/lib/axios/server';
import CartView from '@/views/pages/cart';
import EmptyCart from '@/views/pages/cart/components/empty';

export default async function Cart() {
  const { data } = await axiosInstanceServer.get('/shop-cart/get');

  if (!data) return <EmptyCart />;

  return <CartView cartItems={data} />;
}
