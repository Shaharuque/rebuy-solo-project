import React from 'react';
import Avatar from '../../../assets/avatar.svg'

interface ContactListProps {
    contact: {
        name: string;
        message: string;
        time: string;
    }
    clickHandler: () => void;
}

const ContactList: React.FC<ContactListProps> = ({contact,clickHandler}) => {
    return (
        <div onClick={clickHandler} className='flex justify-between items-center border-b p-2'>
            <div className='flex justify-center items-center'>
                <img src={Avatar} alt="image" width={50} height={50} />
                <div className='ml-4'>
                    <h1 className='text-[10px] font-bold'>{contact.name}</h1>
                    <h1>{contact.message}</h1>
                </div>
            </div>
            <div className='text-[10px] font-bold'>{contact.time}</div>
        </div>
    );
};

export default ContactList;