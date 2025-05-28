import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import InputLabel from '../Components/InputLabel';
import TextInput from '../Components/TextInput';
import TutorCard from '../Components/TutorCard';
import ProfileModal from '../Components/profilemodal/ProfileModal';
import Header from '../Components/Header';
import Footer from '@/Components/Footer';

interface Tutor {
  id: number;
  name: string;
  description: string;
  category: string;
  image: string;
  subjects: string[];
  qualifications: string[];
  availability: string[];
  contact: string;
  rating: {
    average: number;
    reviews: number;
  };
}

const Tutors = ({ auth }: { auth?: any }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);

  const categories = ['All', 'Math', 'Science', 'Languages', 'History', 'Art', 'Technology'];
  const tutors: Tutor[] = Array.from({ length: 12 }).map((_, index) => ({
    id: index + 1,
    name: `Tutor ${index + 1}`,
    description: 'Expert in subject matter. Passionate about teaching and helping students succeed.',
    category: categories[index % categories.length],
    image: `https://picsum.photos/seed/${index + 1}/300/300`,
    subjects: ['Subject 1', 'Subject 2'],
    qualifications: ['Qualification 1', 'Qualification 2'],
    availability: ['Monday 10-12', 'Wednesday 2-4'],
    contact: `contact${index + 1}@example.com`,
    rating: {
      average: Math.floor(Math.random() * 5) + 1,
      reviews: Math.floor(Math.random() * 100) + 1,
    },
  }));

  const filteredTutors = tutors.filter(
    (tutor) =>
      (selectedCategory === 'All' || tutor.category === selectedCategory) &&
      tutor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTutorClick = (tutor: Tutor) => {
    setSelectedTutor(tutor);
    setIsModalOpen(true);
  };

  return (
    <>
      <Head title="Tutors" />
      <Header activeLink="#tutors" userName={auth?.user?.name} />

      <main className="bg-[#fdf7ee] text-[#402a13] pb-16">
        <section className="py-16 lg:mx-32 px-4">
          <h1 className="text-4xl font-bold text-center mb-8">Find Your Perfect Tutor</h1>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
            <div className="flex-1">
              <InputLabel htmlFor="search" value="Search Tutors" className="text-[#402a13]" />
              <TextInput
                id="search"
                type="text"
                className="mt-2 block w-full bg-white border border-[#e6dcc6] text-[#402a13] placeholder-[#7b6650] focus:ring-[#d3a661] focus:border-[#d3a661]"
                placeholder="Search by tutor name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <InputLabel htmlFor="category" value="Category" className="text-[#402a13]" />
              <select
                id="category"
                title="Select category"
                className="mt-2 block w-full bg-white border border-[#e6dcc6] text-[#402a13] rounded-md shadow-sm focus:ring-[#d3a661] focus:border-[#d3a661]"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tutors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredTutors.map((tutor) => (
              <TutorCard
                key={tutor.id}
                tutor={tutor}
                onClick={() => handleTutorClick(tutor)}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {/* Tutor Profile Modal */}
      {isModalOpen && selectedTutor && (
        <ProfileModal tutor={selectedTutor} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default Tutors;