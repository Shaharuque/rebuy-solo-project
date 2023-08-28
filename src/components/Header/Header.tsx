import React from 'react';
import {RxHamburgerMenu} from 'react-icons/rx';

const Header: React.FC = () => {
    return (
        <div className='flex justify-between items-center mb-4 px-6 h-[10vh] rounded-b-lg'>
            <div className='border border-[#3C3C3C] rounded-[50px] p-[2px]'>
                <img className='w-12 h-12 object-fill rounded-[50px]' src="https://carwow-uk-wp-3.imgix.net/18015-MC20BluInfinito-scaled-e1666008987698.jpg" alt="car image"  />
            </div>

            <div>
                <RxHamburgerMenu></RxHamburgerMenu>
            </div>
        </div>
    );
};

export default Header;