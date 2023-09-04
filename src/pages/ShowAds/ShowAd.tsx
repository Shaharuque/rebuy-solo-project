import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import axios, { AxiosResponse, all } from 'axios';
import AdCard from '../../components/AdCard/AdCard';
import { serverUrl } from '../../utils/axiosRelated';
import Tags from '../../components/Tags/Tag';
import AdHeading from '../../components/AdHeadbar/AdHeading';
import Search from '../../components/Search/Search';
import { useSelector } from 'react-redux';
import { AiOutlineSearch } from 'react-icons/ai'; //
import Loading from '../../components/Loading/Loading';

const ShowAd: React.FC = () => {
    const [allAds, setAllAds] = useState<[]>([]);
    const token = localStorage.getItem('token');
    const [error, setError] = useState<string>('');
    const [loading,setLoading]=useState<boolean>(false)

    // const searched = useSelector((state: any) => state?.searchKey?.keyword);
    const tag = useSelector((state: any) => state?.tagWord?.currentTag?.value);
    console.log('global search and tag', tag)

    const [searchText, setSearchText] = useState<string>('');
    const [finalSearch, setFinalSearch] = useState('');
    const handleInputChange = (event: any) => {
        setSearchText(event.target.value);
    };

    const handleEnterPress = (event: any) => {
        if (event.key === 'Enter') {
            // Perform your search or handling logic here using the searchText state
            console.log('Search text:', searchText);
            setFinalSearch(searchText)
        }
    };

    useEffect(() => {
        async function fetchAds(): Promise<void> {
            let url
            if (!tag) {
                url = `${serverUrl}/product/get/all/ad?search=${finalSearch}`;
            }
            else {
                url = `${serverUrl}/product/get/all/ad?search=${finalSearch}&tag=${tag}`;
            }

            const headers = {
                Authorization: `Bearer ${token}`, // Set your authorization token
                // Other custom headers if needed
            };

            try {
                setLoading(true)
                const response: AxiosResponse = await axios.get(url, { headers });
                if (response.data.success) {
                    setAllAds(response.data.ads);
                    setLoading(false)
                }
            } catch (error: any) {
                console.error('Error:', error);
                setError(error.message);
            }
        }

        fetchAds();
    }, [finalSearch, tag]);
    console.log(allAds)


    return (
        <div>
            <AdHeading></AdHeading>
            <div className='flex items-center bg-gray-300 border border-gray-300 ml-4 mr-2 mt-4 rounded-2xl h-[40px] px-3'>
                
                <input
                    type="text"
                    placeholder='Search for your favorite items'
                    className="bg-transparent border-none ml-2 w-full focus:outline-none"
                    value={searchText}
                    onChange={handleInputChange}
                    onKeyDown={handleEnterPress}
                />
                <AiOutlineSearch className="text-gray-600 text-[25px]" /> {/* Search icon */}
            </div>
            <Tags></Tags>
            <div className='mb-[25%]'>
                {
                    loading
                        ?
                        <Loading></Loading>
                        :
                        allAds.map((ad: any) => {
                            return (
                                <AdCard key={ad._id} ad={ad}></AdCard>
                            )
                        })
                }
            </div>
            <Navbar></Navbar>
        </div>
    );
};

export default ShowAd;