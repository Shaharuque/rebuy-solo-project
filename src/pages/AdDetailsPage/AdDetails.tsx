import React, { useEffect, useState } from 'react';
import AdDetailsCard from '../../components/AdCard/AdDetailsCard';
import AdHeading from '../../components/AdHeadbar/AdHeading';
import AdDetailsCardBottom from '../../components/AdCard/AdDetailsCardBottom';
import ProductDetailsBack from '../../components/Back/ProductDetailsBack';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { serverUrl } from '../../utils/axiosRelated';
import axios, { AxiosResponse } from 'axios';
import { adTypeStore } from '../../features/adType/adSlice';
import Loading from '../../components/Loading/Loading';

const AdDetails:React.FC = () => {
    const {id}=useParams()
    // console.log('from ad details',id)

    const [adDetails,setAdDetails]=useState<{}>({})
    const [loading, setLoading] = useState<boolean>(false);
    const token = localStorage.getItem('token');

    const dispatch=useDispatch()


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
                    dispatch(adTypeStore({adType:response?.data?.ad?.choosenType}))
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
            <ProductDetailsBack></ProductDetailsBack>

            <div>
                {
                    loading ? <Loading></Loading> :<AdDetailsCard adDetails={adDetails}></AdDetailsCard>
                }
                
            </div>

            <AdDetailsCardBottom></AdDetailsCardBottom>

        </div>
    );
};

export default AdDetails;