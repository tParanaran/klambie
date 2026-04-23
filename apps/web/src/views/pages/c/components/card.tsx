'use client';

import { SwiperSlide, Swiper } from 'swiper/react';
import { TbShoppingBagPlus } from 'react-icons/tb';
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
import { useQueryParams } from '../hooks/useQueryParams';
import Button from '@/views/components/button';
import { useCartQuery } from '../../p/hooks/useCartQuery';

interface IProductCard {
  products: IProducts[];
  style?: string;
}

export default function ProductCard({ products, style }: IProductCard) {
  const errorsProductRef = useRef<IErrorsMessageHandle | null>(null);
  const total = useCartQuery();
  const { pathname, router } = useQueryParams();
  const { variants, showVariants, showVariantsHandler, variantHandler } =
    useVariants();
  const { quantities, updateQuantity } = useCartQuantities({});
  const {
    selectedAttributes,
    selectedVariant,
    selectedColorId,
    computedGroupedAttributes,
    handleSelect,
  } = useSelectedVariant({
    variants: variants?.variants ?? [],
    isModal: true,
    groupedAttributes: variants?.groupedAttributes ?? [],
  });
  const quantity = selectedVariant ? (quantities[selectedVariant.id] ?? 1) : 1;
  const { isLoading, handleAddToCart } = useAddToCart({
    selectedAttributes,
    selectedVariant,
    quantity,
    errorsProductRef,
    hasVariants: computedGroupedAttributes.length > 0,
  });

  return (
    <>
      {products.map((item, idx) => (
        <div key={idx} className="relative mb-2 z-0 overflow-hidden">
          <Swiper spaceBetween={5}>
            {item.images.map((image, i) => (
              <SwiperSlide key={i}>
                <div className={`relative aspect-3/4 ${style}`}>
                  <img
                    src={image}
                    alt={`Product Image ${i}`}
                    className="object-cover rounded-2xl h-full w-full"
                    aria-placeholder="blur"
                  />
                </div>
              </SwiperSlide>
            ))}
            <div className="absolute top-1 right-1 z-10">
              <button
                className="rounded-full text-2xl p-1.5 bg-black/60 font-bold text-light uppercase w-full hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Add to bag modal"
                onClick={() => {
                  (variantHandler(item.slug, item.name), updateQuantity(1, 1));
                }}
              >
                <TbShoppingBagPlus />
              </button>
            </div>
            <div className="absolute bottom-1 left-1 right-1 z-10">
              <div className="flex flex-wrap space-x-1 font-semilight">
                <Tags tags={item.tags} />
              </div>
            </div>
            {/* <div className="absolute top-1 left-1 z-10">
                  {RATINGSTARHERE}
                </div> */}
          </Swiper>{' '}
          <Link href={`/p/${item.slug}`}>
            <div className="flex space-x-1 my-1 flex-wrap">
              {' '}
              {item.hexUrl.map((color, c) => (
                <span
                  key={c}
                  style={{ backgroundColor: `${color}` }}
                  className="p-2 mt-1 rounded-full"
                ></span>
              ))}
            </div>

            <div className="mt-1">
              {pathname.includes('/c') && (
                <h1 className="text-dark text-[11px] uppercase opacity-70">
                  {item.categories
                    .map((category) => {
                      return category.name;
                    })
                    .join(', ')}
                </h1>
              )}
            </div>
            <div className="mt-1">
              <p className="font-bold text-base">{item.brand.name}</p>
              <p className="font-light line-clamp-3 h-11">{item.name}</p>
              <div className="flex items-center space-x-2 flex-wrap text-base">
                <ProductPrice
                  price={item.price}
                  hasDiscount={item.hasDiscount}
                />
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
          groupedAttributes={computedGroupedAttributes}
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
            isDisabled={selectedVariant?.inStock ? false : true}
          >
            {' '}
            {total > 0 && (
              <Button
                className="bg-dark w-fit hidden md:block"
                onClick={() => router.push('/cart')}
              >
                My Bag ({total})
              </Button>
            )}
          </AddToCartButton>
        </ShowVariants>
      )}
      {isLoading && <Loading />}
    </>
  );
}
