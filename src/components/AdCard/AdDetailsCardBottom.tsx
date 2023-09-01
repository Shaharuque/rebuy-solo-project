
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TbGavel } from 'react-icons/tb';
import { BiHeart, BiInfoCircle, BiLayer } from 'react-icons/bi';
import { BsCartCheckFill, BsCartPlus } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { serverUrl } from '../../utils/axiosRelated';

interface IPayload{
    productId: string;
}

const AdDetailsCardBottom: React.FC = () => {
    const [addSuccess,setAddSuccess]=useState<boolean>(false)
    const [cartStatus, setCartStatus] = useState([]);
    const adType = useSelector((state: any) => state?.ad?.adtype);
    localStorage.setItem('adType', adType);
    const token = localStorage.getItem('token');

    const { id } = useParams()
    // console.log('from ad details bottom bar',id)

    // const existingCartItem=localStorage.getItem('cart')
    // console.log('existing cart item',existingCartItem)
    // const addToCart=(id:string|undefined)=>{
    //     console.log('add to cart',id)
    //     if(id && existingCartItem){
    //         let cartArray=JSON?.parse(existingCartItem)
    //         let merged=[...cartArray,id]
    //         localStorage.setItem('cart',JSON.stringify(merged))
    //     }else if(id && !existingCartItem){
    //         localStorage.setItem('cart',JSON.stringify([id]))
    //     }

    // }

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

        if(id){
            fetchCart();
        }
    }, []);
    
    const addToCart=async(id: string | undefined)=> {
        console.log('add to cart',id)
        if(id){
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
                                <div >
                                    {/* {
                                        existingCartItem?.includes(id) 
                                        ? 
                                        <BsCartCheckFill className='text-[25px] text-white' />
                                        :
                                        <BsCartPlus onClick={()=>addToCart(id)} className='text-[25px] text-white' />
                                    } */}
                                    {
                                        addSuccess || cartStatus?.length>0 ? 
                                        <BsCartCheckFill className='text-[25px] text-white' />
                                        :
                                        <BsCartPlus onClick={()=>addToCart(id)} className='text-[25px] text-white' />
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
