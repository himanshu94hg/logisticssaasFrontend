import React, { useState } from 'react';
import NavTabs from './Components/navTabs/NavTabs';
import './WeightReco.css'
import WeightRecoTab from './Components/WeightRecoTab/WeightRecoTab';
import SettledReco from './Components/SettledReco/SettledReco';
import OnHoldReco from './Components/OnHoldReco/OnHoldReco';


const WeightReco = () => {
    const [activeTab, setActiveTab] = useState("Weight Reconciliation");

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
                <WeightRecoTab />
            </div>
            
            {/* Settled Reco */}
            <div className={`${activeTab === "Settled Reconciliation" ? "d-block" : "d-none"}`}>
                <SettledReco />
            </div>
            
            {/* On-Hold Reco */}
            <div className={`${activeTab === "On Hold Reconciliation" ? "d-block" : "d-none"}`}>
                <OnHoldReco />
            </div>
            

           
        </>
    )
}

export default WeightReco