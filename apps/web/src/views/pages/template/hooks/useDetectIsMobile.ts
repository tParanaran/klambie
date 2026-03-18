'use client';
import { useEffect, useState } from 'react';

interface IUseDetectIsMobile {
  widthScreen?: number;
  maxWitdh?: number;
}

export default function useDetectIsMobile({
  widthScreen = 540,
  maxWitdh = 0,
}: IUseDetectIsMobile) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(
        window.innerWidth <= widthScreen && window.innerWidth > maxWitdh,
      );

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return { isMobile };
}
