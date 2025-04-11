// withTracking.tsx
import React, { useEffect } from 'react';

type TrackingOptions = {
    eventName?: string;
    eventData?: Record<string, any>;
};

export const withTracking = <P extends object>(
    WrappedComponent: React.ComponentType<P>,
    { eventName = 'ComponentViewed', eventData = {} }: TrackingOptions = {}
): React.FC<P> => {
    return (props: P) => {
        useEffect(() => {
            // Replace this with your tracking logic
            console.log(`[Tracking]: ${eventName}`, { ...eventData, props });

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        return <WrappedComponent {...props} />;
    };
};
