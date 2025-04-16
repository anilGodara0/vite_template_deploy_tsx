// useInfiniteScroll.ts
import { useEffect, useRef } from 'react';

export function useInfiniteScroll(
  onLoadMore: () => void,
  hasMore: boolean,
  isLoading?: boolean
) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore || isLoading) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !isLoading) {
          onLoadMore();
        }
      },
      {
        rootMargin: '200px', // preload before reaching bottom
      }
    );

    const current = sentinelRef.current;
    if (current) observerRef.current.observe(current);

    return () => {
      if (observerRef.current && current) {
        observerRef.current.unobserve(current);
      }
    };
  }, [onLoadMore, hasMore, isLoading]);

  return sentinelRef;
}
