import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import ApplicationLogo from "@/Components/ApplicationLogo"; 
import toast, { Toaster } from 'react-hot-toast';
import PrimaryButton from '@/Components/PrimaryButton';

type UserType = "student" | "tutor";

interface FormData {
  fname: string;
  lname: string;
  email: string;
  userType: UserType;
}

const MailingList = () => {
  // Countdown timer logic
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Ref for the form section
  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const comingDate = new Date('December 8, 2024 13:12:00').getTime();

    const updateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = comingDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timerInterval);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    const timerInterval = setInterval(updateTimeLeft, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    // Check if the device is mobile
    if (window.innerWidth <= 768) {
      const scrollTimeout = setTimeout(() => {
        // Scroll to the bottom of the page smoothly after 2 seconds
        if (formRef.current) {
          formRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 2000);

      return () => clearTimeout(scrollTimeout); // Cleanup the timeout on unmount
    }
  }, []); // Empty dependency array means this effect runs once when the component is mounted

  // Form state and handleSubmit


  const { data, setData, post, processing, errors, reset } = useForm<FormData>({
    fname: '',
    lname: '',
    email: '',
    userType: 'student',
});

  const { flash } = usePage().props

  const [hasFlashed, setHasFlashed] = useState(false);

  useEffect(() => {

    if (!hasFlashed) {
      // console.log("useeffect", !hasFlashed, flash, !!flash?.success)
      // if (flash?.error) toast.success(flash?.error);
      // else if (flash?.warning) toast.success(flash?.warning);
      // else if (flash?.info) toast.success(flash?.info);
      // else if (flash?.success) toast.success(flash?.success);
      setHasFlashed(true);
    }
  }, [flash, hasFlashed, setHasFlashed]);



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("mailing-list.store"), {
      onFinish: () => reset(),
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* Countdown Section */}
      <div className="relative flex-1 bg-cover bg-center min-h-screen countdown-background" style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1557251/pexels-photo-1557251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
          backgroundSize: 'cover', // Ensures the image covers the container
          backgroundPosition: 'center', // Centers the background image
        }}>
        {/* Overlay with content (Logo + Countdown) */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center space-y-4 py-8">
          {/* Application Logo */}
          <ApplicationLogo width={200} height={200} className="sm:w-36 sm:h-36" />

          {/* Countdown Timer */}
          <div className="text-xl flex justify-center text-white space-x-6">
            <div className="text-center">
              <span className="text-5xl">{timeLeft.days < 10 ? `0${timeLeft.days}` : timeLeft.days}</span>
              <span className="block text-sm">Days</span>
            </div>
            <div className="text-center">
              <span className="text-5xl">{timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}</span>
              <span className="block text-sm">Hours</span>
            </div>
            <div className="text-center">
              <span className="text-5xl">{timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}</span>
              <span className="block text-sm">Minutes</span>
            </div>
            <div className="text-center">
              <span className="text-5xl">{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}</span>
              <span className="block text-sm">Seconds</span>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Form Section */}
      <div ref={formRef} className="flex items-center justify-center bg-gray-900 p-6">
        <div className="space-y-4 text-white max-w-md w-full text-center">
          <h2 className="text-3xl font-bold">We Will Be Coming Soon</h2>
          <h4 className="italic text-lg">Subscribe to get notification when we start</h4>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {/* First Name */}
            <div>
              <label htmlFor="fname" className="block text-sm font-medium text-white">First Name</label>
              <input
                id="fname"
                type="text"
                name="fname"
                value={data.fname}
                onChange={(e) => setData('fname', e.target.value )}
                className="mt-1 block w-full px-4 py-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              {errors.fname && <p className="text-red-500 text-xs">{errors.fname}</p>}
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lname" className="block text-sm font-medium text-white">Last Name</label>
              <input
                id="lname"
                type="text"
                name="lname"
                value={data.lname}
                onChange={(e) => setData('lname', e.target.value)}
                className="mt-1 block w-full px-4 py-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              {errors.lname && <p className="text-red-500 text-xs">{errors.lname}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={data.email}
                autoComplete="email"
                onChange={(e) => setData('email', e.target.value)}
                className="mt-1 block w-full px-4 py-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>

            {/* User Type */}
            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-white">Interested in</label>
              <select
                id="userType"
                name="userType"
                value={data.userType}
                onChange={(e) => setData('userType', e.target.value as UserType)}
                className="mt-1 block w-full px-4 py-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="student">Student</option>
                <option value="tutor">Tutor</option>
              </select>
              {errors.userType && <p className="text-red-500 text-xs">{errors.userType}</p>}
            </div>

            {/* Submit Button */}
            <PrimaryButton className="mt-4 w-full py-3 rounded bg-purple-600 hover:bg-purple-700 transition-colors duration-300 font-semibold text-white" disabled={processing}>
              Notify Me
            </PrimaryButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MailingList;
