import React, { useEffect, useState } from 'react';
import NavTabs from './Components/navTabs/NavTabs';
import ScheduledReportsMIS from './Components/ScheduledReportsMIS/ScheduledReportsMIS';
import ActivityLogsMIS from './Components/ActivityLogsMIS/ActivityLogsMIS';
import DownloadMIS from './Components/DownloadMIS/DownloadMIS';
import ReportsMIS from './Components/ReportsMIS/ReportsMIS';
import Pagination from '../../common/Pagination/Pagination';
import { useDispatch } from 'react-redux';
import './MISPage.css'
import LoaderScreen from '../../LoaderScreen/LoaderScreen';

const MISPage = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [BulkActionShow, setBulkActionShow] = useState(false)
    const [activeTab, setActiveTab] = useState("ScheduledReportsMIS");
    const [selectedOption, setSelectedOption] = useState("Domestic");

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
                    <ActivityLogsMIS activeTab={activeTab}setBulkActionShow={setBulkActionShow} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
                </div>

                {/* ShipmentsMIS */}
                <div className={`${activeTab === "ScheduledReportsMIS" ? "d-block" : "d-none"}`}>
                    <ScheduledReportsMIS activeTab={activeTab}setBulkActionShow={setBulkActionShow}  selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
                </div>

                {/* BillingMIS */}
                <div className={`${activeTab === "ReportsMIS" ? "d-block" : "d-none"}`}>
                    <ReportsMIS activeTab={activeTab}setBulkActionShow={setBulkActionShow}  selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
                </div>

                {/* ReturnsMIS */}
                <div className={`${activeTab === "DownloadMIS" ? "d-block" : "d-none"}`}>
                    <DownloadMIS activeTab={activeTab}setBulkActionShow={setBulkActionShow}  selectedRows={selectedRows} setSelectedRows={setSelectedRows}  />
                </div>
                <LoaderScreen loading={loader} />

                {/* <Pagination
                    totalItems={totalItems}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                    setCurrentPage={setCurrentPage}
                /> */}
            </div>
        </>
    )
}

export default MISPage