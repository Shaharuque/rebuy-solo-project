
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TbGavel } from 'react-icons/tb';
import { BiHeart, BiInfoCircle, BiLayer, BiSolidHeart } from 'react-icons/bi';
import { BsCartCheckFill, BsCartPlus, BsFillHeartFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { serverUrl } from '../../utils/axiosRelated';

interface IPayload {
    productId: string;
}


const AdDetailsCardBottom: React.FC = () => {
    const [addSuccess, setAddSuccess] = useState<boolean>(false)
    const [cartStatus, setCartStatus] = useState([]);
    const [adDetails, setAdDetails] = useState<any>(null);
    const [loveCLicked, setLoveClicked] = useState<boolean>(false)
    const adType = useSelector((state: any) => state?.ad?.adtype);
    localStorage.setItem('adType', adType);
    const token = localStorage.getItem('token');

    const { id } = useParams()
    // console.log('from ad details bottom bar',id)



    useEffect(() => {
        async function fetchCart(): Promise<void> {
            let url = `${serverUrl}/cart/check`;

            const payload = {
                productId: id,
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
                if (response.data.success) {
                    setCartStatus(response?.data?.cart);
                }
            } catch (error: any) {
                console.error('Error:', error);
            }
        }

        if (id) {
            fetchCart();
        }
    }, []);

    const addToCart = async (id: string | undefined) => {
        console.log('add to cart', id)
        if (id) {
            //post req using axios
            const url = `${serverUrl}/cart/item/add`;

            const payload: IPayload = {
                productId: id,
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
                    toast.success("successfully added to cart", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        theme: "dark",
                        style: { fontSize: "15px" },
                    });
                    setAddSuccess(true)
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    //love button clicked handler/whislist feature
    const handleLiked = async (id: string | undefined) => {
        //post req using axios to post liked item to the server corresponding to the loggedin user
        if (id) {
            //post req using axios
            const url = `${serverUrl}/product/liked/by/user`;

            const payload: IPayload = {
                productId: id,
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
                //console.log('Response:', response.data);

                //liked product /Unliked product success holey again product details api call
                if (response?.data?.success) {
                    console.log('successfully added to liked items', response?.data?.updatedAd?.likedBy)
                    setLoveClicked(!loveCLicked)
                    toast.success("Wishlist successfully updated", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        theme: "dark",
                        style: { fontSize: "15px" }
                    });
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    useEffect(() => {
        async function checkProductAlreadyLiked(): Promise<void> {
            let url = `${serverUrl}/product/liked/by/user/check`;
            if(id){
                const payload: IPayload = {
                    productId: id,
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
                    const response: AxiosResponse = await axios.post(url,payload, { headers });
                    if (response.data.success) {
                        setAdDetails(response?.data?.liked);
                    }
                } catch (error: any) {
                    console.error('Error:', error);
                }
            }else{
                toast.error("product id not found", {
                    position: "top-right",
                    autoClose: 5000
                });
            }
            
        }

        checkProductAlreadyLiked();
    }, [id, loveCLicked]);

    console.log(adDetails)


    return (
        <div className='flex justify-center'>
            <div className=' fixed bottom-0 z-50 w-full'>
                <div className='flex justify-between'>
                    <div onClick={() => handleLiked(id)} className='w-[50%] bg-red-500 h-12 flex justify-center items-center'>
                        <div>

                            {
                                !adDetails ?
                                    <BiHeart className='text-[25px] text-white' ></BiHeart>
                                    :
                                    <BiSolidHeart className='text-[25px] text-white' />
                            }
                        </div>
                        
                    </div>

                    <div className='w-[50%] bg-gray-500 h-12 flex justify-center items-center'>
                        {
                            adType === 'Sell' || localStorage.getItem('adType') === 'Sell' ?
                                <div >
                                    {
                                        addSuccess || cartStatus?.length > 0 ?
                                            <BsCartCheckFill className='text-[25px] text-green-500' />
                                            :
                                            <BsCartPlus onClick={() => addToCart(id)} className='text-[25px] text-white' />
                                    }



                                </div>
                                :
                                <Link to={`/item/bidding/${id}`}>
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
