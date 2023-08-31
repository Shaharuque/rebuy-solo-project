import React, { useState } from 'react';
import { RxEyeClosed, RxHamburgerMenu } from 'react-icons/rx';
import UserInfo from '../../pages/UserInfoPage/UserInfo';

const Header: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(!isModalOpen);
        
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        console.log('from header handleOk clicked')
    };

    console.log('from header', isModalOpen)
    return (
        <div className='flex justify-between items-center mb-4 px-6 h-[10vh] rounded-b-lg'>
            <div className='border border-[#3C3C3C] rounded-[50px] p-[2px]'>
                <img className='w-12 h-12 object-fill rounded-[50px]' src="https://carwow-uk-wp-3.imgix.net/18015-MC20BluInfinito-scaled-e1666008987698.jpg" alt="car image" />
            </div>

            <div onClick={showModal}>
                <RxHamburgerMenu></RxHamburgerMenu>
            </div>

            {isModalOpen && <UserInfo isModalOpen={isModalOpen} handleCancel={handleCancel} ></UserInfo>}
        </div>
    );
};

export default Header;