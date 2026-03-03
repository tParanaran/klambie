'use client';

import { useEffect, useState } from 'react';
import { IProduct } from '@/views/pages/product/types/product.types';
import Title from './components/title';
import Images from './components/images';
import Details from './components/details';
import AddCartButton from './components/cartButton';
import Tags from './components/tags';
import Attributes from './components/attributes';
import UseSelectedVariant from './hooks/useSelectedVariant';
import QuantityButton from './components/qtyButton';
import ProductPrice from './components/price';
import UseAddToCart from './hooks/useAddToCart';
import Loading from '@/views/components/loading';
import AddToCartModal from './components/addToCartModal';

export default function ProductView({ product }: { product: IProduct }) {
  const [quantity, setQuantity] = useState<number>(1);
  const { slug, categories, brand, name } = product;
  const {
    selectedAttributes,
    selectedVariant,
    selectedColorId,
    groupedAttributes,
    handleSelect,
  } = UseSelectedVariant(product.variants);
  const { errors, isLoading, handleAddToCart, showModal } = UseAddToCart({
    selectedAttributes,
    selectedVariant,
    quantity,
  });

  useEffect(() => {
    if (selectedVariant) {
      setQuantity((prev) => Math.min(prev, selectedVariant.stock || 1));
    } else {
      setQuantity(1);
    }
  }, [selectedVariant]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] lg:grid-cols-[1.5fr_1fr] pb-[5%] gap-4">
        <div>
          {/* Left Menu Desktop Mode */}
          <div className="relative">
            <Images images={product.images} selectedColorId={selectedColorId} />
            <div className="absolute top-3 left-3 z-10 text-sm sm:text-base">
              <Tags tags={product.tags} categories={categories} />
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
            <div className="space-y-5 mt-10">
              <Attributes
                handleSelect={handleSelect}
                selectedAttributes={selectedAttributes}
                groupedAttributes={groupedAttributes}
              />
              {selectedVariant && (
                <>
                  {' '}
                  <QuantityButton
                    inStock={selectedVariant.inStock}
                    stock={selectedVariant.stock}
                    quantity={quantity}
                    onChange={setQuantity}
                  />
                  <div>
                    <ProductPrice price={selectedVariant.price} />
                  </div>
                </>
              )}
              <div>
                {' '}
                <AddCartButton handleAddToCart={handleAddToCart} />
                {errors.length > 0 && (
                  <>
                    {errors.map((err, e) => (
                      <div
                        key={e}
                        className="text-orange-700 text-xs ml-4 mt-0.5"
                      >
                        {err}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <Loading />}
      {showModal && <AddToCartModal grandPrice={0} message={'Okay'} />}
    </div>
  );
}
