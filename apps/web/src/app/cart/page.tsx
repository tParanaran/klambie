import axiosInstanceServer from '@/lib/axios/server';
import ErrorMessage from '@/views/components/error';
import CartView from '@/views/pages/cart';
import EmptyCart from '@/views/pages/cart/components/empty';

export default async function Cart() {
  let cartItems = null;
  let error;

  try {
    const { data } = await axiosInstanceServer.get('/shop-cart/get');
    cartItems = data.cartItems;
  } catch (error: any) {
    error = error.message || 'Something went wrong while fetching data.';
    cartItems = null;
  }

  return (
    <main>
      {cartItems ? (
        <CartView cartItems={cartItems} />
      ) : (
        <div className="h-screen flex mt-20">
          <EmptyCart />
        </div>
      )}
      {error && <ErrorMessage error={error} />}
    </main>
  );
}
