'use client';
import React, { useRef, useState } from 'react';
import { IProductView } from '../products';
import Rupiah from '@/utils/rupiah';
import SortTable from './sort';
import SortVariants from './sortVariants';
import Actions from './actions';
import { sortDashboardOptions } from '@/utils/productDashboard';
import ActionsVariant from './actionsVariant';

export default function ProductTable({ products }: IProductView) {
  const [openVariants, setOPenVariants] = useState<string | null>(null);

  const toggleVariants = (slug: string) => {
    setOPenVariants((prev) => (prev === slug ? null : slug));
  };

  return (
    <div className="hidden sm:block">
      <table className="bg-black/10 dark:bg-white/10 rounded-2xl overflow-hidden max-w-4xl min-w-2xs">
        <thead className="h-10 text-sm">
          <tr className="bg-black/5 dark:bg-white/5">
            <th className="w-120 ">Product Details</th>
            {sortDashboardOptions.map((sort, s) => (
              <th key={s}>
                <SortTable sort={sort} />
              </th>
            ))}
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="text-xs sm:text-sm border-b-[0.5px] border-gray-300 dark:border-black/90">
          {products.map((product, p) => {
            const isOpen = openVariants === product.slug;
            const contentRef = useRef<HTMLDivElement>(null);

            return (
              <React.Fragment key={product.slug}>
                <tr
                  className={`h-22 ${p > 0 ? 'border-t-[0.5px] border-gray-300 dark:border-black/90' : ''}`}
                >
                  <td>
                    <div className="flex space-x-2 px-2">
                      <img
                        src={product.image}
                        className="aspect-square rounded-full h-14 md:h-18 object-cover my-auto"
                        aria-label={product.name}
                      />
                      <div>
                        <h1 className="font-semibold">{product.brand}</h1>
                        <p className="line-clamp-2">{product.name}</p>
                        <p className="text-xs opacity-50">{product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">{Rupiah(product.price)}</td>
                  <td className="text-center">{product.stock}</td>
                  <td className="text-center">{product.reservedStock}</td>
                  <td className="text-center">{product.soldQty}</td>
                  <td className="pr-2">
                    <p
                      className={`w-fit mx-auto px-2 py-1 rounded-full text-xs ${product.status === 'ACTIVE' ? 'text-red-700 bg-red-700/20' : product.status === 'ARCHIVE' ? 'text-yellow-700 bg-yellow-600/20' : 'text-gray-500 bg-gray-500/20'}`}
                    >
                      {product.status}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={7}>
                    <Actions
                      toggleVariants={() => toggleVariants(product.slug)}
                      isOpen={isOpen}
                      variantsLength={product.productVariants.length}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={7}
                    className="bg-black/5 dark:bg-white/5 rounded-2xl px-2"
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
                            className={`flex items-center justify-between py-2`}
                          >
                            <div className="flex space-x-1">
                              <div className="my-auto inline-block">
                                <img
                                  src={variant.image}
                                  className="aspect-square rounded-full h-10 object-cover"
                                />
                              </div>
                              <div className="overflow-hidden">
                                <p>{variant.name}</p>
                                <p className="text-[10px] md:text-xs opacity-50">
                                  {variant.sku}
                                </p>
                              </div>
                            </div>
                            <div className="flex text-center">
                              <div className="w-20">
                                {Rupiah(variant.price)}
                              </div>
                              <div className="w-20 ml-2">{variant.stock}</div>
                              <div className="w-20 ">
                                {variant.reservedStock}
                              </div>
                              <div className="w-20 mr-1">{variant.soldQty}</div>
                              <ActionsVariant />
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
        </tbody>
      </table>
    </div>
  );
}
