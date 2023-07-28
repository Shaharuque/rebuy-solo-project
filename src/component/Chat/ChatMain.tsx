import { useState, useEffect } from 'react';
import Avatar from '../../assets/avatar.svg'
import ContactList from './ContactList/ContactList';

interface IContact {
  name: string,
  message: string,
  time: string
}


const ChatMain: React.FC = () => {
  const [click, setClick] = useState<boolean>(false)
  // Dummy data for contact list
  const contactList: IContact[] = [
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
        {/* left part */}
        <div className='w-[25%] h-screen bg-secondary '>
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
        {/* middle part */}
        <div className='w-[50%] h-screen bg-white'>
          <div className='flex items-center p-2 shadow-lg shadow-black border rounded-md'>
            <div>
              <img src={Avatar} alt='image' width={50} height={50} className='border border-primary p-[2px] rounded-full' />
            </div>
            <div className='ml-2'>
              <h1 className='text-[14px]'>Alexender</h1>
              <h1 className='text-[12px] text-green-600'>Active</h1>
            </div>
          </div>

          {/* communication message */}
          <div className='mt-8 px-4 max-h-[80%] overflow-y-auto'>
            {
              contactList?.map(item => {
                return <>
                  <div className='flex items-center mb-2'>
                    <img src={Avatar} alt='image' width={50} height={50} className='mb-6 mr-2' />
                    <div className=' max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl'>
                      <h1 className='font-bold text-[12px] p-6'>Hello!!!</h1>
                    </div>
                  </div>
                  <div className='flex items-center mb-2'>
                    <div className=' max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto'>
                      <h1 className='font-bold text-[12px] p-6 '>Hello Alexender!!!</h1>
                    </div>
                    <img src={Avatar} alt='image' width={50} height={50} className='mb-6 ml-2' />
                  </div>
                </>
              })
            }
          </div>

          {/* message writting bar build a message send bar using tailwind*/}
          <div className='flex items-center border-t border-gray-300 p-2'>
            <input type="text" placeholder='Type a message' className='w-[90%] border border-gray-300 rounded-md p-2' />
            <button className='ml-2 p-2 bg-primary rounded-full'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.707 3.293a1 1 0 010 1.414L6.414 9H13a1 1 0 110 2H6.414l4.293 4.293a1 1 0 01-1.414 1.414l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

        </div>
        {/* Right part */}
        <div className='w-[25%] h-screen bg-gray-300 px-8 py-16  shadow-gray-700 border-x rounded-md'>
          <div className='text-primary text-lg'>People</div>

        </div>
      </div>
    </div>
  );
};

export default ChatMain;