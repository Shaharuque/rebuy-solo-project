import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { serverUrl } from '../../utils/axiosRelated';
import axios, { AxiosResponse } from 'axios';
import AdImagesSwiper from './AdImagesSwiper';
import Loading from '../Loading/Loading';
import { useDispatch } from 'react-redux';
import { adTypeStore } from '../../features/adType/adSlice';

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