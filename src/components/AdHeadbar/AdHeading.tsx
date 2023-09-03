import React, {useState} from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import UserInfo from '../../pages/UserInfoPage/UserInfo';

const AdHeading:React.FC = () => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        console.log('from header handleOk clicked')
    };

    return (
        <div className='flex justify-between items-center mx-4 my-6'>
            <Link to='/home' className='border border-gray-300 rounded p-2'><BiChevronLeft className='text-[20px]' /></Link>
            <div onClick={showModal}>
                <RxHamburgerMenu></RxHamburgerMenu>
            </div>

            {isModalOpen && <UserInfo isModalOpen={isModalOpen} handleCancel={handleCancel} ></UserInfo>}
        </div>
    );
};

export default AdHeading;