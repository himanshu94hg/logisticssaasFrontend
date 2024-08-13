import React, { useState } from 'react'
import ShippingRates from './ShippingRates'
import NavTabs from './NavTabs/NavTabs';
import VASRates from './VASRates';

const RateCard = () => {
    const [activeTab, setActiveTab] = useState("Shipping Rates");

    return (
        <>
            <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {
                activeTab === "Shipping Rates" &&
                <ShippingRates />
            }
            {
                activeTab === "VAS Rates" &&
                <VASRates />
            }
        </>
    )
}

export default RateCard