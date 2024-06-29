import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dateRangeDashboard } from '../../../../../customFunction/dateRange';
import NoData from '../../../../common/noData';

const DateFormatter = ({ dateTimeString }) => {
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        const formattedDateTime = formatDateTime(dateTimeString);
        setFormattedDate(formattedDateTime);
    }, [dateTimeString]);

    const formatDateTime = (dateTimeString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };

        const dateObject = new Date(dateTimeString);
        const formattedDateTime = new Intl.DateTimeFormat('en-US', options).format(dateObject);

        return formattedDateTime;
    };

    return <p>{formattedDate}</p>;
};

const RemittanceLogs = ({ billingCard, selectedRows, setSelectedRows, setBulkActionShow }) => {

    const dispatch = useDispatch();
    const [selectAll, setSelectAll] = useState(false);
    // const [selectedRows, setSelectedRows] = useState([]);
    const [backDrop, setBackDrop] = useState(false);
    const [data, setData] = useState([]);
    const [exportButtonClick, setExportButtonClick] = useState(false)
    const exportCard = useSelector(state => state?.billingSectionReducer?.billingShipingRemitanceDOWNLOADCard)
    const { codDetails } = useSelector(state => state?.dashboardOverviewReducer)

    useEffect(() => {
        dispatch({ type: "DASHBOARD_OVERVIEW_COD_DETAILS_ACTION", payload: dateRangeDashboard })
    }, [dispatch]);

    const reasons = [
        { count: 300, data: 207 },
        { count: 446, data: 605 },
        { count: 206, data: 403 },
    ];

    const getRandomCount = (reasons) => {
        const randomIndex = Math.floor(Math.random() * reasons.length);
        return reasons[randomIndex].count;
    };

    const getRandomReason = (reasons) => {
        const randomIndex = Math.floor(Math.random() * reasons.length);
        return reasons[randomIndex].data;
    };


    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(billingCard.map(row => row.id));
            setBulkActionShow(true)
        } else {
            setSelectedRows([]);
            setBulkActionShow(false)
        }
    };

    // Handler for individual checkbox
    const handleSelectRow = (orderId) => {
        const isSelected = selectedRows.includes(orderId);

        if (isSelected) {
            setSelectedRows(selectedRows.filter(id => id !== orderId));
            setBulkActionShow(true)
        } else {
            setSelectedRows([...selectedRows, orderId]);
        }

        if (setSelectedRows !== ([])) {
            setBulkActionShow(true)
        }

        // Check if all rows are selected, then select/deselect "Select All"
        if (selectedRows.length === data.length - 1 && isSelected) {
            setSelectAll(false);
        } else {
            setSelectAll(false);
        }
    };

    const handelExportData = (row) => {
        setExportButtonClick(true);
        dispatch({ type: "BILLING_SHIPING_REMITANCE_DOWNLOAD_DATA_ACTION", payload: row });
    };

    useEffect(() => {
        if (exportButtonClick) {
            var FileSaver = require('file-saver');
            var blob = new Blob([exportCard], { type: 'application/ms-excel' });
            FileSaver.saveAs(blob, `${"Remitance Logs"}.xlsx`);
            setExportButtonClick(false);
        }
    }, [exportCard]);


    // useEffect(() => {
    //   first


    // }, [])


    return (
        <section className='position-relative'>
            <div className="position-relative">
                <div className="mb-3 billing-count-container">
                    <div className='box-shadow shadow-sm count-card'>
                        <p>Total COD:     <span>&#8377; {codDetails?.total_cod || 0}</span></p>
                    </div>
                    <div className='box-shadow shadow-sm count-card'>
                        <p>COD Remitted:     <span>&#8377; {codDetails?.remitted_cod || 0}</span></p>
                    </div>
                    <div className='box-shadow shadow-sm count-card'>
                        <p>COD Pending:     <span>&#8377; {codDetails?.cod_pending || 0}</span></p>
                    </div>
                    <div className='box-shadow shadow-sm count-card'>
                        <p>Next Remittance Date:     <span> {codDetails?.next_remit_date || moment(new Date()).format("DD MMM")}</span></p>
                    </div>
                    <div className='box-shadow shadow-sm count-card'>
                        <p>Next Remit Amount:     <span>&#8377; {codDetails?.next_remit_amount ?? 0}</span></p>
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
                                <th>Date</th>
                                <th>CRF ID</th>
                                <th>UTR</th>
                                <th>Remit Mode</th>
                                <th>Freight Charges from COD</th>
                                <th>Early COD Charges</th>
                                <th>RTO Reversal Amount</th>
                                <th>Remmitance Amount</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                            <tr className="blank-row"><td></td></tr>
                        </thead>
                        <tbody>
                            {billingCard?.map((row, index) => (
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
                                            {/* order detail */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    <span className=''>{`${moment(row?.created_at).format('DD MMM YYYY')} || ${moment(row?.created_at).format('h:mm A')}`}</span>

                                                    {/* {row?.created_at ? <DateFormatter dateTimeString={row.created_at} /> : ''} */}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* crf_id */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    {row?.crf_id}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* AWB Assigned Date */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    {row?.utr_number}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* Shipment Status */}
                                            <div className='cell-inside-box'>
                                                <p className='text-capitalize'>
                                                    {row?.mode}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* Applied Weight Charges */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    ₹ {0.00}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* Excess Weight Charges */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    ₹ {row?.early_cod_charge}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* Entered Weight and dimensions */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    ₹ {0.00}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* Charged Weight and Dimensions */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    ₹ {row?.amount}
                                                </p>
                                            </div>
                                        </td>

                                        <td>
                                            {/* View Transaction Details */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    {row?.description}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* View Transaction Details */}
                                            <div className='cell-inside-box'>
                                                <button className='btn main-button' onClick={() => handelExportData(row.id)}>Export</button>
                                            </div>
                                        </td>

                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                    {billingCard?.length === 0 && <NoData />}

                </div>

            </div>
        </section>
    );
};

export default RemittanceLogs;
