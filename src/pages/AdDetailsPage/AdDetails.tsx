import React from 'react';
import AdDetailsCard from '../../components/AdCard/AdDetailsCard';
import AdHeading from '../../components/AdHeadbar/AdHeading';
import Navbar from '../../components/Navbar/Navbar';

const AdDetails = () => {
    return (
        <div>
            <AdHeading></AdHeading>
            <div>
                <AdDetailsCard></AdDetailsCard>
            </div>
            <Navbar></Navbar>
        </div>
    );
};

export default AdDetails;