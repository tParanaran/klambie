import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { useHorizontalScroll } from '../hook/useHorizontalScroll';

interface IHorizontalScrollButton {
  children: React.ReactNode;
}

const button =
  'absolute top-1/2 -translate-y-1/2 z-10! bg-black/30 text-[#ededed] p-1.5 rounded-full flex-none lg:hidden';
const overflow = 'overflow-x-scroll scrollbar-hide overflow-y-hidden';

export default function HorizontalScrollButton({
  children,
}: IHorizontalScrollButton) {
  const { showLeft, showRight, scrollLeftFn, scrollRightFn, scrollRef } =
    useHorizontalScroll();
  return (
    <div className="relative z-0">
      {showLeft && (
        <button onClick={scrollLeftFn} className={`${button}  left-2`}>
          <IoChevronBack className="text-xl" />
        </button>
      )}
      {showRight && (
        <button onClick={scrollRightFn} className={`${button}  right-2`}>
          <IoChevronForward className="text-xl" />
        </button>
      )}
      <div ref={scrollRef} className={overflow}>
        {children}
      </div>
    </div>
  );
}
