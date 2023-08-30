
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TbGavel } from 'react-icons/tb';
import { BiHeart, BiInfoCircle, BiLayer } from 'react-icons/bi';
import { BsCartPlus } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';


const AdDetailsCardBottom: React.FC = () => {
    const adType = useSelector((state: any) => state?.ad?.adtype);
    localStorage.setItem('adType', adType);

    const {id}=useParams()
    // console.log('from ad details bottom bar',id)

    //socket io
    const [socket, setSocket] = useState<any>(null);

    const userInfo=JSON.parse(localStorage.getItem('user') || '{}')
    console.log('from ad bidding user info',userInfo)

    useEffect(() => {
        setSocket(io('http://localhost:8080'));  //io thekey socket newa hoisey
    }, [])

    const handleBid = () => {
        console.log('handle bid')
    }


    return (
        <div className='flex justify-center'>
            <div className=' fixed bottom-0 z-50 w-full'>
                <div className='flex justify-between'>
                    <div className='w-[50%] bg-red-500 h-12 flex justify-center items-center'>
                        <Link to='/add/to/liked'>
                            <BiHeart className='text-[25px] text-white' />
                        </Link>
                    </div>

                    <div className='w-[50%] bg-gray-500 h-12 flex justify-center items-center'>
                        {
                            adType === 'Sell' || localStorage.getItem('adType') === 'Sell' ?
                                <Link to='/add/to/cart'>
                                    <BsCartPlus className='text-[25px] text-white' />
                                </Link>
                                :
                                <Link onClick={handleBid} to={`/item/bidding/${id}`}>
                                    <TbGavel className='text-[25px] text-white' />
                                </Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdDetailsCardBottom;
