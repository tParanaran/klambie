'use client';
import { ICartItems, IVariantAttribute } from '../types';
import { useEffect, useRef, useState } from 'react';
import { ICartItemIds } from '../hooks/useSelect';
import Link from 'next/link';
import CartPrice from './price';
import DeleteButton from './deleleButton';
import VariantsButton from './variantsbutton';
import ShowVariants from './showVariant';
import useVariants from '../hooks/useVariants';
import useCartQuantities from '../hooks/useQuantity';
import QuantityButton from '../../p/components/qtyButton';
import useSelectedVariant from '../../p/hooks/useSelectedVariant';
import Button from '@/views/components/button';
import ErrorsMessage, { IErrorsMessageHandle } from '../../p/components/errors';
import useChangeVariant from '../hooks/useChange';
import SelectAllToggle from './selectAll';
import Image from 'next/image';
import ShippingDetails from './shipping';
import EmptyCart from './empty';
import useDelete from '../hooks/useDelete';
import DeleteAll from './deleteAll';

interface ICart {
  cartItems: [ICartItems[], ICartItems[]];
  selectedItems: ICartItemIds[];
  selectedCount: number;
  toggleItem: (id: number, qty: number) => void;
  toggleSelectAll: () => void;
}

export default function CartItems({
  cartItems,
  selectedItems,
  selectedCount,
  toggleItem,
  toggleSelectAll,
}: ICart) {
  const errorsRefs = useRef<Record<number, IErrorsMessageHandle | null>>({});
  const errorsModalRef = useRef<IErrorsMessageHandle | null>(null);
  const [cartItemVariant, setCartItemVariant] = useState<IVariantAttribute>();
  const { DeleteCartHandler } = useDelete();
  const { variants, showVariants, showVariantsHandler, variantHandler } =
    useVariants();
  const { quantities, updateQuantity } = useCartQuantities({
    cartItems: cartItems[0],
    cartItemVariant,
    errorsRefs,
  });
  const {
    selectedAttributes,
    selectedVariant,
    selectedColorId,
    computedGroupedAttributes,
    handleSelect,
  } = useSelectedVariant({
    variants: variants?.variants ?? [],
    cartItemVariant,
    groupedAttributes: variants?.groupedAttributes ?? [],
  });
  const { confirmHandler } = useChangeVariant({
    selectedVariant,
    cartItemVariant,
    selectedAttributes,
    quantities,
    updateQuantity,
    showVariantsHandler,
    errorsModalRef,
    errorsRefs,
  });

  useEffect(() => {
    if (selectedVariant) {
      updateQuantity(
        selectedVariant.id,
        Math.min(
          quantities[cartItemVariant?.variantId!],
          selectedVariant.availableStock || 1,
        ),
      );
    }
  }, [selectedVariant]);

  const availableTotal = cartItems[0].length ?? 0;
  const emptyCart = availableTotal <= 0;

  return (
    <div>
      <div>
        <div className="flex justify-between flex-wrap my-2">
          <div className="flex space-x-3 items-center mb-2">
            {!emptyCart && (
              <div className="hidden md:block  mr-2">
                <SelectAllToggle
                  toggleSelectAll={toggleSelectAll}
                  isSelectedItem={selectedCount === availableTotal}
                />
              </div>
            )}

            <div className="flex space-x-2 items-center">
              <Image src="/icon.svg" alt="Klambie" height={20} width={20} />
              <p className="font-semibold text-sm">
                KLAMBIE ({selectedCount + '/' + availableTotal} Items selected)
              </p>
            </div>
          </div>
          {selectedCount > 0 && (
            <DeleteAll
              deleteAllHandler={() => {
                const idsToDelete = selectedItems.map((item) => item.variantId);
                DeleteCartHandler(idsToDelete, true);
              }}
            />
          )}
        </div>
        <ShippingDetails />
        {emptyCart && (
          <div className="bg-black/10 dark:bg-white/10 rounded-2xl p-3">
            <EmptyCart />
          </div>
        )}
      </div>
      {cartItems?.map((itemsArray, arrayIndex) => {
        const isUnavailable = arrayIndex === 1;

        return (
          <div key={arrayIndex}>
            {isUnavailable && (
              <>
                {cartItems[1].length > 0 && (
                  <div className="flex justify-between mb-1 mt-5 items-center flex-wrap">
                    <h1 className="font-bold my-1">
                      List of Unavailable Products
                    </h1>
                    <DeleteAll
                      deleteAllHandler={() => {
                        const idsToDelete = itemsArray.map(
                          (item) => item.productVariantId,
                        );
                        DeleteCartHandler(idsToDelete, false);
                      }}
                    />
                  </div>
                )}
              </>
            )}
            {itemsArray.map((item, i) => {
              if (!errorsRefs.current[item.productVariantId]) {
                errorsRefs.current[item.productVariantId] = null;
              }
              return (
                <div key={i}>
                  <div
                    className={`relative rounded-2xl  min-h-37.5 mt-2 p-2 gap-2 flex ${
                      isUnavailable
                        ? 'bg-black/5 dark:bg-white/5 text-gray-400'
                        : 'bg-black/10 dark:bg-white/10'
                    }`}
                  >
                    <div className="absolute top-1/2 right-2 z-10">
                      <DeleteButton
                        variantId={item.productVariantId}
                        inStock={item.inStock}
                      />
                    </div>
                    <div className="flex space-x-2 items-center">
                      {!isUnavailable && (
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={selectedItems.some(
                              (i) => i.variantId === item.productVariantId,
                            )}
                            onChange={() =>
                              toggleItem(item.productVariantId, item.quantity)
                            }
                            className="w-4 h-4 appearance-none rounded-2xl border hover:ring hover:ring-black/90 hover:ring-offset-1 hover:ring-offset-slate-100 checked:ring-1 checked:ring-black/90 checked:ring-offset-2 checked:ring-offset-slate-100 cursor-pointer bg-gray-100"
                          />
                        </div>
                      )}
                      <img
                        src={item.image}
                        width={50}
                        height={50}
                        alt={item.name}
                        className={`object-cover h-26 w-26 rounded-full ${
                          isUnavailable ? 'filter grayscale opacity-70' : ''
                        }`}
                        aria-placeholder="blur"
                      />

                      <div className="absolute flex flex-wrap top-0 left-0 max-w-full gap-0.5">
                        <div
                          className={`text-xs text-light  rounded-tl-xl rounded-br-xl py-1 px-2 ${isUnavailable ? 'bg-gray-500' : 'bg-red-700'}`}
                          title={item.appliedPromotions[0].badge}
                        >
                          {item.appliedPromotions
                            .map((promo) => promo.badge)
                            .join(' + ')}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm flex-1/2">
                      <Link href={`/p/${item.slug}`} aria-label={item.name}>
                        <h1 className="font-semibold">{item.brand}</h1>
                        <h1 className="font-semibold">{item.name}</h1>
                        <div className="opacity-50 text-xs">
                          <p>SKU : {item.sku}</p>
                        </div>
                      </Link>
                      <div
                        className="flex text-xs space-x-2 flex-wrap mr-7"
                        onClick={() => {
                          if (isUnavailable) return;
                          setCartItemVariant({
                            variantId: item.productVariantId,
                            attributes: item.attributes.map((attr) => ({
                              attributeId: attr.attributeId,
                              attributeValueId: attr.attributeValueId,
                            })),
                          });
                        }}
                      >
                        <VariantsButton
                          attribute={item.attributes
                            .map((attr) => attr.value)
                            .join(', ')}
                          onClick={variantHandler}
                          isDisabled={isUnavailable}
                          slug={item.slug}
                          name={item.name}
                          quantity={item.quantity}
                        />

                        <QuantityButton
                          quantity={quantities[item.productVariantId]}
                          stock={item.availableStock}
                          inStock={item.inStock}
                          onChange={(newQty) =>
                            updateQuantity(item.productVariantId, newQty)
                          }
                        />
                      </div>{' '}
                      <div className="flex flex-wrap space-x-2 items-center text-sm">
                        <CartPrice
                          price={item.price}
                          hasDiscount={item.hasDiscount}
                          isUnavailable={isUnavailable}
                        />
                      </div>
                      <div className="-ml-5  min-h-6">
                        <ErrorsMessage
                          ref={(ref) => {
                            errorsRefs.current[item.productVariantId] = ref;
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
      {showVariants && variants && (
        <ShowVariants
          variantImages={variants.variantImages}
          name={variants.name}
          positionStyle={'bottom-28 md:bottom-1'}
          quantities={quantities}
          groupedAttributes={computedGroupedAttributes}
          selectedVariant={selectedVariant}
          selectedColorId={selectedColorId}
          selectedAttributes={selectedAttributes}
          showVariants={showVariants}
          onClose={showVariantsHandler}
          handleSelect={handleSelect}
          updateQuantity={updateQuantity}
        >
          {' '}
          <div className="absolute right-5 bottom-18">
            <ErrorsMessage ref={errorsModalRef} />
            {selectedVariant && (
              <ErrorsMessage
                ref={(ref) => {
                  errorsRefs.current[selectedVariant.id] = ref;
                }}
              />
            )}
          </div>
          <Button
            onClick={confirmHandler}
            className="bg-orange-800"
            disabled={selectedVariant?.inStock ? false : true}
          >
            Confirm
          </Button>
        </ShowVariants>
      )}
    </div>
  );
}
