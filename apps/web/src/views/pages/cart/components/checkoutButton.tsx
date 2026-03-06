'use client';

export default function CheckoutButton() {
  const CheckoutHandler = async () => {};

  return (
    <button
      aria-label="Checkout"
      type="submit"
      className="rounded-full py-2 sm:py-3 px-4 bg-orange-800 font-semibold text-[#ededed] w-full hover:bg-orange-700 uppercase"
      onClick={CheckoutHandler}
    >
      Checkout
    </button>
  );
}
