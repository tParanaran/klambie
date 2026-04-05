'use client';
import { useState } from 'react';
import { IProductView } from '../products';
import Actions from './actions';
import Rupiah from '@/utils/rupiah';
import Status from './status';
import ModalContainer from '@/views/components/modalContainer';
import SortVariants from './sortVariants';
import ActionsVariant from './actionsVariant';

export default function ProductTableMobile({ products }: IProductView) {
  const [openVariants, setOPenVariants] = useState<string | null>(null);

  const toggleVariants = (slug: string) => {
    setOPenVariants((prev) => (prev === slug ? null : slug));
  };

  return (
    <div className="block sm:hidden bg-black/10 dark:bg-white/10 rounded-2xl overflow-hidden">
      <div className="text-center bg-black/5 dark:bg-white/5">
        <p className="my-auto text-sm font-semibold uppercase py-2">
          Product Details
        </p>
      </div>
      <div>
        {products.map((product) => {
          const isOpen = openVariants === product.slug;
          return (
            <div key={product.slug}>
              <div className="relative p-1 border-b-[0.5px] border-gray-300 dark:border-black/90">
                <div className="flex space-x-2">
                  <img
                    src={product.image}
                    className="aspect-square rounded-full h-16 object-cover my-auto"
                    aria-label={product.name}
                  />
                  <div className="text-sm">
                    <h1 className="font-semibold">{product.brand}</h1>
                    <p className="line-clamp-2">{product.name}</p>
                    <p className="opacity-50">SKU: {product.sku}</p>
                    <p className="opacity-50">Price: {Rupiah(product.price)}</p>
                    <div className="flex space-x-3 flex-wrap">
                      <p className="opacity-50 flex-none">
                        Stock: {product.stock}
                      </p>
                      <p className="opacity-50 flex-none">
                        Order: {product.reservedStock}
                      </p>
                      <p className="opacity-50 flex-none">
                        Sales: {product.soldQty}
                      </p>
                    </div>
                  </div>
                  <div className="absolute right-1 top-0.5">
                    <Status status={product.status} />
                  </div>
                </div>

                <div className="overflow-y-scroll scrollbar-hide">
                  <Actions
                    toggleVariants={() => toggleVariants(product.slug)}
                    isOpen={isOpen}
                    variantsLength={product.productVariants.length}
                  />
                </div>
              </div>
              {openVariants && product.productVariants && (
                <ModalContainer
                  handlerModal={() => toggleVariants('')}
                  style="left-0! right-0! bottom-0!"
                  showModal={isOpen}
                  isDashboard={true}
                >
                  <div>
                    <div className="overflow-y-scroll scrollbar-hide">
                      <SortVariants />
                    </div>
                    {product.productVariants.map((variant) => (
                      <div
                        key={variant.productVariantId}
                        className="flex space-x-2 justify-around border-b-[0.5px] border-gray-300 dark:border-black/90 py-2"
                      >
                        <img
                          src={variant.image}
                          className="aspect-square rounded-full h-16 object-cover my-auto"
                          aria-label={variant.name}
                        />
                        <div className="text-sm">
                          <h1 className="line-clamp-2">{variant.name}</h1>
                          <p className="opacity-50 text-xs">
                            SKU: {variant.sku}
                          </p>
                          <p className="opacity-50">
                            Price: {Rupiah(variant.price)}
                          </p>
                          <div className="flex space-x-3 flex-wrap">
                            <p className="opacity-50 flex-none">
                              Stock: {variant.stock}
                            </p>
                            <p className="opacity-50 flex-none">
                              Order: {variant.reservedStock}
                            </p>
                            <p className="opacity-50 flex-none">
                              Sales: {variant.soldQty}
                            </p>
                          </div>
                        </div>
                        <div className="my-auto">
                          <ActionsVariant />
                        </div>
                      </div>
                    ))}
                  </div>
                </ModalContainer>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
