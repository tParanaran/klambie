import TagButton from '@/views/components/tagButton';
import { useQueryParams } from '../hooks/useQueryParams';
import SortProduct from './sort';
import { IoChevronBack } from 'react-icons/io5';
import ModalContainer from '@/views/components/modalContainer';
import SideNavbar from './sideNavbar';
import { useState } from 'react';
import useDetectIsMobile from '../../template/hooks/useDetectIsMobile';

export default function TopNavbar({ totalItems }: { totalItems: number }) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { isMobile } = useDetectIsMobile({ widthScreen: 500 });
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
        {segments?.map((segment, s) => (
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
          style={`${isMobile ? 'w-screen' : 'w-1/2'} h-screen dark:bg-[#1b1a1e]/80 bg-[#ededed]/80 backdrop-blur-xl p-3 rounded-2xl`}
          isFilter={true}
        >
          <div className="max-h-[94vh] space-y-3 overflow-y-scroll scrollbar-hide">
            <SideNavbar />
          </div>
        </ModalContainer>
      )}
    </>
  );
}
