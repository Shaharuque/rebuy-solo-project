import React from 'react';
import Back from '../Back/Back';
import { useGetUserAdsQuery, useGetUserPurchasedQuery, useGetUserSoldQuery } from '../../features/user/userSlice';
import Swiper from "react-id-swiper";
import UserAdCard from '../AdCard/UserAdCard';
import UserPurchasedCard from '../AdCard/UserPurchasedCard';

// Define the response type for getUserAds

const MyDashboard: React.FC = () => {

    const { data: userAds } = useGetUserAdsQuery({});
    //console.log(userAds?.ads)

    const {data:purchasedProducts,isLoading:getPurchasedLoading}=useGetUserPurchasedQuery({})

    const {data:sold}=useGetUserSoldQuery({})
    


    const params = {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        }
    }

    return (
        <>
            <Back></Back>
            <div className='mb-12'>
                <div className='mt-8'>
                    <h1 className='m-4 text-[14px]  text-tcolor font-semibold'>Advertised Products</h1>
                    <div className='overflow-x-hidden mx-4 mb-6'>
                        {
                            userAds?.ads?.length > 0
                                ?
                                <Swiper {...params}>
                                    {userAds?.ads?.map((ad: any, index: number) => (
                                        <div key={index}>
                                            <UserAdCard ad={ad}></UserAdCard>
                                        </div>
                                    ))}
                                </Swiper>
                                :
                                <h1 className='text-center text-[14px]  text-primary font-semibold'>No Advertised Products</h1>
                        }
                    </div>
                </div>

                <div className='mt-16'>
                    <h1 className='m-4 text-[14px]  text-tcolor font-semibold'>Purchased Products</h1>
                    <div className='overflow-x-hidden mx-4 mb-6'>
                        {
                            purchasedProducts?.purchased?.length > 0
                                ?
                                <Swiper {...params}>
                                    {purchasedProducts?.purchased?.map((p: any, index: number) => (
                                        <div key={index}>
                                            <UserPurchasedCard ad={p}></UserPurchasedCard>
                                        </div>
                                    ))}
                                </Swiper>
                                :
                                <h1 className='text-center text-[14px]  text-primary font-semibold'>No Purchased history</h1>
                        }
                    </div>
                </div>

                <div className='mt-16'>
                    <h1 className='m-4 text-[14px]  text-tcolor font-semibold'>Sold Products</h1>
                    <div className='overflow-x-hidden mx-4 mb-6'>
                        {
                            sold?.soldProducts?.length > 0
                                ?
                                <Swiper {...params}>
                                    {userAds?.ads?.map((ad: any, index: number) => (
                                        <div key={index}>
                                            <UserAdCard ad={ad}></UserAdCard>
                                        </div>
                                    ))}
                                </Swiper>
                                :
                                <h1 className='text-center text-[14px]  text-primary font-semibold'>No Advertised Products</h1>
                        }
                    </div>
                </div>

            </div>
        </>
    );
};

export default MyDashboard;