
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { BiHeart, BiInfoCircle, BiLayer } from 'react-icons/bi';

interface NavbarProps {
  // Add any props you might want to pass to the Navbar component

}
const Navbar: React.FC<NavbarProps> = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<string | boolean>(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className='flex justify-center bg-red-500'>
      <div className=' fixed bottom-0 z-50 h-18 border-t border-[#181818] w-[90%]  bg-[#181818] rounded-[20px] p-4 mb-4 mx-4 shadow-md shadow-black'>
        <div className='flex justify-between px-4'>
          <Link to='/home'>
            <FiHome className='text-[25px] text-white' />
          </Link>
          <Link to='/ads'>
            <BiInfoCircle className='text-[25px] text-white' />
          </Link>
          <Link to='/item/selling/categories'>
            <BiLayer className='text-[25px] text-white' />
          </Link>
          <Link to='/home'>
            <BiHeart className='text-[25px] text-white' />
          </Link>
          <Link to='/home'>
            <BiInfoCircle className='text-[25px] text-white' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
