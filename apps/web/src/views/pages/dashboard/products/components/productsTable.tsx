'use client';
import React, { useState } from 'react';
import { sortDashboardOptions } from '@/utils/productDashboard';
import { IProductDashboard } from '../types';
import { useVariantActions } from '../hooks/useActionVariants';
import SearchNotFound from '@/views/pages/d/components/notfound';
import Status from './status';
import Rupiah from '@/utils/formatValue';
import Actions from './actions';
import ActionVariants from './actionVariants';
import VariantsModal from './variantsModal';
import SortToggle from './sortToggle';
import useFilteredParams from '@/views/pages/c/hooks/useFilteredParams';

export default function ProductsTable({
  products,
}: {
  products: IProductDashboard[];
}) {
  const [openVariants, setOPenVariants] = useState<string | null>(null);
  const { currentOrder, currentSort } = useFilteredParams();
  const variantActions = useVariantActions();

  const toggleVariants = (slug: string) => {
    setOPenVariants((prev) => (prev === slug ? null : slug));
  };

  const border = 'border-gray-300 dark:border-black/90 border-t-[0.5px]';
  const colName = 'flex items-center text-center px-5 gap-2';
  const widthName = 'w-2xs md:w-xs lg:w-md max-w-2xl';
  const cols =
    'flex-2 grid grid-cols-[1.5fr_repeat(4,1fr)] gap-2 items-center text-center';

  return (
    <div className="hidden sm:block">
      <table className="bg-black/10 dark:bg-white/10 rounded-2xl overflow-hidden w-full min-w-2xs text-sm">
        <thead>
          <tr className="bg-black/5 dark:bg-white/5">
            <th>
              <div className={`${colName} h-10`}>
                <div className={widthName}>Product Details</div>
                <div className={cols}>
                  {sortDashboardOptions.map((sort, s) => (
                    <div key={s}>{sort.label}</div>
                  ))}
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td className="h-[70vh]">
                <SearchNotFound children={undefined} />
              </td>
            </tr>
          ) : (
            <>
              {products.map((product, p) => {
                const isOpen = openVariants === product.slug;

                return (
                  <React.Fragment key={product.slug}>
                    <tr className={`relative h-22 ${p > 0 ? border : ''}`}>
                      <td>
                        <div className={colName}>
                          <div className={widthName}>
                            <div className="flex space-x-2 lg:space-x-5 text-left">
                              <img
                                src={product.image}
                                className="aspect-square rounded-full h-14 md:h-20 object-cover my-auto"
                                aria-label={product.name}
                              />
                              <div>
                                <h1 className="font-semibold">
                                  {product.brand}
                                </h1>
                                <p className="line-clamp-2">{product.name}</p>
                                <p className="text-xs opacity-50">
                                  # {product.sku}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className={cols}>
                            <div>{Rupiah(product.price)}</div>
                            <div>{product.stock}</div>
                            <div>{product.reservedStock}</div>
                            <div>{product.soldQty}</div>
                            <div>
                              <Status
                                status={product.status}
                                productId={product.productId}
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="relative">
                      <td>
                        <div className="ml-0 sm:ml-3 lg:ml-5">
                          <Actions
                            toggleVariants={() => toggleVariants(product.slug)}
                            isOpen={isOpen}
                            variantsLength={product.productVariants.length}
                            slug={product.slug}
                            id={product.productId}
                            name={product.name}
                            hasVariants={product.type === 'VARIANT'}
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div
                          className={`overflow-y-scroll scrollbar-hide transition-all duration-300 ease-in-out ${isOpen ? 'max-h-160' : 'max-h-0'}  bg-black/5 dark:bg-white/5 px-5`}
                        >
                          <div>
                            {product.productVariants.length > 0 && (
                              <div className="w-full h-12 flex items-center justify-center sticky top-0">
                                <div className="rounded-lg bg-body">
                                  <SortToggle
                                    view="TABLE"
                                    currentOrder={currentOrder}
                                    currentSort={currentSort}
                                  />
                                </div>
                              </div>
                            )}
                            {product.productVariants?.map((variant) => (
                              <div
                                key={variant.productVariantId}
                                className="flex items-center justify-between py-3 gap-2"
                              >
                                <div
                                  className={`flex justify-between ${widthName}`}
                                >
                                  <div className="flex space-x-2 text-left">
                                    <div className="my-auto inline-block">
                                      <img
                                        src={variant.image}
                                        className="aspect-square rounded-full h-10 object-cover"
                                      />
                                    </div>
                                    <div className="overflow-hidden">
                                      <p>{variant.name}</p>
                                      <p className="text-xs opacity-50">
                                        # {variant.sku}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex-none w-fit px-2">
                                    <ActionVariants
                                      onDelete={() =>
                                        variantActions.openDelete(variant)
                                      }
                                      onEdit={() =>
                                        variantActions.openEdit(variant)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className={cols}>
                                  <div>{Rupiah(variant.price)}</div>
                                  <div>{variant.stock}</div>
                                  <div>{variant.reservedStock}</div>
                                  <div>{variant.soldQty}</div>
                                  <div>
                                    <Status
                                      status={
                                        variant.isActive ? 'ACTIVE' : 'ARCHIVE'
                                      }
                                      productId={variant.productVariantId}
                                      isVariant={true}
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </>
          )}
        </tbody>
      </table>
      <VariantsModal {...variantActions} />
    </div>
  );
}
