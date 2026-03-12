import { IoCaretUp, IoTicketOutline } from 'react-icons/io5';
import { ITotalPrice } from '../types';
import { useState } from 'react';
import CheckoutButton from './checkoutButton';
import SelectAllToggle from './selectAll';
import Rupiah from '@/utils/rupiah';
import AddVouchers from './vouchers';
import CartSummary from './summary';

interface INavbarCheckout {
  toggleSelectAll: () => void;
  isSelectedItem: boolean;
  totalPrice: ITotalPrice | null;
  selectedCount: number;
}

export default function NavbarCheckout({
  toggleSelectAll,
  isSelectedItem,
  totalPrice,
  selectedCount,
}: INavbarCheckout) {
  const [showPrice, setShowPrice] = useState<boolean>(false);

  const handleOpenPrice = () => setShowPrice(!showPrice);

  return (
    <>
      <div className="fixed md:hidden z-5 bottom-0 left-0 right-0 text-[#ededed] bg-black/80 backdrop-blur-lg px-3 sm:px-10 py-3 max-h-[70vh] overflow-y-auto">
        <div className="bg-red-700 absolute left-0 right-0 top-0 px-3 sm:px-10 py-1">
          {totalPrice?.discountTotal ? (
            <p className="text-sm py-1 flex items-center">
              <IoTicketOutline className="mr-2 text-lg" /> Saved{' '}
              {Rupiah(totalPrice.discountTotal ?? '0')}
            </p>
          ) : (
            <AddVouchers />
          )}
        </div>
        <div className="flex justify-between items-center mt-8">
          <div className="flex space-x-2">
            <SelectAllToggle
              toggleSelectAll={toggleSelectAll}
              isSelectedItem={isSelectedItem}
            />
            <p>All</p>
          </div>
          <div className="flex space-x-2" onClick={handleOpenPrice}>
            <div>
              <p className="font-semibold text-orange-700">
                {Rupiah(totalPrice?.grandTotal ?? '0')}
              </p>
              <p className="text-sm underline flex items-center">
                <IoCaretUp className="text-lg  mr-2" />
                Price Details
              </p>
            </div>

            <div className="w-fit">
              <CheckoutButton totalPrice={totalPrice} />
            </div>
          </div>{' '}
        </div>
      </div>
      {showPrice && (
        <div className="fixed h-full w-full top-0 left-0 z-10">
          <div
            className="absolute h-full w-full"
            onClick={handleOpenPrice}
            role="button"
          ></div>
          <div
            className="fixed md:hidden text-[#ededed] z-50 bottom-0 left-0 right-0 py-3 px-3 sm:px-10 bg-black/80 backdrop-blur-lg rounded-2xl max-h-[70vh] overflow-y-auto space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <CartSummary
              totalPrice={totalPrice}
              selectedCount={selectedCount}
            />
            <CheckoutButton totalPrice={totalPrice} />
          </div>
        </div>
      )}
    </>
  );
}
