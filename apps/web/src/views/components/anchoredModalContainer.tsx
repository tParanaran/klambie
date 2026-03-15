'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface IAnchoredModal {
  open: boolean;
  onClose?: () => void;
  anchorRef: React.RefObject<HTMLElement>;
  children: React.ReactNode;
  align?: string;
  zIndex?: string;
}

export default function AnchoredModalContainer({
  open,
  onClose,
  anchorRef,
  children,
  align = 'right',
  zIndex = 'z-40',
}: IAnchoredModal) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, right: 0 });
  const [internalOpen, setInternalOpen] = useState<boolean>(open);

  useEffect(() => {
    setInternalOpen(open);
  }, [open]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setInternalOpen(false);
    }
  };

  useEffect(() => {
    if (!internalOpen) return;

    const updatePosition = () => {
      const anchorEl = anchorRef.current;
      if (!anchorEl) return;

      const rect = anchorEl.getBoundingClientRect();
      const offset = window.scrollY === 0 ? -6 : 0;
      const modalWidth = ref.current?.offsetWidth || 0;
      const modalHeight = ref.current?.offsetHeight || 0;

      let newPos = { top: 0, left: 0, right: 0 };

      switch (align) {
        case 'left':
          newPos = { top: rect.bottom + offset, left: rect.left, right: 0 };
          break;
        case 'right':
          newPos = {
            top: rect.bottom + offset,
            left: 0,
            right: window.innerWidth - rect.right,
          };
          break;
        case 'center':
          let centerLeft = rect.left + rect.width / 2 - modalWidth / 2;
          centerLeft = Math.max(
            0,
            Math.min(centerLeft, window.innerWidth - modalWidth),
          );
          newPos = { top: rect.bottom + offset, left: centerLeft, right: 0 };
          break;
        case 'bottom':
          newPos = {
            top: rect.top - modalHeight - offset,
            left: rect.left,
            right: 0,
          };
          break;
      }

      setPosition(newPos);
    };

    const handle = requestAnimationFrame(updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      cancelAnimationFrame(handle);
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [internalOpen, anchorRef, align]);

  useEffect(() => {
    if (!internalOpen) return;

    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handleClose();
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') handleClose();
    }

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [internalOpen]);

  if (!internalOpen) return null;

  return createPortal(
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top: position.top,
        left:
          align === 'left' || align === 'center' || align === 'bottom'
            ? position.left
            : undefined,
        right: align === 'right' ? position.right : undefined,
        transform: 'translateX(0)',
      }}
      className={`rounded-2xl animate-in fade-in zoom-in-95 duration-150 ${zIndex}`}
    >
      <div className="dark:text-[#ededed] dark:bg-[#1b1a1e]/80 text-black bg-[#ededed]/80 backdrop-blur-lg shadow-xs mt-3.5 rounded-2xl">
        {children}
      </div>
    </div>,
    document.body,
  );
}
