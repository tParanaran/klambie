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
import QuantityButton from '../../product/components/qtyButton';
import { ICartItemIds } from '../hooks/useSelect';
import useSelectedVariant from '../../product/hooks/useSelectedVariant';
import Button from '@/views/components/button';
import ErrorsMessage, {
  IErrorsMessageHandle,
} from '../../product/components/errors';
import useChangeVariant from '../hooks/useChange';
import SelectAllToggle from './selectAll';

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
  const { variants, showVariants, setShowVariants, variantHandler } =
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
    setShowVariants,
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
      <div className="flex space-x-2 items-center ml-2 mb-2">
        <SelectAllToggle
          toggleSelectAll={toggleSelectAll}
          isSelectedItem={selectedItems.length === cartItems.length}
        />
        <span className="text-lg font-bold">
          <h1>Cart Items</h1>
        </span>
        <span>
          {' '}
          <p className="font-semibold opacity-50 text-sm">
            ({selectedItems.length + '/' + cartItems.length} Items selected)
          </p>
        </span>
      </div>

      {cartItems.map((item, i) => {
        if (!errorsRefs.current[item.productVariantId]) {
          errorsRefs.current[item.productVariantId] = null;
        }
        return (
          <div
            key={i}
            className="relative bg-black/10 rounded-2xl  min-h-37.5 my-1 p-2 gap-2 flex"
          >
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
                  className="w-5 h-5 appearance-none rounded-2xl border 
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
            </div>
            <div className="text-sm flex-1/2">
              <Link href={`/p/${item.slug}`} aria-label={item.name}>
                <h1 className="font-semibold">{item.brand}</h1>
                <h1 className="font-semibold">{item.name}</h1>
                <div className="opacity-50 text-xs text-light">
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
                <CartPrice price={item.price} hasDiscount={item.hasDiscount} />
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
        );
      })}
      {showVariants && variants && (
        <ShowVariants
          variantImages={variants.variantImages}
          name={variants.name}
          className={'bottom-25 sm:bottom-27 md:bottom-1'}
          quantities={quantities}
          groupedAttributes={groupedAttributes}
          selectedVariant={selectedVariant}
          selectedColorId={selectedColorId}
          selectedAttributes={selectedAttributes}
          onClose={setShowVariants}
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
          <Button onClick={confirmHandler} className="bg-orange-700">
            Confirm
          </Button>
        </ShowVariants>
      )}
    </div>
  );
}
