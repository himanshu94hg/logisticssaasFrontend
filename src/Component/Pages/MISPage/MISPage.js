import React, { useState } from 'react';
import './MISPage.css'
import OrdersMIS from './Components/OrdersMIS/OrdersMIS';
import NavTabs from './Components/navTabs/NavTabs';
import ShipmentsMIS from './Components/ShipmentsMIS/ShipmentsMIS';
import BillingMIS from './Components/BillingMIS/BillingMIS';
import ReturnsMIS from './Components/ReturnsMIS/ReturnsMIS';

const MISPage = () => {
    const [activeTab, setActiveTab] = useState("OrdersMIS");

    const [selectedOption, setSelectedOption] = useState("Domestic");
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const toggleOptions = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {/* OrdersMIS */}
            <div className={`${activeTab === "OrdersMIS" ? "d-block" : "d-none"}`}>
                <OrdersMIS />
            </div>
            
            {/* ShipmentsMIS */}
            <div className={`${activeTab === "ShipmentsMIS" ? "d-block" : "d-none"}`}>
                <ShipmentsMIS />
            </div>
            
            {/* BillingMIS */}
            <div className={`${activeTab === "BillingMIS" ? "d-block" : "d-none"}`}>
                <BillingMIS />
            </div>
            
            {/* ReturnsMIS */}
            <div className={`${activeTab === "ReturnsMIS" ? "d-block" : "d-none"}`}>
                <ReturnsMIS />
            </div>
        </>
    )
}

export default MISPage