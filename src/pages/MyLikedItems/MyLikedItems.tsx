import React, { useState, useEffect } from 'react';
import Back from '../../components/Back/Back';
import { AiFillCloseCircle, AiOutlineDashboard, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import useToken from '../../customhooks/useToken';
import { serverUrl } from '../../utils/axiosRelated';
import axios, { AxiosResponse } from 'axios';
import Loading from '../../components/Loading/Loading';
import Navbar from '../../components/Navbar/Navbar';
import { FaCartArrowDown } from 'react-icons/fa';
import { WiDirectionRight } from 'react-icons/wi';
import { useNavigate } from 'react-router-dom';

const MyLikedItems: React.FC = () => {
    const [likedItems, setLikedItems] = useState<[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const { token } = useToken()
    const navigate = useNavigate()

    //Getting all the liked items from the database
    useEffect(() => {
        async function fetchLikedProducts(): Promise<void> {
            let url = `${serverUrl}/product/get/liked/products/by/user`;

            const headers = {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            };

            try {
                setLoading(true);
                const response: AxiosResponse = await axios.get(url, { headers });
                if (response.data.success) {
                    setLikedItems(response?.data?.likedProducts);
                    setLoading(false);
                }
            } catch (error: any) {
                console.error('Error:', error);
            }
        }

        fetchLikedProducts();
    }, []);

    console.log(likedItems)

    const goToDetails = (id: string) => {
        console.log('add to cart', id)
        navigate(`/ad/details/${id}`)
    }

    return (
        <div>
            <div>
                <Back></Back>
            </div>
            <div className='p-4 mb-[25%]'>
                <h1 className='text-center text-[20px] text-tcolor font-semibold'>My Wishlist</h1>
                {
                    loading ? <Loading></Loading>
                        :
                        <>
                            {
                                likedItems?.map((item: any) => {
                                    return (
                                        <div onClick={()=>{goToDetails(item?._id)}} key={item?._id} className='relative flex gap-2 border shadow-lg shadow-gray-400 rounded-xl py-4 px-2 mt-5'>

                                            <img className='w-[110px] h-[110px] rounded-md' src={item?.images[0]} alt="card-image" />

                                            <div>
                                                <button className='text-[#5F5F5F] '>
                                                    {item?.productName}
                                                </button>
                                                <h1 className='text-[12px] font-extrabold '><span className=' mr-[2px]'>৳</span>{item?.basePrice}</h1>
                                                <div className='text-[12px] flex gap-2 absolute bottom-4'>
                                                    {item?.brand ? <h1 className='bg-gray-400 text-white p-[3px] rounded-md'>{item?.brand}</h1> : null}
                                                    {item?.model ? <h1 className='bg-gray-400 text-white p-[3px] rounded-md'>{item?.model}</h1> : null}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </>
                }
            </div>
            <Navbar></Navbar>
        </div>
    );
};

export default MyLikedItems;