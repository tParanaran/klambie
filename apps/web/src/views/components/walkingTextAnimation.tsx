'use client';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export default function WalkingTextAnimation({
  text,
  duration = 40,
}: {
  text: string;
  duration?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Remove animation before
    gsap.killTweensOf(container.children);

    // Text Duplication
    if (container.children.length < 2) {
      const duplicated = container.children[0].cloneNode(true) as HTMLElement;
      container.appendChild(duplicated);
    }

    // Set position children
    gsap.set(container.children, { x: '0%' });

    // Linear loop infinite animation
    gsap.to(container.children, {
      x: '-100%',
      duration,
      ease: 'linear',
      repeat: -1,
      modifiers: {
        x: (x: string) => `${parseFloat(x) % 100}%`,
      },
    });
  }, [duration]);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden whitespace-nowrap flex items-center"
    >
      <span className="pr-3 inline-block">{text}</span>
    </div>
  );
}
