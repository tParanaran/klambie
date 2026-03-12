import Attributes from '../../product/components/attributes';
import ProductPrice from '../../product/components/price';
import QuantityButton from '../../product/components/qtyButton';
import ImageSwiper from '../../product/components/swiper';
import {
  IGroupedAttribute,
  IImages,
  IVariant,
} from '../../product/types/product.types';

interface IShowVariant {
  variantImages: IImages[];
  className: string;
  name: string;
  children: React.ReactNode;
  groupedAttributes: IGroupedAttribute[];
  selectedVariant: IVariant | null | undefined;
  selectedColorId: number | undefined;
  selectedAttributes: Record<number, number>;
  quantities: {
    [key: number]: number;
  };
  onClose: (a: boolean) => void;
  handleSelect: (attributeId: number, valueId: number) => void;
  updateQuantity: (variantId: number, newQty: number) => void;
}

export default function ShowVariants({
  variantImages,
  className,
  name,
  children,
  quantities,
  groupedAttributes,
  selectedVariant,
  selectedColorId,
  selectedAttributes,
  onClose,
  handleSelect,
  updateQuantity,
}: IShowVariant) {
  const withAttribute = variantImages.filter(
    (item) => item.attributeId !== null,
  );

  return (
    <div className="fixed h-full w-full top-0 left-0 z-30">
      <div
        className="absolute h-full w-full"
        onClick={() => onClose(false)}
      ></div>
      <div
        className={`fixed lg:max-w-xl mx-auto text-sm text-[#ededed] z-40 left-3 right-3 sm:left-10 sm:right-10 md:left-1/5 md:right-1/5 lg:left-1/4 lg:right-1/4 bg-black/80 backdrop-blur-lg p-3 sm:p-5 rounded-2xl max-h-[70vh] overflow-y-auto ${className}`}
      >
        <div className="flex justify-between h-fit">
          <div className="w-[80%]">
            <h1 className="mb-2 text-sm md:text-lg">{name}</h1>
            {selectedVariant && (
              <div className="flex space-x-2">
                <ProductPrice
                  price={selectedVariant.price}
                  hasDiscount={selectedVariant.hasDiscount}
                />
              </div>
            )}
          </div>
          <div className="w-24 ml-1">
            {' '}
            <ImageSwiper
              images={
                withAttribute.length > 0 ? withAttribute : [variantImages[0]]
              }
              selectedColorId={selectedColorId}
              className="rounded-full w-24 h-24 object-cover overflow-hidden"
            />
          </div>
        </div>
        <div>
          <Attributes
            handleSelect={handleSelect}
            selectedAttributes={selectedAttributes}
            groupedAttributes={groupedAttributes}
          />
        </div>
        {selectedVariant && (
          <div className="mb-1">
            <h4>Quantity</h4>
            <QuantityButton
              inStock={selectedVariant.inStock}
              stock={selectedVariant.availableStock}
              quantity={quantities[selectedVariant.id] ?? 1}
              onChange={(newQty) => updateQuantity(selectedVariant.id, newQty)}
            />
            {!selectedVariant.inStock ? (
              <p className="text-sm text-orange-700">Out of Stock</p>
            ) : (
              <p className="text-sm opacity-50">
                Stock: {selectedVariant.availableStock}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
