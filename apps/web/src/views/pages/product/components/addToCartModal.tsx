import Link from 'next/link';

interface IAddToCartModal {
  grandPrice: number;
  message: string;
}

export default function AddToCartModal({
  grandPrice,
  message,
}: IAddToCartModal) {
  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full p-3 sm:p-10 flex items-center justify-center">
      <div
        className="absolute bg-black/70 backdrop-blur-lg h-full w-full rounded-2xl"
        onClick={() => {}}
      ></div>
      <div className="w-full max-w-lg rounded-xl nav-bg p-5 sm:p-8 z-10  max-h-[70vh] overflow-y-auto">
        <div>
          <div className="mb-10">
            <h1 className="text-center sm:text-lg">{message}</h1>

            <div className="flex flex-wrap justify-between my-10 font-bold ">
              <p>Subtotal {`2`} product(s)</p>
              <p>{grandPrice}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Link href={'/cart'}>
              <button
                aria-label="View cart"
                className="rounded-full w-full py-3 px-4 bg-orange-800 text-[#ededed]  hover:bg-orange-700 uppercase font-semibold"
              >
                View Cart
              </button>
            </Link>
            <button
              aria-label="Continue shopping"
              className="rounded-full w-full py-3 px-4 bg-orange-800 text-[#ededed]  hover:bg-orange-700 uppercase font-semibold"
              onClick={() => {}}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
