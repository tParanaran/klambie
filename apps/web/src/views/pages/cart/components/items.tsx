'use client';
import { ICartItems, IVariantAttribute } from '../types';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import CartPrice from './price';
import DeleteButton from './deleleButton';
import VariantsButton from './variantsbutton';
import ShowVariants from './showVariant';
import useVariants from '../hooks/useVariants';
import useCartQuantities from '../hooks/useQuantity';
import QuantityButton from '../../product/components/qtyButton';
import useSelect from '../hooks/useSelect';
import useSelectedVariant from '../../product/hooks/useSelectedVariant';
import Button from '@/views/components/button';
import ErrorsMessage from '../../product/components/errors';

interface ICart {
  cartItems: ICartItems[];
}

export default function CartItems({ cartItems }: ICart) {
  const { selectedItems, toggleItem, toggleSelectAll } = useSelect(cartItems);
  const [cartItem, setCartItem] = useState<IVariantAttribute>();
  const { variants, showVariants, setShowVariants, variantHandler } =
    useVariants();
  const { quantities, updateQuantity, messages, isLoading } =
    useCartQuantities(cartItems);
  const {
    selectedAttributes,
    selectedVariant,
    selectedColorId,
    groupedAttributes,
    handleSelect,
  } = useSelectedVariant(variants?.variants ?? [], cartItem);

  return (
    <div>
      <div className="flex space-x-2 items-center ml-2 mb-2">
        <input
          type="checkbox"
          checked={selectedItems.length === cartItems.length}
          onChange={toggleSelectAll}
          className="w-5 h-5 appearance-none rounded-2xl border 
              hover:ring hover:ring-black/90 hover:ring-offset-1 hover:ring-offset-slate-100 checked:ring-1 checked:ring-black/90 checked:ring-offset-2 checked:ring-offset-slate-100
             cursor-pointer bg-gray-100"
        />{' '}
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

      {cartItems.map((item, i) => (
        <div
          key={i}
          className="relative bg-black/10 rounded-2xl h-fit my-1 p-2 gap-2 flex"
        >
          <div className="absolute top-1/2 right-2">
            <DeleteButton variantId={item.productVariantId} />
          </div>
          <div className="flex space-x-2 items-center">
            <div className="relative">
              <input
                type="checkbox"
                checked={selectedItems.includes(item.productVariantId)}
                onChange={() => toggleItem(item.productVariantId)}
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
                setCartItem({
                  variantId: item.productVariantId,
                  attributes: item.attributes.map((attr) => ({
                    attributeId: attr.attributeId,
                    attributeValueId: attr.attributeValueId,
                  })),
                })
              }
            >
              <VariantsButton
                attribute={item.attributes.map((attr) => attr.value).join(', ')}
                onClick={variantHandler}
                slug={item.slug}
                name={item.name}
                quantity={item.quantity}
              />
              <QuantityButton
                loading={isLoading}
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
            <div className="-ml-5 -mt-1">
              <ErrorsMessage
                errors={messages[item.productVariantId]?.errors}
                success={messages[item.productVariantId]?.success}
              />
            </div>
          </div>
        </div>
      ))}
      {showVariants && variants && (
        <ShowVariants
          variantImages={variants.variantImages}
          name={variants.name}
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
          <Button
            onClick={() => console.log('Next Feature')}
            disabled={false}
            loading={false}
            className="bg-orange-700"
          >
            Confirm
          </Button>
        </ShowVariants>
      )}
    </div>
  );
}
