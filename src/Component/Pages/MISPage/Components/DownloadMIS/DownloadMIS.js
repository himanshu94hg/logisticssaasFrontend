import React, { useState, useEffect } from 'react';
import SearchIcon from '../../../../../assets/image/icons/search-icon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import Pagination from '../../../../common/Pagination/Pagination';
import { RxReset } from 'react-icons/rx';
import { BASE_URL_ORDER } from '../../../../../axios/config';
import { customErrorFunction } from '../../../../../customFunction/errorHandling';

const DownloadMIS = ({ activeTab }) => {
    const dispatch = useDispatch()
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const { misDownloadData } = useSelector(state => state?.misSectionReducer)
    const [searchValue, setSearchValue] = useState("")
    const [misDownload, setmisDownload] = useState([]);
    let authToken = Cookies.get("access_token")

    const [totalItems, setTotalItems] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);

    useEffect(() => {
        dispatch({ type: "MIS_DOWNLOAD_ACTION", payload: { "itemsPerPage": itemsPerPage, "currentPage": currentPage } })
    }, [dispatch, activeTab, itemsPerPage, currentPage])

    const handleRefresh=()=>{
        dispatch({ type: "MIS_DOWNLOAD_ACTION", payload: { "itemsPerPage": itemsPerPage, "currentPage": currentPage } })
    }

    useEffect(() => {
        if (misDownloadData?.results !== null && misDownloadData !== undefined) {
            setmisDownload(misDownloadData?.results)
            setTotalItems(misDownloadData?.count)
        }
    }, [misDownloadData])

    const [orders, setAllOrders] = useState([
        {
            id: 1,
            name: 'Bulk Labels',
            type: 'Label',
            status: 'In Progress',
            requested_date: '24 Mar 2024',
            completed_date: '',
            d_file: 'labels.pdf'
        },
        {
            id: 2,
            name: 'Bulk invoice',
            type: 'Invoice',
            status: 'Done',
            requested_date: '24 Mar 2024',
            completed_date: '24 Mar 2024',
            d_file: 'invoice.pdf'
        }
        // Add more dummy data as needed
    ]);

    // Handler for "Select All" checkbox
    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(misDownload?.map(row => row.id));
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
        if (selectedRows.length === misDownload.length - 1 && isSelected) {
            setSelectAll(false);
        } else {
            setSelectAll(false);
        }
    };

    const handleSearch = () => {
        axios.get(`${BASE_URL_ORDER}/orders-api/mis/downloads/?q=${searchValue}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        }).then(response => {
            console.log(response, "this is response")
            setmisDownload(response.data.results)
            // setSearchValue("")
        })
            .catch(error => {
                customErrorFunction(error)
            });
    };

    useEffect(() => {
        if (activeTab) {
            setSearchValue("");
        }
    }, [activeTab])

    const handleReset = () => {
        setSearchValue("")
        setItemsPerPage(20)
        setmisDownload(misDownloadData?.results)
    }

    return (
        <section className='position-relative downloads-mis'>
            <div className="position-relative">
                <div className="box-shadow shadow-sm p7 mb-3 filter-container">
                    <div className="search-container">
                        <label style={{ width: '500px' }}>
                            <input className='input-field' type="text" placeholder="Search your downloads" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                            <button onClick={() => handleSearch()}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </label>
                        <button className='btn main-button-outline' onClick={() => handleReset()}><RxReset className='align-text-bottom' /> Reset</button>
                        <button className='btn main-button-outline' onClick={() => handleRefresh()}> Refresh</button>
                    </div>
                   
                </div>
                <div className='table-container'>
                    <table className=" w-100">
                        <thead className="sticky-header">
                            <tr className="table-row box-shadow">
                                {/*<th style={{ width: '1%' }}>
                                    <input
                                        type="checkbox"
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                    />
    </th>*/}
                                <th style={{ width: '25%' }}>Name</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Request Date</th>
                                <th>Completed Date</th>
                                <th>Action</th>
                            </tr>
                            <tr className="blank-row"><td></td></tr>
                        </thead>
                        <tbody>
                            {misDownload?.map((row, index) => (
                                <React.Fragment key={row.id}>
                                    {index > 0 && <tr className="blank-row"><td></td></tr>}
                                    <tr className='table-row box-shadow'>
                                        {/*<td className='checkbox-cell'>
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(row.id)}
                                                onChange={() => handleSelectRow(row.id)}
                                            />
                            </td>*/}
                                        <td>
                                            {/* Name */}
                                            <div className='cell-inside-box'>
                                                {row.report_title}
                                            </div>
                                        </td>
                                        <td>
                                            {/* Type */}
                                            <div className='cell-inside-box'>
                                                {row.report_type}
                                            </div>
                                        </td>
                                        <td>
                                            {/* Status */}
                                            <div className='cell-inside-box'>
                                                {row.report_status}
                                            </div>
                                        </td>
                                        <td>
                                            {/* Request Date */}
                                            <div className='cell-inside-box'>
                                                {moment(row.requested_at).format("DD MMM YYYY")}
                                            </div>
                                        </td>
                                        <td>
                                            {/* Completed Date */}
                                            <div className='cell-inside-box'>
                                                {moment(row.completed_at).format("DD MMM YYYY")}
                                            </div>
                                        </td>
                                        <td>
                                            {/* Action */}
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

export default DownloadMIS;
