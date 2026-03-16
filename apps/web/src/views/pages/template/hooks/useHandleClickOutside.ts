import { useEffect, useRef } from 'react';

interface IUseHandleOutside {
  handleClickOutside: () => void;
}

export default function useHandleClickOutside({
  handleClickOutside,
}: IUseHandleOutside) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOutside = (event: PointerEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleClickOutside();
      }
    };
    document.addEventListener('pointerdown', clickOutside);
    return () => document.removeEventListener('pointerdown', clickOutside);
  }, []);

  return { dropdownRef, modalRef };
}
