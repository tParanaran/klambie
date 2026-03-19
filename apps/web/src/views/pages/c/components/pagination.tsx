'use client';

import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { useQueryParams } from '../hooks/useQueryParams';
import getVisiblePageNumbers from '@/utils/pagination';
import { useEffect, useRef } from 'react';

interface IPagination {
  totalItems: number;
  limit?: number;
}
export default function Pagination({ totalItems, limit = 1 }: IPagination) {
  const pageRef = useRef<HTMLButtonElement | null>(null);
  const { getParams, createParams } = useQueryParams();

  const currentPage = parseInt(getParams('page') || '1');
  const totalPages = Math.ceil(totalItems / limit);
  const visiblePages = getVisiblePageNumbers(currentPage, totalPages, 4);

  const HandlePaginationChange = (newPage: number) => {
    createParams(
      { page: String(newPage), limit: String(limit) },
      { append: false },
    );
  };

  useEffect(() => {
    if (currentPage && pageRef.current) {
      const navbarHeight = 40;
      if (window.scrollY <= navbarHeight) {
        window.scrollTo({ top: navbarHeight, behavior: 'smooth' });
      }
    }
  }, [currentPage]);

  if (totalItems > 0) {
    return (
      <>
        <div>
          <button
            className="rounded-full p-2 text-xl bg-black/5 dark:bg-white/10 hover:scale-105"
            aria-label="Previous Page"
            onClick={() => HandlePaginationChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <IoChevronBack />
          </button>
        </div>

        <div className="space-x-1 bg-black/5 rounded-full px-3">
          {visiblePages[0] > 1 && (
            <>
              <button
                aria-label="Page 1"
                className={
                  currentPage === 1
                    ? 'bg-orange-700 text-[#ededed] rounded-md px-3 py-1.5 scale-105 shadow-2xl'
                    : 'px-2 py-2'
                }
                onClick={() => HandlePaginationChange(1)}
              >
                1
              </button>
              {visiblePages[0] > 2 && <span className="px-0 py-2">...</span>}
            </>
          )}
          {visiblePages.map((pageNumber) => (
            <button
              ref={pageRef}
              key={pageNumber}
              aria-label={`Page ${pageNumber}`}
              className={
                currentPage === pageNumber
                  ? 'bg-orange-700 text-[#ededed] rounded-md px-3 py-1.5 scale-105 shadow-2xl'
                  : 'px-3 py-1.5'
              }
              onClick={() => HandlePaginationChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
          {visiblePages[visiblePages.length - 1] < totalPages && (
            <>
              {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                <span className="px-0 py-2">...</span>
              )}

              <button
                aria-label="Page Last"
                className={
                  currentPage === totalPages
                    ? 'bg-orange-700 text-[#ededed] rounded-md px-3 py-1.5 scale-105 shadow-2xl'
                    : 'px-3 py-1.5'
                }
                onClick={() => HandlePaginationChange(totalPages)}
              >
                {totalPages}
              </button>
            </>
          )}
        </div>
        <div>
          <button
            className="rounded-full p-2 text-xl bg-black/5 dark:bg-white/10 hover:scale-105"
            aria-label="Next Page"
            onClick={() => HandlePaginationChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <IoChevronForward />
          </button>
        </div>
      </>
    );
  }
}
