export default function AddCartButton({
  handleAddToCart,
}: {
  handleAddToCart: () => Promise<void>;
}) {
  return (
    <button
      className="rounded-full py-2 sm:py-3 px-4 bg-orange-800 font-semibold text-[#ededed] uppercase w-full hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={handleAddToCart}
      aria-label="Add items to cart"
    >
      Add to Cart
    </button>
  );
}
