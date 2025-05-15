import Footer from '@/Components/Footer';
import Header from '@/Components/Header';
import { Link } from '@inertiajs/react';
import React from 'react';

// Assuming the image is being imported from the resources folder
import NotFoundImage from '@/assets/img/404/404.png';

const NotFoundPage: React.FC = ({ auth }: { auth?: any }) => {
  return (
    <div className="bg-[#121212] text-white min-h-screen flex flex-col justify-between">
    <Header activeLink='none' userName={auth?.user?.name} />


      <div className="flex-grow flex flex-col lg:flex-row items-center justify-center text-center p-8 lg:text-left">
        {/* Image on the left side */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end mb-8 lg:mb-0">
          <img src={NotFoundImage} alt="404 Not Found" className="w-full max-w-md" />
        </div>

        {/* Text and button on the right side */}
        <div className="lg:w-1/2 flex flex-col justify-center items-center">
          <p className="text-2xl mb-8">The page you're looking for doesn't exist.</p>
          <div className="relative bg-[#1e1e1e] p-6 rounded-lg shadow-lg">
            <p className="mb-4">It seems the tutor has lost the lesson plan!</p>
            <Link
              href="/"
              className="inline-block bg-[#FFC926] text-[#121212] font-semibold py-2 px-4 rounded hover:bg-opacity-80 transition"
            >
              Return to Home page
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
