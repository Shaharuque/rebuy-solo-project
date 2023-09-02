
import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { BiHeart, BiLayer } from 'react-icons/bi';
import { ImCompass2 } from 'react-icons/im'
import { BsCartPlus } from 'react-icons/bs';

interface NavbarProps {
  // Add any props you might want to pass to the Navbar component

}
const Navbar: React.FC<NavbarProps> = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<string | boolean>(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const location = useLocation();


  const isLinkActive = (path: string) => {
    return location.pathname === path;
  };
  

  return (
    <div className='flex justify-center'>
      <div className=' fixed bottom-0 z-50 h-18 w-[90%]  bg-[#181818] rounded-[20px] py-4 px-2 mb-4 shadow-md shadow-black'>
        <div className='flex justify-around items-center'>
          <Link to='/home'>
            <FiHome className={` text-white ${isLinkActive('/home') ? 'bg-[#087E8B] rounded-xl  text-[40px] py-[10px]' : ' text-[25px]'}`}/>
          </Link>
          <Link to='/ads'>
            <ImCompass2 className={` text-white ${isLinkActive('/ads') ? 'bg-[#087E8B] rounded-xl text-[40px] p-[10px]' : ' text-[25px]'} `} />
          </Link>
          <Link to='/item/selling/categories'>
            <BiLayer className={` text-white ${isLinkActive('/item/selling/categories') ? 'bg-[#087E8B] rounded-xl text-[40px] p-[10px]' : ' text-[25px]'} `} />
          </Link>
          <Link to='/liked/items'>
            <BiHeart className={` text-white ${isLinkActive('/liked/items') ? 'bg-[#087E8B] rounded-xl text-[40px] p-[10px]' : ' text-[25px]'} `} />
          </Link>
          <Link to='/cart'>
            <BsCartPlus className={` text-white ${isLinkActive('cart') ? 'bg-[#087E8B] rounded-xl text-[40px] p-[10px]' : ' text-[25px]'} `} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
