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
    const [showInactive, setShowInactive] = useState(false);
    const [showArchived, setShowArchived] = useState(false);

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

    const handleShowInactiveToggle = checked => {
        setShowInactive(checked);
    };

    const handleShowArchivedToggle = checked => {
        setShowArchived(checked);
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log('Filter submitted:', { startDate, endDate, name, location, showInactive, showArchived });
        // Add your custom form submission logic here
    };

    const handleReset = () => {
        setStartDate(null);
        setEndDate(null);
        setName('');
        setLocation('');
        setShowInactive(false);
        setShowArchived(false);
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
                        <div className='filter-row'>
                            <label htmlFor="startDate">Start Date:
                                <CustomDatePicker selectedDate={startDate} onChange={handleStartDateChange} />
                            </label>
                            <label htmlFor="endDate">End Date:
                                <CustomDatePicker selectedDate={endDate} onChange={handleEndDateChange} />
                            </label>
                        </div>
                        <div className='filter-row'>
                            <label>Cash on Delivery
                                <Switch
                                    onChange={handleShowInactiveToggle}
                                    checked={showInactive}
                                />
                            </label>
                            <label>Prepaid
                                <Switch
                                    onChange={handleShowArchivedToggle}
                                    checked={showArchived}
                                />
                            </label>
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
                        <div className='advanced-filter-footer text-end'>
                            <button className='btn main-button' type="button" onClick={handleReset}>
                                Reset
                            </button>
                            <button className='btn main-button' type="submit">Submit</button>
                        </div>
                    </form>
                </section>
            </div>
        </>
    )
}

export default SidePanel