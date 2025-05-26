import { Head, Link } from '@inertiajs/react';
import Header from '../Components/Header';
import PrimaryButton from '../Components/PrimaryButton';
import { Calendar, Clock, User } from 'lucide-react';

interface WelcomeProps {
  auth: any;
  laravelVersion: string;
  phpVersion: string;
}

export default function Welcome({ auth }: WelcomeProps) {
  return (
    <>
      <Head title="Home | Alwaei Al Daawy" />
      <Header activeLink="#home" userName={auth?.user?.name} />

      <main className="bg-[#121212] text-white pb-16">
        {/* Hero Section */}
        <section id="home" className="text-center mb-12 py-20 relative px-4" style={{ height: '80vh' }}>
          <div className="flex items-center justify-center h-full">
            <div className="text-4xl font-bold">
              Welcome to Alwaei Al Daawy
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
            <PrimaryButton href="#plans" className="bg-[#ffc926] text-[#121212] hover:bg-[#e0b528]">
              Explore Courses
            </PrimaryButton>
          </div>
        </section>

        {/* Plans Section */}
        <section id="plans" className="py-16 bg-[#121212]">
          <div className="container mx-auto flex flex-wrap justify-center gap-6">
            {/* Basic Plan */}
            <div className="bg-[#1e1e1e] rounded-lg shadow-lg w-80 transform transition hover:scale-105">
              <h2 className="bg-[#C35A74] text-white text-center py-4 text-xl rounded-t-lg">Basic</h2>
              <div className="p-6 text-sm text-gray-400">
                <p>Access to 10 lessons per month</p>
                <p>Community support</p>
                <p>Recorded sessions archive</p>
              </div>
              <div className="py-4 px-6 text-center">
                <Link href="/cart?plan=basic">
                  <button className="border-2 border-[#FFC926] text-[#FFC926] py-2 px-4 rounded-full hover:bg-[#FFC926] hover:text-[#121212] transition">
                    Subscribe
                  </button>
                </Link>
              </div>
            </div>

            {/* Standard Plan */}
            <div className="bg-[#1e1e1e] rounded-lg shadow-lg w-80 transform transition hover:scale-105">
              <h2 className="bg-[#307BAA] text-white text-center py-4 text-xl rounded-t-lg">Standard</h2>
              <div className="p-6 text-sm text-gray-400">
                <p>Access to 30 lessons per quarter</p>
                <p>Priority support</p>
                <p>Customized learning plan</p>
              </div>
              <div className="py-4 px-6 text-center">
                <Link href="/cart?plan=standard">
                  <button className="border-2 border-[#FFC926] text-[#FFC926] py-2 px-4 rounded-full hover:bg-[#FFC926] hover:text-[#121212] transition">
                    Subscribe
                  </button>
                </Link>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="bg-[#29261F] rounded-lg shadow-lg w-80 transform transition hover:scale-110 border-2 border-[#FFC926]">
              <h2 className="bg-[#53BAB5] text-white text-center py-4 text-xl">Premium</h2>
              <div className="p-6 text-sm text-gray-400">
                <p>Unlimited lessons</p>
                <p>24/7 dedicated support</p>
                <p>Personal mentorship</p>
              </div>
              <div className="py-4 px-6 text-center">
                <Link href="/cart?plan=premium">
                  <button className="border-2 border-[#FFC926] text-[#FFC926] py-2 px-4 rounded-full hover:bg-[#FFC926] hover:text-[#121212] transition">
                    Subscribe
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 px-4">
          <div className="text-center">
            <Clock strokeWidth={1} size={48} className="text-yellow-300 mx-auto mb-4" />
            <h3 className="font-bold mb-2">Flexible Learning</h3>
            <p>Choose sessions that fit your schedule.</p>
          </div>
          <div className="text-center">
            <User strokeWidth={1} size={48} className="text-yellow-300 mx-auto mb-4" />
            <h3 className="font-bold mb-2">Expert Instructors</h3>
            <p>Learn from qualified scholars and tutors.</p>
          </div>
          <div className="text-center">
            <Calendar strokeWidth={1} size={48} className="text-yellow-300 mx-auto mb-4" />
            <h3 className="font-bold mb-2">Community Support</h3>
            <p>Engage with a community of learners.</p>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="text-center mb-12 px-4">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-lg mb-6">For inquiries, reach out to us at:</p>
          <PrimaryButton href="mailto:contact@alwaei-aldaawy.com" className="bg-[#ffc926] text-[#121212] hover:bg-[#e0b528]">
            Email Us
          </PrimaryButton>
        </section>
      </main>

      {/* Placeholder Footer */}
      <footer className="bg-gray-800 text-gray-400 text-center py-4">
        © {new Date().getFullYear()} Alwaei Al Daawy. All rights reserved.
      </footer>
    </>
  );
}