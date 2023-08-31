import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const CartCard: React.FC = () => {
    return (
        <div>
            <div className='flex items-center gap-2 bg-[#D4E4E6] rounded-xl p-4 mt-2'>
                <AiOutlineShoppingCart className='text-[#5F5F5F] text-[40px]' />
                <div>
                    <button className='text-[#5F5F5F] text-[18px] font-bold'>
                        My Orders
                    </button>
                    <h1 className='text-[12px] font-normal '>Track your orders</h1>
                </div>
            </div>
        </div>
    );
};

export default CartCard;