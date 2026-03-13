import axiosInstanceServer from '@/lib/axios/server';
import { Notify } from '@/lib/notify';
import CartView from '@/views/pages/cart';
import EmptyCart from '@/views/pages/cart/components/empty';
import NavbarMobile from '@/views/pages/template/navbarMobile';

export default async function Cart() {
  let cartData = null;

  try {
    const { data } = await axiosInstanceServer.get('/shop-cart/get');
    cartData = data;
  } catch (error) {
    Notify('Something go wrong');
    cartData = null;
  }

  return (
    <main>
      {cartData && cartData.length > 0 ? (
        <CartView cartItems={cartData} />
      ) : (
        <>
          <EmptyCart />
          <NavbarMobile />
        </>
      )}
    </main>
  );
}
