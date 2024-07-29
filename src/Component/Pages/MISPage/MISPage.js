import './MISPage.css'
import React, { useEffect, useState } from 'react';
import NavTabs from './Components/navTabs/NavTabs';
import ReportsMIS from './Components/ReportsMIS/ReportsMIS';
import LoaderScreen from '../../LoaderScreen/LoaderScreen';
import DownloadMIS from './Components/DownloadMIS/DownloadMIS';
import ActivityLogsMIS from './Components/ActivityLogsMIS/ActivityLogsMIS';
import ScheduledReportsMIS from './Components/ScheduledReportsMIS/ScheduledReportsMIS';

const MISPage = () => {
    const [loader, setLoader] = useState(false)
    const [selectedRows, setSelectedRows] = useState([]);
    const [activeTab, setActiveTab] = useState("ScheduledReportsMIS");

    useEffect(() => {
        setLoader(true)
        if (activeTab) {
            setTimeout(() => {
                setLoader(false)
            }, 500);
        }
    }, [activeTab])

    return (
        <>
            <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className='mis-page-container'>
                {/* OrdersMIS */}
                <div className={`${activeTab === "ActivityLogsMIS" ? "d-block" : "d-none"}`}>
                    <ActivityLogsMIS activeTab={activeTab} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
                </div>

                {/* ShipmentsMIS */}
                <div className={`${activeTab === "ScheduledReportsMIS" ? "d-block" : "d-none"}`}>
                    <ScheduledReportsMIS activeTab={activeTab} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
                </div>

                {/* BillingMIS */}
                <div className={`${activeTab === "ReportsMIS" ? "d-block" : "d-none"}`}>
                    <ReportsMIS activeTab={activeTab} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
                </div>

                {/* ReturnsMIS */}
                <div className={`${activeTab === "DownloadMIS" ? "d-block" : "d-none"}`}>
                    <DownloadMIS activeTab={activeTab} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
                </div>
                <LoaderScreen loading={loader} />
            </div>
        </>
    )
}

export default MISPage