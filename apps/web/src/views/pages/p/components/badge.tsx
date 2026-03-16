'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useCartQuery } from '../hooks/useCartQuery';

export default function CartBadge() {
  const isFirstRender = useRef<boolean>(true);
  const queryClient = useQueryClient();
  const total = useCartQuery();
  const { data: lastAdded } = useQuery({
    queryKey: ['cartLastAdded'],
    queryFn: () => queryClient.getQueryData<number>(['cartLastAdded']) ?? 0,
  });

  const [showFloating, setShowFloating] = useState<boolean>(false);
  const [style, setStyle] = useState({
    transform: 'translateY(0)',
    opacity: 1,
  });

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (lastAdded !== 0) {
      const isAdd = lastAdded && lastAdded > 0;

      setShowFloating(true);

      setStyle({
        transform: isAdd ? 'translateY(0px)' : 'translateY(-12px)',
        opacity: 1,
      });

      setTimeout(() => {
        setStyle({
          transform: isAdd ? 'translateY(-20px)' : 'translateY(20px)',
          opacity: 0,
        });
      }, 100);

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
          className="absolute right-0 top-9 text-orange-600 font-semibold text-sm"
          style={{
            ...style,
            transition: 'all 0.8s ease-out',
          }}
        >
          {lastAdded && lastAdded < 0 ? `${lastAdded}` : `+${lastAdded}`}
        </span>
      )}
    </>
  );
}
