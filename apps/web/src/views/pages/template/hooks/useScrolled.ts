'use client';
import { useEffect, useState, useRef } from 'react';

export default function useScrolled(threshold: number = 20) {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const ticking = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const buffer = 5;

    const updateScroll = () => {
      const isScrolledNow = window.scrollY >= threshold + buffer;
      setScrolled((prev) => (prev !== isScrolledNow ? isScrolledNow : prev));
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScroll);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    updateScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}
