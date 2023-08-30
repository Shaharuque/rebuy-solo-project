import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { serverUrl } from '../../utils/axiosRelated';
import axios, { AxiosResponse } from 'axios';
import AdImagesSwiper from './AdImagesSwiper';
import Loading from '../Loading/Loading';

const AdDetailsCard:React.FC = () => {
    const [adDetails,setAdDetails]=useState<{}>({})
    const [loading, setLoading] = useState<boolean>(false);
    const { id } = useParams()
    const token = localStorage.getItem('token');
    console.log('ad id', id)

    useEffect(() => {
        async function fetchAds(): Promise<void> {
            let url = `${serverUrl}/product/get/ad/details/${id}`;

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
    }, [id]);
    console.log(adDetails)

    return (
        <div>
            {
                loading ? <Loading></Loading> :
                    <div className='flex justify-center mb-[20%]'>
                        <AdImagesSwiper adDetails={adDetails}></AdImagesSwiper>
                    </div>
            }
        </div>
    );
};

export default AdDetailsCard;