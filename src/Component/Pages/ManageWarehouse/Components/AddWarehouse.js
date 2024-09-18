import axios from 'axios';
import "./AddWarehouse.css";
import './AddWarehouse.css'
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css';
import { BASE_URL_CORE } from '../../../../axios/config';
import { manageWarehousesPattern } from '../../../../Routes';
import LoaderScreen from '../../../LoaderScreen/LoaderScreen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { customErrorFunction } from '../../../../customFunction/errorHandling';

const AddWarehouse = () => {
    const navigate = useNavigate()
    const [errors, setErrors] = useState({});
    const [loader, setLoader] = useState(false)
    const [SameRTO, setSameRTO] = useState(false);
    const [AddFields, SetAddFields] = useState(false);
    const hardcodedToken = Cookies.get("access_token");
    const allowedCharacters = /^[a-zA-Z0-9\s!@#$%^&*(),.?":{}|<>]*$/;
    const sellerData = useSelector(state => state?.paymentSectionReducer.sellerProfileCard);
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
        country: "India",
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newErrors = {}
            const { warehouse_name, contact_name, contact_number, gst_number, address_line1, address_line2, pincode, city, state, rto_details } = warehouseData;
            !warehouse_name && (newErrors.warehouse_name = "Warehouse Name is required!");
            !contact_name && (newErrors.contact_name = "Contact Person Name is required!");
            !contact_number
                ? (newErrors.contact_number = "Contact Number is required!")
                : contact_number.length !== 10 && (newErrors.contact_number = "Contact Number must be 10 digits!");
            !gst_number
                ? (newErrors.gst_number = "GST Number is required!")
                : gst_number.length !== 15 && (newErrors.gst_number = "GST Number must be 15 digits!");
            !address_line1 && (newErrors.address_line1 = "Address Line 1 is required!");
            !address_line2 && (newErrors.address_line2 = "Address Line 2 is required!");
            !pincode && (newErrors.pincode = "Pincode is required!");
            !city && (newErrors.city = "City is required!");
            !state && (newErrors.state = "State is required!");

            const { warehouse_name: rto_warehouse_name, contact_person_name, contact_number: rto_contact_number, address, pincode: rto_pincode, city: rto_city, state: rto_state } = rto_details;
            !rto_warehouse_name && (newErrors.rto_warehouse_name = "Warehouse Name is required!");
            !contact_person_name && (newErrors.contact_person_name = "Contact Person Name is required!");
            !rto_contact_number && (newErrors.rto_contact_number = "Contact Number is required!");
            !address && (newErrors.address = "Address is required!");
            !rto_pincode && (newErrors.rto_pincode = "Pincode is required!");
            !rto_city && (newErrors.rto_city = "City is required!");
            !rto_state && (newErrors.rto_state = "State is required!");

            setErrors(newErrors)
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }
            setLoader(true)
            const warehouse_code = `${warehouseData.warehouse_name}_${sellerData?.code}`;
            const updatedWarehouseData = {
                ...warehouseData,
                warehouse_code
            };

            const response = await axios.post(`${BASE_URL_CORE}/core-api/features/warehouse/`, updatedWarehouseData, {
                headers: {
                    'Authorization': `Bearer ${hardcodedToken}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 201) {
                const responseData = response.data;
                if (responseData) {
                    setLoader(false)
                    toast.success("Warehouse added successfully!")
                    navigate(manageWarehousesPattern)
                }
            }
        } catch (error) {
            setLoader(false)
            customErrorFunction(error)
        }
    };

    const times = [
        '12:00 AM', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM', '6:00 AM',
        '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
        '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM',
        '9:00 PM', '10:00 PM', '11:00 PM'
    ];

    const handleChangeWarehouse = async (event) => {
        const { name, value } = event.target;
        if (name === "contact_number") {
            if (value.length === 10) {
                setErrors((prev) => {
                    const { contact_number, ...restErrors } = prev;
                    return restErrors
                })
            } else {
                setErrors((prev) => ({
                    ...prev,
                    contact_number: 'Contact Number must be 10 digits!'
                }))
            }
        }
        if (name === "pincode") {
            if (value.length === 6) {
                setErrors(prevErrors => {
                    const { pincode, ...restErrors } = prevErrors;
                    return restErrors;
                });
                try {
                    const response = await axios.get(`${BASE_URL_CORE}/core-api/channel/get-pincode-detail/?pincode=${value}`, {
                        headers: {
                            Authorization: `Bearer ${hardcodedToken}`
                        }
                    })
                    if (response?.data?.status === "Success") {
                        setWareHouseData((prev) => ({
                            ...prev,
                            city: response?.data?.city,
                            state: response?.data?.state,
                            country: response?.data?.country,
                        }));
                    } else {
                        setErrors(prevErrors => ({
                            ...prevErrors,
                            pincode: "Please enter valid pincode!"
                        }));
                    }
                } catch (error) {
                    customErrorFunction(error)
                }
            } else {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    pincode: "Pincode should be 6 digits!"
                }));
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
                    country: "India"
                }
                : prev.rto_details
        }));
    };

    const handleChangeRto = async (event) => {
        const { name, value } = event.target;
        if (name === "contact_number") {
            if (value.length === 10) {
                setErrors((prev) => {
                    const { rto_contact_number, ...restErrors } = prev;
                    return restErrors
                })
            } else {
                setErrors((prev) => ({
                    ...prev,
                    rto_contact_number: 'Mobile Number should be 10 digits!'
                }))
            }
        }
        if (name === "alternate_number") {
            if (value.length === 10) {
                setErrors((prev) => {
                    const { alternate_number, ...restErrors } = prev;
                    return restErrors
                })
            } else {
                setErrors((prev) => ({
                    ...prev,
                    alternate_number: 'Mobile Number should be 10 digits!'
                }))
            }
        }
        if (name === "pincode") {
            if (value.length === 6) {
                setErrors(prevErrors => {
                    const { rto_pincode, ...restErrors } = prevErrors;
                    return restErrors;
                });
                try {
                    const response = await axios.get(`${BASE_URL_CORE}/core-api/channel/get-pincode-detail/?pincode=${value}`, {
                        headers: {
                            Authorization: `Bearer ${hardcodedToken}`
                        }
                    })
                    if (response?.data?.status === "Success") {
                        setWareHouseData((prev) => ({
                            ...prev,
                            rto_details: {
                                ...prev.rto_details,
                                city: response?.data.city,
                                state: response?.data.state,
                                country: response?.data.country,
                            }
                        }));
                    }
                    else {
                        setErrors(prevErrors => ({
                            ...prevErrors,
                            rto_pincode: "Please enter valid pincode!"
                        }));
                    }
                }
                catch (error) {
                    customErrorFunction(error)
                }
            }
            else {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    rto_pincode: "Pincode should be 6 digits!"
                }));
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
        if (!SameRTO && warehouseData.pincode !== "" && warehouseData.city !== "" && warehouseData.state !== "" && warehouseData.warehouse_name !== "") {
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
                    country: "India"
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
                    country: "India"
                }
            }));
        }
    }, [SameRTO, warehouseData.pincode, warehouseData.city, warehouseData.state])

    const handleReset = () => {
        setErrors({})
        setWareHouseData({
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
            country: "India",
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

        })
    }

    const handleKeypress = (e) => {
        const { field, value } = e.target
        if (field === "gst_number") {
        }
        else {
            if (e.key === ' ' && e.target.value.endsWith(' ')) {
                e.preventDefault();
            } else if (!allowedCharacters.test(e.key)) {
                e.preventDefault();
            }
        }
    }

    return (
        <>
            <form id="formSubmit" onSubmit={handleSubmit}>
                <div className='box-shadow shadow-sm p10 w-100 add-warehouse-section'>
                    <div className='inputs-container mx-auto mb-3'>
                        <h3 className='mb-4'>Add New Warehouse</h3>
                        <div className='d-flex gap-3 flex-column flex-md-row'>
                            <label>
                                <span> Warehouse Name<span className='mandatory'> *</span></span>
                                <input
                                    type="text"
                                    maxLength={70}
                                    name="warehouse_name"
                                    onChange={handleChangeWarehouse}
                                    placeholder='Enter Warehouse Name'
                                    onKeyPress={(e) => handleKeypress(e)}
                                    value={warehouseData.warehouse_name}
                                    className={`input-field ${errors.warehouse_name && 'input-field-error'}`}
                                />
                                {errors.warehouse_name && <div className="custom-error">{errors.warehouse_name}</div>}
                            </label>
                            <label>
                                <span> Contact Person Name<span className='mandatory'> *</span></span>
                                <input
                                    type="text"
                                    name="contact_name"
                                    maxLength={70}
                                    onChange={handleChangeWarehouse}
                                    value={warehouseData.contact_name}
                                    onKeyPress={(e) => handleKeypress(e)}
                                    placeholder='Enter Contact Person Name'
                                    className={`input-field ${errors.contact_name && 'input-field-error'}`}
                                />
                                {errors.contact_name && <div className="custom-error">{errors.contact_name}</div>}
                            </label>
                        </div>
                        <div className='d-flex gap-3 mt-4 flex-column flex-md-row'>
                            <label>
                                <span>Contact Number<span className='mandatory'> *</span></span>
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
                                <span>GST Number<span className='mandatory'> *</span></span>
                                <input
                                    type="text"
                                    className={`input-field ${errors.gst_number && 'input-field-error'}`}
                                    name="gst_number"
                                    value={warehouseData.gst_number}
                                    placeholder='Enter GST Number'
                                    maxLength={15}
                                    onKeyPress={(e) => handleKeypress(e)}
                                    onChange={handleChangeWarehouse}
                                />
                                {errors.gst_number && <div className="custom-error">{errors.gst_number}</div>}
                            </label>
                        </div>
                        <div className='d-flex gap-3 mt-4 flex-column flex-md-row'>
                            <label>
                                <span>Address Line 1<span className='mandatory'> *</span></span>
                                <input
                                    type="text"
                                    name="address_line1"
                                    maxLength={100}
                                    value={warehouseData.address_line1}
                                    placeholder='Enter Address Line 1'
                                    onKeyPress={(e) => handleKeypress(e)}
                                    onChange={handleChangeWarehouse}
                                    className={`input-field ${errors.address_line1 && 'input-field-error'}`}
                                />
                                {errors.address_line1 && <div className="custom-error">{errors.address_line1}</div>}
                            </label>
                            <label>
                                <span> Address Line 2<span className='mandatory'> *</span></span>
                                <input
                                    type="text"
                                    className={`input-field ${errors.address_line2 && 'input-field-error'}`}
                                    name="address_line2"
                                    maxLength={100}
                                    value={warehouseData.address_line2}
                                    placeholder='Enter Address Line 2'
                                    onKeyPress={(e) => handleKeypress(e)}
                                    onChange={handleChangeWarehouse}
                                />
                                {errors.address_line2 && <div className="custom-error">{errors.address_line2}</div>}
                            </label>
                        </div>
                        <div className='d-flex gap-3 mt-4 flex-column flex-lg-row'>
                            <div className='d-flex gap-3 flex-column flex-md-row w-100'>
                                <label>
                                    <span>Pincode<span className='mandatory'> *</span></span>
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
                                    <span>City<span className='mandatory'> *</span></span>
                                    <input
                                        type="text"
                                        className={`input-field ${errors.city && 'input-field-error'}`}
                                        name="city"
                                        maxLength={50}
                                        value={warehouseData.city}
                                        placeholder='Enter city'
                                        onKeyPress={(e) => handleKeypress(e)}
                                        onChange={handleChangeWarehouse}
                                    />
                                    {errors.city && <div className="custom-error">{errors.city}</div>}
                                </label>
                            </div>
                            <div className='d-flex gap-3 flex-column flex-md-row w-100'>
                                <label>
                                    <span>State<span className='mandatory'> *</span></span>
                                    <input
                                        type="text"
                                        className={`input-field ${errors.state && 'input-field-error'}`}
                                        name="state"
                                        maxLength={30}
                                        value={warehouseData.state}
                                        onChange={handleChangeWarehouse}
                                        placeholder='Enter state'
                                        onKeyPress={(e) => handleKeypress(e)}

                                    />
                                    {errors.state && <div className="custom-error">{errors.state}</div>}
                                </label>
                                <label>
                                    Country
                                    <input
                                        type="text"
                                        className='input-field'
                                        name="country"
                                        maxLength={30}
                                        value={warehouseData.country}
                                        onChange={handleChangeWarehouse}
                                        placeholder='Enter country'
                                        onKeyPress={(e) => handleKeypress(e)}

                                    />
                                </label>
                            </div>
                        </div>
                        <div className='d-flex gap-3 mt-4 flex-column flex-md-row'>
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
                        <div className={`d-flex flex-column gap-3 ${SameRTO ? '' : 'd-none'}`}>
                            <h3 className='mt-3 mb-0'>Add RTO Address</h3>
                            <div className='d-flex gap-3 flex-column flex-md-row'>
                                <label>
                                    <span>Warehouse Name<span className='mandatory'> *</span></span>
                                    <input
                                        type="text"
                                        name="warehouse_name"
                                        maxLength={70}
                                        placeholder='Enter Warehouse Name'
                                        onChange={handleChangeRto}
                                        onKeyPress={(e) => handleKeypress(e)}
                                        value={warehouseData.rto_details.warehouse_name}
                                        className={`input-field ${errors.rto_warehouse_name && 'input-field-error'}`}
                                    />
                                    {errors?.rto_warehouse_name && <div className="custom-error">{errors.rto_warehouse_name}</div>}
                                </label>
                                <label>
                                    <span>Contact Person Name<span className='mandatory'> *</span></span>
                                    <input
                                        type="text"
                                        name="contact_person_name"
                                        maxLength={70}
                                        onChange={handleChangeRto}
                                        onKeyPress={(e) => handleKeypress(e)}
                                        placeholder='Enter Contact Person Name'
                                        value={warehouseData.rto_details.contact_person_name}
                                        className={`input-field ${errors.contact_person_name && 'input-field-error'}`}
                                    />
                                    {errors?.contact_person_name && <div className="custom-error">{errors.contact_person_name}</div>}
                                </label>
                            </div>
                            <div className='d-flex gap-3 mt-4 flex-column flex-md-row'>
                                <label>
                                    <span>Contact Number<span className='mandatory'> *</span></span>
                                    <div className='d-flex mobile-number-field'>
                                        <select
                                            className='input-field'
                                            disabled
                                        >
                                            <option value="+91">+91</option>
                                        </select>
                                        <input
                                            type="text"
                                            name="contact_number"
                                            onChange={handleChangeRto}
                                            maxLength={10}
                                            value={warehouseData.rto_details.contact_number}
                                            placeholder='XXXXXXXXXX'
                                            className={`input-field ${errors.rto_contact_number && 'input-field-error'}`}
                                        />
                                        {errors?.rto_contact_number && <div className="custom-error">{errors.rto_contact_number}</div>}
                                    </div>
                                </label>
                                <label>
                                    Alternate Number
                                    <input
                                        type="text"
                                        maxLength={10}
                                        onChange={handleChangeRto}
                                        name="alternate_number"
                                        placeholder='Enter Alternate Contact'
                                        className={`input-field ${errors.alternate_number && 'input-field-error'}`}
                                    />
                                    {errors?.alternate_number && <div className="custom-error">{errors.alternate_number}</div>}

                                </label>
                                <label>
                                    Email
                                    <input
                                        type="text"
                                        name="email"
                                        maxLength={30}
                                        className='input-field'
                                        onChange={handleChangeRto}
                                        onKeyPress={(e) => handleKeypress(e)}
                                        placeholder='Enter Email'
                                    />
                                </label>
                            </div>
                            <div className='d-flex gap-3 mt-4 flex-column flex-md-row'>
                                <label>
                                    <span>Address<span className='mandatory'> *</span></span>
                                    <input
                                        type="text"
                                        name="address"
                                        maxLength={100}
                                        onChange={handleChangeRto}
                                        onKeyPress={(e) => handleKeypress(e)}
                                        placeholder='Enter Address'
                                        value={warehouseData.rto_details.address}
                                        className={`input-field ${errors.address && 'input-field-error'}`}

                                    />
                                    {errors?.address && <div className="custom-error">{errors.address}</div>}
                                </label>
                                <label>
                                    Landmark
                                    <input
                                        type="text"
                                        maxLength={50}
                                        name="landmark"
                                        className='input-field'
                                        onChange={handleChangeRto}
                                        onKeyPress={(e) => handleKeypress(e)}
                                        placeholder='Enter Landmark'
                                        value={warehouseData.rto_details.landmark}
                                    />
                                </label>
                            </div>
                            <div className='d-flex gap-3 mt-4 flex-column flex-lg-row'>
                                <div className='d-flex gap-3 flex-column flex-md-row w-100'>
                                    <label>
                                        <span>Pincode<span className='mandatory'> *</span></span>
                                        <input
                                            type="text"
                                            name="pincode"
                                            placeholder='Enter Pincode'
                                            onChange={handleChangeRto}
                                            maxLength={6}
                                            value={warehouseData.rto_details.pincode}
                                            className={`input-field ${errors.rto_pincode && 'input-field-error'}`}
                                        />
                                        {errors?.rto_pincode && <div className="custom-error">{errors.rto_pincode}</div>}
                                    </label>
                                    <label>
                                        <span>City<span className='mandatory'> *</span></span>
                                        <input
                                            type="text"
                                            name="city"
                                            maxLength={30}
                                            onChange={handleChangeRto}
                                            onKeyPress={(e) => handleKeypress(e)}
                                            value={warehouseData.rto_details.city}
                                            className={`input-field ${errors.rto_city && 'input-field-error'}`}
                                        />
                                        {errors?.rto_city && <div className="custom-error">{errors.rto_city}</div>}
                                    </label>
                                </div>

                                <div className='d-flex gap-3 flex-column flex-md-row w-100'>
                                    <label>
                                        <span>State<span className='mandatory'> *</span></span>
                                        <input
                                            type="text"
                                            maxLength={30}
                                            name="state"
                                            onChange={handleChangeRto}
                                            onKeyPress={(e) => handleKeypress(e)}
                                            value={warehouseData.rto_details.state}
                                            className={`input-field ${errors.rto_city && 'input-field-error'}`}
                                        />
                                        {errors?.rto_state && <div className="custom-error">{errors.rto_state}</div>}
                                    </label>
                                    <label>
                                        Country
                                        <input
                                            type="text"
                                            maxLength={30}
                                            name="country"
                                            className='input-field'
                                            onKeyPress={(e) => handleKeypress(e)}
                                            onChange={handleChangeRto}
                                            value={warehouseData.rto_details.country}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-end my-3'>
                    <button className='btn main-button-outline' type='reset' onClick={handleReset}>
                        Reset
                    </button>
                    <button className='btn main-button ms-2' type='submit'>
                        Submit
                    </button>
                </div>
            </form>
            <LoaderScreen loading={loader} />
        </>
    );
};

export default AddWarehouse;
