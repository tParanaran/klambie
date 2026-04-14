'use client';

import { useEffect, useRef, useState } from 'react';
import {
  IGroupedAttribute,
  IProduct,
} from '@/views/pages/p/types/product.types';
import Title from './components/title';
import Images from './components/images';
import Details from './components/details';
import Tags from './components/tags';
import Attributes from './components/attributes';
import useSelectedVariant from './hooks/useSelectedVariant';
import useAddToCart from './hooks/useAddToCart';
import QuantityButton from './components/qtyButton';
import ProductPrice from './components/price';
import Loading from '@/views/components/loading';
import ErrorsMessage, { IErrorsMessageHandle } from './components/errors';
import AddToCartButton from './components/addButton';
import ShowVariants from '../cart/components/showVariant';
import ShareButton from './components/shareButton';
import NavbarAddToCart from './components/navbar';

export default function ProductView({
  product,
  groupedAttributes,
}: {
  product: IProduct;
  groupedAttributes: IGroupedAttribute[];
}) {
  const errorsProductRef = useRef<IErrorsMessageHandle | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [showVariant, setShowVariant] = useState<boolean>(false);
  const { slug, categories, brand, name } = product;
  const {
    defaultVariants,
    cheapestVariants,
    selectedAttributes,
    selectedVariant,
    selectedColorId,
    handleSelect,
    computedGroupedAttributes,
  } = useSelectedVariant({
    variants: product.variants,
    isModal: showVariant,
    groupedAttributes,
  });
  const { isLoading, handleAddToCart } = useAddToCart({
    selectedAttributes,
    selectedVariant,
    quantity,
    errorsProductRef,
  });

  useEffect(() => {
    if (selectedVariant) {
      setQuantity((prev) =>
        Math.min(prev, selectedVariant.availableStock || 1),
      );
    } else {
      setQuantity(1);
    }
  }, [selectedVariant]);

  const handleCartClick = async () => {
    if (!selectedVariant) {
      setShowVariant(true);
      return;
    }

    await handleAddToCart();
    setShowVariant(false);
  };

  const disabledButton =
    selectedVariant?.inStock && product.status === 'ACTIVE' ? false : true;

  return (
    <div className="relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] lg:grid-cols-[1.5fr_1fr] pb-[5%] gap-4">
        <div>
          {/* Left Menu Desktop Mode */}
          <div className="relative">
            <Images images={product.images} selectedColorId={selectedColorId} />
            <div className="absolute left-3 top-3 z-10 text-sm">
              <Tags tags={product.tags} />
            </div>
            <div className="hidden md:block absolute top-3 right-3 z-10 text-black">
              <ShareButton />
            </div>
          </div>
        </div>
        {/* Reviews and Product Details*/}
        <div className="order-last">
          <Details
            details={product.productDetails}
            sku={selectedVariant?.sku || product.sku}
          />
          {/* <Reviews id={id} reviews={reviews} /> */}
        </div>
        {/* Right Menu Desktop Mode */}
        <div className="px-0 lg:px-4 order-2 md:row-span-2">
          <div className="md:sticky md:top-24">
            <Title title={{ slug, categories, brand, name }} />
            <div className="flex space-x-1 mt-2">
              {cheapestVariants?.price && !selectedVariant && (
                <p className="font-semibold text-orange-700">From</p>
              )}
              <ProductPrice
                price={selectedVariant?.price ?? cheapestVariants.price}
                hasDiscount={
                  selectedVariant?.hasDiscount ?? cheapestVariants.hasDiscount
                }
              />
            </div>
            <div className="space-y-5 mt-5 lg:mt-10">
              {product.type === 'VARIANT' && (
                <Attributes
                  handleSelect={handleSelect}
                  selectedAttributes={selectedAttributes}
                  groupedAttributes={computedGroupedAttributes}
                />
              )}

              <div className="hidden md:block">
                {' '}
                <h4>Quantity</h4>
                <QuantityButton
                  inStock={!disabledButton}
                  stock={
                    selectedVariant?.availableStock ??
                    defaultVariants?.availableStock ??
                    0
                  }
                  quantity={quantity}
                  onChange={setQuantity}
                />
              </div>
              {product.status !== 'ACTIVE' ? (
                <p className="text-sm text-orange-700">
                  Oops! This item is currently unavailable. Check back soon!
                </p>
              ) : (
                <div>
                  {selectedVariant && !showVariant ? (
                    <>
                      {selectedVariant.inStock ? (
                        <p className="text-sm opacity-50 hidden md:block">
                          Stock: {selectedVariant.availableStock}
                        </p>
                      ) : (
                        <p className="text-sm text-orange-700">
                          Oops! This item is currently out of stock.
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-orange-700">
                      Hei There! Please choose an option first.
                    </p>
                  )}
                </div>
              )}
              <div className="fixed md:absolute z-30 md:z-0 right-3 sm:right-10 md:right-0 bottom-14 sm:bottom-15 md:-bottom-12">
                <ErrorsMessage ref={errorsProductRef} />
              </div>
              <div className="hidden md:block mt-14">
                <AddToCartButton
                  isDisabled={disabledButton}
                  isLoading={isLoading}
                  handleAddToCart={handleAddToCart}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavbarAddToCart
        isDisabled={false}
        isLoading={isLoading}
        handleCartClick={handleCartClick}
      />
      {showVariant && (
        <ShowVariants
          variantImages={product.images}
          name={product.name}
          groupedAttributes={computedGroupedAttributes}
          selectedVariant={selectedVariant}
          selectedColorId={selectedColorId}
          selectedAttributes={selectedAttributes}
          quantities={{
            [selectedVariant?.id || cheapestVariants.id]: quantity,
          }}
          onClose={() => setShowVariant(false)}
          handleSelect={handleSelect}
          updateQuantity={(_, newQty) => setQuantity(newQty)}
          positionStyle={'bottom-19 md:bottom-1'}
          children={undefined}
          showVariants={showVariant}
          isClickOutside={!showVariant}
        />
      )}
      {isLoading && <Loading />}
    </div>
  );
}
