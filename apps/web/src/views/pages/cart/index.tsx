'use client';
import { Suspense } from 'react';
import { ICartItems } from './types';
import Loading from '@/views/components/loading';
import CartItems from './components/items';
import CartSummary from './components/summary';
import AddVouchers from './components/vouchers';
import CheckoutButton from './components/checkoutButton';
import useSelect from './hooks/useSelect';

export default function CartView({ cartItems }: { cartItems: ICartItems[] }) {
  const { selectedItems, toggleItem, toggleSelectAll, totalPrice } = useSelect({
    cartItems,
  });

  const selectedCount = selectedItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  return (
    <div className="pb-[5%]">
      {/* <Suspense key={} fallback={<Loading />}> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr] gap-0 md:gap-5">
        <CartItems
          cartItems={cartItems}
          selectedItems={selectedItems}
          toggleItem={toggleItem}
          toggleSelectAll={toggleSelectAll}
        />
        {/* Sticky Display */}
        <div>
          <div className="hidden md:block md:sticky md:top-24 md:right-0 z-0">
            <h1 className="font-bold mb-2">Voucher</h1>
            <AddVouchers />
            <h1 className="font-bold mb-2 mt-5">Orders Summary</h1>
            <div className="md:bg-black/10 rounded-xl p-2 md:p-3">
              <div className="space-y-5">
                <CartSummary
                  totalPrice={totalPrice}
                  selectedCount={selectedCount}
                />
                <CheckoutButton />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </Suspense> */}
    </div>
  );
}
