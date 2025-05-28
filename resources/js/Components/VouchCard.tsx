import React from 'react';

interface VouchCardProps {
  imageSrc?: string;
  name?: string;
  title?: string;
  text?: string;
  rating?: string;
  className?: string;
}

const VouchCard: React.FC<VouchCardProps> = ({
  imageSrc,
  name,
  title,
  text,
  rating,
  className = '',
}) => {
  return (
    <div
      className={`
        bg-[#f6eddc]
        text-[#402a13]
        p-6
        rounded-xl
        shadow-sm
        flex flex-col justify-between h-full
        ${className}
      `}
    >
      <div>
        <div className="flex items-center mb-4">
          {imageSrc && (
            <img
              src={imageSrc}
              alt={name}
              className="w-12 h-12 rounded-full object-cover ml-4"
            />
          )}
          {name && <h5 className="text-lg font-semibold">{name}</h5>}
        </div>

        {title && <h6 className="text-xl font-bold mb-2">{title}</h6>}
        {text && <p className="text-base leading-relaxed">{text}</p>}
      </div>

      {rating && (
        <div className="mt-4">
          <span className="text-[#d3a661] font-semibold">{rating}</span>
        </div>
      )}
    </div>
  );
};

export default VouchCard;