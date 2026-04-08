import axiosInstanceServer from '@/lib/axios/server';
import ErrorMessage from '@/views/components/error';
import CartView from '@/views/pages/cart';

export default async function Cart() {
  let cartData = null;
  let error;

  try {
    const { data } = await axiosInstanceServer.get('/shop-cart/get');
    cartData = data.cartItems;
  } catch (error: any) {
    error = error.message || 'Something went wrong while fetching data.';
    cartData = null;
  }

  return (
    <main>
      <CartView cartItems={cartData} />
      {error && <ErrorMessage error={error} />}
    </main>
  );
}
