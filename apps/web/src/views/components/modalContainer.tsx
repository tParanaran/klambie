interface IMOdalContainer {
  handlerModal: () => void;
  showModal: boolean;
  children: React.ReactNode;
  style?: string;
}

export default function ModalContainer({
  handlerModal,
  showModal,
  children,
  style,
}: IMOdalContainer) {
  return (
    <div
      className={`fixed inset-0 z-40 transition-opacity duration-300 ${
        showModal
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className="absolute h-full w-full"
        onClick={handlerModal}
        role="button"
        tabIndex={0}
        aria-label="Close modal"
      ></div>
      <div
        className={`fixed text-sm sm:left-10 sm:right-10 left-3 right-3 p-3 sm:p-5 dark:text-[#ededed] dark:bg-black/80 text-black shadow-xs-lg bg-[#ededed]/80 backdrop-blur-lg rounded-2xl max-h-[75vh] overflow-y-auto space-y-3 transform transition-transform duration-300 ease-out scrollbar-hide ${style} ${showModal ? 'translate-y-0' : 'translate-y-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
