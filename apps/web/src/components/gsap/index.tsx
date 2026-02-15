'use client';
import gsap from 'gsap';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function WalkingText({ text }: { text: string }) {
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const duplicatedText = textRef.current?.cloneNode(true);
      if (duplicatedText) {
        textRef.current?.parentNode?.appendChild(duplicatedText);
      }

      gsap.to([textRef.current, duplicatedText], {
        xPercent: -100,
        duration: 35,
        ease: 'none',
        repeat: -1,
        modifiers: {
          xPercent: gsap.utils.wrap(-100, 0),
        },
      });
    },
    { scope: textRef },
  );

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div ref={textRef} className="inline-block">
        {text}
      </div>
    </div>
  );
}
