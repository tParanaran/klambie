'use client';

import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { useQueryParams } from '../hooks/useQueryParams';
import { useEffect, useRef } from 'react';
import getVisiblePageNumbers from '@/utils/pagination';
import { IPagination } from '../types';

export default function Pagination({
  totalItems,
  totalPages,
  currentPages,
}: IPagination) {
  const pageRef = useRef<HTMLButtonElement | null>(null);
  const { createParams } = useQueryParams();

  const visiblePages = getVisiblePageNumbers(currentPages, totalPages, 4);
  const HandlePaginationChange = (newPage: number) => {
    createParams({ page: String(newPage) }, { append: false });
  };

  useEffect(() => {
    if (currentPages && pageRef.current) {
      const navbarHeight = 0;
      if (window.scrollY <= navbarHeight) {
        window.scrollTo({ top: navbarHeight, behavior: 'smooth' });
      }
    }
  }, [currentPages]);

  if (totalItems > 0) {
    return (
      <>
        <div>
          <button
            className="rounded-full p-2 text-xl bg-black/5 dark:bg-white/10 hover:scale-105"
            aria-label="Previous Page"
            onClick={() => HandlePaginationChange(currentPages - 1)}
            disabled={currentPages === 1}
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
                  currentPages === 1
                    ? 'bg-orange-700 text-light rounded-md px-3 py-1.5 scale-105 shadow-2xl'
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
                currentPages === pageNumber
                  ? 'bg-orange-700 text-light rounded-md px-3 py-1.5 scale-105 shadow-2xl'
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
                  currentPages === totalPages
                    ? 'bg-orange-700 text-light rounded-md px-3 py-1.5 scale-105 shadow-2xl'
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
            onClick={() => HandlePaginationChange(currentPages + 1)}
            disabled={currentPages === totalPages}
          >
            <IoChevronForward />
          </button>
        </div>
      </>
    );
  }
}
