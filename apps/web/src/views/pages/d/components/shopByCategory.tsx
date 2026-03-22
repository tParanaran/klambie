'use client';
import Link from 'next/link';
import useAttribute from '../../c/hooks/useAttribute';
import { useState } from 'react';

interface IShopByCategory {
  slug: string;
}

export default function ShopByCategory({ slug }: IShopByCategory) {
  const { categories } = useAttribute();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const segments = categories.filter((cat) => cat.slug === slug)[0];

  return (
    <main>
      <h1 className="font-semibold text-lg mb-3 mt-5 text-center">
        Shop By Categories
      </h1>
      <div className="flex overflow-y-auto scrollbar-hide gap-2">
        {segments.subcategories?.map((cat, c) => (
          <div
            key={cat.slug}
            className="relative rounded-2xl bg-black/5 dark:bg-white-10 group overflow-hidden cursor-pointer flex-none p-3 shadow-xs"
            style={{ height: 225, width: 225 }}
            onClick={() => setActiveIndex(activeIndex === c ? null : c)}
          >
            <p className="mb-3 opacity-50">{cat.name}</p>

            <div
              className="overflow-y-auto scrollbar-hide"
              style={{ maxHeight: 165 }}
            >
              <div className="text-sm flex flex-col flex-wrap space-y-2">
                {cat.subcategories?.map((subCat) => (
                  <Link
                    className="flex-none z-20"
                    key={subCat.slug}
                    href={`/c/${segments.slug}/${cat.slug}/${subCat.slug}`}
                  >
                    {subCat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
