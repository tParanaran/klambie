'use client';

import { SwiperSlide, Swiper } from 'swiper/react';
import { IoBagAddOutline } from 'react-icons/io5';
import { useRef } from 'react';
import { IProducts } from '@/views/pages/p/types/product.types';
import Link from 'next/link';
import Tags from '@/views/pages/p/components/tags';
import ProductPrice from '../../p/components/price';
import useVariants from '../../cart/hooks/useVariants';
import ShowVariants from '../../cart/components/showVariant';
import useCartQuantities from '../../cart/hooks/useQuantity';
import useAddToCart from '../../p/hooks/useAddToCart';
import useSelectedVariant from '../../p/hooks/useSelectedVariant';
import Loading from '@/views/components/loading';
import ErrorsMessage, { IErrorsMessageHandle } from '../../p/components/errors';

import AddToCartButton from '../../p/components/addButton';

export default function ProductCard({ products }: { products: IProducts[] }) {
  const errorsProductRef = useRef<IErrorsMessageHandle | null>(null);
  const { variants, showVariants, showVariantsHandler, variantHandler } =
    useVariants();
  const { quantities, updateQuantity } = useCartQuantities({});
  const {
    selectedAttributes,
    selectedVariant,
    selectedColorId,
    groupedAttributes,
    handleSelect,
  } = useSelectedVariant({ variants: variants?.variants ?? [], isModal: true });
  const quantity = selectedVariant ? (quantities[selectedVariant.id] ?? 1) : 1;
  const { isLoading, handleAddToCart } = useAddToCart({
    selectedAttributes,
    selectedVariant,
    quantity,
    errorsProductRef,
  });

  return (
    <>
      {products.map((item, idx) => (
        <div key={idx} className="mb-5 z-0">
          <Swiper>
            {item.images.map((image, i) => (
              <SwiperSlide key={i}>
                <img
                  src={image}
                  alt={`Product Image ${i}`}
                  className="object-cover h-72 sm:h-80 lg:h-96 w-full"
                  width={300}
                  height={400}
                  aria-placeholder="blur"
                />
              </SwiperSlide>
            ))}
            <div className="absolute top-1 right-1 z-10">
              <button
                className="rounded-full text-3xl p-2 bg-black/60 font-bold text-[#ededed] uppercase w-full hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Add to bag modal"
                onClick={() => {
                  (variantHandler(item.slug, item.name), updateQuantity(1, 1));
                }}
              >
                <IoBagAddOutline />
              </button>
            </div>
            <div className="absolute bottom-1 left-1 right-1 z-10">
              <div className="flex flex-wrap space-x-1 text-xs">
                <Tags tags={item.tags} categories={item.categories} />
              </div>
            </div>
            {/* <div className="absolute top-1 left-1 z-10">
                  {RATINGSTARHERE}
                </div> */}
          </Swiper>{' '}
          <Link href={`/p/${item.slug}`}>
            <div className="flex space-x-1 my-3 flex-wrap">
              {' '}
              {item.hexUrl.map((color, c) => (
                <span
                  key={c}
                  style={{ backgroundColor: `${color}` }}
                  className="p-2 mt-1 rounded-full"
                ></span>
              ))}
            </div>

            <div>
              <h1 className="text-light text-xs uppercase mb-1 opacity-70">
                {item.categories
                  .map((category) => {
                    return category.name;
                  })
                  .join(', ')}
              </h1>
              <div className="text-sm sm:text-base">
                <p className="font-bold">{item.brand.name}</p>
                <p className="font-light">{item.name}</p>
                <div className="flex items-center space-x-2 flex-wrap">
                  <ProductPrice
                    price={item.price}
                    hasDiscount={item.hasDiscount}
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}

      {showVariants && variants && (
        <ShowVariants
          variantImages={variants.variantImages}
          name={variants.name}
          positionStyle={'md:bottom-1 bottom-19'}
          quantities={quantities}
          groupedAttributes={groupedAttributes}
          selectedVariant={selectedVariant}
          selectedColorId={selectedColorId}
          selectedAttributes={selectedAttributes}
          handleSelect={handleSelect}
          updateQuantity={updateQuantity}
          onClose={showVariantsHandler}
          showVariants={showVariants}
        >
          <div className="absolute right-5 bottom-18">
            <ErrorsMessage ref={errorsProductRef} />
          </div>

          <AddToCartButton
            isLoading={isLoading}
            handleAddToCart={handleAddToCart}
          />
        </ShowVariants>
      )}
      {isLoading && <Loading />}
    </>
  );
}
