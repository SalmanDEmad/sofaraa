import React from 'react';

// Define Tutor type with rating information
interface Tutor {
  id: number;
  name: string;
  description: string;
  category: string;
  image: string;
  subjects: string[];
  availability: string[];
  rating: {
    average: number; // Average star rating (out of 5)
    reviews: number; // Number of reviews
  };
}

// Define props for TutorCard
interface TutorCardProps {
  tutor: Tutor;
  onClick: () => void; // Add onClick prop
}

const TutorCard: React.FC<TutorCardProps> = ({ tutor, onClick }) => {
  return (
    <div
      className="bg-[#f6eddc] text-[#402a13] rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition"
      onClick={onClick}
    >
      <img
        src={tutor.image}
        alt={tutor.name}
        className="w-full h-48 object-cover rounded-t-lg mb-4"
      />

      <h2 className="text-xl font-bold mb-1">{tutor.name}</h2>
      <p className="text-[#7b6650] mb-2">{tutor.category}</p>
      <p className="text-[#6b4c33] mb-4">{tutor.description}</p>

      {/* Rating Section */}
      <div className="flex items-center mb-4">
        <div className="flex">
          {Array.from({ length: 5 }, (_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              className={`w-4 h-4 ${
                i < Math.round(tutor.rating.average) ? 'text-[#d3a661]' : 'text-[#e6dcc6]'
              }`}
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 17.27l5.18 3.4-1.41-6.07L20 9.24l-6.12-.52L12 3 10.12 8.72 4 9.24l4.23 4.36-1.41 6.07L12 17.27z" />
            </svg>
          ))}
        </div>
        <span className="ml-2 text-[#7b6650] text-sm">
          ({tutor.rating.reviews} تقييم)
        </span>
      </div>

      {/* Availability Tags */}
      <div className="flex flex-wrap gap-2 mt-2">
        {tutor.availability.map((slot, idx) => (
          <span
            key={idx}
            className="bg-[#d3a661] text-white rounded-full px-3 py-1 text-xs font-medium"
          >
            {slot}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TutorCard;