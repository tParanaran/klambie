import { IProductDashboard } from '../types';
import Rupiah from '@/utils/rupiah';
import Status from './status';
import Actions from './actions';
import { useState } from 'react';
import SearchNotFound from '@/views/pages/d/components/notfound';
import ModalContainer from '@/views/components/modalContainer';
import ActionVariants from './actionVariants';
import { useVariantActions } from '../hooks/useActionVariants';
import VariantsModal from './variantsModal';
import SortToggle from './sortToggle';
import useFilteredParams from '@/views/pages/c/hooks/useFilteredParams';

export default function ProductCard({
  products,
}: {
  products: IProductDashboard[];
}) {
  const [openVariants, setOPenVariants] = useState<string | null>(null);
  const { currentOrder, currentSort } = useFilteredParams();
  const actionVariants = useVariantActions();

  const toggleVariants = (slug: string) => {
    setOPenVariants((prev) => (prev === slug ? null : slug));
  };

  const { isChildren, openDelete, openEdit } = actionVariants;

  return (
    <>
      {products.length === 0 ? (
        <div className="h-[70vh] px-3 text-sm my-5">
          <SearchNotFound children={undefined} />
        </div>
      ) : (
        <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {products.map((product) => {
            const isOpen = openVariants === product.slug;
            return (
              <div key={product.slug}>
                <div className="rounded-2xl overflow-hidden bg-light dark:bg-white/10 p-2">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover aspect-square w-full rounded-2xl"
                    />
                    <div className="absolute top-1 left-1">
                      <Status
                        status={product.status}
                        productId={product.productId}
                      />
                    </div>
                    <div className="overflow-x-scroll scrollbar-hide">
                      <Actions
                        toggleVariants={() => toggleVariants(product.slug)}
                        slug={product.slug}
                        name={product.name}
                        id={product.productId}
                        isOpen={isOpen}
                        variantsLength={product.productVariants.length}
                      />
                    </div>
                  </div>
                  <div className="text-sm">
                    <h1 className="line-clamp-2 h-10">{product.name}</h1>
                    <div className="text-sm opacity-50 my-1">
                      <p>{product.brand}</p>
                      <p className="text-xs"># {product.sku}</p>
                    </div>
                    <div>
                      <p className="text-active">{Rupiah(product.price)}</p>
                      <div className="flex space-x-3 flex-wrap">
                        <p>Stock: {product.stock}</p>
                        <p>Order: {product.reservedStock}</p>
                        <p>Sales: {product.soldQty}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {isOpen && !isChildren && product.productVariants && (
                  <ModalContainer
                    handlerModal={() => setOPenVariants(null)}
                    style="lg:w-5xl z-50 mx-auto bg-primary-opacity shadow-xl backdrop-blur-xl rounded-2xl p-3 overflow-y-scroll scrollbar-hide max-h-[75vh] h-full mt-[25vh]"
                    showModal={isOpen}
                    isFilter={true}
                  >
                    <div className="sticky -top-2 z-20">
                      <div className="overflow-x-scroll scrollbar-hide mx-auto max-w-108 w-full sm:w-fit bg-secondary rounded-xl">
                        <SortToggle
                          view="CARD"
                          currentOrder={currentOrder}
                          currentSort={currentSort}
                        />
                      </div>
                    </div>
                    {product.productVariants.length <= 0 && (
                      <div className="p-3 text-sm">
                        <SearchNotFound children />
                      </div>
                    )}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 pt-2">
                      {product.productVariants.map((variant) => (
                        <div
                          key={variant.productVariantId}
                          className="rounded-2xl bg-light dark:bg-white/5 p-2"
                        >
                          <div className="relative rounded-2xl overflow-hidden">
                            <img
                              src={variant.image}
                              className="aspect-square w-full object-cover"
                              aria-label={variant.name}
                            />
                            <div className="absolute top-1 left-1">
                              <Status
                                status={variant.isActive ? 'ACTIVE' : 'ARCHIVE'}
                                productId={variant.productVariantId}
                                isVariant={true}
                              />
                            </div>
                            <div className="absolute bottom-1 right-1">
                              <ActionVariants
                                onDelete={() => openDelete(variant)}
                                onEdit={() => openEdit(variant)}
                              />
                            </div>
                          </div>

                          <div className="mt-1 text-sm">
                            <h1 className="line-clamp-2">{variant.name}</h1>
                            <div className="text-sm opacity-50 my-1">
                              <p className="text-xs"># {variant.sku}</p>
                            </div>
                            <div>
                              <p className="text-active">
                                {Rupiah(variant.price)}
                              </p>
                              <div className="flex space-x-2 flex-wrap">
                                <p>Stock: {variant.stock}</p>
                                <p>Order: {variant.reservedStock}</p>
                                <p>Sales: {variant.soldQty}</p>
                              </div>
                            </div>
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
    </>
  );
}
