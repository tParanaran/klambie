import Button from '@/views/components/button';
import { IoHeartOutline } from 'react-icons/io5';

interface IAddToCartButton {
  isLoading: boolean;
  handleAddToCart: () => Promise<void>;
}

export default function AddToCartButton({
  handleAddToCart,
  isLoading,
}: IAddToCartButton) {
  return (
    <div className="flex space-x-2 items-center justify-between">
      <IoHeartOutline className="text-2xl" />
      <div className="flex-2">
        <div className="flex space-x-2">
          <Button
            onClick={handleAddToCart}
            loading={isLoading}
            className="bg-orange-800"
          >
            Add to Bag{' '}
          </Button>
          <Button
            onClick={() => console.log('Next Feature')}
            disabled={false}
            loading={isLoading}
            className="border border-orange-800 text-orange-800 hover:text-white"
          >
            Buy Now{' '}
          </Button>
        </div>
      </div>
    </div>
  );
}
