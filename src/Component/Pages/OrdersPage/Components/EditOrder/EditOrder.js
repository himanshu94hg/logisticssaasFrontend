import React, { useState } from 'react';
import './EditOrder.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faChevronDown, faChevronRight, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const EditOrder = ({ EditOrderSection, setEditOrderSection }) => {
    const [activeSection, setActiveSection] = useState(1);
    const [orderDate, setOrderDate] = useState(new Date());

    const handleSectionClick = (sectionIndex) => {
        setActiveSection(sectionIndex === activeSection ? null : sectionIndex);
    };

    const handleOrderDateChange = (date) => {
        setOrderDate(date)
    };

    return (
        <>
            <section className={`edit-order-section ${EditOrderSection ? 'open-edit' : ''}`}>
                <div id='sidepanel-closer' onClick={() => setEditOrderSection(false)}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
                <section className='edit-order-header'>
                    <div>
                        <h2 className='mb-1'>#<span className='text-capitalize'>order_14524aq</span></h2>
                        <h5 className='mb-0'>Edit Your Order Details!</h5>
                    </div>
                    <button className='btn main-button' onClick={() => setEditOrderSection(false)}>Update</button>
                </section>
                <section className='edit-order-body'>
                    <form>
                        <AccordionSection
                            title="Order Details"
                            isActive={activeSection === 1}
                            onClick={() => handleSectionClick(1)}
                        >
                            {/* Your Order Details */}
                            <div className='eo-input-container'>
                                <label>
                                    Order Number
                                    <input
                                        type="text"
                                        className="input-field"
                                        placeholder='Enter Customer Order Number'
                                    />
                                </label>
                                <label>
                                    Order Type
                                    <select
                                        className="select-field"
                                    >
                                        <option value="">Select Order Type</option>
                                        <option value="Forward">Forward</option>
                                        <option value="Reverse">Reverse</option>
                                    </select>
                                </label>
                                <label>
                                    Order Date
                                    <div className="date-picker-container">
                                        <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
                                        <DatePicker
                                            selected={orderDate}
                                            onSelect={handleOrderDateChange}
                                            dateFormat='dd/MM/yyyy'
                                            className='input-field'
                                        />
                                    </div>
                                </label>
                                <label>
                                    Payment Type
                                    <select
                                        className="select-field"
                                    >
                                        <option value="">Select Payment Type</option>
                                        <option value="Prepaid">Prepaid</option>
                                        <option value="COD">COD</option>
                                    </select>
                                </label>
                            </div>
                        </AccordionSection>
                        <AccordionSection
                            title="Shipping Details"
                            isActive={activeSection === 2}
                            onClick={() => handleSectionClick(2)}
                        >
                            {/* Your Shipping Details */}
                            <div className="eo-input-container">
                                <label>
                                    Recipient Name
                                    <input
                                        className="input-field"
                                        placeholder='Enter Recipient Name'
                                        type="text" />
                                </label>
                                <label>
                                    Mobile Number
                                    <div className='d-flex mobile-number-field'>
                                        <select
                                            className='input-field '
                                            disabled
                                        >
                                            <option value="+91">+91</option>
                                            {/* Add more country codes as needed */}
                                        </select>
                                        <input
                                            className="input-field"
                                            type="text"
                                            placeholder='X X X X X X X X X X'
                                        />
                                    </div>
                                </label>
                                <label>
                                    Email
                                    <input
                                        className='input-field'
                                        placeholder='i.e. abc@gmail.com'
                                        type="email" />
                                </label>
                                <label>
                                    Company Name
                                    <input
                                        className='input-field'
                                        placeholder='i.e. abc@gmail.com'
                                        type="email" />
                                </label>
                                <label>
                                    Address
                                    <input
                                        className="input-field"
                                        placeholder="House/Floor No. Building Name or Street, Locality"
                                        type="text"
                                    />
                                </label>
                                <label>
                                    Landmark
                                    <input
                                        className="input-field"
                                        placeholder="Any nearby post office, market, Hospital as the landmark"
                                        type="text"
                                    />
                                </label>
                            </div>
                        </AccordionSection>
                        <AccordionSection
                            title="Product Details"
                            isActive={activeSection === 3}
                            onClick={() => handleSectionClick(3)}
                        >
                            {/* Your Product Details fields */}
                            <div className="eo-input-container">
                                <label>
                                    Product Name
                                    <input
                                        className="input-field"
                                        placeholder="Enter your product name"
                                        type="text"
                                    />
                                </label>
                                <label>
                                    Product Category
                                    <select
                                        className='select-field'
                                    >
                                        <option value="">Select</option>
                                        <option value="Arts, Crafts & Sewing">Arts, Crafts & Sewing</option>
                                        <option value="Automotive">Automotive</option>
                                        <option value="Baby Products">Baby Products </option>
                                        <option value="Clothing, Shoes & Jewelry">Clothing, Shoes & Jewelry </option>
                                        <option value="Collectibles & Fine Art">Collectibles & Fine Art </option>
                                        <option value="Electronics">Electronics </option>
                                        <option value="Handmade Products">Handmade Products </option>
                                        <option value="Health & Household">Health & Household</option>
                                        <option value="Home & Kitchen">Home & Kitchen</option>
                                        <option value="Industrial & Scientific">Industrial & Scientific </option>
                                        <option value="Office Products">Office Products </option>
                                        <option value="Patio, Lawn & Garden">Patio, Lawn & Garden</option>
                                        <option value="Pet Supplies">Pet Supplies</option>
                                        <option value="Sports & Outdoors">Sports & Outdoors </option>
                                        <option value="Tools & Home Improvement">Tools & Home Improvement</option>
                                        <option value="Toys & Games">Toys & Games</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </label>
                                <label className='col'>
                                    Unit Price
                                    <input
                                        className='input-field'
                                        placeholder="Enter Unit Price"
                                        type="text"
                                    />
                                </label>
                                <label className='col'>
                                    Quantity
                                    <input
                                        className='input-field'
                                        placeholder="Enter Product Quantity"
                                        type="text"
                                    />
                                </label>
                                <label className='col'>
                                    SKU
                                    <input
                                        className='input-field'
                                        placeholder="Enter SKU"
                                        type="text"
                                    />
                                </label>
                            </div>
                        </AccordionSection>
                        <AccordionSection
                            title="Package Details"
                            isActive={activeSection === 4}
                            onClick={() => handleSectionClick(4)}
                        >
                            {/* Your Package Details fields */}
                            <div className="eo-input-container">
                                <label>
                                    Invoice Amount
                                    <input
                                        className="input-field"
                                        type="text"
                                        placeholder='Enter invoice amount'
                                    />
                                </label>
                                <label>
                                    COD Charges
                                    <input
                                        className="input-field"
                                        type="text"
                                        placeholder='Enter COD charges'
                                    />
                                </label>
                                <label>
                                    Dead Weight
                                    <input
                                        className="input-field"
                                        type="text"
                                        placeholder='Enter dead weight'
                                    />
                                </label>
                                <p className='fw-bold lh-base'>Volumetric Weight</p>
                                <label className='col'>
                                    Length (cm)
                                    <input
                                        className="input-field"
                                        type="text"
                                    />
                                </label>
                                <label className='col'>
                                    Breadth (cm)
                                    <input
                                        className="input-field"
                                        type="text"
                                    />
                                </label>
                                <label className='col'>
                                    Height (cm)
                                    <input
                                        className="input-field"
                                        type="text"
                                    />
                                </label>
                                <p>Charged Weight:&nbsp; 0 Kg</p>
                            </div>
                        </AccordionSection>
                        <AccordionSection
                            title="Warehouse Details"
                            isActive={activeSection === 5}
                            onClick={() => handleSectionClick(5)}
                        >
                            {/* Your Warehouse Details fields */}
                            <label className='w-100'>
                                Warehouse
                                <select
                                    className='select-field w-100'
                                >
                                    <option value="">Select</option>
                                    <option value=""></option>
                                </select>
                            </label>
                        </AccordionSection>
                        <AccordionSection
                            title="Optional Details"
                            isActive={activeSection === 6}
                            onClick={() => handleSectionClick(6)}
                        >
                            {/* Your Optional Details fields */}
                            <div className="eo-input-container">
                                <label>
                                    Order Tag
                                    <input
                                        type="text"
                                        className='input-field'
                                        placeholder='Enter Customer Order Tag'
                                    />
                                </label>
                                <label>
                                    Reseller Name
                                    <input
                                        type="text"
                                        className='input-field'
                                        placeholder='Enter Reseller Name'
                                    />
                                </label>
                                <label>
                                    Shipping Charges
                                    <input
                                        type="text"
                                        className='input-field'
                                        placeholder='Enter Shipping Charges'
                                    />
                                </label>
                                <label className='gift-wrap'>
                                    Gift Wrap
                                    <input
                                        type="checkbox"
                                    />
                                </label>
                                <label>
                                    Transaction fee
                                    <input
                                        type="text"
                                        className='input-field'
                                        placeholder='Enter Transaction fee'
                                    />
                                </label>
                                <label>
                                    HSN Code
                                    <input
                                        type="text"
                                        className='input-field'
                                        placeholder='Enter Transaction fee'
                                    />
                                </label>
                                <label>
                                    Tax Rate
                                    <input
                                        type="text"
                                        className='input-field'
                                        placeholder='Enter Transaction fee'
                                    />
                                </label>
                                <label>
                                    Discount
                                    <input
                                        type="text"
                                        className='input-field'
                                        placeholder='Enter Transaction fee'
                                    />
                                </label>
                            </div>
                        </AccordionSection>
                        {/* Add more AccordionSection components for other sections */}
                    </form>
                </section>
            </section>
            <div onClick={() => setEditOrderSection(false)} className={`backdrop ${EditOrderSection ? 'd-block' : 'd-none'}`}></div>
        </>
    );
};

const AccordionSection = ({ title, isActive, onClick, children }) => {
    return (
        <div className='step-container'>
            <div
                style={{ cursor: 'pointer' }}
                onClick={onClick}
            >
                <div className='d-flex align-items-center justify-content-between'>
                    {title}
                    {isActive ? (
                        <div className='d-flex gap-3 align-items-center'>
                            <FontAwesomeIcon icon={faChevronUp} />
                        </div>
                    ) : (
                        <div className='d-flex gap-3 align-items-center'>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </div>
                    )}
                </div>
            </div>
            {isActive && <div className='sub-details-section'>{children}</div>}
        </div>
    );
};

export default EditOrder;
