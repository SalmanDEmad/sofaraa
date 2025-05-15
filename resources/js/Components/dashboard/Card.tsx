import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string; // Optional className for additional styling
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
    return (
        <div className={`bg-white dark:bg-gray-800 overflow-hidden shadow-sm mt-5 sm:rounded-lg ${className}`}>
            <div className="text-gray-900 dark:text-gray-100">
                {children}
            </div>
        </div>
    );
};

export default Card;
