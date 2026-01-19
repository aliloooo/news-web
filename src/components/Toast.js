import React, { useEffect } from 'react';

const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    if (!message) return null;

    const bgColor = type === 'unsave' ? 'bg-red-500' : 'bg-emerald-600';

    return (
        <div className={`fixed bottom-5 right-5 z-50 flex items-center shadow-lg rounded-lg overflow-hidden animate-slide-up`}>
            <div className={`${bgColor} flex items-center justify-center w-12 h-12`}>
                {type === 'unsave' ? (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </div>
            <div className="px-4 py-3 bg-white border-l-0 border-gray-200">
                <p className="text-sm font-medium text-gray-900">{message}</p>
            </div>
            <button onClick={onClose} className="p-3 bg-white hover:bg-gray-100 text-gray-400 hover:text-gray-900 border-l border-gray-100">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
};

export default Toast;
