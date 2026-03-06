'use client';
import Link from 'next/link';
import QuantityButton from '../../product/components/qtyButton';
import { ICartItems } from '../types';
import CartPrice from './price';
import DeleteButton from './delButton';
import { useState } from 'react';

interface ICartItem {
  cartItems: ICartItems[];
}

export default function CartItems({ cartItems }: ICartItem) {
  const [quantity, setQuantity] = useState<number>(1);
  return (
    <div>
      <h1 className="text-xl font-bold">Cart</h1>
      {cartItems.map((item, i) => (
        <div
          key={i}
          className="relative my-1 grid grid-cols-[1fr_2fr] md:grid-cols-[1fr_3fr] gap-1 bg-black/10 rounded-2xl h-fit"
        >
          <div className="absolute top-2 left-2">
            <DeleteButton variantId={item.productVariantId} />
          </div>
          <div className="flex items-center justify-center">
            <Link href={`/p/${item.slug}`} aria-label={item.name}>
              <img
                src={item.image}
                width={50}
                height={50}
                alt={item.name}
                className="object-cover h-28 w-28 rounded-full"
                aria-placeholder="blur"
              />
            </Link>
          </div>

          <div className="p-2 text-sm">
            <Link href={`/p/${item.slug}`} aria-label={item.name}>
              <h1 className="font-semibold">{item.brand}</h1>
              <h1 className="font-semibold">{item.name}</h1>
              <div className="opacity-50 text-light">
                <p>SKU : {item.sku}</p>
                {item.attributes.map((attr, a) => (
                  <p key={a}>
                    {attr.attribute} : {attr.attributeId} {attr.value}
                  </p>
                ))}
                <p className="text-orange-800">Qty: {item.quantity} pc(s)</p>
              </div>
            </Link>
            <div className="text-xs">
              <QuantityButton
                quantity={item.quantity}
                stock={item.stockAvailable}
                inStock={true}
                onChange={setQuantity}
              />
            </div>

            <div className="flex flex-wrap space-x-2 items-center text-sm">
              <CartPrice price={item.price} hasDiscount={item.hasDiscount} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
