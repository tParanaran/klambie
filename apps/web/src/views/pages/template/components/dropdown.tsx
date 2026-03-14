import AnchoredModalContainer from '@/views/components/anchoredModalContainer';
import { RefObject } from 'react';
import { IconType } from 'react-icons';

interface IAnchorIcon {
  label: string;
  showModal: boolean;
  ref: RefObject<HTMLButtonElement>;
  children: React.ReactNode;
  Icon: IconType;
  HandlerModal: () => void;
}

export default function AnchorIconDropdown({
  label,
  showModal,
  ref,
  children,
  Icon,
  HandlerModal,
}: IAnchorIcon) {
  return (
    <div
      className="relative py-2.5"
      onMouseEnter={HandlerModal}
      onMouseLeave={HandlerModal}
    >
      <button
        ref={ref}
        aria-label={label + 'Menu'}
        onClick={HandlerModal}
        className={`flex items-center justify-center flex-col ${showModal ? 'text-orange-800' : ''}`}
      >
        <Icon className="hover:scale-125" />
        <p className="text-xs">{label}</p>
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
