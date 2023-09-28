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

const AdCard: React.FC<AdProps> = ({ ad }) => {
  const { _id, images, basePrice, productName, owner, brand, choosenType }: IAd = ad;
  //console.log(images);
  const navigate = useNavigate()

  const showAdDetails = (id: string) => {
    navigate(`/ad/details/${id}`)
  }

  return (
    <div onClick={() => showAdDetails(_id)} className='mb-10 shadow-lg  mx-4'>
      <div className='flex gap-[2px]'>
        <img className='w-12 h-12 object-fill rounded-[50px]' src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg" alt="" />
        <div>
          <h1 className='my-0'> {owner?.name}</h1>
          <h1 className='text-[12px] text-tcolor'>{owner?.email}</h1>
        </div>
      </div>

      <div className='bg-cardlight flex justify-center'>
        <img className='w-[80%] h-[80%]  object-cover rounded-sm' src={images[0]} alt="" />
      </div>

      <div className='flex justify-between items-center mx-4 py-2'>
        <div>
          <h1 className='text-[15px] font-bold text-textPrimary'>{productName}</h1>
          <span className='text-[12px] text-tcolor m-0'>{brand}</span>

        </div>
        <div>
          <h1 className='text-[15px] text-tcolor'><span className='font-extrabold mr-[2px] text-[15px]'>৳</span>{basePrice}</h1>
          <span className=' bg-primary text-[12px] text-white p-1 rounded-lg flex justify-center'>{choosenType === 'Sell' ? 'Buy': 'Bid'}</span>
        </div>
      </div>

    </div>
  );
};

export default AdCard;
