'use client';
import { antonFont } from '@/utils/fonts';
import useDetectIsMobile from '../../template/hooks/useDetectIsMobile';
const lines = [
  ['Klambie'],
  ['Real Designs'],
  ['By Real Artists'],
  ['For Real People'],
];

export default function HeroTitle() {
  const { isMobile } = useDetectIsMobile({ widthScreen: 422 });
  return (
    <div>
      <div className="relative sm:absolute inline-block z-10">
        <h1
          className={`uppercase tracking-tight ${antonFont.className} ${isMobile ? 'text-5xl' : 'text-6xl sm:text-7xl/20'}`}
        >
          {lines.map((line, i) => (
            <div key={i}>
              {line.map((word, j) => (
                <span
                  key={j}
                  className={`inline-block sm:bg-[rgb(var(--background-start-rgb))] bg-fixed pr-5 pt-1 ${i === lines.length - 1 ? 'rounded-b-2xl rounded-tr-2xl' : i === 0 ? 'rounded-t-2xl' : 'rounded-tr-2xl'}`}
                >
                  {word}
                </span>
              ))}
            </div>
          ))}
        </h1>
      </div>
    </div>
  );
}
