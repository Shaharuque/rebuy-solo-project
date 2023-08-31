import React, { useEffect,useState } from 'react';
import { BiHeart, BiSolidHeart } from 'react-icons/bi';
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

const HomeAdCard: React.FC<AdProps> = ({ ad }) => {
    const { _id, images, basePrice, productName, owner, brand, choosenType }: IAd = ad;
    //console.log(images);
    const navigate = useNavigate()
    const [liked,setLiked]=useState<boolean>(false)

    const showAdDetails = (id: string) => {
        navigate(`/ad/details/${id}`)
    }

    const handleLinked=()=>{
        setLiked(!liked)
    }

    return (
        <div className='mb-2 shadow-md shadow-gray-400  mx-4 rounded-xl'>

            <div className='flex justify-center relative'>
                <img onClick={() => showAdDetails(_id)} className='relative w-full h-[50%]  object-cover rounded-t-xl' src={images[0]} alt="" />
                <div onClick={handleLinked} className=' absolute bottom-2 right-2 bg-white rounded-[50%] p-2'>
                    {
                        !liked ? <BiHeart className='text-[20px] text-primary' /> : <BiSolidHeart className='text-[20px] text-primary' />
                    }
                </div>
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

export default HomeAdCard;
