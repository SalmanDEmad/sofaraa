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
      className="bg-gray-800 text-white rounded-lg shadow-md p-4 cursor-pointer"
      onClick={onClick} // Handle onClick event
    >
      <img
        src={tutor.image}
        alt={tutor.name}
        className="w-full h-48 object-cover rounded-t-lg mb-4"
      />
      <h2 className="text-xl font-bold mb-2">{tutor.name}</h2>
      <p className="text-gray-400 mb-2">{tutor.category}</p>
      <p className="text-gray-300 mb-2">{tutor.description}</p>
      
      {/* Rating Section */}
      <div className="flex items-center mb-4">
        <div className="flex items-center text-yellow-400">
          {Array.from({ length: 5 }, (_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              className={`w-4 h-4 ${index < Math.round(tutor.rating.average) ? 'text-yellow-400' : 'text-gray-600'}`}
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 17.27l5.18 3.4-1.41-6.07L20 9.24l-6.12-.52L12 3 10.12 8.72 4 9.24l4.23 4.36-1.41 6.07L12 17.27z" />
            </svg>
          ))}
        </div>
        <span className="ml-2 text-gray-400">({tutor.rating.reviews} reviews)</span>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {tutor.availability.map((slot, index) => (
          <span key={index} className="bg-green-500 text-white rounded-full px-3 py-1 text-xs font-medium">
            {slot}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TutorCard;