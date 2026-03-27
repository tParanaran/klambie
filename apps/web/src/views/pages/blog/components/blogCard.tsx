'use client';
import { initialBlogCards } from '@/utils/blog';
import formatDate from '@/utils/formatDate';
import TitileContainer from '@/views/components/titleContainer';
import Image from 'next/image';
import Link from 'next/link';
import { IoArrowForward } from 'react-icons/io5';
import HorizontalScrollButton from '../../d/components/buttonScroll';
import { useRouter } from 'next/navigation';

export default function BlogCard() {
  const router = useRouter();
  return (
    <div>
      <div className="my-10 lg:my-15">
        <TitileContainer
          badge={' Our Blogs'}
          title={'Get Inspired From'}
          spanTitle="Threads And News"
        />
      </div>
      <HorizontalScrollButton>
        <div className="flex space-x-5 p-4">
          {initialBlogCards.map((blog, b) => (
            <div
              key={blog.slug}
              className={b % 2 === 1 ? 'mt-10 md:mt-15' : ''}
            >
              <div className="w-54 sm:w-64 bg-[#ededed] dark:bg-[#1A1A1A] p-2 rounded-2xl flex-none hover:scale-105 transition-transform duration-300 will-change-transform overflow-hidden">
                <div className="h-50">
                  <div>
                    <h1 className="text-lg">{blog.title}</h1>
                    <div className="text-xs opacity-50 mt-1">
                      <p>{formatDate(blog.createdAt)}</p>
                      <p>By {blog.author}</p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="text-xs text-orange-700">#{blog.category}</p>
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
                  <div className="absolute z-10 bottom-0 right-0 w-9 h-9 dark:bg-[#1b1a1e] bg-[#ededed] rounded-tl-2xl rounded-br-2xl inverted-radius-br-card"></div>

                  <button
                    className="absolute bottom-0 right-0 z-10 rounded-2xl bg-[#1b1a1e] dark:bg-[#ededed] dark:text-[#1b1a1e]  text-white p-1 text-2xl"
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
