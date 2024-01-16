import React, { useState } from 'react';
import './MISPage.css'
import OrdersMIS from './Components/OrdersMIS/OrdersMIS';
import NavTabs from './Components/navTabs/NavTabs';

const MISPage = () => {
    const [activeTab, setActiveTab] = useState("All Orders");

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
        </>
    )
}

export default MISPage