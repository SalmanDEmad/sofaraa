import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

// Define props for Subjects component
interface Subject {
  name: string;
  totalTutors: number;
  onlineTutors: number;
  imageUrl: string;
}

const Subjects: React.FC = ({ auth }: { auth ?: any}) => {

  return (
    <>
      <Header activeLink="#subjects" userName={auth?.user?.name} />
      <main className="bg-[#121212] text-white min-h-screen flex flex-col">
        <div className="flex-1 p-8">
            <h3 className="text-xl font-semibold mb-4 text-yellow-300">Subjects</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {subjects.map((subject, index) => (
                <div key={index} className="bg-gray-700 rounded-lg overflow-hidden shadow-md">
                <img
                    src={subject.imageUrl}
                    alt={subject.name}
                    className="w-full h-32 object-cover rounded-t-lg"
                />
                <div className="p-4">
                    <h4 className="text-lg font-bold mb-2">{subject.name}</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full">
                        Tutors: {subject.totalTutors}
                    </span>
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Online: {subject.onlineTutors}
                    </span>
                    </div>
                    <p className="text-gray-300">Details about the subject can be added here.</p>
                </div>
                </div>
            ))}
            </div>
        </div>
        </main>

      <Footer />
    </>
  );
};

const subjects: Subject[] = [
  {
    name: 'Mathematics',
    totalTutors: 120,
    onlineTutors: 45,
    imageUrl: 'https://via.placeholder.com/600x300?text=Mathematics'
  },
  {
    name: 'Science',
    totalTutors: 95,
    onlineTutors: 30,
    imageUrl: 'https://via.placeholder.com/600x300?text=Science'
  },
  {
    name: 'History',
    totalTutors: 85,
    onlineTutors: 20,
    imageUrl: 'https://via.placeholder.com/600x300?text=History'
  },
  {
    name: 'Literature',
    totalTutors: 70,
    onlineTutors: 15,
    imageUrl: 'https://via.placeholder.com/600x300?text=Literature'
  },
  {
    name: 'Geography',
    totalTutors: 60,
    onlineTutors: 25,
    imageUrl: 'https://via.placeholder.com/600x300?text=Geography'
  },
  {
    name: 'Physics',
    totalTutors: 110,
    onlineTutors: 40,
    imageUrl: 'https://via.placeholder.com/600x300?text=Physics'
  },
  {
    name: 'Chemistry',
    totalTutors: 80,
    onlineTutors: 22,
    imageUrl: 'https://via.placeholder.com/600x300?text=Chemistry'
  },
  {
    name: 'Biology',
    totalTutors: 90,
    onlineTutors: 35,
    imageUrl: 'https://via.placeholder.com/600x300?text=Biology'
  },
  {
    name: 'Computer Science',
    totalTutors: 75,
    onlineTutors: 18,
    imageUrl: 'https://via.placeholder.com/600x300?text=Computer+Science'
  },
  {
    name: 'Economics',
    totalTutors: 65,
    onlineTutors: 20,
    imageUrl: 'https://via.placeholder.com/600x300?text=Economics'
  },
  {
    name: 'Art',
    totalTutors: 55,
    onlineTutors: 10,
    imageUrl: 'https://via.placeholder.com/600x300?text=Art'
  },
  {
    name: 'Music',
    totalTutors: 50,
    onlineTutors: 12,
    imageUrl: 'https://via.placeholder.com/600x300?text=Music'
  },
  {
    name: 'Philosophy',
    totalTutors: 40,
    onlineTutors: 8,
    imageUrl: 'https://via.placeholder.com/600x300?text=Philosophy'
  },
  {
    name: 'Political Science',
    totalTutors: 45,
    onlineTutors: 9,
    imageUrl: 'https://via.placeholder.com/600x300?text=Political+Science'
  },
  {
    name: 'Sociology',
    totalTutors: 35,
    onlineTutors: 6,
    imageUrl: 'https://via.placeholder.com/600x300?text=Sociology'
  },
  {
    name: 'Psychology',
    totalTutors: 80,
    onlineTutors: 25,
    imageUrl: 'https://via.placeholder.com/600x300?text=Psychology'
  },
  {
    name: 'Engineering',
    totalTutors: 100,
    onlineTutors: 40,
    imageUrl: 'https://via.placeholder.com/600x300?text=Engineering'
  },
  {
    name: 'Statistics',
    totalTutors: 50,
    onlineTutors: 15,
    imageUrl: 'https://via.placeholder.com/600x300?text=Statistics'
  },
  {
    name: 'Business Studies',
    totalTutors: 70,
    onlineTutors: 20,
    imageUrl: 'https://via.placeholder.com/600x300?text=Business+Studies'
  },
  {
    name: 'Law',
    totalTutors: 45,
    onlineTutors: 12,
    imageUrl: 'https://via.placeholder.com/600x300?text=Law'
  },
  {
    name: 'Medicine',
    totalTutors: 60,
    onlineTutors: 18,
    imageUrl: 'https://via.placeholder.com/600x300?text=Medicine'
  }
];

export default Subjects;
