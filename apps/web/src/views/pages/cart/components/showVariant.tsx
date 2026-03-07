import { useState } from 'react';
import Attributes from '../../product/components/attributes';
import ProductPrice from '../../product/components/price';
import QuantityButton from '../../product/components/qtyButton';
import ImageSwiper from '../../product/components/swiper';
import UseSelectedVariant from '../../product/hooks/useSelectedVariant';
import { IImages, IVariant } from '../../product/types/product.types';
import ConfirmButton from './confirmButton';
import { ICartItem } from '../types';

interface IShowVariant {
  variants: IVariant[];
  variantImages: IImages[];
  name: string;
  onClose: (a: boolean) => void;
  quantities: {
    [key: number]: number;
  };
  updateQuantity: (variantId: number, newQty: number) => void;
  cartItemVariant?: ICartItem;
  children: React.ReactNode;
}

export default function ShowVariants({
  variants,
  variantImages,
  name,
  onClose,
  quantities,
  updateQuantity,
  cartItemVariant,
  children,
}: IShowVariant) {
  const {
    selectedAttributes,
    selectedVariant,
    selectedColorId,
    groupedAttributes,
    handleSelect,
  } = UseSelectedVariant(variants, cartItemVariant);

  const withAttribute = variantImages.filter(
    (item) => item.attributeId !== null,
  );

  return (
    <div className="fixed h-full w-full top-0 left-0 z-10">
      <div
        className="absolute h-full w-full"
        onClick={() => onClose(false)}
      ></div>
      <div className="fixed lg:w-1/3 text-sm text-[#ededed] z-40 bottom-0 left-0 right-0 sm:left-10 sm:right-10 lg:left-1/3 bg-black/80 backdrop-blur-lg p-5 rounded-2xl max-h-[70vh] overflow-y-auto">
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
          <div className="w-28">
            {' '}
            <ImageSwiper
              images={
                withAttribute.length > 0 ? withAttribute : [variantImages[0]]
              }
              selectedColorId={selectedColorId}
              className={'rounded-full w-24 h-24 object-cover'}
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
              quantity={quantities[cartItemVariant?.variantId || 0]}
              onChange={(newQty) =>
                updateQuantity(cartItemVariant?.variantId || 1, newQty)
              }
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
