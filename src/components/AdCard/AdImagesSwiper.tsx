import React from 'react';
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
    const { images } = adDetails

    const params = {
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    }
    return (
        <div className='overflow-x-hidden mx-4 m-4'>
            <Swiper {...params}>
                {
                    images?.map((image) => (
                        <div key={image}>
                            <img className='w-full rounded-lg' src={image} alt="movie" />
                        </div>
                    ))
                }
            </Swiper>
            {/* Apply CSS module styles */}
        </div>
    )
};

export default AdImagesSwiper;