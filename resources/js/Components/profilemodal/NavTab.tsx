import React, { useState } from "react";

interface NavTabProps {
  subjects?: string[];
  qualifications?: string[];
  relatedTutors?: any[];  // Adjust type as needed
  achievements?: any[];  // Adjust type as needed
  availability?: string[];
  contact?: string;
}

const NavTab: React.FC<NavTabProps> = ({
  subjects = [],
  qualifications = [],
  relatedTutors = [],
  achievements = [],
  availability = [],
  contact = ""
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex flex-col h-full">
      {/* Navigation Tabs Container */}
      <div className="flex justify-center space-x-4 w-full border-b border-gray-700">
        <button
          onClick={() => setActiveTab("overview")}
          className={`w-full px-4 py-2 text-sm font-medium border-b-2 ${activeTab === "overview" ? "border-yellow-300 bg-gray-700 text-yellow-300" : "border-transparent bg-gray-600 text-gray-300"}`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("relatedTutors")}
          className={`w-full px-4 py-2 text-sm font-medium border-b-2 ${activeTab === "relatedTutors" ? "border-yellow-300 bg-gray-700 text-yellow-300" : "border-transparent bg-gray-600 text-gray-300"}`}
        >
          Related Tutors
        </button>
        <button
          onClick={() => setActiveTab("achievements")}
          className={`w-full px-4 py-2 text-sm font-medium border-b-2 ${activeTab === "achievements" ? "border-yellow-300 bg-gray-700 text-yellow-300" : "border-transparent bg-gray-600 text-gray-300"}`}
        >
          Achievements
        </button>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-8 bg-gray-800 rounded-lg overflow-y-auto">
        {activeTab === "overview" && (
          <div>
            <div className="flex flex-col lg:flex-row lg:items-start gap-8 mb-8">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-yellow-300 mb-4">
                  Subjects
                </h3>
                <ul className="flex flex-wrap gap-2 mb-6">
                  {subjects.length > 0 ? (
                    subjects.map((subject, index) => (
                      <li
                        key={index}
                        className="bg-gray-700 text-gray-200 rounded-full px-4 py-2 text-sm font-medium shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-600"
                      >
                        {subject}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">No subjects available</li>
                  )}
                </ul>
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-yellow-300 mb-4">
                  Availability
                </h3>
                <div className="flex flex-wrap gap-4">
                  {availability.length > 0 ? (
                    availability.map((slot, index) => (
                      <span
                        key={index}
                        className="bg-green-700 text-green-100 rounded-lg px-4 py-2 text-sm font-medium shadow-md transition-transform transform hover:scale-105 hover:bg-green-600"
                      >
                        {slot}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">No availability slots</span>
                  )}
                </div>
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-yellow-300 mb-4">
                Qualifications
              </h3>
              <div className="flex flex-wrap gap-4">
                {qualifications.length > 0 ? (
                  qualifications.map((qualification, index) => (
                    <p
                      key={index}
                      className="bg-gray-700 rounded-lg px-4 py-2 text-gray-300"
                    >
                      {qualification}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-500">No qualifications listed</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "relatedTutors" && (
          <div>
            {/* Render related tutors here */}
            <p className="text-gray-300">No related tutors available</p>
          </div>
        )}

        {activeTab === "achievements" && (
          <div>
            {/* Render achievements here */}
            <p className="text-gray-300">No achievements listed</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavTab;