import React from 'react';
import { useNavigate } from 'react-router-dom';

interface AdProps {
    ad: IAd; // Use the IAd interface to define the type of the 'ad' prop
}

interface IAd {
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
    choosenType: string;
}

const UserAdCard: React.FC<AdProps> = ({ ad }) => {
    const { _id, images, basePrice, productName, brand }: IAd = ad;
    //console.log(images);
    const navigate = useNavigate()

    const showAdDetails = (id: string) => {
        navigate(`/ad/details/${id}`)
    }


    return (
        <div className='mb-2 shadow-md shadow-gray-400  mx-4 rounded-xl'>

            <div className='flex justify-center relative'>
                <img onClick={() => showAdDetails(_id)} className='relative w-full font object-fit rounded-xl' src={images[0]} alt="" />
            </div>

            <div className='flex justify-between items-center mx-4 py-2'>
                <div>
                    <h1 className='text-[15px] font-bold text-textPrimary'>{productName}</h1>
                    <span className='text-[12px] text-tcolor m-0'>{brand}</span>

                </div>
                <div>
                    <h1 className='text-[15px] text-tcolor font-bold'><span className='font-extrabold mr-[2px] text-[15px]'>৳</span>{basePrice}</h1>
                    
                </div>
            </div>

        </div>
    );
};

export default UserAdCard;
