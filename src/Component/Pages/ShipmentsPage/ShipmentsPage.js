import React, { useState } from 'react';
import NavTabs from './Components/navTabs/NavTabs';
// import './ShipmentsPage.css'
import AllOrderss from './Components/AllOrders/AllOrders';


const ShipmentsPage = () => {
    const [activeTab, setActiveTab] = useState("Overview");

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
            <AllOrderss />
        </>
    )
}

export default ShipmentsPage