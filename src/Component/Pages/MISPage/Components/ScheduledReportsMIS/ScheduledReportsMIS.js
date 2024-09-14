import axios from 'axios';
import moment from 'moment';
import Cookies from 'js-cookie';
import { RxReset } from "react-icons/rx";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import NoData from '../../../../common/noData';
import React, { useEffect, useState } from 'react';
import globalDebouncedClick from '../../../../../debounce';
import { BASE_URL_ORDER } from '../../../../../axios/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from '../../../../common/Pagination/Pagination';
import { faDownload, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { customErrorFunction } from '../../../../../customFunction/errorHandling';


const ScheduledReportsMIS = ({ activeTab }) => {
    const dispatch = useDispatch()
    const [reset, setReset] = useState(null)
    let authToken = Cookies.get("access_token")
    const [searchValue, setSearchValue] = useState("")
    const [totalItems, setTotalItems] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [scheduledReport, setscheduledReport] = useState([]);
    const { scheduleReportsData } = useSelector(state => state?.misSectionReducer)

    useEffect(() => {
        if (activeTab === "ScheduledReportsMIS") {
            dispatch({ type: "MIS_SCHEDULED_REPEORTS_ACTION", payload: { "itemsPerPage": itemsPerPage, "currentPage": currentPage } })
        }
    }, [activeTab, reset, currentPage])

    useEffect(() => {
        if (scheduleReportsData?.results !== null && scheduleReportsData !== undefined) {
            setscheduledReport(scheduleReportsData?.results)
            setTotalItems(scheduleReportsData?.count)
        }
    }, [scheduleReportsData])

    const handleSearch = () => {
        axios.get(`${BASE_URL_ORDER}/orders-api/mis/scheduled-reports/?q=${searchValue}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        }).then(response => {
            console.log(response, "this is response")
            setscheduledReport(response?.data?.results)
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
        setscheduledReport(scheduleReportsData?.results)
    }

    const handleSearchKey = (e) => {
        if (e.key === "Enter") {
            handleSearch()
        }
        const allowedCharacters = /^[a-zA-Z0-9\s!@#$%^&*(),.?":{}|<>]*$/;
        if (
            e.key === ' ' &&
            e.target.value.endsWith(' ')
        ) {
            e.preventDefault();
        } else if (!allowedCharacters.test(e.key)) {
            e.preventDefault();
        }
    }

    return (
        <section className='position-relative downloads-mis'>
            <div className="position-relative">
                <div className="box-shadow shadow-sm p7 mb-3 filter-container">
                    <div className="search-container">
                        <label style={{ width: '500px' }}>
                            <input className='input-field'
                                type="text"
                                value={searchValue}
                                placeholder="Search Report Title"
                                onChange={(e) => setSearchValue(e.target.value)}
                                onKeyPress={handleSearchKey}
                            />
                            <button onClick={() => globalDebouncedClick(() => handleSearch())} >
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </label>
                        <button className='btn main-button-outline' onClick={() => handleReset()}><RxReset className='align-text-bottom' /> Reset</button>
                    </div>
                </div>
                <div className='table-container'>
                    <table className=" w-100">
                        <thead className="sticky-header">
                            <tr className="table-row box-shadow">
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
                            {scheduledReport && scheduledReport?.map((row, index) => (
                                <React.Fragment key={row?.id}>
                                    {index > 0 && <tr className="blank-row"><td></td></tr>}
                                    <tr className='table-row box-shadow'>
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
                    {scheduledReport?.length === 0 && <NoData />}
                </div>
                <Pagination
                    setReset={setReset}
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
