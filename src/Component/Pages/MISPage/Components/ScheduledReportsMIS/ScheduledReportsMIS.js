import React, { useEffect, useState } from 'react';
import SearchIcon from '../../../../../assets/image/icons/search-icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import Pagination from '../../../../common/Pagination/Pagination';


const ScheduledReportsMIS = ({activeTab}) => {
    const dispatch=useDispatch()
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const {scheduleReportsData}=useSelector(state=>state?.misSectionReducer)
    const [searchValue, setSearchValue] = useState("")
    const [scheduledReport, setscheduledReport] = useState([]);

    const [totalItems, setTotalItems] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);

    let authToken = Cookies.get("access_token")   


    console.log(scheduleReportsData,"scheduleReportsDatascheduleReportsData")


    useEffect(() => {
        if (activeTab === "ScheduledReportsMIS") {
            dispatch({ type: "MIS_SCHEDULED_REPEORTS_ACTION" })
            setscheduledReport(scheduleReportsData.results)
            setTotalItems(scheduleReportsData.count)
        }
    }, [activeTab])

    // Dummy data
    const dummyData = [
        { id: 1, reportTitle: 'Report 1', reportType: 'Type 1', status: 'Pending', recipients: 'Recipient 1' },
        { id: 2, reportTitle: 'Report 2', reportType: 'Type 2', status: 'Completed', recipients: 'Recipient 2' },
        { id: 3, reportTitle: 'Report 3', reportType: 'Type 1', status: 'Pending', recipients: 'Recipient 3' },
        // Add more dummy data as needed
    ];

    // Handler for "Select All" checkbox
    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(dummyData.map(row => row.id));
        } else {
            setSelectedRows([]);
        }
    };

    // Handler for individual checkbox
    const handleSelectRow = (orderId) => {
        const isSelected = selectedRows.includes(orderId);

        if (isSelected) {
            setSelectedRows(selectedRows.filter(id => id !== orderId));
        } else {
            setSelectedRows([...selectedRows, orderId]);
        }

        // Check if all rows are selected, then select/deselect "Select All"
        if (selectedRows.length === dummyData.length - 1 && isSelected) {
            setSelectAll(false);
        } else {
            setSelectAll(false);
        }
    };
    const handleSearch = () => {  
        axios.get(`https://dev.shipease.in/orders-api/mis/scheduled-reports/?q=${searchValue}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        }).then(response => {
            console.log(response, "this is response")
            setscheduledReport(response.data.results)
            setSearchValue("")
        })
            .catch(error => {
                toast.error("Something went wrong!")
            }); 
};
    
useEffect(() => {
    if (activeTab) {
        setSearchValue("");
    }
}, [activeTab])

    return (
        <section className='position-relative reports-mis downloads-mis'>
            <div className="position-relative">
                <div className="box-shadow shadow-sm p7 mb-3 filter-container">
                    <div className="search-container">
                        <label style={{ width: '500px' }}>
                            <input className='input-field' type="text" placeholder="Search Report Title" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                            <button onClick={() => handleSearch()} >
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </label>
                    </div>
                    <div className='button-container'>
                        <button className='btn main-button'>Export Report</button>
                    </div>
                </div>
                <div className='table-container'>
                    <table className=" w-100">
                        <thead className="sticky-header">
                            <tr className="table-row box-shadow">
                                <th style={{ width: '1%' }}>
                                    <input
                                        type="checkbox"
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th style={{ width: '25%' }}>Report Title</th>
                                <th>Report Type</th>
                                <th>Created</th>
                                <th>Finished</th>
                                <th>Status</th>
                                <th>Recipients</th>
                                <th>Action</th>
                            </tr>
                            <tr className="blank-row"><td></td></tr>
                        </thead>
                        <tbody>
                            {scheduledReport?.map((row, index) => (
                                <React.Fragment key={row.id}>
                                    {index > 0 && <tr className="blank-row"><td></td></tr>}
                                    <tr className='table-row box-shadow'>
                                        <td className='checkbox-cell'>
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(row.id)}
                                                onChange={() => handleSelectRow(row.id)}
                                            />
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                {row?.report_title}
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                {row?.report_type}
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            <div className='cell-inside-box'>
                                                {moment(row?.created_at).format("DD MMM YYYY")}
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            <div className='cell-inside-box'>
                                                {moment(row?.finished_at).format("DD MMM YYYY")}
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            <div className='cell-inside-box'>
                                                {row?.report_status}
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                {row?.recipients}
                                            </div>
                                        </td>
                                        <td>
                                            <button className='btn main-button'><FontAwesomeIcon icon={faDownload} /></button>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    totalItems={totalItems}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </section>
    );
};

export default ScheduledReportsMIS;
