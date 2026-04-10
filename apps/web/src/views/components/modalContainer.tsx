import useHandleClickOutside from '../pages/template/hooks/useHandleClickOutside';

interface IMOdalContainer {
  handlerModal: () => void;
  showModal: boolean;
  isClickOutside?: boolean;
  children: React.ReactNode;
  style?: string;
  isFilter?: boolean;
  isDashboard?: boolean;
}

export default function ModalContainer({
  isFilter = false,
  isDashboard = false,
  isClickOutside = true,
  handlerModal,
  showModal,
  children,
  style,
}: IMOdalContainer) {
  const { modalRef, dropdownRef } = useHandleClickOutside({
    handleClickOutside: () => {
      if (isClickOutside) handlerModal();
    },
  });
  return (
    <div
      onClick={handlerModal}
      className={`fixed inset-0 z-20 transition-opacity duration-300 ${
        showModal
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      } ${isFilter || isDashboard ? 'bg-black/20' : 'bg-black/0'}`}
    >
      <div
        ref={modalRef}
        className={`${isFilter ? '' : 'fixed text-sm sm:left-10 sm:right-10 left-3 right-3 p-3 sm:p-5 text-secondary bg-secondary-opacity shadow-xl backdrop-blur-xl rounded-2xl max-h-[75vh] overflow-y-auto space-y-3 transform transition-transform duration-300 ease-out scrollbar-hide'} ${style} transition-all duration-300 ease-out ${showModal ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div ref={dropdownRef}>{children}</div>
      </div>
    </div>
  );
}
