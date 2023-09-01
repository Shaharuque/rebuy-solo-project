import React from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Back:React.FC = () => {
    return (
        <div className='flex justify-between mx-4 my-6'>
            <Link to='/item/selling/categories' className='border border-gray-300 rounded p-2'><BiChevronLeft className='text-[20px]' /></Link>
            <Link to='/home' className='text-[18px] text-[#FF5858] font-bold'>ReBuy</Link>
        </div>
    );
};

export default Back;