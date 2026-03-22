'use client';
import TagButton from '@/views/components/tagButton';
import useDetectIsMobile from '../../template/hooks/useDetectIsMobile';
import SortProduct from './sort';
import ModalContainer from '@/views/components/modalContainer';
import SideNavbar from './sideNavbar';
import { useQueryParams } from '../hooks/useQueryParams';
import { IoChevronBack, IoClose } from 'react-icons/io5';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ICategories } from '../types';
import { formatPathname } from '@/utils/formatPathname';

interface ITopNavbar {
  totalItems: number;
  filters: ICategories[];
  query?: string;
}

export default function TopNavbar({ totalItems, filters, query }: ITopNavbar) {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { isMobile } = useDetectIsMobile({ widthScreen: 525 });
  const { pathname, getAllParams, deleteParams } = useQueryParams();
  const allParams = getAllParams('key');

  const newPathname = allParams.map((s) =>
    s ? s[0].toUpperCase() + s.slice(1) : '',
  );

  const segments = formatPathname(pathname);

  const slugs = pathname.match(/[^\/]+/g) || [];

  const handlerModal = () => {
    setShowModal(!showModal);
  };

  const content = (
    <>
      <div className="space-x-2 text-base sm:text-lg font-semibold">
        {segments.length >= 1 && (
          <h1 className="inline-block">
            {segments.length > 3
              ? `${segments[3]} ${segments[2]} of ${segments[1]}`
              : segments.slice(1, 3).reverse().join(' of ')}
          </h1>
        )}

        {query && <h1 className="inline-block">"{query}"</h1>}

        <p className="text-sm inline-block opacity-50">
          {totalItems} items found
        </p>
      </div>
    </>
  );
  return (
    <>
      {/* Mobile View */}
      <div className="lg:hidden">{content}</div>
      <div className="flex py-2 items-end">
        <div className="lg:w-2xs md:w-3xs w-50 hidden sm:block">
          <div className="flex px-1 overflow-x-scroll scrollbar-hide">
            {segments.length > 1 ? (
              <>
                {slugs.map((slug, s) => (
                  <TagButton
                    key={s}
                    className={`text-xs! pl-0! -ml-0.5 ${s === 0 ? 'pr-3!' : ''}`}
                    icon={<IoChevronBack className="text-lg" />}
                    href={
                      s === 0
                        ? `/d/${slugs[1]}`
                        : `/${slugs.slice(0, s + 1).join('/')}`
                    }
                  >
                    {s === 0 ? 'Home' : segments[s]}
                  </TagButton>
                ))}
              </>
            ) : (
              <>
                <TagButton
                  className="text-xs! pr-3! pl-0! -ml-0.5"
                  icon={<IoChevronBack className="text-lg" />}
                  onClick={() => router.back()}
                >
                  Back
                </TagButton>
                {newPathname &&
                  newPathname.map((newPath, n) => (
                    <TagButton
                      key={n}
                      className={`text-xs! pl-0! -ml-0.5 ${n === 0 ? 'pr-3!' : ' '}`}
                      icon={<IoChevronBack className="text-lg" />}
                      onClick={() => deleteParams('key')}
                    >
                      {newPath}
                    </TagButton>
                  ))}
              </>
            )}
          </div>
        </div>
        {/* Desktop View */}
        <div className="flex justify-between flex-2 overflow-x-scroll scrollbar-hide">
          <div className="hidden lg:block ml-2">{content}</div>
          <div className="sm:ml-auto">
            <SortProduct handlerModal={handlerModal} />
          </div>
        </div>
      </div>

      {showModal && (
        <ModalContainer
          handlerModal={handlerModal}
          showModal={showModal}
          style={`${isMobile ? 'w-[90%]' : 'w-1/2'} h-screen dark:bg-[#1b1a1e]/80 bg-[#ededed]/80 backdrop-blur-xl p-3 rounded-2xl`}
          isFilter={true}
        >
          <div className="max-h-[94vh] overflow-y-scroll scrollbar-hide z-50">
            <button
              className="absolute top-2 right-2 p-3 z-50"
              onClick={handlerModal}
              aria-label="Close filter"
            >
              <IoClose className="text-2xl hover:scale-125" />
            </button>
            <div className="mb-7 space-y-2">
              <SideNavbar filters={filters} />
            </div>
            <TagButton
              className="absolute bottom-2 left-2 right-2 py-2"
              onClick={handlerModal}
            >
              <p className="mx-auto uppercase">View {totalItems} items found</p>
            </TagButton>
          </div>
        </ModalContainer>
      )}
    </>
  );
}
