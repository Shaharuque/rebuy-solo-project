import React from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link } from 'react-router-dom';

const AdHeading = () => {
    return (
        <div className='flex justify-between items-center mx-4 my-6'>
            <Link to='/home' className='border border-gray-300 rounded p-2'><BiChevronLeft className='text-[20px]' /></Link>
            <div>
                <RxHamburgerMenu></RxHamburgerMenu>
            </div>
        </div>
    );
};

export default AdHeading;