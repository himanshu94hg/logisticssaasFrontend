import React, { useState } from 'react';
import NavTabs from './Components/navTabs/NavTabs';
import './WeightReconciliation.css'
import WeightReconciliationTab from './Components/WeightReconciliationTab/WeightReconciliationTab';


const WeightReconciliation = () => {
    const [activeTab, setActiveTab] = useState("Shipping Charges");

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


            {/* Weight Reconciliation */}
            <div className={`${activeTab === "Weight Reconciliation" ? "d-block" : "d-none"}`}>
                <WeightReconciliationTab />
            </div>
            

           
        </>
    )
}

export default WeightReconciliation