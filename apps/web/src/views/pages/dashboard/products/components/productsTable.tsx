'use client';
import React, { useRef, useState } from 'react';
import { sortDashboardOptions } from '@/utils/productDashboard';
import { IProductDashboard } from '../types';
import { useVariantActions } from '../hooks/useActionVariants';
import SortTable from './sort';
import SearchNotFound from '@/views/pages/d/components/notfound';
import Status from './status';
import Rupiah from '@/utils/rupiah';
import Actions from './actions';
import SortVariants from './sortVariants';
import ActionVariants from './actionVariants';
import VariantsModal from './variantsModal';

export default function ProductsTable({
  products,
}: {
  products: IProductDashboard[];
}) {
  const [openVariants, setOPenVariants] = useState<string | null>(null);
  const variantActions = useVariantActions();
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleVariants = (slug: string) => {
    setOPenVariants((prev) => (prev === slug ? null : slug));
  };

  return (
    <div className="hidden sm:block">
      <table className="bg-black/10 dark:bg-white/10 rounded-2xl overflow-hidden w-full min-w-2xs table-auto">
        <thead className="h-10 text-sm">
          <tr className="bg-black/5 dark:bg-white/5">
            <th>Product Details</th>
            {sortDashboardOptions.map((sort, s) => (
              <th key={s}>
                <SortTable sort={sort} />
              </th>
            ))}
            <th className="px-2 lg:px-5">Status</th>
          </tr>
        </thead>
        <tbody className="text-sm border-b-[0.5px] border-gray-300 dark:border-black/90">
          {products.length === 0 ? (
            <tr>
              <td colSpan={7} className="h-[70vh]">
                <SearchNotFound children={undefined} />
              </td>
            </tr>
          ) : (
            <>
              {products.map((product, p) => {
                const isOpen = openVariants === product.slug;

                return (
                  <React.Fragment key={product.slug}>
                    <tr
                      className={`relative h-22 ${p > 0 ? 'border-t-[0.5px] border-gray-300 dark:border-black/90' : ''}`}
                    >
                      <td className="w-4xl">
                        <div className="flex space-x-2 lg:space-x-5 px-2 lg:px-5">
                          <img
                            src={product.image}
                            className="aspect-square rounded-full h-14 md:h-20 object-cover my-auto"
                            aria-label={product.name}
                          />
                          <div>
                            <h1 className="font-semibold">{product.brand}</h1>
                            <p className="line-clamp-2">{product.name}</p>
                            <p className="text-xs opacity-50">
                              SKU: {product.sku}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>{Rupiah(product.price)}</td>
                      <td className="text-center">{product.stock}</td>
                      <td className="text-center">{product.reservedStock}</td>
                      <td className="text-center">{product.soldQty}</td>
                      <td className="pr-2 lg:pr-5">
                        <Status
                          status={product.status}
                          productId={product.productId}
                        />
                      </td>
                    </tr>
                    <tr className="relative">
                      <td colSpan={7}>
                        <Actions
                          toggleVariants={() => toggleVariants(product.slug)}
                          isOpen={isOpen}
                          variantsLength={product.productVariants.length}
                          slug={product.slug}
                          id={product.productId}
                          name={product.name}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={7}
                        className="bg-black/5 dark:bg-white/5 rounded-2xl px-2 lg:px-5"
                      >
                        <div
                          style={{
                            maxHeight: isOpen
                              ? contentRef.current?.scrollHeight
                              : 0,
                          }}
                          className="overflow-hidden transition-all duration-300 ease-in-out"
                        >
                          <div ref={contentRef}>
                            <SortVariants />
                            {product.productVariants?.map((variant, v) => (
                              <div
                                key={variant.productVariantId}
                                className={`flex items-center justify-between py-2 ${v === product.productVariants.length - 1 ? 'pb-5' : ''}`}
                              >
                                <div className="flex space-x-2">
                                  <div className="my-auto inline-block">
                                    <img
                                      src={variant.image}
                                      className="aspect-square rounded-full h-10 object-cover"
                                    />
                                  </div>
                                  <div className="overflow-hidden">
                                    <p>{variant.name}</p>
                                    <p className="text-xs opacity-50">
                                      SKU: {variant.sku}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex text-center">
                                  <div className="w-20 my-auto">
                                    {Rupiah(variant.price)}
                                  </div>
                                  <div className="w-20 ml-2 my-auto">
                                    {variant.stock}
                                  </div>
                                  <div className="w-20 my-auto">
                                    {variant.reservedStock}
                                  </div>
                                  <div className="w-17 mr-1 my-auto">
                                    {variant.soldQty}
                                  </div>
                                  <div className="w-16 mr-1 my-auto">
                                    <Status
                                      status={
                                        variant.isActive ? 'ACTIVE' : 'ARCHIVE'
                                      }
                                      productId={variant.productVariantId}
                                      isVariant={true}
                                    />
                                  </div>
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
