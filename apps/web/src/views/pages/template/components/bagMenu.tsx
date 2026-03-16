import AnchoredModalContainer from '@/views/components/anchoredModalContainer';
import BagButton from './bagButton';
import { useEffect, useRef, useState } from 'react';
import EmptyCart from '../../cart/components/empty';
import { ICartItems, IPrice, ITotalPrice } from '../../cart/types';
import axiosInstanceClient from '@/lib/axios/client';
import { Notify } from '@/lib/notify';
import DeleteButton from '../../cart/components/deleleButton';
import Link from 'next/link';
import CartPrice from '../../cart/components/price';
import Rupiah from '@/utils/rupiah';
import LinkButton from '@/views/components/link';
import { useCartQuery } from '../../p/hooks/useCartQuery';

export default function BagMenu() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  const [carts, setCarts] = useState<ICartItems[] | null>(null);
  const [price, setPrice] = useState<ITotalPrice | null>(null);
  const total = useCartQuery();

  const fetchCart = async () => {
    try {
      const { data } = await axiosInstanceClient.get('/shop-cart/get');
      setCarts(data.cartItems || null);
      setPrice(data.totalPrice || null);
    } catch (err) {
      Notify('Something go wrong');
      setCarts(null);
      setPrice(null);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [showMenu, total]);

  const showMenuHandler = () => {
    setShowMenu(!showMenu);
  };

  const handleMouseEnter = () => {
    if (!showMenu) showMenuHandler();
  };

  const handleMouseLeave = () => {
    if (showMenu) showMenuHandler();
  };

  return (
    <div
      className="relative py-2.5"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={menuRef}
        role="button"
        aria-label="Bag Menu"
        className={`flex items-center justify-center flex-col ${showMenu ? 'text-orange-800 dark:text-orange-600' : ''}`}
      >
        <BagButton isMobile={false} />
      </button>
      <AnchoredModalContainer
        open={showMenu}
        onClose={showMenuHandler}
        anchorRef={menuRef}
      >
        <div className="w-sm h-fit">
          {carts && carts.length > 0 ? (
            <>
              <div className="max-h-[60vh] overflow-y-auto scrollbar-hide p-3">
                {carts.map((item, i) => (
                  <div key={i}>
                    <div className="relative min-h-37.5 mt-0.5 p-2 gap-2 flex text-xs">
                      <div className="absolute top-1/2 right-0">
                        <DeleteButton variantId={item.productVariantId} />
                      </div>
                      <div>
                        <img
                          src={item.image}
                          width={50}
                          height={50}
                          alt={item.name}
                          className="object-cover h-20 w-20 rounded-full mt-5"
                          aria-placeholder="blur"
                        />
                        <div className="absolute flex flex-wrap top-0 left-0 max-w-full gap-0.5">
                          <div
                            className="text-[10px] text-[#ededed] bg-red-700 rounded-tl-xl rounded-br-xl py-0.5 px-1.5"
                            title={item.appliedPromotions[0].badge}
                          >
                            {item.appliedPromotions
                              .map((promo) => promo.badge)
                              .join(' + ')}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm flex-1/2">
                        <div>
                          <Link href={`/p/${item.slug}`} aria-label={item.name}>
                            <h1 className="font-semibold">{item.brand}</h1>
                            <h1 className="font-semibold">{item.name}</h1>
                            <div className="opacity-50 text-xs text-light">
                              <p>SKU : {item.sku}</p>
                            </div>
                          </Link>
                        </div>{' '}
                        <div className="flex space-x-1">
                          <div className="py-1 px-2 rounded-full w-fit items-center bg-black/10 dark:bg-white/10 h-fit my-1">
                            <p className="text-xs">
                              {item.attributes
                                .map((attr) => attr.value)
                                .join(', ')}
                            </p>
                          </div>
                          <div className="py-1 px-2 rounded-full w-fit items-center bg-black/10 dark:bg-white/10 h-fit my-1">
                            <p className="text-xs">{item.quantity + ' Qty'}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap space-x-2 items-center">
                          <CartPrice
                            price={item.price}
                            hasDiscount={item.hasDiscount}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3">
                <div className="flex justify-between flex-wrap mb-3 font-semibold text-sm">
                  <h1>
                    Subtotal <span>{total} product(s)</span>
                  </h1>
                  <p>{Rupiah(price?.grandTotal || '0')}</p>
                </div>
                <div>
                  <LinkButton
                    linkName={'Go to Bag'}
                    linkHref={'/cart'}
                    style="w-full text-sm"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="max-h-[60vh] overflow-y-auto scrollbar-hide p-3">
              <EmptyCart />
            </div>
          )}
        </div>
      </AnchoredModalContainer>
    </div>
  );
}
