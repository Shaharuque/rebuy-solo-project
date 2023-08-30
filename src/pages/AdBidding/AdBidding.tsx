import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Back from '../../components/Back/Back';

const AdBidding:React.FC = () => {
    const {adId}=useParams()
    
    
    console.log('from ad bidding',adId)
    return (
        <div>
            <Back></Back>
        </div>
    );
};

export default AdBidding;