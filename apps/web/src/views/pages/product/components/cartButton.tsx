export default function AddCartButton() {
  const AddToCartHandler = async () => {
    // const result = await AddToCart(cartProducts, userID);
    // if (result.success) {
    //   const { totalPrice } = await GetGrandTotal("1");
    //   setIsModal(result.success);
    //   setIsMessage(result.message);
    //   setGrandPrice(totalPrice);
    // } else {
    //   notify(result.message);
    // }
  };

  return (
    <>
      <button
        disabled={false}
        className="rounded-full py-2 sm:py-3 px-4 bg-orange-800 font-semibold text-[#ededed] uppercase w-full hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={AddToCartHandler}
        aria-label="Add items to cart"
      >
        Add to Cart
      </button>
    </>
  );
}
