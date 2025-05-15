import Footer from '@/Components/Footer';
import VideoList from '@/Components/VideoList';
import { Head, Link } from '@inertiajs/react';
import { Calendar, Clock, User } from 'lucide-react';
import Header from '../Components/Header';
import PrimaryButton from '../Components/PrimaryButton';
import SessionCard from '../Components/SessionCard';
import TopStreams from './Landing/TopStreams';

interface WelcomeProps {
    auth: any;
    laravelVersion: string;
    phpVersion: string;
}

export default function Welcome({ auth, laravelVersion, phpVersion }: WelcomeProps) {
  const handleImageError = () => {
    document.getElementById('screenshot-container')?.classList.add('!hidden');
    document.getElementById('docs-card')?.classList.add('!row-span-1');
    document.getElementById('docs-card-content')?.classList.add('!flex-row');
    document.getElementById('background')?.classList.add('!hidden');
  };

    return (
    <>
      <Head title="Welcome" />
      <Header activeLink="#home" userName={auth?.user?.name} />

      <main className="bg-[#121212] text-white pb-16">
          <section id="home" className="text-center mb-12 py-20 relative px-4" style={{ height: '80vh' }}>
              <div className="absolute inset-0 overflow-hidden">
                  <video
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      src="https://videos.pexels.com/video-files/6209573/6209573-uhd_2732_1440_25fps.mp4"
                      autoPlay
                      muted
                      loop
                      style={{
                          opacity: 0.5,
                          filter: 'blur(8px)' // Adjust the blur radius as needed
                      }}
                  />
                  <div className="bg-black bg-opacity-50 my-auto absolute inset-0">
                      <div className="relative z-10">
                          <TopStreams />
                          <PrimaryButton href="#tutors" className="bg-[#ffc926] text-[#121212] hover:bg-[#e0b528]">
                              Find Your Tutor
                          </PrimaryButton>
                      </div>
                  </div>
              </div>
          </section>

          <section className="py-16 bg-[#121212] scale-90">
              <div className="container mx-auto flex justify-between gap-6">

                  {/* Basic Plan */}
                  <div className="bg-[#1e1e1e] rounded-lg shadow-lg w-80 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                      <h2 className="bg-[#C35A74] text-white text-center py-4 text-xl rounded-t-lg">Basic</h2>
                      <div className="flex flex-col items-center py-6">
                          <img src="https://i.postimg.cc/WpkNW6Vv/hot-air-balloon.png" alt="hot-air-balloon" className="w-24 mb-4"/>
                          <div className="text-center">
                              <p className="text-3xl font-bold text-white">$29</p>
                              <p className="text-sm text-gray-400">per month</p>
                          </div>
                      </div>
                      <div className="p-6 text-sm text-gray-400">
                          <ul className="list-none pl-0">
                              <li className="mb-2">
                                  <span className="text-green-400 inline-block mr-2">✔️</span>
                                  Access to 10 live sessions per month
                              </li>
                              <li className="mb-2">
                                  <span className="text-green-400 inline-block mr-2">✔️</span>
                                  Live chat support during sessions
                              </li>
                              <li className="mb-2">
                                  <span className="text-green-400 inline-block mr-2">✔️</span>
                                  Wide range of subjects and tutors
                              </li>
                              <li className="mb-2">
                                  <span className="text-green-400 inline-block mr-2">✔️</span>
                                  Flexible scheduling options
                              </li>
                              <li>
                                  <span className="text-green-400 inline-block mr-2">✔️</span>
                                  Unlimited access to recorded sessions
                              </li>
                          </ul>
                      </div>
                      <div className="py-4 px-6 text-center">
                          <Link href={`/cart?plan=basic`}>
                              <button className="border-2 border-[#FFC926] font-bold text-[#FFC926] py-2 px-4 rounded-full hover:bg-[#FFC926] hover:text-[#121212] transition-colors">
                                  BUY NOW
                              </button>
                          </Link>
                      </div>
                  </div>

                  {/* Standard Plan */}
                  <div className="bg-[#1e1e1e] rounded-lg shadow-lg w-80 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                      <h2 className="bg-[#307BAA] text-white text-center py-4 text-xl rounded-t-lg">Standard</h2>
                      <div className="flex flex-col items-center py-6">
                          <img src="https://i.postimg.cc/9FPWVmzg/airplane.png" alt="airplane" className="w-24 mb-4"/>
                          <div className="text-center">
                              <p className="text-3xl font-bold text-white">$99</p>
                              <p className="text-sm text-gray-400">per 3 months</p>
                          </div>
                      </div>
                      <div className="p-6 text-sm text-gray-400">
                          <ul className="list-none pl-0">
                              <li className="mb-2">
                                  <span className="text-green-400 inline-block mr-2">✔️</span>
                                  Access to 30 live sessions per 3 months
                              </li>
                              <li className="mb-2">
                                  <span className="text-green-400 inline-block mr-2">✔️</span>
                                  Priority support during sessions
                              </li>
                              <li className="mb-2">
                                  <span className="text-green-400 inline-block mr-2">✔️</span>
                                  Choose from top-rated tutors
                              </li>
                              <li className="mb-2">
                                  <span className="text-green-400 inline-block mr-2">✔️</span>
                                  Enhanced scheduling flexibility
                              </li>
                              <li className="mb-2">
                                  <span className="text-green-400 inline-block mr-2">✔️</span>
                                  Personalized learning plans
                              </li>
                              <li>
                                  <span className="text-green-400 inline-block mr-2">✔️</span>
                                  Exclusive workshops and Q&A sessions
                              </li>
                          </ul>
                      </div>
                      <div className="py-4 px-6 text-center">
                          <Link href='/cart?standard'>
                              <button className="border-2 border-[#FFC926] font-bold text-[#FFC926] py-2 px-4 rounded-full hover:bg-[#FFC926] hover:text-[#121212] transition-colors">
                                  BUY NOW
                              </button>
                          </ Link>
                      </div>
                  </div>

                  {/* Premium Plan (Most Popular) */}
                  <div className="relative bg-[#29261F] rounded-lg shadow-lg w-80 transform transition-transform duration-300 hover:scale-110 hover:shadow-2xl border-2 border-[#FFC926] scale-105">
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-center">
                          <span className="bg-[#FFC926] text-[#121212] py-1 px-4 text-sm font-bold rounded-lg inline-block">MOST POPULAR</span>
                      </div>
                      <h2 className="bg-[#53BAB5] text-white text-center py-4 text-xl">Premium</h2>
                      <div className="flex flex-col items-center py-6">
                          <img src="https://i.postimg.cc/0ycPMVYp/startup.png" alt="startup" className="w-24 mb-4"/>
                          <div className="text-center">
                              <p className="text-3xl font-bold text-white">$299</p>
                              <p className="text-sm text-gray-400">per year</p>
                          </div>
                      </div>
                      <div className="p-6 text-sm text-gray-400">
                          <ul className="list-none pl-0">
                              <li className="mb-2">
                                  <span className="text-green-400 inline-block mr-2">✔️</span>
                                  Unlimited access to all live sessions
                              </li>
                              <li className="mb-2">
                                  <span className="text-green-400 inline-block mr-2">✔️</span>
                                  24/7 priority support and dedicated tutors
                              </li>
                              <li className="mb-2">
                                  <span className="text-green-400 inline-block mr-2">✔️</span>
                                  Customizable learning schedules
                              </li>
                              <li className="mb-2">
                                  <span className="text-green-400 inline-block mr-2">✔️</span>
                                  Exclusive access to premium content and resources
                              </li>
                              <li className="mb-2">
                                  <span className="text-green-400 inline-block mr-2">✔️</span>
                                  Personalized coaching and mentorship
                              </li>
                              <li>
                                  <span className="text-green-400 inline-block mr-2">✔️</span>
                                  Free access to all future workshops and events
                              </li>
                          </ul>
                      </div>
                      <div className="py-4 px-6 text-center">
                          <Link href='/cart?premium'>
                              <button className="border-2 border-[#FFC926] font-bold text-[#FFC926] py-2 px-4 rounded-full hover:bg-[#FFC926] hover:text-[#121212] transition-colors">
                                  BUY NOW
                              </button>
                          </ Link>
                      </div>
                  </div>

              </div>
          </section>


          <section id="features" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 px-4">
              <SessionCard
                  title="Live Sessions"
                  description="Enjoy real-time interactive sessions with your tutor. Ask questions, get instant feedback, and learn effectively."
                  icon={<Clock strokeWidth={1} size={150} className="text-yellow-300 mx-auto mb-4" />}
              />
              <SessionCard
                  title="Expert Tutors"
                  description="Choose from a wide range of highly qualified tutors in various subjects. Find the perfect match for your learning needs."
                  icon={<User strokeWidth={1} size={150} className="text-yellow-300 mx-auto mb-4" />}
              />
              <SessionCard
                  title="Flexible Scheduling"
                  description="Book sessions at your convenience with our flexible scheduling options. Learn at a time that works best for you."
                  icon={<Calendar strokeWidth={1} size={150} className="text-yellow-300 mx-auto mb-4" />}
              />
              </section>


          <section id="tutors" className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet Our Tutors</h2>
              <p className="text-lg mb-6">Explore profiles of our top-rated tutors and find the one who fits your learning style and goals.</p>
              <PrimaryButton href="#contact" className="bg-[#ffc926] text-[#121212] hover:bg-[#e0b528]">
                  Browse Tutors
              </PrimaryButton>

              <VideoList />
          </section>

          <section id="contact" className="text-center">
              <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
              <p className="text-lg mb-6">Have questions or need support? Contact our team for assistance and we'll be happy to help.</p>
              <PrimaryButton href="mailto:support@nowtutors.com" className="bg-[#ffc926] text-[#121212] hover:bg-[#e0b528]">
                  Contact Us
              </PrimaryButton>
          </section>
      </main>
      <Footer />
    </>
  );
}
