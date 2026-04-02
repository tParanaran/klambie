'use client';
import { useEffect, useState } from 'react';
import { IBanner } from '../types';
import { initialBanner } from '@/utils/banner';
import axiosInstanceClient from '@/lib/axios/client';

export default function useBanner() {
  const [error, setError] = useState<string>();
  const [banners, setBanners] = useState<IBanner[]>(initialBanner);

  useEffect(() => {
    const syncBanners = async () => {
      try {
        const res = await axiosInstanceClient('/promotion/banners');
        if (res.data.length > 0) {
          setBanners(res.data);
        }
      } catch (error: any) {
        error = error.message || 'Something went wrong while fetching brands.';
        setError(error);
      }
    };

    syncBanners();
  }, []);

  return { error, banners };
}
