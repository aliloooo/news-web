import React from 'react';

const LoadingSkeleton = () => {
    return (
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-3 bg-gray-100 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-100 rounded w-5/6 mb-4"></div>
            <div className="flex justify-between items-center mt-6">
                <div className="h-3 bg-gray-200 rounded w-20"></div>
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            </div>
        </div>
    );
};

export default LoadingSkeleton;
