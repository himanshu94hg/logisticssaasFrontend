import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Switch from 'react-switch';
import './SidePanel.css'

const CustomDatePicker = ({ selectedDate, onChange }) => {
    return (
        <DatePicker
            selected={selectedDate}
            onChange={date => onChange(date)}
            dateFormat="yyyy-MM-dd"
        />
    );
};

const SidePanel = (props) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [paymentOption, setPaymentOption] = useState('');

    const handlePaymentOptionChange = (e) => {
        setPaymentOption(e.target.value);
    };

    const handleStartDateChange = date => {
        setStartDate(date);
    };

    const handleEndDateChange = date => {
        setEndDate(date);
    };

    const handleNameChange = e => {
        setName(e.target.value);
    };

    const handleLocationChange = e => {
        setLocation(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log('Filter submitted:', { startDate, endDate, name, location });
        // Add your custom form submission logic here
    };

    const handleReset = () => {
        setStartDate(null);
        setEndDate(null);
        setName('');
        setLocation('');
    };



    return (
        <>
            <div id='sidePanel' className="side-panel">
                <div id='sidepanel-closer' onClick={props.CloseSidePanel}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
                <section className='sidepanel-header'>
                    <h4>Explore Additional Filters</h4>
                    <p>Fine-Tune Your Search</p>
                </section>
                <section className='sidepanel-body'>
                    <form onSubmit={handleSubmit}>
                        <div className="form-input-fields">
                            <div className='filter-row'>
                                <label htmlFor="startDate">Start Date:
                                    <CustomDatePicker selectedDate={startDate} onChange={handleStartDateChange} />
                                </label>
                                <label htmlFor="endDate">End Date:
                                    <CustomDatePicker selectedDate={endDate} onChange={handleEndDateChange} />
                                </label>
                            </div>
                            <div className='filter-row'>
                                <label htmlFor="paymentOption">Payment Option:</label>
                                <select
                                    id="paymentOption"
                                    value={paymentOption}
                                    onChange={handlePaymentOptionChange}
                                >
                                    <option value="">Select Payment Option</option>
                                    <option value="Cash on Delivery">Cash on Delivery</option>
                                    <option value="Prepaid">Prepaid</option>
                                    {/* Add more options as needed */}
                                </select>
                            </div>
                            <div className='filter-row'>
                                <label htmlFor="name">Order Source
                                    <input type="text" id="name" value={name} onChange={handleNameChange} />
                                </label>
                            </div>
                            <div className='filter-row'>
                                <label htmlFor="location">Store Name
                                    <input type="text" id="location" value={location} onChange={handleLocationChange} />
                                </label>
                            </div>
                            <div className='filter-row'>
                                <label htmlFor="location">Channel
                                    <input type="text" id="location" value={location} onChange={handleLocationChange} />
                                </label>
                            </div>
                            <div className='filter-row'>
                                <label htmlFor="location">Order ID
                                    <input type="text" id="location" value={location} onChange={handleLocationChange} />
                                </label>
                            </div>
                            <div className='filter-row'>
                                <label htmlFor="location">Payment
                                    <input type="text" id="location" value={location} onChange={handleLocationChange} />
                                </label>
                            </div>
                            <div className='filter-row'>
                                <label htmlFor="location">Status
                                    <input type="text" id="location" value={location} onChange={handleLocationChange} />
                                </label>
                            </div>
                            <div className='filter-row'>
                                <label htmlFor="location">Product
                                    <input type="text" id="location" value={location} onChange={handleLocationChange} />
                                </label>
                            </div>
                        </div>
                        <div className='advanced-filter-footer text-end'>
                            <button className='btn seconadary-button' type="button" onClick={handleReset}>
                                Reset
                            </button>
                            <button className='btn main-button ms-3' type="submit">Submit</button>
                        </div>
                    </form>
                </section>
            </div>
        </>
    )
}

export default SidePanel