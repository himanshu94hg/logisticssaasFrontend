import React, { useState } from 'react';
import './CreateOrderFlow.css'
import NavTabs from './Components/navTabs/NavTabs';
import DomesticCreateOrder from './Components/DomesticCreateOrder/DomesticCreateOrder';
import InternationalCreateOrders from './Components/InternationalCreateOrders/InternationalCreateOrders';
import QuickCreateOrder from './Components/QuickCreateOrder/QuickCreateOrder';
import BulkCreateOrder from './Components/BulkCreateOrder/BulkCreateOrder';


const CreateOrderFlow = () => {
    const [activeTab, setActiveTab] = useState("DomesticCreateOrder");

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

            {/* All Orders */}
            <div className={`${activeTab === "DomesticCreateOrder" ? "d-block" : "d-none"}`}>
                <DomesticCreateOrder />
            </div>

            {/* All Orders */}
            <div className={`${activeTab === "InternationalCreateOrders" ? "d-block" : "d-none"}`}>
                <InternationalCreateOrders />
            </div>

            {/* All Orders */}
            <div className={`${activeTab === "BulkCreateOrder" ? "d-block" : "d-none"}`}>
                <BulkCreateOrder />
            </div>

            {/* All Orders */}
            <div className={`${activeTab === "QuickCreateOrder" ? "d-block" : "d-none"}`}>
                <QuickCreateOrder />
            </div>
        </>
    )
}

export default CreateOrderFlow