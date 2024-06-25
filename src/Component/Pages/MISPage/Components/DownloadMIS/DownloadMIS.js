import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import Pagination from '../../../../common/Pagination/Pagination';
import { FiDownload } from "react-icons/fi";
import { RxReset } from 'react-icons/rx';
import { BASE_URL_ORDER } from '../../../../../axios/config';
import { customErrorFunction } from '../../../../../customFunction/errorHandling';
import NoData from '../../../../common/noData';
import { debounce } from 'lodash';
import CustomTooltip from '../../../../common/CustomTooltip/CustomTooltip';

const DownloadMIS = ({ activeTab }) => {
    const dispatch = useDispatch();
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const { misDownloadData } = useSelector(state => state?.misSectionReducer);
    const [searchValue, setSearchValue] = useState("");
    const [misDownload, setmisDownload] = useState([]);
    const authToken = Cookies.get("access_token");

    const [totalItems, setTotalItems] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);


    useEffect(() => {
        dispatch({ type: "MIS_DOWNLOAD_ACTION", payload: { itemsPerPage, currentPage } });
    }, [dispatch, activeTab, itemsPerPage, currentPage]);

    const handleClick = () => {
        dispatch({ type: "MIS_DOWNLOAD_ACTION", payload: { "itemsPerPage": itemsPerPage, "currentPage": currentPage } })
        if (misDownloadData) {
            toast.success("Data refreshed successfully!")
        }
    }

    const debouncedHandleClick = useCallback(
        debounce((param) => handleClick(param), 1000),
        []
    );

    const handleRefresh = (orderId) => {
        debouncedHandleClick(orderId);
    };




    useEffect(() => {
        if (misDownloadData?.results !== null && misDownloadData !== undefined) {
            setmisDownload(misDownloadData?.results);
            setTotalItems(misDownloadData?.count);
        }
    }, [misDownloadData]);

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(misDownload?.map(row => row.id));
        } else {
            setSelectedRows([]);
        }
    };

    const handleSelectRow = (orderId) => {
        const isSelected = selectedRows.includes(orderId);
        if (isSelected) {
            setSelectedRows(selectedRows.filter(id => id !== orderId));
        } else {
            setSelectedRows([...selectedRows, orderId]);
        }
        if (selectedRows.length === misDownload.length - 1 && isSelected) {
            setSelectAll(false);
        } else {
            setSelectAll(false);
        }
    };

    const handleSearch = () => {
        axios.get(`${BASE_URL_ORDER}/orders-api/mis/downloads/?q=${searchValue}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        }).then(response => {
            setmisDownload(response.data.results);
        }).catch(error => {
            customErrorFunction(error);
        });
    };

    useEffect(() => {
        if (activeTab) {
            setSearchValue("");
        }
    }, [activeTab]);

    const handleReset = () => {
        setSearchValue("");
        setItemsPerPage(20);
        setmisDownload(misDownloadData?.results);
    };

    const handleDownload = (url, filename) => {
        if (!url) {
            toast.error("File download URL is not available or the report is still pending.");
            return;
        }

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/pdf',
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.blob();
                } else {
                    throw new Error('Failed to download file');
                }
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <section className='position-relative downloads-mis'>
            <div className="position-relative">
                <div className="box-shadow shadow-sm p7 mb-3 filter-container">
                    <div className="search-container">
                        <label style={{ width: '500px' }}>
                            <input className='input-field' type="text" placeholder="Search your downloads" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                            <button onClick={handleSearch}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </label>
                        <button className='btn main-button-outline' onClick={() => handleReset()}><RxReset className='align-text-bottom' /> Reset</button>
                        <button className='btn main-button-outline' onClick={() => handleRefresh()}> Refresh</button>
                    </div>
                </div>
                <div className='table-container'>
                    <table className="w-100">
                        <thead className="sticky-header">
                            <tr className="table-row box-shadow">
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
                                        <td>
                                            <div className='cell-inside-box'>
                                                {row.report_title}
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                {row.report_type}
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                {row.report_status}
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                {moment(row.created_at).format("DD MMM YYYY, hh:mm:ss A")}
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                {row.finished_at ? moment(row.finished_at).format("DD MMM YYYY, hh:mm:ss A") : 'N/A'}
                                            </div>
                                        </td>
                                        <td>
                                            {row.report_status.toLowerCase() === "success" ? (
                                                <CustomTooltip
                                                    triggerComponent={<button className='btn download-button' onClick={() => handleDownload(row.report_download_url, row.report_title)}>
                                                        <FiDownload />
                                                    </button>}
                                                    tooltipComponent="Download"
                                                    addClassName='downlaod-tooltip'
                                                />

                                            ) : (
                                                null
                                            )}
                                        </td>


                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                    {misDownload?.length === 0 && <NoData />}
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
