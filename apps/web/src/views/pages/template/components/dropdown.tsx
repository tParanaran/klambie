import AnchoredModalContainer from '@/views/components/anchoredModalContainer';
import { RefObject } from 'react';
import { IconType } from 'react-icons';

interface IAnchorIcon {
  ariaLabel: string;
  showModal: boolean;
  ref: RefObject<HTMLButtonElement>;
  children: React.ReactNode;
  Icon: IconType;
  HandlerModal: () => void;
}

export default function AnchorIconDropdown({
  ariaLabel,
  showModal,
  ref,
  children,
  Icon,
  HandlerModal,
}: IAnchorIcon) {
  return (
    <div
      className="relative"
      onMouseEnter={HandlerModal}
      onMouseLeave={HandlerModal}
    >
      <button
        ref={ref}
        aria-label={ariaLabel}
        onClick={HandlerModal}
        className="hover:scale-125"
      >
        <Icon className={`${showModal ? 'text-orange-800' : ''}`} />
      </button>{' '}
      <AnchoredModalContainer
        open={showModal}
        onClose={HandlerModal}
        anchorRef={ref}
      >
        {children}
      </AnchoredModalContainer>
    </div>
  );
}
