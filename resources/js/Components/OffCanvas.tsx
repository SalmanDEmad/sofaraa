import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import HamburgerMenu from './HamburgerMenu';

const OffCanvas = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOffCanvas = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Button to toggle off-canvas */}
            <button 
                onClick={toggleOffCanvas} 
                className="p-4 text-white bg-blue-500 bg-opacity-0 rounded-md"
            >
                <HamburgerMenu isOpen={isOpen} />
            </button>

            {/* Backdrop */}
            <Transition
                show={isOpen}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-75"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-75"
                leaveTo="opacity-0"
            >
                <div 
                    className="fixed inset-0 bg-gray-700 bg-opacity-75 z-40"
                    onClick={() => {
                        setIsOpen(false); // Close on backdrop click
                    }}
                />
            </Transition>

            {/* Off-Canvas Content */}
            <Transition
                show={isOpen}
                enter="transition-transform duration-300 ease-out"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition-transform duration-300 ease-in"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
            >
                <div
                    className="fixed inset-y-0 left-0 max-w-sm w-full bg-white dark:bg-[#121212] shadow-lg z-50"
                    onClick={(e) => e.stopPropagation()} // Prevent backdrop click from closing menu
                >
                    <div className="flex justify-between items-center p-4">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Off-Canvas Menu</h2>
                        <button 
                            onClick={toggleOffCanvas} 
                            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200"
                        >
                            &times;
                        </button>
                    </div>
                    <nav className="p-4">
                        <ul>
                            <li><a href="#" className="block py-2 text-gray-900 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-100">Home</a></li>
                            <li><a href="#" className="block py-2 text-gray-900 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-100">About</a></li>
                            <li><a href="#" className="block py-2 text-gray-900 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-100">Services</a></li>
                            <li><a href="#" className="block py-2 text-gray-900 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-100">Contact</a></li>
                        </ul>
                    </nav>
                </div>
            </Transition>
        </>
    );
};

export default OffCanvas;
