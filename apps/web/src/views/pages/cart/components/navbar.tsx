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

  const handleOpenPrice = () => setShowPrice((prev) => !prev);

  return (
    <>
      <div className="fixed md:hidden z-20 bottom-0 left-0 right-0 text-[#ededed] bg-black/80 backdrop-blur-lg px-3 sm:px-10 py-3 max-h-[70vh] overflow-y-auto text-sm sm:text-md">
        <div className="bg-green-700/50 backdrop-blur-lg absolute left-0 right-0 top-0 px-3 sm:px-10 py-0.5">
          {totalPrice?.discountTotal ? (
            <p className="text-sm py-1 flex items-center">
              <IoTicketOutline className="mr-2 text-lg" /> Saved{' '}
              {Rupiah(totalPrice.discountTotal || '0')}
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
          <div
            className="flex space-x-2"
            onClick={handleOpenPrice}
            aria-expanded={showPrice}
          >
            <div>
              <p className="font-semibold text-orange-700">
                {Rupiah(totalPrice?.grandTotal || '0')}
              </p>
              <p className="text-sm underline flex items-center">
                <IoCaretUp
                  className={`text-lg mr-2 transition-transform duration-300 ${
                    showPrice ? 'rotate-180' : 'rotate-0'
                  }`}
                />
                Price Details
              </p>
            </div>

            <div className="w-fit text-base">
              <CheckoutButton totalPrice={totalPrice} />
            </div>
          </div>
        </div>
      </div>
      {showPrice && (
        <div
          className={`fixed inset-0 z-10 transition-opacity duration-300 ${
            showPrice
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }`}
        >
          <div
            className="absolute h-full w-full"
            onClick={handleOpenPrice}
            role="button"
            tabIndex={0}
            aria-label="Close modal"
          ></div>
          <div
            className={`fixed md:hidden text-[#ededed] text-sm sm:text-base bottom-25 sm:bottom-27 sm:left-10 sm:right-10 left-3 right-3 p-3 sm:p-5 bg-black/80 backdrop-blur-lg rounded-2xl max-h-[70vh] overflow-y-auto space-y-3 transform transition-transform duration-300 ease-out ${showPrice ? 'translate-y-0' : 'translate-y-full'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <CartSummary
              totalPrice={totalPrice}
              selectedCount={selectedCount}
            />
          </div>
        </div>
      )}
    </>
  );
}
