import React from 'react';
import Swiper from 'react-id-swiper';


const AdImagesSwiper: React.FC = () => {
    const params = {
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    }
    return (
        <div className='overflow-x-hidden mx-4 m-4'>
            <Swiper {...params}>
                <div className='bg-red-400 h-full'>Slide #1</div>
                <div>Slide #2</div>
                <div>Slide #3</div>
                <div>Slide #4</div>
                <div>Slide #5</div>
            </Swiper>
        </div>
    )
};

export default AdImagesSwiper;