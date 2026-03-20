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

export default function TopNavbar({ totalItems }: { totalItems: number }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { isMobile } = useDetectIsMobile({ widthScreen: 525 });
  const { pathname } = useQueryParams();
  const segments = (pathname.match(/[^\/]+/g) || []).map((s) =>
    s ? s[0].toUpperCase() + s.slice(1) : '',
  );

  const handlerModal = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <div className="py-1 lg:w-2xs md:w-3xs w-50 flex-wrap hidden sm:flex">
        {segments.length > 1 ? (
          <>
            {segments.map((segment, s) => (
              <TagButton
                key={s}
                className="text-xs! pl-0! -ml-0.5"
                icon={<IoChevronBack className="text-lg" />}
                href={
                  s === 0
                    ? `/d/${segments[1].toLowerCase()}`
                    : `/${segments
                        .slice(0, s + 1)
                        .join('/')
                        .toLowerCase()}`
                }
              >
                {s === 0 ? 'Home' : segment}
              </TagButton>
            ))}
          </>
        ) : (
          <TagButton
            className="pr-3"
            icon={<IoChevronBack className="text-lg" />}
            onClick={() => router.back()}
          >
            Back
          </TagButton>
        )}
      </div>
      <div className="flex lg:flex-row flex-col justify-between flex-2 overflow-x-scroll scrollbar-hide">
        <div className="space-x-1 ml-2">
          {segments.length > 1 && (
            <h1 className="text-base sm:text-lg md:text-xl font-semibold inline-block">
              {segments.length > 3
                ? `${segments[3]} ${segments[1]}'s ${segments[2]}`
                : segments.slice(1, 3).join("'s ")}
            </h1>
          )}
          <p className="text-sm inline-block opacity-50">
            {totalItems} items found
          </p>
        </div>

        <div className="sm:ml-auto mt-2 lg:my-0">
          <SortProduct handlerModal={handlerModal} />
        </div>
      </div>
      {showModal && (
        <ModalContainer
          handlerModal={handlerModal}
          showModal={showModal}
          style={`${isMobile ? 'w-[90%]' : 'w-1/2'} h-screen dark:bg-[#1b1a1e]/80 bg-[#ededed]/80 backdrop-blur-xl p-3 rounded-2xl`}
          isFilter={true}
        >
          <div className="max-h-[94vh] space-y-3 overflow-y-scroll scrollbar-hide z-50">
            <button
              className="absolute top-2 right-2 p-3"
              onClick={handlerModal}
              aria-label="Close filter"
            >
              <IoClose className="text-2xl hover:scale-125" />
            </button>
            <div className="mb-7">
              <SideNavbar />
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
