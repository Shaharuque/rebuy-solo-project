
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
    // Add any props you might want to pass to the Navbar component

  }
const Navbar: React.FC<NavbarProps> = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<string | boolean>(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="flex items-center justify-between bg-gray-500 p-4">
      <img className='w-10 h-10 rounded-lg' src="https://cdn.pixabay.com/photo/2020/12/27/12/07/sunrise-5863751_640.png" alt="logo" srcset=" " />
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
       
        <Link
          to='/login'
          className="text-white block mt-4 md:inline-block md:mt-0 mr-6 hover:text-yellow-500"
        >
          SignIn
        </Link>
        <Link
          to='/register'
          className="text-white block mt-4 md:inline-block md:mt-0 hover:text-yellow-500"
        >
          SignOut
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
