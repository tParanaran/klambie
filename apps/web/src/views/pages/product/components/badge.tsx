'use client';

import { fetchCart } from '@/api/product';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function CartBadge() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ['cart'],
    queryFn: fetchCart,
    staleTime: 1000 * 60,
  });

  const total = data?.total ?? null;

  const { data: lastAdded } = useQuery({
    queryKey: ['cartLastAdded'],
    queryFn: () => queryClient.getQueryData<number>(['cartLastAdded']) ?? null,
  });

  const [showFloating, setShowFloating] = useState<boolean>(false);
  const [style, setStyle] = useState({
    transform: 'translateY(0)',
    opacity: 1,
  });

  useEffect(() => {
    if (lastAdded && lastAdded > 0) {
      setShowFloating(true);
      setStyle({ transform: 'translateY(0)', opacity: 1 });

      setTimeout(
        () => setStyle({ transform: 'translateY(-20px)', opacity: 0 }),
        50,
      );
      setTimeout(() => {
        setShowFloating(false);
        queryClient.setQueryData(['cartLastAdded'], 0);
      }, 800);
    }
  }, [lastAdded, queryClient]);

  return (
    <>
      {' '}
      {total ? (
        <span className="text-xs px-1 text-[#ededed] rounded-full bg-orange-700">
          {total}
        </span>
      ) : null}
      {showFloating && (
        <span
          className="absolute right-0 top-4 text-orange-800 font-semibold"
          style={{
            ...style,
            transition: 'all 0.8s ease-out',
          }}
        >
          +{lastAdded}
        </span>
      )}
    </>
  );
}
