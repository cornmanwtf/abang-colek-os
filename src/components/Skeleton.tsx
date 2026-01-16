import React from 'react';

interface SkeletonProps {
    className?: string;
    variant?: 'text' | 'circular' | 'rectangular';
    width?: string | number;
    height?: string | number;
    count?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
    className = '',
    variant = 'rectangular',
    width,
    height,
    count = 1,
}) => {
    const baseClasses = 'animate-pulse bg-gray-700/50 rounded';

    const variantClasses = {
        text: 'h-4 rounded',
        circular: 'rounded-full',
        rectangular: 'rounded-lg',
    };

    const style: React.CSSProperties = {
        width: width || '100%',
        height: height || (variant === 'text' ? '1rem' : '100%'),
    };

    const elements = Array.from({ length: count }, (_, index) => (
        <div
            key={index}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            style={style}
        />
    ));

    return <>{elements}</>;
};

// Dashboard Skeleton
export const DashboardSkeleton: React.FC = () => (
    <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-xl p-4">
                    <Skeleton variant="text" width="60%" className="mb-2" />
                    <Skeleton variant="text" width="40%" height="2rem" />
                </div>
            ))}
        </div>
    </div>
);

// Content Editor Skeleton
export const ContentEditorSkeleton: React.FC = () => (
    <div className="p-6 space-y-4">
        <Skeleton height="3rem" className="mb-4" />
        <div className="flex gap-2 mb-4">
            {[...Array(4)].map((_, i) => (
                <Skeleton key={i} width="80px" height="2rem" />
            ))}
        </div>
        <Skeleton height="200px" />
        <Skeleton height="200px" />
    </div>
);

// Events Skeleton
export const EventsSkeleton: React.FC = () => (
    <div className="p-6 space-y-4">
        <div className="flex justify-between mb-4">
            <Skeleton width="200px" height="2rem" />
            <Skeleton width="120px" height="2.5rem" />
        </div>
        {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-800 rounded-xl p-4">
                <Skeleton variant="text" width="70%" className="mb-2" />
                <Skeleton variant="text" width="50%" className="mb-2" />
                <div className="flex gap-2 mt-3">
                    <Skeleton width="60px" height="1.5rem" />
                    <Skeleton width="60px" height="1.5rem" />
                </div>
            </div>
        ))}
    </div>
);

// Table Skeleton
export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => (
    <div className="overflow-hidden rounded-lg border border-gray-700">
        <div className="bg-gray-800 p-3">
            <div className="flex gap-4">
                <Skeleton width="25%" height="1rem" />
                <Skeleton width="25%" height="1rem" />
                <Skeleton width="25%" height="1rem" />
                <Skeleton width="25%" height="1rem" />
            </div>
        </div>
        {[...Array(rows)].map((_, i) => (
            <div key={i} className="border-t border-gray-700 p-3">
                <div className="flex gap-4">
                    <Skeleton width="25%" height="1rem" />
                    <Skeleton width="25%" height="1rem" />
                    <Skeleton width="25%" height="1rem" />
                    <Skeleton width="25%" height="1rem" />
                </div>
            </div>
        ))}
    </div>
);

// Card Skeleton
export const CardSkeleton: React.FC = () => (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <Skeleton variant="text" width="60%" className="mb-3" />
        <Skeleton variant="text" width="100%" className="mb-2" />
        <Skeleton variant="text" width="80%" className="mb-4" />
        <div className="flex gap-2">
            <Skeleton width="80px" height="2rem" />
            <Skeleton width="80px" height="2rem" />
        </div>
    </div>
);

// Loading Spinner
export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({
    size = 'md'
}) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    };

    return (
        <div className="flex items-center justify-center">
            <div
                className={`${sizeClasses[size]} border-2 border-yellow-500 border-t-transparent rounded-full animate-spin`}
            />
        </div>
    );
};

// Full Page Loading
export const PageLoading: React.FC = () => (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
            <div className="text-6xl mb-4 animate-bounce">🌶️</div>
            <LoadingSpinner size="lg" />
            <p className="text-gray-400 mt-4">Loading Abang Colek...</p>
        </div>
    </div>
);

export default Skeleton;
