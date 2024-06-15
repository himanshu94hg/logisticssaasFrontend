import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import OrdersTableMIS from './Components/OrdersTableMIS';
import ShippingTableMIS from './Components/ShippingTableMIS';
import Swal from 'sweetalert2';
import BillingTableMIS from './Components/BillingTableMIS/BillingTableMIS';
import ReturnsTableMIS from './Components/ReturnsTableMIS';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useSelector } from 'react-redux';
import Pagination from '../../../../common/Pagination/Pagination';
import BulkActionsComponent from '../BulkActionsComponent';
import AWBTrackingPage from '../../../AWBTrackingPage/AWBTrackingPage';

const ReportsMIS = ({ activeTab }) => {
    const dispatch = useDispatch()
    const [showComponent, setShowComponent] = useState(null);
    const [firstSelectedOption, setFirstSelectedOption] = useState(null);
    const [secondSelectedOption, setSecondSelectedOption] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [stateData, setStateData] = useState(false)
    const [stateData1, setStateData1] = useState(new Date())
    const [BulkActionShow, setBulkActionShow] = useState(false)
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [totalItems, setTotalItems] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const { reportsOrderData } = useSelector(state => state?.misSectionReducer)
    const { reportsReturnsData } = useSelector(state => state?.misSectionReducer)
    const { reportShipmentsData } = useSelector(state => state?.misSectionReducer)
    const exportCard = useSelector(state => state?.exportSectionReducer?.exportCard)

    const [bulkFilters, setBulkFilters] = useState({
        type: null,
        subtype: null,
        startDate: null,
        endDate: null
    });

    const orderStatus = {
        "pending": "Pending",
        "shipped": "Shipped",
        "pickup_requested": "Pickup Requested",
        "pickup_scheduled": "Pickup Scheduled",
        "picked_up": "Picked Up",
        "cancelled": "Cancelled",
        "manifested": "Manifested",
        "in_transit": "In Transit",
        "out_for_delivery": "Out for Delivery",
        "rto_initiated": "RTO Initiated",
        "rto_delivered": "RTO Delivered",
        "rto_in_transit": "RTO Transit",
        "delivered": "Delivered",
        "ndr": "NDR",
        "lost": "Lost",
        "damaged": "Damaged",
        "hold": "Hold"
    };



    useEffect(() => {
        if (activeTab) {
            setBulkActionShow(false)
            setSelectedRows([])
            setSelectAll(false)
        }
    }, [activeTab, firstSelectedOption, exportCard, secondSelectedOption])

    const firstOptions = [
        { value: '', label: 'Select Option' },
        { value: 'Orders', label: 'Orders' },
        { value: 'Shipment', label: 'Shipment' },
        { value: 'Billing', label: 'Billing' },
        { value: 'Returns', label: 'Returns' },
    ];

    const secondOptionsMap = {
        Orders: [
            { value: '', label: 'Select Option' },
            { value: 'all_orders', label: 'All' },
            { value: 'processing_orders', label: 'Processing Order' },
            { value: 'shipped_orders', label: 'Shipped Order' },
            { value: 'delivered_orders', label: 'Delivered Order' },
            { value: 'picked_orders', label: 'Picked Orders' },
            { value: 'archive_orders', label: 'Archive Orders' },
        ],
        Shipment: [
            { value: '', label: 'Select Option' },
            { value: 'all_ndr', label: 'All NDR' },
            { value: 'ndr_delivered', label: 'NDR Delivered' },
            { value: 'rto_report', label: 'RTO Report' },
        ],
        Billing: [
            { value: '', label: 'Select Option' },
            { value: 'shipping_charges', label: 'Shipping Charges' },
            { value: 'weight_reconciliation', label: 'Weight Reconciliation' },
            { value: 'remittance_logs', label: 'Remittance Logs' },
            { value: 'onhold_reconciliation', label: 'Onhold Reconciliation' },
            { value: 'invoices', label: 'Invoices' },
        ],
        Returns: [
            { value: '', label: 'Select Option' },
            { value: 'return_order', label: 'All Return Order' },
            { value: 'reverse_order', label: 'All Reverse Order' },
        ],
    };

    const secondOptions = firstSelectedOption
        ? secondOptionsMap[firstSelectedOption.value]
        : [];

    const handleFirstSelectChange = selectedOption => {
        setFirstSelectedOption(selectedOption);
        setSecondSelectedOption("");
    };

    const handleSecondSelectChange = selectedOption => {
        setSecondSelectedOption(selectedOption);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    useEffect(() => {
        if (showComponent === "Orders" && firstSelectedOption && secondSelectedOption) {
            dispatch({
                type: "MIS_REPORT_ORDERS_ACTION", payload: {
                    sub_type: secondSelectedOption?.value,
                    start_date: moment(startDate).format("YYYY-MM-DD"),
                    end_date: moment(endDate).format("YYYY-MM-DD"),
                    page_size: itemsPerPage,
                    page: currentPage
                }
            })
        } else if (showComponent === "Billing" && firstSelectedOption && secondSelectedOption) {
            dispatch({
                type: "MIS_REPORT_BILLING_ACTION", payload: {
                    sub_type: secondSelectedOption?.value,
                    start_date: moment(startDate).format("YYYY-MM-DD"),
                    end_date: moment(endDate).format("YYYY-MM-DD"),
                    page_size: itemsPerPage,
                    page: currentPage
                }
            })
        } else if (showComponent === "Shipment" && firstSelectedOption && secondSelectedOption) {
            dispatch({
                type: "MIS_REPORT_SHIPMENTS_ACTION", payload: {
                    sub_type: secondSelectedOption?.value,
                    start_date: moment(startDate).format("YYYY-MM-DD"),
                    end_date: moment(endDate).format("YYYY-MM-DD"),
                    page_size: itemsPerPage,
                    page: currentPage
                }
            })
        } else if (showComponent === "Returns" && firstSelectedOption && secondSelectedOption) {
            dispatch({
                type: "MIS_REPORT_RETURNS_ACTION", payload: {
                    sub_type: secondSelectedOption?.value,
                    start_date: moment(startDate).format("YYYY-MM-DD"),
                    end_date: moment(endDate).format("YYYY-MM-DD"),
                    page_size: itemsPerPage,
                    page: currentPage
                }
            })
        }
        // }
    }, [showComponent, stateData1])

    useEffect(() => {
        if (reportsOrderData?.count > 0) {
            dispatch({
                type: "MIS_REPORT_ORDERS_ACTION", payload: {
                    sub_type: secondSelectedOption?.value,
                    start_date: moment(startDate).format("YYYY-MM-DD"),
                    end_date: moment(endDate).format("YYYY-MM-DD"),
                    page_size: itemsPerPage,
                    page: currentPage
                }
            })
        }
    }, [itemsPerPage, currentPage]);

    useEffect(() => {
        if (reportShipmentsData?.count > 0) {
            dispatch({
                type: "MIS_REPORT_SHIPMENTS_ACTION", payload: {
                    sub_type: secondSelectedOption?.value,
                    start_date: moment(startDate).format("YYYY-MM-DD"),
                    end_date: moment(endDate).format("YYYY-MM-DD"),
                    page_size: itemsPerPage,
                    page: currentPage
                }
            })
        }
    }, [itemsPerPage, currentPage]);

    useEffect(() => {
        if (reportsReturnsData?.count > 0) {
            dispatch({
                type: "MIS_REPORT_RETURNS_ACTION", payload: {
                    sub_type: secondSelectedOption?.value,
                    start_date: moment(startDate).format("YYYY-MM-DD"),
                    end_date: moment(endDate).format("YYYY-MM-DD"),
                    page_size: itemsPerPage,
                    page: currentPage
                }
            })
        }
    }, [itemsPerPage, currentPage]);

    // Handle form submit
    const handleSubmit = e => {
        e.preventDefault();
        setStateData(true)
        setStateData1(new Date())
        if (firstSelectedOption && secondSelectedOption) {
            setShowComponent(firstSelectedOption.value);
            setBulkFilters({
                type: firstSelectedOption.value,
                subtype: secondSelectedOption.value,
                startDate: startDate,
                endDate: endDate
            });
        } else if (!firstSelectedOption) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please Select Type to create report',
            });
        } else if (!secondSelectedOption) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please Select Subtype to create report',
            });
        }
    };
    const handleKeyDown = (e) => {
        const allowedCharacters = /[0-9/]/;
        if (e.key === 'Backspace' || e.key === 'Delete') {
            return;
        }
        if (!allowedCharacters.test(e.key)) {
            e.preventDefault();
        }
    }

    const [orderTracking, setOrderTracking] = useState(false)
    const [awbNo, setAwbNo] = useState(null)




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
                                options={firstOptions}
                                placeholder="Select an option"
                            />
                        </label>
                        <label>
                            subtype
                            <Select
                                value={secondSelectedOption}
                                onChange={handleSecondSelectChange}
                                options={secondOptions}
                                placeholder="Select a suboption"
                                isDisabled={!firstSelectedOption}
                            />
                        </label>
                        <label>
                            From Date
                            <div className='date-picker-container'>
                                <FontAwesomeIcon icon={faCalendarAlt} className='calendar-icon' />
                                {/* <DatePicker
                                    dateFormat='dd/MM/yyyy'
                                    className='input-field'
                                /> */}
                                <DatePicker
                                    maxDate={new Date()}
                                    selected={startDate}
                                    dateFormat='dd/MM/yyyy'
                                    className='input-field'
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
                                    selected={endDate}
                                    maxDate={new Date()}
                                    dateFormat='dd/MM/yyyy'
                                    className='input-field'
                                    onKeyDown={(e) => handleKeyDown(e)}
                                    onChange={handleEndDateChange}
                                />
                            </div>
                        </label>
                        <button onClick={handleSubmit} className='btn main-button'>Search</button>

                    </div>

                </div>
                <div className='table-container'>
                    {showComponent !== null && (
                        showComponent === 'Orders' ? (
                            <OrdersTableMIS
                                subType={secondSelectedOption.value}
                                startDate={startDate}
                                endDate={endDate}
                                selectAll={selectAll}
                                setSelectAll={setSelectAll}
                                selectedRows={selectedRows}
                                setStateData={setStateData}
                                setTotalItems={setTotalItems}
                                BulkActionShow={BulkActionShow}
                                setSelectedRows={setSelectedRows}
                                setBulkActionShow={setBulkActionShow}
                                setAwbNo={setAwbNo}
                                setOrderTracking={setOrderTracking}
                                orderStatus={orderStatus}
                            />
                        ) : showComponent === 'Shipment' ? (
                            <ShippingTableMIS
                                subType={secondSelectedOption.value}
                                startDate={startDate}
                                endDate={endDate}
                                selectAll={selectAll}
                                setSelectAll={setSelectAll}
                                setTotalItems={setTotalItems}
                                BulkActionShow={BulkActionShow}
                                selectedRows={selectedRows}
                                setBulkActionShow={setBulkActionShow}
                                setSelectedRows={setSelectedRows}
                                setAwbNo={setAwbNo}
                                setOrderTracking={setOrderTracking}
                                orderStatus={orderStatus}
                            />
                        ) : showComponent === 'Billing' ? (
                            <BillingTableMIS
                                subType={secondSelectedOption.value}
                                startDate={startDate}
                                endDate={endDate}
                                selectAll={selectAll}
                                setSelectAll={setSelectAll}
                                setTotalItems={setTotalItems}
                                BulkActionShow={BulkActionShow}
                                setBulkActionShow={setBulkActionShow}
                                selectedRows={selectedRows}
                                setSelectedRows={setSelectedRows}
                                setAwbNo={setAwbNo}
                                setOrderTracking={setOrderTracking}
                                orderStatus={orderStatus}
                            />
                        ) : showComponent === 'Returns' ? (
                            <ReturnsTableMIS
                                subType={secondSelectedOption.value}
                                startDate={startDate}
                                endDate={endDate}
                                selectAll={selectAll}
                                setSelectAll={setSelectAll}
                                setTotalItems={setTotalItems}
                                BulkActionShow={BulkActionShow}
                                setBulkActionShow={setBulkActionShow}
                                selectedRows={selectedRows}
                                setSelectedRows={setSelectedRows}
                                setAwbNo={setAwbNo}
                                setOrderTracking={setOrderTracking}
                                orderStatus={orderStatus}
                            />
                        ) : ''
                    )}
                </div>
            </div>

            <Pagination
                totalItems={totalItems}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                setCurrentPage={setCurrentPage}
            />
            {BulkActionShow && (
                <BulkActionsComponent
                    activeTab={activeTab}
                    selectedRows={selectedRows}
                    firstOptions={firstOptions}
                    setSelectedRows={setSelectedRows}
                    setBulkActionShow={setBulkActionShow}
                    type={bulkFilters.type}
                    subtype={bulkFilters.subtype}
                    startDate={bulkFilters.startDate}
                    endDate={bulkFilters.endDate}
                />
            )
            }
            <section className={`awb-tracking-slider ${orderTracking && 'open'}`}>
                <AWBTrackingPage setOrderTracking={setOrderTracking} orderTracking={orderTracking} awbNo={awbNo} />
            </section>
            <div onClick={() => setOrderTracking(false)} className={`backdrop ${!orderTracking && 'd-none'}`}></div>
        </section>
    );
};

export default ReportsMIS;
