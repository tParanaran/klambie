'use client';
import { ICartItems } from '../types';
import Link from 'next/link';
import CartPrice from './price';
import DeleteButton from './deleleButton';
import AddNewQty from './qtyButton';
import VariantsButton from './variants';
import { useEffect, useState } from 'react';

interface ICartItem {
  cartItems: ICartItems[];
}

export default function CartItems({ cartItems }: ICartItem) {
  const [selectedItems, setSelectedItems] = useState<number[]>(
    cartItems.map((item) => item.productVariantId),
  );

  const toggleItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.productVariantId));
    }
  };

  useEffect(() => {
    setSelectedItems((prevSelected) =>
      cartItems
        .map((item) => item.productVariantId)
        .filter((id) => prevSelected.includes(id)),
    );
  }, [cartItems]);

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
          <div className="absolute bottom-1/3 right-2">
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
            <div className="flex text-xs space-x-2">
              <VariantsButton
                attribute={item.attributes.map((attr) => attr.value).join(', ')}
              />
              <AddNewQty
                quantity={item.quantity}
                inStock={item.inStock}
                stock={item.stockAvailable}
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
