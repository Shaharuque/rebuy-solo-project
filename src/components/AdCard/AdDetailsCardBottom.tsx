
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { BiHeart, BiInfoCircle, BiLayer } from 'react-icons/bi';
import { BsCartPlus } from 'react-icons/bs';


const AdDetailsCardBottom: React.FC = () => {

    return (
        <div className='flex justify-center'>
            <div className=' fixed bottom-0 z-50 w-full'>
                <div className='flex justify-between'>
                    <div className='w-[50%] bg-red-500 h-12 flex justify-center items-center'>
                        <Link to='/home'>
                            <BiHeart className='text-[25px] text-white' />
                        </Link>
                    </div>

                    <div className='w-[50%] bg-gray-500 h-12 flex justify-center items-center'>
                        <Link to='/home'>
                            <BsCartPlus className='text-[25px] text-white' />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdDetailsCardBottom;
