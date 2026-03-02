'use client';
import 'swiper/css';
import { SwiperSlide, Swiper } from 'swiper/react';
import { IoBagAddOutline } from 'react-icons/io5';
import { IProducts } from '@/views/pages/product/types/product.types';
import Link from 'next/link';
import Tags from '@/views/pages/product/components/tags';
import ProductPrice from '../../product/components/price';

export default function ProductCard({ products }: { products: IProducts[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0.5 my-5">
      {products.map((item, idx) => (
        <div key={idx} className="mb-5">
          <Swiper>
            {item.images.map((image, i) => (
              <SwiperSlide key={i}>
                <img
                  src={image}
                  alt={`Product Image ${i}`}
                  className="object-cover h-72 sm:h-80 lg:h-96 w-full"
                  width={300}
                  height={400}
                />
              </SwiperSlide>
            ))}
            <div className="absolute top-1 right-1 z-10">
              <button
                className="rounded-full text-3xl p-2 bg-black/60 font-bold text-[#ededed] uppercase w-full hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Add to cart modal"
              >
                <IoBagAddOutline />
              </button>
            </div>
            <div className="absolute bottom-1 left-1 right-1 z-10">
              <div className="flex flex-wrap space-x-1 text-xs">
                <Tags tags={item.tags} />
              </div>
            </div>
            {/* <div className="absolute top-1 left-1 z-10">
                  {RATINGSTARHERE}
                </div> */}
          </Swiper>{' '}
          <Link href={`/p/${item.slug}`}>
            <div className="flex space-x-1 my-3 flex-wrap">
              {' '}
              {item.variants.map((color, c) => (
                <span
                  key={c}
                  style={{ backgroundColor: `${color}` }}
                  className="p-2 mt-1 rounded-full"
                ></span>
              ))}
            </div>

            <div>
              <h1 className="text-light text-xs uppercase mb-1 opacity-70">
                {item.categories
                  .map((category) => {
                    return category;
                  })
                  .join(', ')}
              </h1>
              <p className="font-bold">{item.brand}</p>
              <p className="font-light">{item.name}</p>
              <div className="flex items-center space-x-2 flex-wrap">
                <ProductPrice price={item.price} />
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
