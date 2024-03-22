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
    { label: "Shipped", value: "shipped" },
    { label: "cancelled", value: "cancelled" },
    { label: "Delivered", value: "delivered" },
    { label: "In Transit", value: "in_transit" },
    { label: "Out of Delivery", value: "out_for_delivery" },
    { label: "Pending", value: "pending" },
    { label: "Lost", value: "lost" },
    { label: "Manifested", value: "manifested" },
    { label: "Pickup Scheduled", value: "pickup_scheduled" },
    { label: "RTO Initiated", value: "rto_initiated" },
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

    const handleChange = (name, value) => {
        if (name === "start_date" || name === "end_date") {
            setFilterParams(prev => ({
                ...prev,
                [name]: value
            }));
        }
        if (name === "status") {
            let temp_data = ''
            let temp = value.map((item) => {
                temp_data += item.value + ","
            })
            setFilterParams(prev => ({
                ...prev,
                [name]: temp_data
            }));
        }
        if (name === "order_source") {
            let temp_data = ''
            let temp = value.map((item) => {
                temp_data += item.value + ","
            })
            setFilterParams(prev => ({
                ...prev,
                [name]: temp_data
            }));
        }

    };
    // console.log(temp_data, "fieldNamefieldNamefieldName")



    const handleReset = () => {
        setStartDate(null);
        setEndDate(null);
        setName('');
        setLocation('');
    };

    const [filterParams, setFilterParams] = useState({
        start_date: "",
        end_date: "",
        status: "",
        order_source: "",
        courier_partner: "",
        payment_type: "",
        order_id: ""
    })

    console.log(filterParams, "fieldNamefieldNamefieldName")


    //     channel =
    //     product =
    //     store_name =
    //     save_filter = True / False
    //     filter_name =

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
                                            selected={filterParams.start_date}
                                            onChange={(e) => handleChange("start_date", e)}
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
                                            selected={filterParams.end_date}
                                            onChange={(e) => handleChange("end_date", e)}
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
                                        onChange={(e) => handleChange("status", e)}

                                    />
                                </label>
                            </div>
                            <div className='filter-row'>
                                <label >Order Source
                                    <Select
                                        options={SourceOptions}
                                        // defaultValue={SourceOptions}
                                        onChange={(e) => handleChange("order_source",e)}
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
                                        // onChange={(e) => handleChange(e, "courier_partner")}
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