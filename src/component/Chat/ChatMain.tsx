import { useState, useEffect } from 'react';
import Avatar from '../../assets/avatar.svg'
import ContactList from './ContactList/ContactList';


const ChatMain: React.FC = () => {
  const [click, setClick] = useState<boolean>(false)
  // Dummy data for contact list
  const contactList = [
    {
      name: 'Shaharuqe Amin',
      message: 'Hello',
      time: '10:00 AM'
    },
    {
      name: 'Shaharuqe Amin',
      message: 'Hello',
      time: '10:00 AM'
    },
    {
      name: 'Shaharuqe Amin',
      message: 'Hello',
      time: '10:00 AM'
    },
    {
      name: 'Shaharuqe Amin',
      message: 'Hello',
      time: '10:00 AM'
    },
    {
      name: 'Shaharuqe Amin',
      message: 'Hello',
      time: '10:00 AM'
    },
    {
      name: 'Shaharuqe Amin',
      message: 'Hello',
      time: '10:00 AM'
    }
  ]

  const clickHandler = () => {
    console.log('clicked')
    setClick(!click)
  }


  return (
    <div>
      <div className='w-screen flex'>
        <div className='w-[25%] h-screen bg-secondary overflow-scroll'>
          <div className='flex items-center my-8 mx-14'>
            <div>
              <img src={Avatar} alt='image' width={75} height={75} className='border border-primary p-[2px] rounded-full' />
              </div>
            <div className='ml-8'>
              <h3 className='text-2xl'>Alex</h3>
              <p className='text-lg font-light'>My Account</p>
            </div>
          </div>
          <hr />
          <div className='mx-14 mt-10'>
            <div className='text-primary text-lg'>Messages</div>
            <div>
              {
                contactList.length > 0 ?
                contactList.map((user) => {
                    return (
                      <ContactList contact={user} clickHandler={clickHandler}></ContactList>
                    )
                  }) : <div className='text-center text-lg font-semibold mt-24'>No Conversations</div>
              }
            </div>
          </div>
        </div>
        <div className='w-[50%] h-screen bg-white flex flex-col items-center'>

          </div>
        <div className='w-[25%] h-screen bg-light px-8 py-16 overflow-scroll'>
          <div className='text-primary text-lg'>People</div>

        </div>
      </div>
    </div>
  );
};

export default ChatMain;