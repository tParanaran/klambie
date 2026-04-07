'use client';
import { ICartItems, IVariantAttribute } from '../types';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import CartPrice from './price';
import DeleteButton from './deleleButton';
import VariantsButton from './variantsbutton';
import ShowVariants from './showVariant';
import useVariants from '../hooks/useVariants';
import useCartQuantities from '../hooks/useQuantity';
import QuantityButton from '../../p/components/qtyButton';
import { ICartItemIds } from '../hooks/useSelect';
import useSelectedVariant from '../../p/hooks/useSelectedVariant';
import Button from '@/views/components/button';
import ErrorsMessage, { IErrorsMessageHandle } from '../../p/components/errors';
import useChangeVariant from '../hooks/useChange';
import SelectAllToggle from './selectAll';
import Image from 'next/image';
import ShippingDetails from './shipping';

interface ICart {
  cartItems: ICartItems[];
  selectedItems: ICartItemIds[];
  toggleItem: (id: number, qty: number) => void;
  toggleSelectAll: () => void;
}

export default function CartItems({
  cartItems,
  selectedItems,
  toggleItem,
  toggleSelectAll,
}: ICart) {
  const errorsRefs = useRef<Record<number, IErrorsMessageHandle | null>>({});
  const errorsModalRef = useRef<IErrorsMessageHandle | null>(null);
  const [cartItemVariant, setCartItemVariant] = useState<IVariantAttribute>();
  const { variants, showVariants, showVariantsHandler, variantHandler } =
    useVariants();
  const { quantities, updateQuantity } = useCartQuantities({
    cartItems,
    cartItemVariant,
    errorsRefs,
  });
  const {
    selectedAttributes,
    selectedVariant,
    selectedColorId,
    groupedAttributes,
    handleSelect,
  } = useSelectedVariant({
    variants: variants?.variants ?? [],
    cartItemVariant,
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

  return (
    <div>
      <div className="flex space-x-3 items-center ml-2 mb-2">
        <div className="hidden md:block">
          <SelectAllToggle
            toggleSelectAll={toggleSelectAll}
            isSelectedItem={selectedItems.length === cartItems.length}
          />
        </div>
        <div className="flex space-x-2 items-center">
          <Image src="/icon.svg" alt="Klambie" height={20} width={20} />
          <p className="font-semibold text-sm">
            KLAMBIE ({selectedItems.length + '/' + cartItems.length} Items
            selected)
          </p>
        </div>
      </div>
      <ShippingDetails />
      {cartItems.map((item, i) => {
        if (!errorsRefs.current[item.productVariantId]) {
          errorsRefs.current[item.productVariantId] = null;
        }
        return (
          <div key={i}>
            <div className="relative bg-black/10 dark:bg-white/10 rounded-2xl  min-h-37.5 mt-2 p-2 gap-2 flex">
              <div className="absolute top-1/2 right-2">
                <DeleteButton variantId={item.productVariantId} />
              </div>
              <div className="flex space-x-2 items-center">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={selectedItems.some(
                      (i) => i.variantId === item.productVariantId,
                    )}
                    onChange={() =>
                      toggleItem(item.productVariantId, item.quantity)
                    }
                    className="w-4 h-4 appearance-none rounded-2xl border
              hover:ring hover:ring-black/90 hover:ring-offset-1 hover:ring-offset-slate-100 checked:ring-1 checked:ring-black/90 checked:ring-offset-2 checked:ring-offset-slate-100
             cursor-pointer bg-gray-100"
                  />
                </div>
                <img
                  src={item.image}
                  width={50}
                  height={50}
                  alt={item.name}
                  className="object-cover h-26 w-26 rounded-full"
                  aria-placeholder="blur"
                />
                <div className="absolute flex flex-wrap top-0 left-0 max-w-full gap-0.5">
                  <div
                    className="text-xs text-light bg-red-700 rounded-tl-xl rounded-br-xl py-1 px-2"
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
                  onClick={() =>
                    setCartItemVariant({
                      variantId: item.productVariantId,
                      attributes: item.attributes.map((attr) => ({
                        attributeId: attr.attributeId,
                        attributeValueId: attr.attributeValueId,
                      })),
                    })
                  }
                >
                  <VariantsButton
                    attribute={item.attributes
                      .map((attr) => attr.value)
                      .join(', ')}
                    onClick={variantHandler}
                    slug={item.slug}
                    name={item.name}
                    quantity={item.quantity}
                  />

                  <QuantityButton
                    quantity={quantities[item.productVariantId]}
                    stock={item.stockAvailable}
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
      {showVariants && variants && (
        <ShowVariants
          variantImages={variants.variantImages}
          name={variants.name}
          positionStyle={'bottom-28 md:bottom-1'}
          quantities={quantities}
          groupedAttributes={groupedAttributes}
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
          <Button onClick={confirmHandler} className="bg-orange-800">
            Confirm
          </Button>
        </ShowVariants>
      )}
    </div>
  );
}
