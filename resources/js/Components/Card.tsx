import React, { ReactNode } from 'react';

interface CardProps {
    title?: string;
    description?: string;
    images?: ReactNode; // Optional images prop
    className?: string; // Optional className for additional styling
    color?: string; // Optional color prop
    children?: ReactNode; // Include children prop
}

const Card: React.FC<CardProps> = ({
    title,
    description,
    images,
    className = '',
    color = 'bg-white dark:bg-[#1e1e1e]',
    children
}) => {
    return (
        <div
            className={`p-5 rounded-lg ${color} ${className}`}
            style={{
                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
            }}
        >
            {images && <div className="mb-4">{images}</div>}
            {title && <h3 className="text-xl font-semibold mb-2 text-center ">{title}</h3>}
            {description && <p className="text-lg text-center">{description}</p>}
            {children && <div className="mt-4">{children}</div>}
        </div>
    );
};

export default Card;