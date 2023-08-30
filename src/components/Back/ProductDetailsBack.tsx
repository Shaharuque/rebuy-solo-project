import React from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const ProductDetailsBack = () => {
    return (
        <div className='flex justify-between mx-4 my-6'>
            <Link to='/ads' className='border border-gray-300 rounded p-2'><BiChevronLeft className='text-[20px]' /></Link>
            <h1 className='text-[18px] text-[#FF5858] font-bold'>ReBuy</h1>
        </div>
    );
};

export default ProductDetailsBack;