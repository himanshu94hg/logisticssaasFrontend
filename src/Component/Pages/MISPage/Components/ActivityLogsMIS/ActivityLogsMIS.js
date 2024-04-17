import React, { useState, useRef, useEffect } from 'react';
import { faCalendarAlt, faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Pagination from '../../../../common/Pagination/Pagination';

const ActivityLogsMIS = ({activeTab}) => {
    const dispatch=useDispatch();
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [firstSelectedOption, setFirstSelectedOption] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [activitylog, setActivitylog] = useState([]);

    const [totalItems, setTotalItems] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);


    const {activitiesLog}=useSelector(state=>state?.misSectionReducer)

    console.log(activitiesLog?.results,"activitiesLogactivitiesLog")

    const TypeOptions = [
        { value: '', label: 'Select Type' },
        { value: 'Orders Import', label: 'Orders Import' },
        { value: 'Channel Fetch Orders', label: 'Channel Fetch Orders' },
        { value: 'Bulk Assign', label: 'Bulk Assign' },
        { value: 'Bulk Pickup', label: 'Bulk Pickup' },
        { value: 'Channel Catalog', label: 'Channel Catalog' },
        { value: 'Master Catalog', label: 'Master Catalog' },
        { value: 'Bulk Invoice', label: 'Bulk Invoice' },
        { value: 'Bulk Label', label: 'Bulk Label' },
        { value: 'Bulk Manifest', label: 'Bulk Manifest' },
        { value: 'Refund Import', label: 'Refund Import' },
        { value: 'Bulk Reassign', label: 'Bulk Reassign' },
        { value: 'NDR Escalation', label: 'NDR Escalation' },
        { value: 'Bulk Order', label: 'Bulk Order' },
        { value: 'Bulk POD', label: 'Bulk POD' },
        { value: 'ONDC', label: 'ONDC' },
        { value: 'Bulk Reassign', label: 'Bulk Reassign' },
    ];

    const handleFirstSelectChange = selectedOption => {
        setFirstSelectedOption(selectedOption);
    };

    // Handle date picker change
    const handleStartDateChange = date => {
        setStartDate(date);
    };

    const handleEndDateChange = date => {
        setEndDate(date);
    };

    const [orders, setAllOrders] = useState([
        {
            id: 1,
            activity: 'Orders Import',
            start_time: '28 Feb 2024 || 12:44',
            end_time: '28 Feb 2024 || 12:44',
            imported: '10',
            error_count: '4',
            total_count: '14'
        },
        {
            id: 2,
            activity: 'Orders Import',
            start_time: '28 Feb 2024 || 12:44',
            end_time: '28 Feb 2024 || 12:44',
            imported: '10',
            error_count: '4',
            total_count: '14'
        },
        // Add more dummy data as needed
    ]);

    // Handler for "Select All" checkbox
    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(activitylog.map(row => row.id));
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
        if (selectedRows.length === orders.length - 1 && isSelected) {
            setSelectAll(false);
        } else {
            setSelectAll(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (activeTab === "ActivityLogsMIS" && firstSelectedOption && startDate && endDate) {
            await dispatch({
                type: "MIS_ACTIVITIES_LOG_ACTION",
                payload: {
                    from_date: "2023-04-09",
                    to_date: "2024-04-11",
                    page_size: itemsPerPage,
                    page: currentPage
                }
            });
    
            setActivitylog(activitiesLog?.results);
            setTotalItems(activitiesLog?.count);
        }
    };

    useEffect(() => {
        if (activeTab === "ActivityLogsMIS" && firstSelectedOption && startDate && endDate) {
            dispatch({
                type: "MIS_ACTIVITIES_LOG_ACTION",
                payload: {
                    from_date: "2023-04-09",
                    to_date: "2024-04-11",
                    page_size: itemsPerPage,
                    page: currentPage
                }
            });
            setActivitylog(activitiesLog?.results);
        }
    }, [itemsPerPage, currentPage]);
    

    useEffect(()=>{
        if(activitiesLog?.results !== null)
        {
            setActivitylog(activitiesLog?.results)
            setTotalItems(activitiesLog?.count)
        }
    },[activitiesLog])
    const handleKeyDown = (e) => {
        const allowedCharacters = /[0-9/]/;
        if (e.key === 'Backspace' || e.key === 'Delete') {
          return;
        }
        if (!allowedCharacters.test(e.key)) {
          e.preventDefault();
        }
      }

    return (
        <section className='position-relative reports-mis'>
            <div className="position-relative">
                <div className="box-shadow shadow-sm p7 mb-3 filter-container">
                    <div className="search-container">
                        <label>
                            Type
                            <Select
                                value={firstSelectedOption}
                                onChange={handleFirstSelectChange}
                                options={TypeOptions}
                                placeholder="Select an option"
                            />
                        </label>

                        <label>
                            From Date
                            <div className='date-picker-container'>
                                <FontAwesomeIcon icon={faCalendarAlt} className='calendar-icon' />
                                <DatePicker
                                    dateFormat='dd/MM/yyyy'
                                    className='input-field'
                                    selected={startDate}
                                    onKeyDown={(e) => handleKeyDown(e)}
                                    onChange={handleStartDateChange}
                                />
                            </div>
                        </label>
                        <label>
                            To Date
                            <div className='date-picker-container'>
                                <FontAwesomeIcon icon={faCalendarAlt} className='calendar-icon' />
                                <DatePicker
                                    dateFormat='dd/MM/yyyy'
                                    className='input-field'
                                    selected={endDate}
                                    onKeyDown={(e) => handleKeyDown(e)}
                                    onChange={handleEndDateChange}
                                />
                            </div>
                        </label>
                        <button onClick={handleSubmit}  className='btn main-button'>Search</button>
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
                                <th style={{ width: '25%' }}>Activity</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Imported</th>
                                <th>Error Count</th>
                                <th>Total Count</th>
                                <th>Remarks</th>
                                <th>Error Report</th>
                            </tr>
                            <tr className="blank-row"><td></td></tr>
                        </thead>
                        <tbody>
                            {activitylog?.map((row, index) => (
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
                                            {/* Activity */}
                                            <div className='cell-inside-box'>
                                                {row?.action_type}
                                            </div>
                                        </td>
                                        <td>
                                            {/* Start Time */}
                                            <div className='cell-inside-box'>
                                                {moment(row.action_time).format("DD MMM YYYY")}
                                            </div>
                                        </td>
                                        <td>
                                            {/* End Time */}
                                            <div className='cell-inside-box'>
                                                {row.end_time}
                                            </div>
                                        </td>
                                        <td>
                                            {/* Imported */}
                                            <div className='cell-inside-box'>
                                                {row.imported}
                                            </div>
                                        </td>
                                        <td>
                                            {/* Error Count */}
                                            <div className='cell-inside-box'>
                                                {row.error_count}
                                            </div>
                                        </td>
                                        <td>
                                            {/* Total Count */}
                                            <div className='cell-inside-box'>
                                                {row.total_count}
                                            </div>
                                        </td>
                                        <td>
                                            {/* Total Count */}
                                            <div className='cell-inside-box'>
                                                {row?.remarks}
                                            </div>
                                        </td>
                                        <td>
                                            {/* Error Report */}
                                            <button className='btn main-button'><FontAwesomeIcon icon={faDownload} /></button>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Pagination
                    totalItems={totalItems}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                    setCurrentPage={setCurrentPage}
                />
        </section>
    );
};

export default ActivityLogsMIS;
