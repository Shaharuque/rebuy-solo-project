import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { serverUrl } from '../../utils/axiosRelated';
import axios, { AxiosResponse } from 'axios';
import Swiper from 'react-id-swiper';
import ProductDetailsBack from '../../components/Back/ProductDetailsBack';
import { toast } from 'react-toastify';
import moment from 'moment';

interface IPayload {
    productId: string;
    bidAmount: number;
    userId: string;
}

const AdBidding: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    //socket io
    const [socket, setSocket] = useState<any>(null);
    const [bidData, setBidData] = useState<any>([]);
    const [timer, setTimer] = useState<number>(60); // Initial timer value in seconds
    const [isBiddingAllowed, setIsBiddingAllowed] = useState<boolean>(true);
    const { adId } = useParams()
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const token = localStorage.getItem('token')

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else {
            setIsBiddingAllowed(false);
            clearInterval(interval);
        }

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, [timer]);

    //Socket io connection
    useEffect(() => {
        setSocket(io('http://localhost:8080'));  //io thekey socket newa hoisey
    }, [])

    const params = {
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    }

    //join room(room=>productid as for each product there will be a room)
    useEffect(() => {
        if (socket) {
            socket.emit('joinRoom', { userId: user?.email, room: adId });
        }
    }, [socket])
    // console.log('from ad bidding', adId)

    //fetch data of particular bid able product/ad description
    const [adDetails, setAdDetails] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        async function fetchAds(): Promise<void> {
            let url = `${serverUrl}/product/get/ad/details/${adId}`;

            const headers = {
                Authorization: `Bearer ${token}`, // Set your authorization token
                // Other custom headers if needed
            };

            try {
                setLoading(true);
                const response: AxiosResponse = await axios.get(url, { headers });
                if (response.data.success) {
                    setAdDetails(response?.data?.ad);
                    setLoading(false);
                }
            } catch (error: any) {
                console.error('Error:', error);
            }
        }

        fetchAds();
    }, [adId]);
    // console.log(adDetails)



    const handleInputChange = (event: any) => {
        setSearchText(event.target.value);
    };

    const handleEnterPress = async (event: any) => {
        if (event.key === 'Enter' && isBiddingAllowed) {
            // Perform your search or handling logic here using the searchText state
            console.log('Search text:', searchText);

            if (adId) {
                //post bid amount to the server against the loggedin user
                const url = `${serverUrl}/bid/post`;
                const payload: IPayload = {
                    productId: adId,
                    bidAmount: parseInt(searchText),
                    userId: user?._id
                };
                if (!token) {
                    console.error('Token not found');
                    return;
                }
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                };

                try {
                    const response: AxiosResponse = await axios.post(url, payload, { headers });
                    console.log('Response:', response.data);

                    if (response?.data?.success) {
                        toast.success("successfully bid for the product", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            theme: "dark",
                            style: { fontSize: "15px" },
                        });
                        setSearchText('');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }

            //After pressing Enter Bidding amount will be sent to the server
            if (socket) {
                socket.emit('bid', { userId: user?.email, room: adId, bidAmount: searchText });
            }
        }
    };

    //Bidding Amount will be shown in the console only for logged in user/je bid amount dibe shei user er console e show korbe
    useEffect(() => {
        if (socket) {
            socket.on('bid', (data: any) => {
                //console.log(data);

                async function specificItemsBidGet(): Promise<void> {
                    let url = `${serverUrl}/bid/get/${data?.room}`;
                    if (!token) {
                        console.error('Token not found');
                        return;
                    }
                    const headers = {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    };

                    try {
                        const response: AxiosResponse = await axios.get(url, { headers });
                        if (response.data.success) {
                            setBidData(response?.data);
                            // toast.success("New Bid Made", {
                            //     position: "top-right",
                            //     autoClose: 5000,
                            //     hideProgressBar: false,
                            //     theme: "dark",
                            //     style: { fontSize: "15px" },
                            // });

                        }
                    } catch (error: any) {
                        console.error('Error:', error);
                    }
                }

                specificItemsBidGet();
            });
        }
    }, [socket, adId])

    console.log('bid data', bidData?.bid?.productId?.currentPrice)


    return (
        <div>
            <ProductDetailsBack></ProductDetailsBack>

            <div className='overflow-x-hidden mx-4'>
                <h1 className='text-[14px]  font-semibold flex justify-end'>
                    <span className=' font-semibold mr-[2px]'>Base Price: ৳</span>{adDetails?.basePrice}
                </h1>
                <p className='text-[12px] text-tcolor font-bold text-end mb-6'>Bidding Ends In: {moment(adDetails?.biddingEndsAt).format('Do MMM YYYY')}</p>

                <Swiper {...params}>
                    {
                        adDetails?.images?.map((image: any) => (
                            <div key={image}>
                                <img className='w-full bg-cover rounded-lg' src={image} alt="movie" />
                            </div>
                        ))
                    }
                </Swiper>
                <div className='flex flex-col mt-4'>
                    <div className=''>
                        <h1 className='text-[16px] text-tcolor font-bold'>{adDetails?.productName}</h1>
                        <h1 className='text-[13px]  font-bold'>Make:<span className='text-[13px]  font-bold'> {adDetails?.brand}</span></h1>
                    </div>


                    <h1 className='text-[14px] text-[#087E8B] font-semibold'>Current Bidding Price:
                        {

                            bidData?.bid?.productId?.currentPrice ? <span >৳{bidData?.bid?.productId?.currentPrice}</span> : <span>৳{adDetails?.currentPrice}</span>
                        }
                    </h1>

                </div>



                {/* Make a input box to put bidding amount */}
                <div className='flex items-center justify-between mt-6'>
                    <h1 className='text-[14px] text-tcolor font-bold'>Bidding Amount(৳):</h1>
                    <input
                        disabled={!isBiddingAllowed}
                        className='w-[50%] h-[30px] border-2 border-gray-400 rounded-md px-2 focus:outline-none text-[14px]'
                        type="text"
                        placeholder='Enter Amount'
                        value={searchText}
                        onChange={handleInputChange}
                        onKeyDown={handleEnterPress} />
                </div>

            </div>
        </div>
    );
};

export default AdBidding;