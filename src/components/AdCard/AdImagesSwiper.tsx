import React, { useEffect } from 'react';
import Swiper from 'react-id-swiper';
import './swiper.css'
import { BsCheck2All } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';

interface AdDetailsProps {
    adDetails: IAdDetails; // Use the IAd interface to define the type of the 'ad' prop
}

interface IAdDetails {
    _id: string;
    images: string[]; // Define 'images' as an array of strings
    description: string;
    basePrice: number;
    productName: string;
    owner: {
        email: string;
        name: string;
    };
    brand: string;
}
const AdImagesSwiper: React.FC<AdDetailsProps> = ({ adDetails }) => {
    const { images, description, basePrice, productName, brand } = adDetails

    const params = {
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    }
    return (
        <div className='overflow-x-hidden mx-4 mb-6'>
            <Swiper {...params}>
                {
                    images?.map((image) => (
                        <div key={image}>
                            <img className='w-full h-[80%] rounded-sm' src={image} alt="movie" />
                        </div>
                    ))
                }
            </Swiper>
            <div className='mt-4'>
                <div className='flex items-center justify-between'>
                <h1 className='text-[20px] text-tcolor font-semibold'>{productName}</h1>
                <h1 className='text-[16px] text-[#087E8B] font-bold'><span className=' font-extrabold mr-[2px] text-[14px]'>৳</span>{basePrice}</h1>
                </div>
                <h1 className='text-[15px] text-[#666] my-4'>{description}</h1>

                <div className='flex items-center justify-center gap-2 border border-gray-200 rounded-md mb-2 text-gray-400'>
                    <h1 className='text-[15px]'>Maker:<span className='text-[15px]'> {adDetails?.brand}</span></h1>
                    <div>|</div>
                    <h1 className='text-[15px]'> Year: 2022</h1>
                </div>
                <div className='flex items-center justify-center  gap-2 border border-gray-200 rounded-md text-gray-400'>
                    <h1 className='text-[15px] flex items-center'>Warrenty:<span className='text-[15px]'><MdClose className='text-red-600 tetx-[16px]'/></span></h1>
                    <div>|</div>
                    <h1 className='text-[15px] flex items-center'>Packings: <BsCheck2All className='text-green-600'/></h1>
                </div>

            </div>
            {/* Apply CSS module styles */}
        </div>
    )
};

export default AdImagesSwiper;