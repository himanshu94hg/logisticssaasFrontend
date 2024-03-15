import React, { useState } from 'react';
import './MISPage.css'
import NavTabs from './Components/navTabs/NavTabs';
import ScheduledReportsMIS from './Components/ScheduledReportsMIS/ScheduledReportsMIS';
import ActivityLogsMIS from './Components/ActivityLogsMIS/ActivityLogsMIS';
import DownloadMIS from './Components/DownloadMIS/DownloadMIS';
import ReportsMIS from './Components/ReportsMIS/ReportsMIS';


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
            <div className={`${activeTab === "ReportsMIS" ? "d-block" : "d-none"}`}>
                <ReportsMIS />
            </div>

            {/* ReturnsMIS */}
            <div className={`${activeTab === "DownloadMIS" ? "d-block" : "d-none"}`}>
                <DownloadMIS />
            </div>
        </>
    )
}

export default MISPage