import React from 'react';

type ErrorBoundaryState = {
    hasError: boolean;
};

export function withErrorBoundary<P>(
    WrappedComponent: React.ComponentType<P>,
    fallback?: React.ReactNode
) {
    return class ErrorBoundary extends React.Component<P, ErrorBoundaryState> {
        constructor(props: P) {
            super(props);
            this.state = { hasError: false };
        }

        static getDerivedStateFromError() {
            return { hasError: true };
        }

        componentDidCatch(error: Error, info: React.ErrorInfo) {
            console.error('ErrorBoundary caught an error:', error, info);
        }

        render() {
            if (this.state.hasError) {
                return fallback || <div>Something went wrong.</div>;
            }
            return <WrappedComponent {...this.props} />;
        }
    };
}
