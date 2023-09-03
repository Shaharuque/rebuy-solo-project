import React, { useState } from 'react';
import { Modal } from 'antd';
import ModalBack from '../../components/Back/ModalBack';
import { LuUser } from 'react-icons/lu';
import { AiOutlineDashboard, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

interface UserInfoProps {
    isModalOpen: boolean;
    handleCancel: () => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ isModalOpen, handleCancel }) => {
    const navigate=useNavigate()

    return (
        <>
            <Modal footer={false}
                closable={false}
                open={isModalOpen}
                width="100%"
                style={{ top: 20}}>

                <ModalBack handleCancel={handleCancel}></ModalBack>
                <div className='flex items-center gap-2 bg-[#D4E4E6] rounded-xl p-4 '>
                    <LuUser className='text-[#5F5F5F] text-[40px]' />
                    <div>
                        <button className='text-[#5F5F5F] text-[18px] font-bold'>
                            My Account
                        </button>
                        <h1 className='text-[12px] font-normal '>Edit your details & account settings</h1>
                    </div>
                </div>

                <div className='flex items-center gap-2 bg-[#D4E4E6] rounded-xl p-4 mt-2'>
                    <AiOutlineHeart className='text-[#5F5F5F] text-[40px]' />
                    <div>
                        <button onClick={()=>{navigate('/liked/items')}} className='text-[#5F5F5F] text-[18px] font-bold'>
                            Liked Items
                        </button>
                        <h1 className='text-[12px] font-normal '>Explore the liked items</h1>
                    </div>
                </div>

                <div className='flex items-center gap-2 bg-[#D4E4E6] rounded-xl p-4 mt-2'>
                    <AiOutlineDashboard className='text-[#5F5F5F] text-[40px]' />
                    <div>
                        <button className='text-[#5F5F5F] text-[18px] font-bold'>
                            My Dashboard
                        </button>
                        <h1 className='text-[12px] font-normal '>See the treading and transactions</h1>
                    </div>
                </div>

                <div className='flex items-center gap-2 bg-[#D4E4E6] rounded-xl p-4 mt-2'>
                    <AiOutlineShoppingCart className='text-[#5F5F5F] text-[40px]' />
                    <div>
                        <button className='text-[#5F5F5F] text-[18px] font-bold'>
                            My Orders
                        </button>
                        <h1 className='text-[12px] font-normal '>Track your orders</h1>
                    </div>
                </div>

                <div className='rounded-xl my-6'>
                    <button className='w-full  bg-primary text-white text-[18px] py-[5px] px-8 rounded-xl border border-primary'>
                        Sign out
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default UserInfo;