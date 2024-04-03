import React, { useState } from 'react';
import './MISPage.css'
import NavTabs from './Components/navTabs/NavTabs';
import ScheduledReportsMIS from './Components/ScheduledReportsMIS/ScheduledReportsMIS';
import ActivityLogsMIS from './Components/ActivityLogsMIS/ActivityLogsMIS';
import DownloadMIS from './Components/DownloadMIS/DownloadMIS';
import ReportsMIS from './Components/ReportsMIS/ReportsMIS';
import Pagination from '../../common/Pagination/Pagination';

const MISPage = () => {
    const [activeTab, setActiveTab] = useState("ActivityLogsMIS");

    const [selectedOption, setSelectedOption] = useState("Domestic");
    const [isOpen, setIsOpen] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState("");

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
            <div className='mis-page-container'>
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

                <Pagination
                    totalItems={totalItems}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </>
    )
}

export default MISPage