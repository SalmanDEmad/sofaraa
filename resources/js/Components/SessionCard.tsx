import React from 'react';

interface SessionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode; // Add the icon prop
}

const SessionCard: React.FC<SessionCardProps> = ({ title, description, icon }) => {
  return (
    <div
      className="bg-[#1e1e1e] p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
      style={{ cursor: 'pointer' }}
      role="region"
      aria-labelledby={`card-title-${title}`}
    >
      <h3 id={`card-title-${title}`} className="text-3xl text-center font-semibold mb-2 text-yellow-300">
        {title}
      </h3>
      <div className="flex justify-center mb-4">
        {icon} {/* Render the icon */}
      </div>

      <p className="text-gray-200">{description}</p>
    </div>
  );
};

export default SessionCard;