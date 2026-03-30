'use client';
import { initialBlogCards } from '@/utils/blog';
import formatDate from '@/utils/formatDate';
import TitileContainer from '@/views/components/titleContainer';
import Image from 'next/image';
import { IoArrowForward } from 'react-icons/io5';
import HorizontalScrollButton from '../../d/components/buttonScroll';
import { useRouter } from 'next/navigation';
import { hoverEffect } from '@/utils/styling';
import Link from 'next/link';
import SeeMoreButton from '../../home/components/seeMore';

export default function BlogCard() {
  const router = useRouter();
  return (
    <div>
      <div className="my-10 lg:my-15 md:w-2xl">
        <TitileContainer
          badge={'Our Blogs'}
          title={'Get Inspired From Latest'}
          spanTitle="Threads And News"
          isFull={true}
        />
        <SeeMoreButton href={'/blog'} name={'See More'} />
      </div>
      <HorizontalScrollButton>
        <div className="flex space-x-5 p-4">
          {initialBlogCards.map((blog, b) => (
            <div
              key={blog.slug}
              className={b % 2 === 1 ? 'mt-10 md:mt-15' : ''}
            >
              <div
                className={`w-54 sm:w-64 bg-primary p-2 rounded-2xl flex-none overflow-hidden ${hoverEffect}`}
              >
                <div className="h-50">
                  <div>
                    <h1 className="text-lg">{blog.title}</h1>
                    <div className="text-xs opacity-50 mt-1">
                      <p>{formatDate(blog.createdAt)}</p>
                      <p>By {blog.author}</p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="text-xs text-active">#{blog.category}</p>
                    <p className="text-sm overflow-clip">{blog.description}</p>
                  </div>
                </div>

                <div className="relative">
                  <Image
                    src={blog.photo}
                    alt={`${blog.category} Image`}
                    height={224}
                    width={224}
                    className="w-50 h-40 sm:w-60 sm:h-52 rounded-2xl object-cover"
                  />
                  <div className="absolute z-10 bottom-0 right-0 w-9 h-9 bg-primary rounded-tl-2xl rounded-br-2xl inverted-radius-br-card"></div>

                  <button
                    className="absolute bottom-0 right-0 z-10 rounded-2xl bg-round-button p-1.5 text-xl"
                    onClick={() => router.push(`/blog/${blog.slug}`)}
                    aria-label={blog.title}
                  >
                    <IoArrowForward className="-rotate-35" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </HorizontalScrollButton>
    </div>
  );
}
