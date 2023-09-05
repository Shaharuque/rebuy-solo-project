import React from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';

const Back: React.FC = () => {

    const navigate = useNavigate();
    
return (
    <div className='flex justify-between mx-4 my-6'>
        <button onClick = {() => navigate(-1)} className='border border-gray-300 rounded p-2'><BiChevronLeft className='text-[20px]' /></button>
        <Link to='/home' className='text-[18px] text-[#FF5858] font-bold font-[cursive]'>ReeBuy</Link>
    </div>
);
};

export default Back;