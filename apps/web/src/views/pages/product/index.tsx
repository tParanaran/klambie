'use client';

import { useEffect, useRef, useState } from 'react';
import { IProduct } from '@/views/pages/product/types/product.types';
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

export default function ProductView({ product }: { product: IProduct }) {
  const errorsProductRef = useRef<IErrorsMessageHandle | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [showVariant, setShowVariant] = useState<boolean>(false);
  const { slug, categories, brand, name } = product;
  const {
    inStockVariants,
    cheapestVariants,
    selectedAttributes,
    selectedVariant,
    selectedColorId,
    groupedAttributes,
    handleSelect,
  } = useSelectedVariant({ variants: product.variants, isModal: showVariant });
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

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] lg:grid-cols-[1.5fr_1fr] pb-[5%] gap-4">
        <div>
          {/* Left Menu Desktop Mode */}
          <div className="relative">
            <Images images={product.images} selectedColorId={selectedColorId} />
            <div className="absolute top-3 left-3 z-10 text-sm sm:text-base">
              <Tags tags={product.tags} categories={categories} />
            </div>
            <div className="hidden md:block absolute top-3 right-3 z-10">
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
              {cheapestVariants[0].price && !selectedVariant && (
                <p className="font-semibold text-orange-700">From</p>
              )}
              <ProductPrice
                price={selectedVariant?.price || cheapestVariants[0].price}
                hasDiscount={
                  selectedVariant?.hasDiscount ||
                  cheapestVariants[0].hasDiscount
                }
              />
            </div>
            <div className="space-y-5 mt-5 lg:mt-10">
              <Attributes
                handleSelect={handleSelect}
                selectedAttributes={selectedAttributes}
                groupedAttributes={groupedAttributes}
              />

              <div className="hidden md:block">
                {' '}
                <h4>Quantity</h4>
                <QuantityButton
                  inStock={
                    selectedVariant?.inStock || inStockVariants[0].inStock
                  }
                  stock={
                    selectedVariant?.availableStock ||
                    inStockVariants[0].availableStock
                  }
                  quantity={quantity}
                  onChange={setQuantity}
                />
                {selectedVariant && !selectedVariant.inStock && (
                  <p className="text-sm text-orange-700">Out of Stock</p>
                )}
                {selectedVariant && selectedVariant.availableStock ? (
                  <p className="text-sm opacity-50">
                    Stock: {selectedVariant.availableStock}
                  </p>
                ) : null}
              </div>
              <div className="fixed md:absolute z-30 md:z-0 right-3 sm:right-10 md:right-0 bottom-14 sm:bottom-15 md:-bottom-12">
                <ErrorsMessage ref={errorsProductRef} />
              </div>
              <div className="hidden md:block mt-14">
                <AddToCartButton
                  isLoading={isLoading}
                  handleAddToCart={handleAddToCart}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavbarAddToCart
        isLoading={isLoading}
        handleCartClick={handleCartClick}
      />
      {showVariant && (
        <ShowVariants
          variantImages={product.images}
          name={product.name}
          groupedAttributes={groupedAttributes}
          selectedVariant={selectedVariant}
          selectedColorId={selectedColorId}
          selectedAttributes={selectedAttributes}
          quantities={{
            [selectedVariant?.id || inStockVariants[0].id]: quantity,
          }}
          onClose={() => setShowVariant(false)}
          handleSelect={handleSelect}
          updateQuantity={(_, newQty) => setQuantity(newQty)}
          positionStyle={'bottom-19 md:bottom-1'}
          children={undefined}
          showVariants={showVariant}
        ></ShowVariants>
      )}
      {isLoading && <Loading />}
    </>
  );
}
