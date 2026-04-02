'use client';
import { Dispatch, RefObject, SetStateAction, useEffect } from 'react';

interface IUseMobile {
  setShow: Dispatch<SetStateAction<boolean>>;
  show: boolean;
  ref: RefObject<HTMLButtonElement | HTMLDivElement>;
  isMobile?: boolean;
}

export default function useMobileBehavior({
  setShow,
  show,
  ref,
  isMobile = true,
}: IUseMobile) {
  // No Scroll behavior
  useEffect(() => {
    if (!show) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [show]);

  // Scroll to behavior
  useEffect(() => {
    if (show && isMobile && ref.current) {
      const navbarHeight = 40;
      if (window.scrollY <= navbarHeight) {
        window.scrollTo({ top: navbarHeight, behavior: 'smooth' });
      }
    }
  }, [show, isMobile]);

  // Auto close modal when resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && show) {
        setShow(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [show]);
}
