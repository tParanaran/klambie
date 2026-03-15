'use client';

import {
  IoChevronForwardCircleOutline,
  IoTicketOutline,
} from 'react-icons/io5';

export default function AddVouchers() {
  const VouchersHandler = async () => {};

  return (
    <button
      className="md:bg-black/10 dark:bg-white/10 rounded-xl md:p-3 w-full flex justify-start overflow-hidden"
      onClick={VouchersHandler}
      aria-label="Add Voucher Modal"
    >
      <div className="flex justify-between items-center w-full text-lg">
        {' '}
        <div className="flex space-x-1 items-center py-1">
          {' '}
          <span className="inline-block">
            {' '}
            <IoTicketOutline />
          </span>
          <p className="text-sm">Add additional vouchers up to 15%</p>{' '}
        </div>
        <div className="flex justify-center items-center">
          <span className="inline-block animate-[arrowMove_1s_linear_infinite] [animation-direction:alternate]">
            <IoChevronForwardCircleOutline />
          </span>
          <style jsx>{`
            @keyframes arrowMove {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-10px);
              }
            }
          `}</style>
        </div>
      </div>
    </button>
  );
}
