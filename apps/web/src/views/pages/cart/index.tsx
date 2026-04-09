'use client';
import { ICartItems } from './types';
import { useCartQuery } from '../p/hooks/useCartQuery';
import CartItems from './components/items';
import CartSummary from './components/summary';
import AddVouchers from './components/vouchers';
import CheckoutButton from './components/checkoutButton';
import useSelect from './hooks/useSelect';
import NavbarCheckout from './components/navbar';
import DeliveryAddress from './components/delivery';
import { useMemo } from 'react';

export default function CartView({
  cartItems,
}: {
  cartItems: [ICartItems[], ICartItems[]];
}) {
  const total = useCartQuery();
  const { selectedItems, totalPrice, toggleItem, toggleSelectAll } = useSelect({
    cartItems: cartItems[0],
  });

  const selectedCount = useMemo(
    () => selectedItems.reduce((sum, item) => sum + item.quantity, 0),
    [selectedItems],
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr] gap-0 md:gap-5 pb-[5%]">
        <div>
          <h1 className="font-bold mb-2 hidden md:block">
            My Bag ({total ?? 0})
          </h1>
          <DeliveryAddress />
          <CartItems
            cartItems={cartItems}
            selectedItems={selectedItems}
            selectedCount={selectedCount}
            toggleItem={toggleItem}
            toggleSelectAll={toggleSelectAll}
          />
        </div>
        {/* Sticky Display */}
        <div>
          <div className="hidden md:block md:sticky md:top-24 md:right-0">
            <h1 className="font-bold mb-2">Voucher</h1>
            <AddVouchers />
            <h1 className="font-bold mb-2 mt-5">Orders Summary</h1>
            <div className="md:bg-black/10 md:dark:bg-white/10 rounded-xl p-2 md:p-3">
              <div className="space-y-5">
                <CartSummary
                  totalPrice={totalPrice}
                  selectedCount={selectedCount}
                />
                <CheckoutButton totalPrice={totalPrice} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <NavbarCheckout
        toggleSelectAll={toggleSelectAll}
        isSelectedItem={selectedItems.length === cartItems?.[0].length}
        totalPrice={totalPrice}
        selectedCount={selectedCount}
      />
    </>
  );
}
