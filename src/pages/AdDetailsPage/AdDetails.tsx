import React from 'react';
import AdDetailsCard from '../../components/AdCard/AdDetailsCard';
import AdHeading from '../../components/AdHeadbar/AdHeading';
import AdDetailsCardBottom from '../../components/AdCard/AdDetailsCardBottom';
import ProductDetailsBack from '../../components/Back/ProductDetailsBack';

const AdDetails:React.FC = () => {
    return (
        <div>
            <ProductDetailsBack></ProductDetailsBack>

            <div>
                <AdDetailsCard></AdDetailsCard>
            </div>

            <AdDetailsCardBottom></AdDetailsCardBottom>

        </div>
    );
};

export default AdDetails;