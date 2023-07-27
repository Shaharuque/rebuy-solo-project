
import React, { useState } from 'react';

interface NavbarProps {
    // Add any props you might want to pass to the Navbar component

  }
const Navbar: React.FC<NavbarProps> = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<string | boolean>(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="flex items-center justify-between bg-gray-800 p-4">
      <image src="https://www.google.com/search?q=cargo+image&rlz=1C1KNTJ_enBD1060BD1060&oq=cargo+image&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQABiABDIHCAIQABiABDIHCAMQABiABDIHCAQQABiABDIHCAUQABiABDIHCAYQABiABDIHCAcQABiABDIKCAgQABiGAxiKBTIKCAkQABiGAxiKBdIBCDM4NzBqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8#vhid=Svu94vO3ecd8aM&vssid=l" alt="logo_image"/>
      <div className="md:hidden">
        <button
          className="text-white hover:text-yellow-500 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg
            className={`h-6 w-6 ${isMobileMenuOpen ? 'hidden' : 'block'}`}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
          <svg
            className={`h-6 w-6 ${isMobileMenuOpen ? 'block' : 'hidden'}`}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div
        className={`md:flex ${isMobileMenuOpen ? 'block' : 'hidden'} mt-4 md:mt-0`}
      >
        <a
          href="#"
          className="text-white block mt-4 md:inline-block md:mt-0 mr-6 hover:text-yellow-500"
        >
          Home
        </a>
        <a
          href="#"
          className="text-white block mt-4 md:inline-block md:mt-0 mr-6 hover:text-yellow-500"
        >
          About
        </a>
        <a
          href="#"
          className="text-white block mt-4 md:inline-block md:mt-0 mr-6 hover:text-yellow-500"
        >
          Services
        </a>
        <a
          href="#"
          className="text-white block mt-4 md:inline-block md:mt-0 hover:text-yellow-500"
        >
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
