import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Swiper from "react-id-swiper";
import "swiper/css";
import Header from '../../components/Header/Header';
import axios, { AxiosResponse } from 'axios';
import { serverUrl } from '../../utils/axiosRelated';
import HomeAdCard from '../../components/AdCard/HomeAdCard';
import Loading from '../../components/Loading/Loading';
import { useNavigate } from 'react-router-dom';


const Home: React.FC = () => {
    const movies = [
        "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX900.jpg",
        "https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX900.jpg",
        "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX900.jpg"
    ];
    const [allAds, setAllAds] = React.useState<[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const token = localStorage.getItem('token')
    const navigate=useNavigate()

    useEffect(() => {
        async function fetchNewArrivalAds(): Promise<void> {
            let url = `${serverUrl}/product/get/recent/ads`;
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
            }
        }

        fetchNewArrivalAds();
    }, []);
    console.log(allAds)

    const params = {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        }
    }

    return (
        <div className='overflow-x-hidden mb-[100px]'>
            <Header></Header>
            <div className='flex justify-between mb-3 px-6'>
                <h1 className='text-[15px] font-bold text-[#3C3C3C] '>New arrivals</h1>
                <h1 onClick={()=>{navigate('/ads')}} className='text-[12px] font-semibold text-[#898989] '>View More</h1>
            </div>
            <div className='px-2'>
                <Swiper {...params}>
                    {allAds?.slice(0, 4)?.map((ad, index) => (
                        <div key={index}>
                            <HomeAdCard ad={ad}></HomeAdCard>
                        </div>
                    ))}
                </Swiper>
            </div>

            <div className='flex justify-between mb-3 px-6 mt-8'>
                <h1 className='text-[15px] font-bold text-[#3C3C3C] '>Recently viewed</h1>
                <h1 className='text-[12px] font-semibold text-[#898989] '>View More</h1>
            </div>
            <div className='px-2'>
                <Swiper {...params}>
                    {allAds?.slice(0, 4)?.map((ad, index) => (
                        <div key={index}>
                            <HomeAdCard ad={ad}></HomeAdCard>
                        </div>
                    ))}
                </Swiper>
            </div>


            <Navbar></Navbar>


            {/* <Swiper {...params}>
                <div className='bg-red-400'>Slide #1</div>
                <div className='bg-red-400'>Slide #2</div>
                <div className='bg-red-400'>Slide #3</div>
                <div className='bg-red-400'>Slide #4</div>
                <div className='bg-red-400'>Slide #5</div>
            </Swiper> */}

        </div>
    );
};

// export default Home;

// import React from 'react';
// import Swiper from 'react-id-swiper';
// const Home = () => {
//     const params = {
//         slidesPerView: 3,
//         spaceBetween: 30,
//         pagination: {
//             el: '.swiper-pagination',
//             clickable: true,
//         }
//     }
//     return (
//         <Swiper {...params}>
//             <div>Slide #1</div>
//             <div>Slide #2</div>
//             <div>Slide #3</div>
//             <div>Slide #4</div>
//             <div>Slide #5</div>
//         </Swiper>
//     )
// };
export default Home;