import AnchoredModalContainer from '@/views/components/anchoredModalContainer';
import { RefObject } from 'react';
import { IconType } from 'react-icons';
import { useQueryParams } from '../../c/hooks/useQueryParams';

interface IAnchorIcon {
  label?: string;
  showModal: boolean;
  ref: RefObject<HTMLButtonElement>;
  children: React.ReactNode;
  align?: string;
  zIndex?: string;
  Icon?: IconType;
  HandlerModal: () => void;
}

export default function AnchorIconDropdown({
  label,
  showModal,
  ref,
  children,
  align,
  zIndex,
  Icon,
  HandlerModal,
}: IAnchorIcon) {
  const { pathname } = useQueryParams();
  const handleMouseEnter = () => {
    if (!showModal) HandlerModal();
  };

  const handleMouseLeave = () => {
    if (showModal) HandlerModal();
  };

  const labels = label ? label.toLowerCase() : '';

  const isPathname =
    pathname.includes(`/d/${labels}`) || pathname.includes(`/c/${labels}`);

  return (
    <div
      className="relative py-2.5"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={ref}
        aria-label={label + 'Menu'}
        onClick={HandlerModal}
        className={`flex items-center justify-center flex-col ${showModal || isPathname ? 'text-orange-800 dark:text-orange-600' : ''} `}
      >
        {Icon ? <Icon className="text-2xl hover:scale-125" /> : null}
        <p className={Icon ? '' : 'py-2'}>{label}</p>
      </button>{' '}
      <AnchoredModalContainer
        open={showModal}
        onClose={HandlerModal}
        anchorRef={ref}
        align={align}
        zIndex={zIndex}
      >
        {children}
      </AnchoredModalContainer>
    </div>
  );
}
