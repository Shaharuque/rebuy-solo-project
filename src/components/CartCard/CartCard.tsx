import React from 'react';
import {  AiOutlineDelete } from 'react-icons/ai';

interface ItemProps {
    item: IItem; // Use the IAd interface to define the type of the 'ad' prop
    deleteCartitem:(id:string)=>void
}

interface IItem {
    _id: string;
    productInfo: {
        images: string[]; // Assuming images is an array of strings
        productName: string; // Assuming name is a string
        model: string;
        basePrice: number;
    };
    userInfo: {
        // Define the properties of userInfo here
    };
}
const CartCard: React.FC<ItemProps> = ({ item,deleteCartitem }) => {
    const { _id,productInfo } = item
    console.log('cart card',item)
    return (
        <div className='flex items-start gap-2 bg-cartBg rounded-xl p-4 mt-2 shadow-md relative'>
            <img src={productInfo?.images[0]} alt="" className='h-[100px] rounded-md' />
            <div>
                <button className='text-[18px] font-bold'>
                    {productInfo?.productName}
                </button>
                <h1 className='text-[12px] font-normal '>{productInfo?.model}</h1>
                <h1 className='text-[12px] font-bold absolute bottom-2 right-2'><span className='font-extrabold mr-[2px] text-[12px]'>৳</span>{productInfo?.basePrice}</h1>

                <button onClick={()=>deleteCartitem(_id)} className='absolute top-2 right-2'>
                    <AiOutlineDelete className='text-16px text-primary'></AiOutlineDelete>
                </button>
            </div>
        </div>
    );
};

export default CartCard;