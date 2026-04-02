import { useEffect, useState, useRef } from 'react';

export default function useScrollDirection(hideAfter: number = 0) {
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('up');
  const lastScrollY = useRef<number>(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const updateScrollDir = () => {
      const scrollY = window.scrollY;

      if (Math.abs(scrollY - lastScrollY.current) < 10) return;

      const direction =
        scrollY > hideAfter && scrollY > lastScrollY.current ? 'down' : 'up';

      setScrollDir(direction);
      lastScrollY.current = scrollY;
    };

    window.addEventListener('scroll', updateScrollDir, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollDir);
  }, [hideAfter]);

  return scrollDir;
}
