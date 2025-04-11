import { useEffect, useRef } from 'react';

export const useInfiniteScroll = (onLoadMore: () => void, hasMore = true) => {
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!hasMore || !sentinelRef.current) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                onLoadMore();
            }
        }, {
            rootMargin: '200px', // optional buffer before actual end
        });

        observer.observe(sentinelRef.current);

        return () => observer.disconnect();
    }, [onLoadMore, hasMore]);

    return sentinelRef;
};
