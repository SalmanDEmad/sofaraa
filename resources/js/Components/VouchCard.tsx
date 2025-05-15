import React from 'react';

interface VouchCardProps {
    imageSrc?: string; // URL for the reviewer's image
    name?: string; // Reviewer's name
    title?: string; // Card title
    text?: string; // Card description
    rating?: string; // Rating
    className?: string; // Optional className for additional styling
}

const VouchCard: React.FC<VouchCardProps> = ({ imageSrc, name, title, text, rating, className = '' }) => {
    const cardStyle = {
        borderRadius: '15px',
        boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.2)',
    };

    const imgStyle = {
        width: 'auto',
        maxWidth: '10%',
    };

    return (
        <div className={`card mx-auto p-3 ${className}`}>
            <div className="card-body dark:bg-[#1e1e1e] p-5 mb-4" style={cardStyle}>
            <div className="mb-3 d-flex align-items-center">
                <div className="row">
                    {/* Image Column (Left) */}
                    {imageSrc && (
                    <div className="col-md-3 col-2 d-flex justify-content-center">
                        <img src={imageSrc} alt={name} className="rounded-full img-fluid" style={imgStyle} />
                    </div>
                    )}
                    {/* Text Column (Right) */}
                    <div className={`col-md-${imageSrc ? '9' : '12'} col-10`}>
                    {name && <h5 className="mb-0">{name}</h5>}
                    </div>
                </div>
                </div>

                {title && <p className="card-title text-3xl">{title}</p>}
                {text && <p className="card-text text-muted">{text}</p>}
                {rating && <h4>{rating}</h4>}
            </div>
        </div>
    );
};

export default VouchCard;
