'use client';
import { useState } from 'react';
import { IProductDashboard } from '../types';
import { useVariantActions } from '../hooks/useActionVariants';
import Actions from './actions';
import Rupiah from '@/utils/formatValue';
import Status from './status';
import ModalContainer from '@/views/components/modalContainer';
import ActionVariants from './actionVariants';
import SearchNotFound from '@/views/pages/d/components/notfound';
import VariantsModal from './variantsModal';
import SortToggle from './sortToggle';
import useFilteredParams from '@/views/pages/c/hooks/useFilteredParams';
import EmptyCart from '@/views/pages/cart/components/empty';

export default function ProductsTableMobile({
  products,
}: {
  products: IProductDashboard[];
}) {
  const { currentOrder, currentSort } = useFilteredParams();
  const [openVariants, setOPenVariants] = useState<string | null>(null);
  const actionVariants = useVariantActions();

  const toggleVariants = (slug: string) => {
    setOPenVariants((prev) => (prev === slug ? null : slug));
  };

  const { openDelete, openEdit, isChildren } = actionVariants;

  return (
    <div className="block sm:hidden bg-black/10 dark:bg-white/10 rounded-2xl overflow-hidden">
      <div className="text-center bg-black/5 dark:bg-white/5">
        <p className="my-auto text-sm font-semibold uppercase py-2">
          Product Details
        </p>
      </div>
      {products.length === 0 ? (
        <div className="h-[70vh] px-3 text-sm">
          <SearchNotFound children={undefined} />
        </div>
      ) : (
        <div>
          {products.map((product) => {
            const isOpen = openVariants === product.slug;
            return (
              <div key={product.slug}>
                <div className="relative p-1 border-b-[0.5px] border-gray-300 dark:border-black/90 px-3">
                  <div className="flex space-x-2 justify-between">
                    <div className="flex flex-col gap-1 items-center my-auto flex-1">
                      <img
                        src={product.image}
                        className="aspect-square rounded-full h-16 object-cover"
                        aria-label={product.name}
                      />
                      <Status
                        status={product.status}
                        productId={product.productId}
                      />
                    </div>
                    <div className="text-sm flex-2">
                      <h1 className="font-semibold">{product.brand}</h1>
                      <p className="line-clamp-2">{product.name}</p>
                      <p className="opacity-50"># {product.sku}</p>
                      <p className="opacity-50">
                        Price: {Rupiah(product.price)}
                      </p>
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
                  </div>

                  <div className="overflow-y-scroll scrollbar-hide">
                    <Actions
                      toggleVariants={() => toggleVariants(product.slug)}
                      isOpen={isOpen}
                      variantsLength={product.productVariants.length}
                      hasVariants={product.type === 'VARIANT'}
                      slug={product.slug}
                      id={product.productId}
                      name={product.name}
                      isNotDraft={product.status !== 'DRAFT'}
                    />
                  </div>
                </div>
                {isOpen && !isChildren && product.productVariants && (
                  <ModalContainer
                    handlerModal={() => setOPenVariants(null)}
                    style="left-0! right-0! bottom-0! overflow-contain"
                    showModal={isOpen}
                    isDashboard={true}
                  >
                    <div>
                      <div className="overflow-y-scroll scrollbar-hide -top-2 mx-auto sticky z-20 bg-secondary w-fit rounded-lg max-w-full">
                        <SortToggle
                          currentOrder={currentOrder}
                          currentSort={currentSort}
                        />
                      </div>
                      {product.productVariants.length <= 0 && (
                        <div className="p-3 text-sm">
                          <SearchNotFound children />
                        </div>
                      )}
                      {product.productVariants.map((variant) => (
                        <div
                          key={variant.productVariantId}
                          className="flex space-x-2 justify-around border-b-[0.5px] border-gray-300 dark:border-black/90 py-2 ml-5"
                        >
                          <div className="flex flex-col-reverse gap-1">
                            <Status
                              status={variant.isActive ? 'ACTIVE' : 'ARCHIVE'}
                              productId={variant.productVariantId}
                              isVariant={true}
                            />
                            <img
                              src={variant.image}
                              className="aspect-square rounded-full h-16 object-cover my-auto"
                              aria-label={variant.name}
                            />
                          </div>

                          <div className="text-sm">
                            <h1 className="line-clamp-2">{variant.name}</h1>
                            <p className="opacity-50 text-xs">
                              # {variant.sku}
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
                            <ActionVariants
                              onDelete={() => openDelete(variant)}
                              onEdit={() => openEdit(variant)}
                            />
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
      )}

      {actionVariants.selectedVariant && <VariantsModal {...actionVariants} />}
    </div>
  );
}
