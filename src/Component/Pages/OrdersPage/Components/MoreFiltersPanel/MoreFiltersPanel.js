import { faCalendarAlt, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import './MoreFiltersPanel.css'

const SourceOptions = [
    { label: "Amazon_IN", value: "Amazon_IN" },
    { label: "Custom", value: "Custom" },
    { label: "Shopify", value: "Shopify", disabled: true },
    // Add more options as needed
];

const OrderStatus = [
    { label: "Pending", value: "" },
    { label: "Shipped", value: "" },
    { label: "Ready to Ship", value: "" },
    // Add more options as needed
];

const paymentOptions = [
    { label: "Prepaid", value: "Prepaid" },
    { label: "COD", value: "cod" },
    // Add more options as needed
];

const PickupAddresses = [
    { label: "Adress 1", value: "Adress1" },
    // Add more options as needed
];

const Ordertags = [
    { label: "Tag 1", value: "Tag1" },
    // Add more options as needed
];

const CourierPartner = [
    { label: "Courier 1", value: "Courier1" },
    // Add more options as needed
];


const MoreFiltersPanel = ({ MoreFilters, CloseSidePanel }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [SaveFilter, setSaveFilter] = useState(false)

    const handleCheckboxChange = () => {
        setSaveFilter(prevState => !prevState);
    };

    const handleSubmit = e => {
        e.preventDefault();
    };

    const handleChange = (e) => {
        console.log(e, "this is a dummay data")
    }

    const handleReset = () => {
        setStartDate(null);
        setEndDate(null);
        setName('');
        setLocation('');
    };

    const [filterParams, setFilterParams] = useState({
        start_date:"",
        end_date:"",
        
    })

    return (
        <>
            <div id='sidePanel' className={`side-panel morefilters-panel ${MoreFilters ? 'open' : ''}`}>
                <div id='sidepanel-closer' onClick={CloseSidePanel}>
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
                                <label>
                                    Start Date
                                    <div className="date-picker-container">
                                        <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
                                        <DatePicker
                                            dateFormat='dd/MM/yyyy'
                                            className='input-field'
                                            onChange={(e) => handleChange(e, "start_date")}
                                        />
                                    </div>
                                </label>
                                <label>
                                    End Date
                                    <div className="date-picker-container">
                                        <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
                                        <DatePicker
                                            dateFormat='dd/MM/yyyy'
                                            className='input-field'
                                            onChange={(e) => handleChange(e, "end_date")}

                                        />
                                    </div>
                                </label>
                            </div>
                            <div className='filter-row'>
                                <label >Order Status
                                    <Select
                                        options={OrderStatus}
                                        isMulti
                                        isSearchable
                                        onChange={(e) => handleChange(e, "status")}

                                    />
                                </label>
                            </div>
                            <div className='filter-row'>
                                <label >Order Source
                                    <Select
                                        options={SourceOptions}
                                        // defaultValue={SourceOptions}
                                        onChange={(e) => handleChange(e, "order_source")}
                                        isMulti
                                        isSearchable

                                    />
                                </label>
                            </div>
                            <div className='filter-row'>
                                <label>Courier Partner
                                    <Select
                                        options={CourierPartner}
                                        onChange={(e) => handleChange(e, "courier_partner")}
                                        isMulti
                                        isSearchable
                                    />
                                </label>
                            </div>
                            <div className='filter-row'>
                                <label>Payment Option
                                    <Select
                                        options={paymentOptions}
                                        onChange={(e) => handleChange(e, "payment_type")}
                                    />
                                </label>
                            </div>
                            <div className='filter-row'>
                                <label>Pickup Address
                                    <Select
                                        options={PickupAddresses}
                                    />
                                </label>
                            </div>
                            <div className='filter-row'>
                                <label>Order Tag
                                    <Select
                                        options={Ordertags}
                                        onChange={(e) => handleChange(e, "courier_partner")}
                                        isMulti
                                        isSearchable
                                    />
                                </label>
                            </div>
                            <div className='filter-row'>
                                <label>Search Multiple Order Ids
                                    <input
                                        className='input-field'
                                        type="text"
                                        placeholder='Enter Order ID comma separated'
                                        onChange={(e) => handleChange(e, "order_id")}
                                    />
                                </label>
                            </div>
                            <div className='filter-row'>
                                <label>SKU
                                    <input
                                        className='input-field'
                                        type="text"
                                        placeholder='Enter SKU'
                                        // onChange={(e) => handleChange(e, "order_id")}
                                    />
                                </label>
                            </div>
                            <div className='filter-row sku-checkbox'>
                                <label>
                                    Single SKU
                                    <input type="radio" name="skuType" id="" />
                                </label>
                                <label>
                                    Multi SKU
                                    <input type="radio" name="skuType" id="" />
                                </label>
                                <label>
                                    Match Exact
                                    <input type="radio" name="skuType" id="" />
                                </label>
                            </div>
                        </div>
                        <div className='more-filters-footer'>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={SaveFilter}
                                    onChange={handleCheckboxChange}
                                />
                                {!SaveFilter ? 'Save Filter' : (
                                    <input className='input-field filter-name-ip' type="text" placeholder='Enter name for filter' />
                                )}
                            </label>
                            <div>
                                <button className='btn seconadary-button' type="button" onClick={handleReset}>
                                    Reset
                                </button>
                                <button className='btn main-button ms-3' type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </>
    )
}

export default MoreFiltersPanel