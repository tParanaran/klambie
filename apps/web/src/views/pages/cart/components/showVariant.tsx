import { useState } from 'react';
import Attributes from '../../p/components/attributes';
import ProductPrice from '../../p/components/price';
import QuantityButton from '../../p/components/qtyButton';
import ImageSwiper from '../../p/components/swiper';
import {
  IGroupedAttribute,
  IImages,
  IVariant,
} from '../../p/types/product.types';
import ShowImages from '../../p/components/imagesModal';
import ModalContainer from '@/views/components/modalContainer';

interface IShowVariant {
  variantImages: IImages[];
  positionStyle: string;
  name: string;
  children: React.ReactNode;
  groupedAttributes: IGroupedAttribute[];
  selectedVariant: IVariant | null | undefined;
  selectedColorId: number | undefined;
  selectedAttributes: Record<number, number>;
  showVariants: boolean;
  quantities: {
    [key: number]: number;
  };
  onClose: () => void;
  handleSelect: (attributeId: number, valueId: number) => void;
  updateQuantity: (variantId: number, newQty: number) => void;
}

export default function ShowVariants({
  variantImages,
  positionStyle,
  name,
  children,
  quantities,
  groupedAttributes,
  selectedVariant,
  selectedColorId,
  selectedAttributes,
  showVariants,
  onClose,
  handleSelect,
  updateQuantity,
}: IShowVariant) {
  const [showImages, setShowImages] = useState<boolean>(false);
  const withAttribute = variantImages.filter(
    (item) => item.attributeId !== null,
  );

  const image =
    withAttribute.find(
      (img) => Number(img.attributeId) === Number(selectedColorId),
    ) || variantImages[0];

  const showImagesHandler = () => {
    setShowImages(!showImages);
  };

  return (
    <>
      <ModalContainer
        handlerModal={onClose}
        showModal={showVariants}
        style={`lg:max-w-xl mx-auto md:left-1/5 md:right-1/5 lg:left-1/4 lg:right-1/4 ${positionStyle}`}
      >
        <div className="flex justify-between h-fit">
          <div className="w-[80%]">
            <h1 className="mb-2 text-base">{name}</h1>
            {selectedVariant && (
              <div className="flex space-x-2 text-base">
                <ProductPrice
                  price={selectedVariant.price}
                  hasDiscount={selectedVariant.hasDiscount}
                />
              </div>
            )}
          </div>
          <div
            className="w-24 ml-1"
            onClick={showImagesHandler}
            role="button"
            aria-label="Zoom image"
          >
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
      </ModalContainer>

      {showImages && (
        <ShowImages image={image} showImagesHandler={showImagesHandler} />
      )}
    </>
  );
}
