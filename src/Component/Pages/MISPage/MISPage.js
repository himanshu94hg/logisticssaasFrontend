import React, { useState } from 'react';
import './MISPage.css'
import NavTabs from './Components/navTabs/NavTabs';
import ScheduledReportsMIS from './Components/ScheduledReportsMIS/ScheduledReportsMIS';
import ActivityLogsMIS from './Components/ActivityLogsMIS/ActivityLogsMIS';


const MISPage = () => {
    const [activeTab, setActiveTab] = useState("ActivityLogsMIS");

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
            <div className={`${activeTab === "ActivityLogsMIS" ? "d-block" : "d-none"}`}>
                <ActivityLogsMIS />
            </div>

            {/* ShipmentsMIS */}
            <div className={`${activeTab === "ScheduledReportsMIS" ? "d-block" : "d-none"}`}>
                <ScheduledReportsMIS />
            </div>

            {/* BillingMIS */}
            <div className={`${activeTab === "BillingMIS" ? "d-block" : "d-none"}`}>
                <ActivityLogsMIS />
            </div>

            {/* ReturnsMIS */}
            <div className={`${activeTab === "ReturnsMIS" ? "d-block" : "d-none"}`}>
                <ScheduledReportsMIS />
            </div>
        </>
    )
}

export default MISPage