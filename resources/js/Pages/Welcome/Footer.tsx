import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo'; // Adjust the path as needed
import { faFacebookF, faInstagram, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1f1f1f] text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:justify-between mb-8">
          {/* Logo and Company Info */}
          <div className="mb-6 md:mb-0">
            <ApplicationLogo width="200px" height="200px" fill="white" />
            <h1 className="text-2xl font-semibold mb-2">NowTutors</h1>
            <p className="text-gray-400">Empowering students through 24/7 global tutoring.</p>
          </div>

          {/* Location and Office Details */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-400">123 Learning St, Suite 456</p>
            <p className="text-gray-400">Education City, ED 78901</p>
            <p className="text-gray-400">Phone: (123) 456-7890</p>
            <p className="text-gray-400">Email: info@nowtutors.com</p>
          </div>

          {/* Social Media Links */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
            <div className="flex gap-4">
              <a
                href="https://facebook.com/nowtutors"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-200"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a
                href="https://twitter.com/nowtutors"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-200"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                href="https://instagram.com/now.tutors"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-200"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="https://linkedin.com/company/nowtutors"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-200"
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </div>
        </div>

        {/* Legal Links and Additional Info */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">&copy; 2024 nowtutors. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;