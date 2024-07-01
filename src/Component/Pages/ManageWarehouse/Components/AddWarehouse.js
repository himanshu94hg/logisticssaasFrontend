import React, { useEffect, useState } from 'react'
import './AddWarehouse.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import "./AddWarehouse.css";
import { toast } from 'react-toastify';
import { BASE_URL_CORE } from '../../../../axios/config';
import { customErrorFunction } from '../../../../customFunction/errorHandling';
import { manageWarehousesPattern } from '../../../../Routes';
import { useNavigate } from 'react-router-dom';

const AddWarehouse = () => {
    const navigate = useNavigate()
    const sellerData = Cookies.get("user_id");
    const [errors, setErrors] = useState({});
    const [SameRTO, setSameRTO] = useState(true);
    const [AddFields, SetAddFields] = useState(false);
    const hardcodedToken = Cookies.get("access_token");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // const newErrors = {}
            // if (!warehouseData.warehouse_name) {
            //     newErrors.warehouse_name = "Warehouse Name is required!"
            // } else if (!warehouseData.contact_name) {
            //     newErrors.warehouse_name = "Contact Person Name is required!"
            // }
            // else if (!warehouseData.contact_number) {
            //     newErrors.contact_number = "Contact Number is required!"
            // }
            // else if (!warehouseData.gst_number) {
            //     newErrors.gst_number = "GST Number is required!"

            // } else if (!warehouseData.address_line1) {
            //     newErrors.address_line1 = "Address Line 1 is required!"

            // }
            // else if (!warehouseData.address_line2) {
            //     newErrors.address_line2 = "Address Line 1 is required!"
            // }
            // else if (!warehouseData.pincode) {
            //     newErrors.pincode = "Pincode is required!"
            // }
            // else if (!warehouseData.city) {
            //     newErrors.city = "City is required"
            // }

            // setErrors(newErrors)
            // if (Object.keys(newErrors).length > 0) {
            //     setErrors(newErrors);
            //     return;
            // }
            const response = await axios.post(`${BASE_URL_CORE}/core-api/features/warehouse/`, warehouseData, {
                headers: {
                    'Authorization': `Bearer ${hardcodedToken}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 201) {
                const responseData = response.data;
                if (responseData) {
                    toast.success("Warehouse added successfully!")
                    navigate(manageWarehousesPattern)

                }
            }
        } catch (error) {
            customErrorFunction(error)
        }
    };

    const times = [
        '12:00 AM', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM', '6:00 AM',
        '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
        '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM',
        '9:00 PM', '10:00 PM', '11:00 PM'
    ];

    const [warehouseData, setWareHouseData] = useState({
        seller: "",
        warehouse_name: "",
        address_line1: "",
        address_line2: "",
        contact_number: "",
        contact_name: "",
        support_phone: "",
        support_email: "",
        gst_number: "",
        country_code: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        rto_details: {
            warehouse_name: "",
            contact_person_name: "",
            contact_number: "",
            alternate_number: "",
            email: "",
            address: "",
            landmark: "",
            pincode: "",
            city: "",
            state: "",
            country: "India"
        }
    });

    const handleChangeWarehouse = async (event) => {
        const { name, value } = event.target;
        if (name === "pincode") {
            if (value.length === 6) {
                try {
                    const response = await axios.get(`https://api.postalpincode.in/pincode/${value}`);
                    if (response.data && response.data.length > 0) {
                        const data = response.data[0].PostOffice[0];
                        setWareHouseData((prev) => ({
                            ...prev,
                            city: data.District,
                            state: data.State,
                            country: data.Country,
                        }));
                    }
                } catch (error) {
                    // Handle error
                }
            }
        }
        setWareHouseData((prev) => ({
            ...prev,
            [name]: value,
            rto_details: SameRTO
                ? {
                    warehouse_name: prev.warehouse_name,
                    contact_person_name: prev.contact_name,
                    contact_number: prev.contact_number,
                    alternate_number: "",
                    email: prev.support_email,
                    address: prev.address_line1 + "," + prev.address_line2,
                    landmark: prev.city,
                    pincode: prev.pincode,
                    city: prev.city,
                    state: prev.state,
                    country: prev.country
                }
                : prev.rto_details
        }));
    };

    const handleChangeRto = async (event) => {
        const { name, value } = event.target;
        if (name === "pincode") {
            if (value.length === 6) {
                try {
                    const response = await axios.get(`https://api.postalpincode.in/pincode/${value}`);
                    if (response.data && response.data.length > 0) {
                        const data = response.data[0].PostOffice[0];
                        setWareHouseData((prev) => ({
                            ...prev,
                            rto_details: {
                                ...prev.rto_details,
                                city: data.District,
                                state: data.State,
                                country: data.Country,
                            }
                        }));
                    }
                } catch (error) {
                    // Handle error
                }
            }
        }
        setWareHouseData((prev) => ({
            ...prev,
            rto_details: {
                ...prev.rto_details,
                [name]: value
            }
        }));
    };

    const handleCheckboxChange = () => {
        setSameRTO(!SameRTO);

    };

    useEffect(() => {
        if (SameRTO) {
            setWareHouseData((prev) => ({
                ...prev,
                rto_details: {
                    warehouse_name: prev.warehouse_name,
                    contact_person_name: prev.contact_name,
                    contact_number: prev.contact_number,
                    alternate_number: "",
                    email: prev.support_email,
                    address: prev.address_line1 + "," + prev.address_line2,
                    landmark: prev.city,
                    pincode: prev.pincode,
                    city: prev.city,
                    state: prev.state,
                    country: prev.country
                }
            }));
        } else {
            setWareHouseData((prev) => ({
                ...prev,
                rto_details: {
                    warehouse_name: "",
                    contact_person_name: "",
                    contact_number: "",
                    alternate_number: "",
                    email: "",
                    address: "",
                    landmark: "",
                    pincode: "",
                    city: "",
                    state: "",
                    country: ""
                }
            }));
        }
    }, [SameRTO])

    console.log(errors, "this is warehouse data")

    return (
        <>
            <form id="formSubmit" onSubmit={handleSubmit}>
                <div className='box-shadow shadow-sm p10 w-100 add-warehouse-section'>
                    <div className='inputs-container mx-auto mb-3'>
                        <h3 className='mb-4'>Add New Warehouse</h3>
                        <div className='d-flex gap-3'>
                            <label>
                                Warehouse Name (do not use special symbols)
                                <input
                                    type="text"
                                    className={`input-field ${errors.warehouse_name && 'input-field-error'}`}
                                    name="warehouse_name"
                                    onChange={handleChangeWarehouse}
                                    placeholder='Enter Warehouse Name'
                                    value={warehouseData.warehouse_name}
                                />
                                {errors.warehouse_name && <div className="custom-error">{errors.warehouse_name}</div>}
                            </label>
                            <label>
                                Contact Person Name
                                <input
                                    type="text"
                                    className={`input-field ${errors.contact_name && 'input-field-error'}`}
                                    name="contact_name"
                                    onChange={handleChangeWarehouse}
                                    value={warehouseData.contact_name}
                                    placeholder='Enter Contact Person Name'
                                />
                                {errors.contact_name && <div className="custom-error">{errors.contact_name}</div>}
                            </label>
                        </div>
                        <div className='d-flex gap-3 mt-4'>
                            <label>
                                Contact Number
                                <div className='d-flex mobile-number-field'>
                                    <select
                                        className='input-field'
                                        disabled
                                    >
                                        <option value="+91">+91</option>
                                    </select>
                                    <input
                                        type="text"
                                        className={`input-field ${errors.contact_number && 'input-field-error'}`}
                                        name="contact_number"
                                        placeholder='XXXXXXXXXX'
                                        value={warehouseData.contact_number}
                                        maxLength={10}
                                        onKeyPress={(e) => {
                                            if (!/\d/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        onChange={handleChangeWarehouse}
                                    />
                                </div>
                                {errors.contact_number && <div className="custom-error">{errors.contact_number}</div>}
                            </label>
                            <label>
                                GST Number
                                <input
                                    type="text"
                                    className={`input-field ${errors.gst_number && 'input-field-error'}`}
                                    name="gst_number"
                                    value={warehouseData.gst_number}
                                    placeholder='Enter GST Number'
                                    maxLength={15}
                                    onChange={handleChangeWarehouse}
                                />
                                {errors.gst_number && <div className="custom-error">{errors.gst_number}</div>}
                            </label>
                        </div>
                        <div className='d-flex gap-3 mt-4'>
                            <label>
                                Warehouse Address 1
                                <input
                                    type="text"
                                    className={`input-field ${errors.addressLine1 && 'input-field-error'}`}
                                    name="address_line1"
                                    value={warehouseData.address_line1}
                                    placeholder='Enter Warehouse Address 1'
                                    onChange={handleChangeWarehouse}
                                />
                                {errors.addressLine1 && <div className="custom-error">{errors.addressLine1}</div>}
                            </label>
                            <label>
                                Warehouse Address 2
                                <input
                                    type="text"
                                    className={`input-field ${errors.address_line2 && 'input-field-error'}`}
                                    name="address_line2"
                                    value={warehouseData.address_line2}
                                    placeholder='Enter Warehouse Address 2'
                                    onChange={handleChangeWarehouse}
                                />
                                {errors.address_line2 && <div className="custom-error">{errors.address_line2}</div>}
                            </label>
                        </div>
                        <div className='d-flex gap-3 mt-4'>
                            <label>
                                Pincode
                                <input
                                    type="text"
                                    className={`input-field ${errors.pincode && 'input-field-error'}`}
                                    name="pincode"
                                    placeholder='Enter Pincode'
                                    value={warehouseData.pincode}
                                    maxLength={6}
                                    onKeyPress={(e) => {
                                        if (!/\d/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    onChange={handleChangeWarehouse}
                                />
                                {errors.pincode && <div className="custom-error">{errors.pincode}</div>}
                            </label>
                            <label>
                                City
                                <input
                                    type="text"
                                    className={`input-field ${errors.city && 'input-field-error'}`}
                                    name="city"
                                    value={warehouseData.city}
                                    placeholder='Enter city'
                                    onChange={handleChangeWarehouse}
                                />
                                {errors.city && <div className="custom-error">{errors.city}</div>}
                            </label>
                            <label>
                                State
                                <input
                                    type="text"
                                    className={`input-field ${errors.state && 'input-field-error'}`}
                                    name="state"
                                    value={warehouseData.state}
                                    onChange={handleChangeWarehouse}
                                    placeholder='Enter state'
                                />
                                {errors.state && <div className="custom-error">{errors.state}</div>}
                            </label>
                            <label>
                                Country
                                <input
                                    type="text"
                                    className='input-field'
                                    name="country"
                                    value={warehouseData.country}
                                    onChange={handleChangeWarehouse}
                                    placeholder='Enter country'
                                />
                            </label>
                        </div>
                        <div className='d-flex gap-3 mt-4'>
                            <label>
                                Support Email
                                <input
                                    type="email"
                                    className='input-field'
                                    name="support_email"
                                    onChange={handleChangeWarehouse}
                                    value={warehouseData.support_email}
                                    placeholder='Enter Support Email'
                                />
                            </label>
                            <label>
                                Support Phone
                                <input
                                    type="text"
                                    className='input-field'
                                    name="support_phone"
                                    value={warehouseData.support_phone}
                                    onChange={handleChangeWarehouse}
                                    onKeyPress={(e) => {
                                        if (!/\d/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    maxLength={10}
                                    placeholder='Enter Support Contact'
                                />
                            </label>
                        </div>

                        <div className="d-flex gap-3 mt-4">
                            <p onClick={() => SetAddFields(!AddFields)} className='add-fields-text mb-0'>
                                <span>Warehouse Timings</span>
                                <span className='text-gray'> (Optional) <FontAwesomeIcon icon={AddFields ? faChevronUp : faChevronDown} /></span>
                            </p>
                        </div>

                        <div className={`d-flex gap-3 ${AddFields ? '' : 'd-none'}`}>
                            <label>
                                Open at
                                <select className='select-field'>
                                    <option value="">Select Time</option>
                                    {times.map((time, index) => (
                                        <option key={index} value={time}>{time}</option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                Closes at
                                <select className='select-field'>
                                    <option value="">Select Time</option>
                                    {times.map((time, index) => (
                                        <option key={index} value={time}>{time}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <hr />
                        <label className='d-flex flex-row align-items-center mt-3 gap-2'>
                            <input type="checkbox" onChange={handleCheckboxChange} defaultChecked={SameRTO} />
                            Use a different address as RTO address
                        </label>
                        <div className={`d-flex flex-column gap-3 ${SameRTO ? 'd-none' : ''}`}>
                            <h3 className='mt-3 mb-0'>Add RTO Address</h3>
                            <div className='d-flex gap-3'>
                                <label>
                                    Warehouse Name (do not use special symbols)
                                    <input
                                        type="text"
                                        className='input-field'
                                        name="warehouse_name"
                                        placeholder='Enter Warehouse Name'
                                        onChange={handleChangeRto}
                                        value={warehouseData.rto_details.warehouse_name}
                                    />
                                </label>
                                <label>
                                    Contact Person Name
                                    <input
                                        type="text"
                                        className='input-field'
                                        name="contact_person_name"
                                        onChange={handleChangeRto}
                                        placeholder='Enter Contact Person Name'
                                        value={warehouseData.rto_details.contact_person_name}
                                    />
                                </label>
                            </div>
                            <div className='d-flex gap-3 mt-4'>
                                <label>
                                    Contact Number
                                    <div className='d-flex mobile-number-field'>
                                        <select
                                            className='input-field'
                                            disabled
                                        >
                                            <option value="+91">+91</option>
                                        </select>
                                        <input
                                            type="text"
                                            className={`input-field`}
                                            name="contact_number"
                                            onChange={handleChangeRto}
                                            value={warehouseData.rto_details.contact_number}
                                            placeholder='XXXXXXXXXX'
                                        />
                                    </div>
                                </label>
                                <label>
                                    Alternate Number
                                    <input
                                        type="text"
                                        className='input-field'
                                        onChange={handleChangeRto}
                                        name="alternate_number"
                                        placeholder='Enter Alternate Contact'
                                    />
                                </label>
                                <label>
                                    Email
                                    <input
                                        type="text"
                                        className='input-field'
                                        onChange={handleChangeRto}
                                        name="email"
                                        placeholder='Enter Email'
                                    />
                                </label>
                            </div>
                            <div className='d-flex gap-3 mt-4'>
                                <label>
                                    Address
                                    <input
                                        type="text"
                                        className='input-field'
                                        onChange={handleChangeRto}
                                        name="address"
                                        placeholder='Enter Warehouse Address 1'
                                        value={warehouseData.rto_details.address}
                                    />
                                </label>
                                <label>
                                    Landmark
                                    <input
                                        type="text"
                                        className='input-field'
                                        onChange={handleChangeRto}
                                        name="landmark"
                                        placeholder='Enter Landmark'
                                        value={warehouseData.rto_details.landmark}
                                    />
                                </label>
                            </div>
                            <div className='d-flex gap-3 mt-4'>
                                <label>
                                    Pincode
                                    <input
                                        type="text"
                                        className='input-field'
                                        name="pincode"
                                        placeholder='Enter Pincode'
                                        onChange={handleChangeRto}
                                        maxLength={6}
                                        value={warehouseData.rto_details.pincode}
                                    />
                                </label>
                                <label>
                                    City
                                    <input
                                        type="text"
                                        className='input-field'
                                        onChange={handleChangeRto}
                                        name="city"
                                        value={warehouseData.rto_details.city}
                                    />
                                </label>
                                <label>
                                    State
                                    <input
                                        type="text"
                                        className='input-field'
                                        onChange={handleChangeRto}
                                        name="state"
                                        value={warehouseData.rto_details.state}
                                    />
                                </label>
                                <label>
                                    Country
                                    <input
                                        type="text"
                                        className='input-field'
                                        onChange={handleChangeRto}
                                        name="country"
                                        value={warehouseData.rto_details.country}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Next Button */}
                <div className='d-flex justify-content-end my-3'>
                    <button className='btn main-button-outline' type='reset'>
                        Reset
                    </button>
                    <button className='btn main-button ms-2' type='submit'>
                        Submit
                    </button>
                </div>
            </form>
        </>
    );
};

export default AddWarehouse;
