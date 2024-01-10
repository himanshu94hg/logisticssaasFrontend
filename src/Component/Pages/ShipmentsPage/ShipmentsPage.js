import React, { useState } from 'react';
import NavTabs from './Components/navTabs/NavTabs';
import ActionRequired from './Components/ActionRequired/ActionRequired';
import ActionRequested from './Components/ActionRequested/ActionRequested';
import RTOShipment from './Components/RTOShipment/RTOShipment';
import DeliveredShipment from './Components/DeliveredShipment/DeliveredShipment';


const ShipmentsPage = () => {
    const [activeTab, setActiveTab] = useState("Action Required");

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

            <div className={`${activeTab === "Action Required" ? "d-block" : "d-none"}`}>
                <ActionRequired />
            </div>
            
            <div className={`${activeTab === "Action Requested" ? "d-block" : "d-none"}`}>
                <ActionRequested />
            </div>
            
            <div className={`${activeTab === "RTO" ? "d-block" : "d-none"}`}>
                <RTOShipment />
            </div>
            
            <div className={`${activeTab === "Delivered" ? "d-block" : "d-none"}`}>
                <DeliveredShipment />
            </div>

        </>
    )
}

export default ShipmentsPage