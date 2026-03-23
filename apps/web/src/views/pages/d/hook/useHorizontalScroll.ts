'use client';
import { useEffect, useRef, useState } from 'react';

export function useHorizontalScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState<boolean>(false);
  const [showRight, setShowRight] = useState<boolean>(false);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const isOverflowing = scrollWidth > clientWidth + 1;

    if (!isOverflowing) {
      setShowLeft(false);
      setShowRight(false);
      return;
    }

    setShowLeft(scrollLeft > 5);
    setShowRight(scrollLeft < scrollWidth - clientWidth - 5);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    handleScroll();
    el.addEventListener('scroll', handleScroll);
    const resizeObserver = new ResizeObserver(() => handleScroll());
    resizeObserver.observe(el);

    const mutationObserver = new MutationObserver(() => handleScroll());
    mutationObserver.observe(el, { childList: true, subtree: true });

    return () => {
      el.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  const scrollLeftFn = () => {
    scrollRef.current?.scrollBy({
      left: -scrollRef.current.clientWidth * 0.8,
      behavior: 'smooth',
    });
  };

  const scrollRightFn = () => {
    scrollRef.current?.scrollBy({
      left: scrollRef.current.clientWidth * 0.8,
      behavior: 'smooth',
    });
  };

  return {
    scrollRef,
    showLeft,
    showRight,
    scrollLeftFn,
    scrollRightFn,
  };
}
