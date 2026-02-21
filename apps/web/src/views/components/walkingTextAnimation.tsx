'use client';
import gsap from 'gsap';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function WalkingTextAnimation({ text }: { text: string }) {
  const conatinerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const duplicatedText = conatinerRef.current?.cloneNode(true);
      if (duplicatedText) {
        conatinerRef.current?.parentNode?.appendChild(duplicatedText);
      }

      gsap.to([duplicatedText, conatinerRef.current], {
        xPercent: -100,
        duration: 35,
        ease: 'none',
        repeat: -1,
        modifiers: {
          xPercent: gsap.utils.wrap(-100, 0),
        },
      });
    },
    { scope: conatinerRef },
  );

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div ref={conatinerRef} className="inline-block">
        <span className="pr-3">{text}</span>
      </div>
    </div>
  );
}
