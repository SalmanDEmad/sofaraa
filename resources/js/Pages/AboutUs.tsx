import React from 'react';
import Card from '../Components/Card';
import Header from '../Components/Header';
import VouchCard from '../Components/VouchCard';

const AboutUs: React.FC = ({ auth }: { auth?: any }) => {
  return (
    <main className="bg-[#121212] text-white pb-16">
      <Header activeLink="#about" userName={auth?.user?.name} />

      <div className="container mx-auto p-5">
      <section
        className="py-8 px-4 lg:px-8 text-center bg-cover bg-center">
        <div className="container mx-auto bg-black bg-opacity-0 p-8 rounded-lg">
          <h2 className="text-7xl font-semibold mb-4 text-white">About Us</h2>
          <p className="text-4xl text-white">
            Welcome to NowTutors
          </p>
        </div>
      </section>

      <section className="py-8 mb-5 px-4 lg:px-8 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 lg:px-8 mg:px-5 mb-6 lg:mb-0">
          <h2 className="text-2xl lg:text-left text-center font-semibold mb-4">Our Mission</h2>
          <p className="text-lg lg:text-left text-center">
            Our mission at NowTutors is to bridge the gap between students and instant academic support. We understand the need for immediate help and have created a platform that allows students to connect with experienced tutors in real-time. Our aim is to eliminate the delays associated with traditional scheduling systems and provide efficient, reliable tutoring support.
          </p>
        </div>
        <div className="lg:w-1/2">
          <img
            src="https://picsum.photos/500/300" // Placeholder image, replace with a relevant one
            alt="Mission"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </section>

      <section className="py-8 mb-5 px-4 lg:px-8 flex flex-col lg:flex-row-reverse items-start">
        <div className="lg:w-1/2 lg:px-8 mg:px-5 mb-6 lg:mb-0">
          <h2 className="text-2xl lg:text-left text-center font-semibold mb-4">Our Story</h2>
          <p className="text-lg lg:text-left text-center">
            The inception of NowTutors came from a personal experience of struggling with traditional tutoring systems. Many students, including myself, faced the frustration of needing immediate help but encountering delays and scheduling issues. Recognizing this gap, I set out to create NowTutors—a platform designed to provide instant access to tutoring support. Our story is about transforming the tutoring experience into something more accessible and responsive to students' needs.
          </p>
        </div>
        <div className="lg:w-1/2">
          <img
            src="https://picsum.photos/500/300" // Placeholder image, replace with a relevant one
            alt="Our Story"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </section>

      <section className="py-8 mb-5 px-4 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-5xl font-semibold mb-4">NowTutors by Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card
              title="100+ Tutors"
              description="We have a diverse team of over 100 tutors available 24/7."
            />
            <Card
              title="5000+ Students"
              description="Serving more than 5000 students with their academic needs."
            />
            <Card
              title="10,000+ Sessions"
              description="Conducted over 10,000 tutoring sessions and counting."
            />
          </div>
        </div>
      </section>

      <section className="py-8 mb-5 px-4 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-5xl font-semibold mb-4">What Our Customers Say</h2>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Add customer testimonials here */}
            <VouchCard
                imageSrc="https://dev.onzur.net/static/images/testimonials/binte%20teez.jpg"
                name="Stephanie"
                title="Unforgettable Experience"
                text="Our recent trip was truly unforgettable. The landscapes we encountered were absolutely breathtaking, and we had the chance to learn so much about the local culture. I wholeheartedly recommend this tour to anyone looking to explore new destinations."
                rating="5.0 ⭐⭐⭐⭐⭐"
            />
            <VouchCard
                imageSrc="https://dev.onzur.net/static/images/testimonials/binte%20teez.jpg"
                name="Stephanie"
                title="Unforgettable Experience"
                text="Our recent trip was truly unforgettable. The landscapes we encountered were absolutely breathtaking, and we had the chance to learn so much about the local culture. I wholeheartedly recommend this tour to anyone looking to explore new destinations."
                rating="5.0 ⭐⭐⭐⭐⭐"
            />
            <VouchCard
                imageSrc="https://dev.onzur.net/static/images/testimonials/binte%20teez.jpg"
                name="Stephanie"
                title="Unforgettable Experience"
                text="Our recent trip was truly unforgettable. The landscapes we encountered were absolutely breathtaking, and we had the chance to learn so much about the local culture. I wholeheartedly recommend this tour to anyone looking to explore new destinations."
                rating="5.0 ⭐⭐⭐⭐⭐"
            />
          </div>
        </div>
      </section>
      </div>
    </main>
  );
};

export default AboutUs;
