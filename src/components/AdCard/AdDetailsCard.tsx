import React from 'react';
import AdImagesSwiper from './AdImagesSwiper';


interface AdDetailsProps {
    adDetails: any
  }

const AdDetailsCard: React.FC<AdDetailsProps> = ({adDetails}) => {

    return (
        <div>
            <div className='flex justify-center mb-[20%]'>
                <AdImagesSwiper adDetails={adDetails}></AdImagesSwiper>
            </div>
        </div>
    );
};

export default AdDetailsCard;