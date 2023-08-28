import React from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Back = () => {
    return (
        <div className='flex justify-between m-4'>
            <Link to='/item/selling/categories' className='border border-gray-300 rounded p-2'><BiChevronLeft className='text-[20px]' /></Link>
            <h1 className='text-[18px] text-[#FF5858] font-bold'>ReBuy</h1>
        </div>
    );
};

export default Back;