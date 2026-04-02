import NavbarBottomContainer from '@/views/components/navbarBottomContainer';
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
    <NavbarBottomContainer>
      <div className="flex items-center space-x-4">
        <BagButton />
        <div className="flex-2">
          <AddToCartButton
            isLoading={isLoading}
            handleAddToCart={handleCartClick}
          />
        </div>
      </div>
    </NavbarBottomContainer>
  );
}
