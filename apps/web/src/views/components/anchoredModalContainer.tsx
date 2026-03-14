'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface IAnchoredModal {
  open: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement>;
  children: React.ReactNode;
  align?: string;
}

export default function AnchoredModalContainer({
  open,
  onClose,
  anchorRef,
  children,
  align = 'right',
}: IAnchoredModal) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, right: 0 });

  useEffect(() => {
    if (!open || !anchorRef.current) return;

    const updatePosition = () => {
      const rect = anchorRef.current!.getBoundingClientRect();
      const offset = window.scrollY === 0 ? 8 : 24;

      if (align === 'left') {
        setPosition({
          top: rect.bottom + offset,
          left: rect.left,
          right: 0,
        });
      } else if (align === 'right') {
        setPosition({
          top: rect.bottom + offset,
          left: 0,
          right: window.innerWidth - rect.right,
        });
      }
    };

    updatePosition();

    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [open, anchorRef, align]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }

    if (open) {
      document.addEventListener('mousedown', handleClick);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top: position.top,
        left: align === 'left' ? position.left : undefined,
        right: align === 'right' ? position.right : undefined,
        transform: align === 'left' ? 'translateX(0)' : 'translateX(0)',
      }}
      className="z-50 rounded-2xl dark:text-[#ededed] dark:bg-black/80 text-black bg-[#ededed]/80 backdrop-blur-lg shadow-lg animate-in fade-in zoom-in-95 duration-150"
    >
      {children}
    </div>,
    document.body,
  );
}
