// components/AppWrapper.tsx
import React from 'react';
import { withErrorBoundary } from '../libs/withErrorBoundary';
import { withTracking } from '../libs/withTracking';

type Props = {
    children: React.ReactNode;
};

const BaseApp: React.FC<Props> = ({ children }) => {
    return <>{children}</>;
};

export const AppWrapper = withErrorBoundary(
    withTracking(BaseApp, {
        eventName: 'AppLoaded',
        eventData: { platform: 'React' },
    }),
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="max-w-md text-center bg-white p-8 rounded-2xl shadow-md border border-gray-200">
            <div className="text-4xl mb-4 text-red-500">⚠️</div>
            <h1 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h1>
            <p className="text-gray-600 mb-4">
                This page is not available due to an unexpected error.
            </p>
            <p className="text-sm text-gray-500 mb-6">
                Please contact the site owner or email us at <a href="mailto:support@example.com" className="text-blue-500 underline">support@example.com</a>
            </p>
            <button
                onClick={() => window.location.reload()}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
                Reload Page
            </button>
        </div>
    </div>

);
