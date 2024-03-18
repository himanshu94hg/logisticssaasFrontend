import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import OrdersTableMIS from './Components/OrdersTableMIS';
import ShippingTableMIS from './Components/ShippingTableMIS';
import Swal from 'sweetalert2';

const ReportsMIS = () => {
    const [showComponent, setShowComponent] = useState(null);
    const [firstSelectedOption, setFirstSelectedOption] = useState(null);
    const [secondSelectedOption, setSecondSelectedOption] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

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
            { value: 'all_order', label: 'All Orders' },
            { value: 'process_order', label: 'Processing Order' },
            { value: 'shipped_order', label: 'Shipped Order' },
            { value: 'manifest_order', label: 'Manifested Order' },
            { value: 'delivered_order', label: 'Delivered Order' },
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
            { value: 'weight_reconciliation', label: 'Weight Reconciliatio' },
            { value: 'remittance_logs', label: 'Remittance Logs' },
            { value: 'onhold_reconciliation', label: 'Onhold Reconciliatio' },
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

    // Handle select change
    const handleFirstSelectChange = selectedOption => {
        setFirstSelectedOption(selectedOption);
        setSecondSelectedOption(null); // Reset second select
    };

    const handleSecondSelectChange = selectedOption => {
        setSecondSelectedOption(selectedOption);
    };

    // Handle date picker change
    const handleStartDateChange = date => {
        setStartDate(date);
    };

    const handleEndDateChange = date => {
        setEndDate(date);
    };

    // Handle form submit
    const handleSubmit = e => {
        e.preventDefault();
        if (firstSelectedOption !== null && secondSelectedOption !== null) {
            setShowComponent(firstSelectedOption.value);
        } else if (firstSelectedOption === null) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please Select Type to create report',
            });
        } else if (secondSelectedOption === null) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please Select Subtype to create report',
            });
        }
    };




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
                                    dateFormat='dd/MM/yyyy'
                                    className='input-field'
                                    selected={startDate}
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
                                    onChange={handleEndDateChange}
                                />
                            </div>
                        </label>
                        <button onClick={handleSubmit} className='btn main-button'>Search</button>
                    </div>
                    <div className='button-container'></div>
                </div>

                {showComponent !== null && ( // Conditional rendering only if showComponent is true and selectOption is truthy
                    showComponent === 'Orders' ? (
                        <OrdersTableMIS
                            subtype={secondSelectedOption.value}
                            startDate={startDate}
                            endDate={endDate}
                        />
                    ) : showComponent === 'Shipment' ? (
                        <ShippingTableMIS
                            subtype={secondSelectedOption.value}
                            startDate={startDate}
                            endDate={endDate}
                        />
                    ) : ''
                )}
            </div>
        </section>
    );
};

export default ReportsMIS;
