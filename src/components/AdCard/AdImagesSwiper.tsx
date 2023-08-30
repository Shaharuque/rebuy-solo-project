import React, { useEffect } from 'react';
import Swiper from 'react-id-swiper';
import './swiper.css'

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
            <div className='mt-2'>
                <h1 className='text-[24px] text-tcolor font-bold'>{productName}</h1>
                <h1 className='text-[25px] text-[#087E8B] font-bold'><span className=' font-extrabold mr-[2px] text-[25px]'>৳</span>{basePrice}</h1>
                <h1 className='text-[15px] text-[#666]'>{description}</h1>
                <div className='flex items-center gap-2'>
                    <span>Make: </span><h1 className='text-[15px] text-tcolor font-bold ml-[2px]'> {brand}</h1>
                    <span>| </span><h1 className='text-[15px] text-tcolor font-bold ml-[2px]'> Year:2022</h1>
                </div>
            </div>
            {/* Apply CSS module styles */}
        </div>
    )
};

export default AdImagesSwiper;