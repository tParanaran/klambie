import BagButton from '../../template/components/bagButton';
import AddToCartButton from './addButton';

interface INavbarAddToCart {
  handleCartClick: () => Promise<void>;
  isLoading: boolean;
}

export default function NavbarAddToCart({
  handleCartClick,
  isLoading,
}: INavbarAddToCart) {
  return (
    <div className="fixed md:hidden z-40 bottom-0 left-0 right-0 text-[#ededed] bg-black/80 backdrop-blur-lg px-3 sm:px-10 py-4 max-h-[70vh] overflow-y-auto text-sm sm:text-md">
      <div className="flex items-center space-x-4">
        <BagButton />
        <div className="flex-2">
          {' '}
          <AddToCartButton
            isLoading={isLoading}
            handleAddToCart={handleCartClick}
          />{' '}
        </div>
      </div>
    </div>
  );
}
