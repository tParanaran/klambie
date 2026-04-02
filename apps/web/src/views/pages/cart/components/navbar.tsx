import { IoCaretUp, IoTicketOutline } from 'react-icons/io5';
import { ITotalPrice } from '../types';
import { useState } from 'react';
import CheckoutButton from './checkoutButton';
import SelectAllToggle from './selectAll';
import Rupiah from '@/utils/rupiah';
import AddVouchers from './vouchers';
import CartSummary from './summary';
import NavbarBottomContainer from '@/views/components/navbarBottomContainer';
import ModalContainer from '@/views/components/modalContainer';

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
      <NavbarBottomContainer>
        <div className="bg-green-700/50 backdrop-blur-xl absolute left-0 right-0 top-0 px-3 sm:px-10 py-0.5">
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
              <p className="font-semibold dark:text-orange-600 text-orange-800 text-base">
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
      </NavbarBottomContainer>

      {showPrice && (
        <ModalContainer
          showModal={showPrice}
          handlerModal={handleOpenPrice}
          style="md:hidden bottom-28"
        >
          <CartSummary totalPrice={totalPrice} selectedCount={selectedCount} />
        </ModalContainer>
      )}
    </>
  );
}
