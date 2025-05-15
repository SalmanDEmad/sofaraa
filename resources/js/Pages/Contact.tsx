import React from 'react';
import Header from '../Components/Header';
import TextInput from '../Components/TextInput';
import TextArea from '../Components/TextArea';
import InputLabel from '../Components/InputLabel';
import InputError from '../Components/InputError';
import Card from '../Components/Card';
import { Phone, Mail, Twitter, Facebook, Instagram } from 'lucide-react'; // Import icons from Lucide.dev

const Contact: React.FC = ({ auth }: { auth ?: any}) => {
  return (
    <main className="bg-[#121212] text-gray-100 min-h-screen">
      <Header activeLink="#contact" userName={auth?.user?.name} />
      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Contact Info Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Phone Info Card */}
          <Card className="bg-gray-800 p-6 shadow-lg rounded-lg">
            <div className="flex items-center mb-4">
              <Phone className="text-2xl mr-2 text-yellow-300" />
              <h2 className="text-2xl font-bold text-yellow-300">Call Us</h2>
            </div>
            <p className="text-lg">
              <strong className="text-white">Phone:</strong><br />
              <a href="tel:+97412345678" className="text-blue-400 hover:underline">+974 1234 5678</a>
            </p>
          </Card>

          {/* Email Info Card */}
          <Card className="bg-gray-800 p-6 shadow-lg rounded-lg">
            <div className="flex items-center mb-4">
              <Mail className="text-2xl mr-2 text-yellow-300" />
              <h2 className="text-2xl font-bold text-yellow-300">Email Us</h2>
            </div>
            <p className="text-lg">
              <strong className="text-white">Email:</strong><br />
              <a href="mailto:info@nowtutors.com" className="text-blue-400 hover:underline">info@nowtutors.com</a>
            </p>
          </Card>

          {/* Social Media Card */}
          <Card className="bg-gray-800 p-6 shadow-lg rounded-lg">
            <div className="flex items-center mb-4">
              <Twitter className="text-2xl mr-2 text-yellow-300" />
              <h2 className="text-2xl font-bold text-yellow-300">Follow Us</h2>
            </div>
            <p className="text-lg">
              <a href="https://twitter.com/nowtutors" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Twitter</a><br />
              <a href="https://facebook.com/nowtutors" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Facebook</a><br />
              <a href="https://instagram.com/nowtutors" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Instagram</a>
            </p>
          </Card>
        </section>

        {/* Contact Form Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Form Section */}
          <div className="space-y-6">
            <Card className="bg-gray-800 p-6 shadow-lg rounded-lg">
              <h2 className="text-4xl font-bold mb-4 text-yellow-300">Get in Touch</h2>
              <form className="space-y-6">
                <div className="mb-4 flex flex-col sm:flex-row sm:gap-4">
                  <div className="w-full sm:w-1/2">
                    <InputLabel htmlFor="name">Your Name</InputLabel>
                    <TextInput
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      required
                      className="w-full"
                    />
                    <InputError id="name" />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <InputLabel htmlFor="email">Your Email</InputLabel>
                    <TextInput
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      required
                      className="w-full"
                    />
                    <InputError id="email" />
                  </div>
                </div>
                <div className="mb-4">
                  <InputLabel htmlFor="message">Your Message</InputLabel>
                  <TextArea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Write your message"
                    required
                    className="w-full"
                  />
                  <InputError id="message" />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-600 transition duration-300"
                >
                  Send
                </button>
              </form>
            </Card>
          </div>

          {/* Help Section */}
          <div className="space-y-6">
            <Card className="bg-gray-800 p-6 shadow-lg rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-yellow-300">How Can We Help You?</h2>
              <p className="text-lg">
                We are here to assist you with any questions or concerns you might have. Whether it's about our services, account issues, or general inquiries, our support team is available to provide you with the information and assistance you need. Feel free to reach out to us, and we'll do our best to address your needs promptly.
              </p>
            </Card>
          </div>
        </section>

        {/* Map Section */}
        <section className="mb-12">
          <Card className="bg-gray-800 p-6 shadow-lg rounded-lg">
            <h2 className="text-4xl font-bold mb-4 text-yellow-300">Find Us on the Map</h2>
            <div className="relative h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115410.76293597782!2d51.2840375972656!3d25.3180985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45ddc0246003ab%3A0x199c77493ae46219!2sEducation%20City%20Headquarter!5e0!3m2!1sen!2sqa!4v1725747879435!5m2!1sen!2sqa"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Map showing Education City"
              ></iframe>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
};

export default Contact;
