'use client';
import { useEffect, useState } from 'react';

interface IUseDetectIsMobile {
  widthScreen?: number;
}

export default function useDetectIsMobile({
  widthScreen = 540,
}: IUseDetectIsMobile) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= widthScreen);

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return { isMobile };
}
