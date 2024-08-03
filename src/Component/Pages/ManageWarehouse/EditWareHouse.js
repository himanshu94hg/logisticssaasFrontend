import React, { useEffect, useRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import './Components/AddWarehouse.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


const EditWareHouse = ({ wareHouseId, setEditWarehouse }) => {
    const dispatch = useDispatch();
    const pincodeRef = useRef(null);
    const cityRef = useRef(null);
    const stateRef = useRef(null);
    const countryRef = useRef(null);
    const pincodeRef1 = useRef(null);
    const cityRef1 = useRef(null);
    const stateRef1 = useRef(null);
    const countryRef1 = useRef(null);
    const [SameRTO, setSameRTO] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const popRef = useRef(null);
    const [formData, setFormData] = useState({
        warehouse_name: "",
        address_line1: "",
        address_line2: "",
        contact_name: "",
        contact_number: null,
        is_default: false,
        city: "",
        state: "",
        pincode: null,
        gst_number: null,
        support_email: "",
        support_phone: null,
        country_code: "+91",
        country: "India",
        warehouse_code: "",
        org_unit_id: null,
        easyecom_warehouse_id: null,
        is_rto_same: true,
        rto_details: {
            warehouse_name: "",
            contact_person_name: "",
            contact_number: null,
            alternate_number: null,
            email: "",
            address: "",
            landmark: "",
            pincode: null,
            city: "",
            state: "",
            country: ""
        }
    });

    console.log("SameRTOSameRTOSameRTOSameRTO", SameRTO)
    const { warehouseDetails } = useSelector(state => state?.settingsSectionReducer)
    useEffect(() => {
        if (warehouseDetails) {
            setFormData({
                warehouse_name: warehouseDetails?.warehouse_name || "",
                address_line1: warehouseDetails?.address_line1 || "",
                address_line2: warehouseDetails?.address_line2 || "",
                contact_name: warehouseDetails?.contact_name || "",
                contact_number: warehouseDetails?.contact_number || null,
                is_default: warehouseDetails?.is_default || false,
                city: warehouseDetails?.city || "",
                state: warehouseDetails?.state || "",
                pincode: warehouseDetails?.pincode || null,
                gst_number: warehouseDetails?.gst_number || null,
                support_email: warehouseDetails?.support_email || "",
                support_phone: warehouseDetails?.support_phone || null,
                country_code: warehouseDetails?.country_code || "+91",
                country: warehouseDetails?.country || "India",
                warehouse_code: warehouseDetails?.warehouse_code || "",
                org_unit_id: warehouseDetails?.org_unit_id || null,
                easyecom_warehouse_id: warehouseDetails?.easyecom_warehouse_id || null,
                is_rto_same: warehouseDetails?.is_rto_same || true,
                rto_details: {
                    warehouse_name: warehouseDetails?.rto_details?.warehouse_name || "",
                    contact_person_name: warehouseDetails?.rto_details?.contact_person_name || "",
                    contact_number: warehouseDetails?.rto_details?.contact_number || null,
                    alternate_number: warehouseDetails?.rto_details?.alternate_number || null,
                    email: warehouseDetails?.rto_details?.email || "",
                    address: warehouseDetails?.rto_details?.address || "",
                    landmark: warehouseDetails?.rto_details?.landmark || "",
                    pincode: warehouseDetails?.rto_details?.pincode || null,
                    city: warehouseDetails?.rto_details?.city || "",
                    state: warehouseDetails?.rto_details?.state || "",
                    country: warehouseDetails?.rto_details?.country || ""
                }
            });
        }
    }, [warehouseDetails])

    useEffect(() => {
        if (wareHouseId) {
            dispatch({ type: "GET_WAREHOUSE_DETAILS_ACTION", payload: wareHouseId })
        }
    }, [wareHouseId])

    const validateForm = () => {
        let valid = true;
        let errors = {};
        if (!formData?.warehouse_name?.trim()) {
            valid = false;
            errors.warehouse_name = 'Enter Warehouse Name!';
        }
        if (!formData?.contact_name?.trim()) {
            valid = false;
            errors.contact_name = 'Enter Contact Person name!';
        }
        if (!formData?.contact_number?.trim()) {
            valid = false;
            errors.contact_number = 'Enter Contact number !';
        } else if (formData?.contact_number?.length !== 10) {
            valid = false;
            errors.contact_number = 'Mobile number must be 10 digits.';
        }
        if (!formData?.gst_number?.trim()) {
            valid = false;
            errors.gst_number = 'Enter GST number !';
        }
        else if (formData?.gst_number?.length !== 15) {
            valid = false;
            errors.gst_number = 'GST number must be 15 digits.';
        }

        if (!formData?.address_line1?.trim()) {
            valid = false;
            errors.address_line1 = 'Enter Address 1!';
        }
        if (!formData?.address_line2?.trim()) {
            valid = false;
            errors.address_line2 = 'Enter Address 2!';
        }
        if (!formData?.pincode?.trim()) {
            valid = false;
            errors.pincode = 'Enter pincode!';
        }
        if (!formData?.city?.trim()) {
            valid = false;
            errors.city = 'Enter city name!';
        }
        if (!formData?.state?.trim()) {
            valid = false;
            errors.state = 'Enter state name!';
        }
        if (!formData?.country?.trim()) {
            valid = false;
            errors.country = 'Enter country name!';
        }

        if (SameRTO === true) {
            if (!formData?.rto_details?.warehouse_name?.trim()) {
                valid = false;
                errors.warehouse_name1 = 'Enter Warehouse Name!';
            }
            if (!formData?.rto_details?.contact_person_name?.trim()) {
                valid = false;
                errors.contact_person_name1 = 'Enter Contact Person name!';
            }
            if (!formData?.rto_details?.contact_number?.trim()) {
                valid = false;
                errors.contact_number1 = 'Enter Contact number!';
            }
            if (!formData?.rto_details?.email?.trim()) {
                valid = false;
                errors.email = 'Enter Email id!';
            }
            if (!formData?.rto_details?.address?.trim()) {
                valid = false;
                errors.address = 'Enter Address details!';
            }
            if (!formData?.rto_details?.pincode?.trim()) {
                valid = false;
                errors.pincode1 = 'Enter pincode!';
            }
            if (!formData?.rto_details?.city?.trim()) {
                valid = false;
                errors.city1 = 'Enter city name!';
            }
            if (!formData?.rto_details?.state?.trim()) {
                valid = false;
                errors.state1 = 'Enter state name!';
            }
            if (!formData?.rto_details?.country?.trim()) {
                valid = false;
                errors.country1 = 'Enter country name!';
            }
        }

        setFormErrors(errors);
        console.log(errors, "this is errors")
        return valid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            dispatch({
                type: "EDIT_WAREHOUSE_ACTION", payload: {
                    wareHouseId: wareHouseId,
                    formData: formData
                }
            });
            setEditWarehouse(false);
        }
    };

    const handlePincodeChange = async () => {
        const pincode = pincodeRef.current.value;
        if (pincode.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter a valid 6-digit pincode.',
                confirmButtonText: 'OK'
            });
            return;
        }
        try {
            const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
            if (response.data && response.data.length > 0) {
                const data = response.data[0];
                const postOffice = data.PostOffice[0];
                setFormData(prevState => ({
                    ...prevState,
                    rto_details: {
                        ...prevState.rto_details,
                        city: postOffice.District,
                        state: postOffice.State,
                        country: postOffice.Country
                    }
                }));
            } else {
                throw new Error('No data found for the given pincode.');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Invalid pincode! Please enter a valid pincode.',
                confirmButtonText: 'OK'
            });
        }
    };

    const handlePincodeChange1 = async () => {
        const pincode = pincodeRef1.current.value;

        if (pincode.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter a valid 6-digit pincode.',
                confirmButtonText: 'OK'
            });
            return;
        }

        try {
            const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);

            if (response.data && response.data.length > 0) {
                const data = response.data[0];
                const postOffice = data.PostOffice[0];
                console.log(postOffice, "postOfficepostOfficepostOffice")
                setFormData(prevState => ({
                    ...prevState,
                    city: postOffice.District,
                    state: postOffice.State,
                    country: postOffice.Country
                }));
            } else {
                throw new Error('No data found for the given pincode.');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleInputChange = (e, section) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name === 'contact_number') {
            if (value.length !== 10) {
                setFormErrors(prevErrors => ({
                    ...prevErrors,
                    [name]: 'Mobile number must be 10 digits.'
                }));
            } else {
                setFormErrors(prevErrors => ({
                    ...prevErrors,
                    [name]: ''
                }));
            }
        }
        if (name === 'gst_number') {
            if (value.length !== 15) {
                setFormErrors(prevErrors => ({
                    ...prevErrors,
                    [name]: 'GST number must be 15 digits.'
                }));
            } else {
                setFormErrors(prevErrors => ({
                    ...prevErrors,
                    [name]: ''
                }));
            }
        }
    };

    const handleInputChange1 = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            rto_details: {
                ...prevState.rto_details,
                [name]: value
            }
        }));
    }
    const handleCheckboxChange = () => {
        setSameRTO(!SameRTO);
        setFormData(prevState => ({
            ...prevState,
            is_rto_same: !SameRTO
        }));
    };

    const handleKeyPress = (e) => {
        const allowedCharacters = /^[a-zA-Z0-9\s!@#$%^&*(),.?":{}|<>]*$/;
        if (
            e.key === ' ' &&
            e.target.value.endsWith(' ')
        ) {
            e.preventDefault();
        } else if (!allowedCharacters.test(e.key)) {
            e.preventDefault();
        }
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popRef.current && !popRef.current.contains(event.target)) {
                setEditWarehouse(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setEditWarehouse]);


    return (
        <>
            <div className="modal-content" ref={popRef}>
                <form id="formSubmit" onSubmit={handleSubmit}>
                    <div className='box-shadow shadow-sm p10 w-100 add-warehouse-section'>
                        <div className='mx-auto mb-3'>
                            <div className='d-flex gap-3 flex-column flex-md-row'>
                                <label>
                                    <span>Warehouse Name <span className='mandatory'> *</span></span>
                                    <input
                                        type="text"
                                        value={formData.warehouse_name}
                                        onChange={(e) => handleInputChange(e, "")}
                                        className={`input-field`}
                                        name="warehouse_name"
                                        maxLength={100}
                                        placeholder='Enter Warehouse Name'
                                        onKeyPress={(e) => handleKeyPress(e)}
                                    />
                                    <br />
                                    <span className="custom-error">{formErrors.warehouse_name}</span>
                                </label>
                                <label>
                                    <span>Contact Person Name<span className='mandatory'> *</span></span>
                                    <input
                                        type="text"
                                        value={formData.contact_name}
                                        onChange={(e) => handleInputChange(e, "")}
                                        className={`input-field`}
                                        name="contact_name"
                                        maxLength={100}
                                        placeholder='Enter Contact Person Name'
                                        onKeyPress={(e) => handleKeyPress(e)}
                                    />
                                    <span className="custom-error">{formErrors.contact_name}</span>
                                </label>
                            </div>
                            <div className='d-flex gap-3 mt-3 flex-column flex-md-row'>
                                <label>
                                    <span>Contact Number<span className='mandatory'> *</span></span>
                                    <div className='d-flex mobile-number-field'>
                                        <select
                                            className='input-field '
                                            disabled
                                        >
                                            <option value="+91">+91</option>
                                        </select>
                                        <input
                                            type="text"
                                            maxLength={10}
                                            name="contact_number"
                                            className={`input-field`}
                                            placeholder='XXXXXXXXXX'
                                            value={formData.contact_number || ''}
                                            onChange={(e) => handleInputChange(e, "")}
                                            onKeyPress={(e) => {
                                                if (!/\d/.test(e.key)) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        />
                                    </div>
                                    <span className="custom-error">{formErrors.contact_number}</span>
                                </label>
                                <label>
                                    <span>GST Number<span className='mandatory'> *</span></span>
                                    <input
                                        type="text"
                                        maxLength={15}
                                        name="gst_number"
                                        className={`input-field`}
                                        placeholder='Enter GST Number'
                                        value={formData.gst_number || ''}
                                        onChange={(e) => handleInputChange(e, "")}
                                    />
                                    <span className="custom-error">{formErrors.gst_number}</span>
                                </label>
                            </div>
                            <div className='d-flex gap-3 mt-3 flex-column flex-md-row'>
                                <label>
                                    <span>Warehouse Address 1<span className='mandatory'> *</span></span>
                                    <input
                                        type="text"
                                        className={`input-field`}
                                        name="address_line1"
                                        maxLength={100}
                                        placeholder='Enter Warehouse Address 1'
                                        value={formData.address_line1 || ''}
                                        onChange={(e) => handleInputChange(e, "")}
                                        onKeyPress={(e) => handleKeyPress(e)}
                                    />
                                    <span className="custom-error">{formErrors.address_line1}</span>
                                </label>
                                <label>
                                    <span>Warehouse Address 2<span className='mandatory'> *</span></span>
                                    <input
                                        type="text"
                                        className={`input-field`}
                                        maxLength={100}
                                        name="address_line2"
                                        placeholder='Enter Warehouse Address 2'
                                        value={formData.address_line2 || ''}
                                        onChange={(e) => handleInputChange(e, "")}
                                        onKeyPress={(e) => handleKeyPress(e)}
                                    />
                                    <span className="custom-error">{formErrors.address_line2}</span>
                                </label>
                            </div>
                            <div className='d-flex gap-3 mt-3 flex-column flex-md-row'>
                                <label>
                                    <span>Pincode<span className='mandatory'> *</span></span>
                                    <input
                                        type="text"
                                        className={`input-field`}
                                        name="pincode"
                                        placeholder='Enter Pincode'
                                        ref={pincodeRef1}
                                        onBlur={handlePincodeChange1}
                                        maxLength={6}
                                        value={formData.pincode || ''}
                                        onKeyPress={(e) => {
                                            if (!/\d/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        onChange={(e) => handleInputChange(e, "")}
                                    />
                                    <span className="custom-error">{formErrors.pincode}</span>
                                </label>
                                <label>
                                    <span>City<span className='mandatory'> *</span></span>
                                    <input
                                        type="text"
                                        className='input-field'
                                        name="city"
                                        ref={cityRef1}
                                        disabled
                                        value={formData.city || ''}
                                        onChange={(e) => handleInputChange(e, "")}
                                        onKeyPress={(e) => handleKeyPress(e)}
                                    />
                                    <span className="custom-error">{formErrors.city}</span>
                                </label>
                            </div>
                            <div className='d-flex gap-3 mt-3 flex-column flex-md-row'>
                                <label>
                                    <span>State<span className='mandatory'> *</span></span>
                                    <input
                                        type="text"
                                        className='input-field'
                                        name="state"
                                        ref={stateRef1}
                                        disabled
                                        value={formData.state || ''}
                                        onChange={(e) => handleInputChange(e, "")}
                                    />
                                    <span className="custom-error">{formErrors.state}</span>
                                </label>
                                <label>
                                    <span>Country<span className='mandatory'> *</span></span>
                                    <input
                                        type="text"
                                        className='input-field'
                                        name="country"
                                        ref={countryRef1}
                                        disabled
                                        value={formData.country || ''}
                                        onChange={(e) => handleInputChange(e, "")}
                                    />
                                    <span className="custom-error">{formErrors.country}</span>
                                </label>
                            </div>
                            <div className='d-flex gap-3 mt-3 flex-column flex-md-row'>
                                <label>
                                    Support Email
                                    <input
                                        type="email"
                                        className='input-field'
                                        name="support_email"
                                        maxLength={100}
                                        placeholder='Enter Support Email'
                                        value={formData.support_email || ''}
                                        onChange={(e) => handleInputChange(e, "")}
                                    />
                                    {/* <span className="custom-error">{formErrors.support_email}</span> */}
                                </label>
                                <label>
                                    Support Phone
                                    <input
                                        type="text"
                                        className='input-field'
                                        name="support_phone"
                                        placeholder='Enter Support Contact'
                                        value={formData.support_phone || ''}
                                        maxLength={10}
                                        onChange={(e) => handleInputChange(e, "")}
                                        onKeyPress={(e) => {
                                            if (!/\d/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                    {/* <span className="custom-error">{formErrors.support_phone}</span> */}
                                </label>
                            </div>
                            <hr />
                            <label className='d-flex flex-row align-items-center mt-3 gap-2'>
                                <input
                                    type="checkbox"
                                    onChange={handleCheckboxChange}
                                    defaultChecked={!formData.is_rto_same}
                                />
                                Use a different address as RTO address
                            </label>
                            <div className={`d-flex flex-column gap-3 ${SameRTO ? '' : 'd-none'}`}>
                                <h3 className='mt-3 mb-0'>Add RTO Address</h3>
                                <div className='d-flex gap-3 flex-column flex-md-row'>
                                    <label>
                                        <span>Warehouse Name <span className='mandatory'> *</span></span>
                                        <input
                                            type="text"
                                            className='input-field'
                                            name="warehouse_name"
                                            placeholder='Enter Warehouse Name'
                                            value={formData.rto_details.warehouse_name || ''}
                                            onChange={(e) => handleInputChange1(e)}
                                            onKeyPress={(e) => handleKeyPress(e)}
                                        />
                                        <span className="custom-error">{formErrors.warehouse_name1}</span>
                                    </label>
                                    <label>
                                        <span>Contact Person Name<span className='mandatory'> *</span></span>
                                        <input
                                            type="text"
                                            className='input-field'
                                            name="contact_person_name"
                                            placeholder='Enter Contact Person Name'
                                            value={formData.rto_details.contact_person_name}
                                            onChange={(e) => handleInputChange1(e)}
                                            onKeyPress={(e) => handleKeyPress(e)}
                                        />
                                        <span className="custom-error">{formErrors.contact_person_name1}</span>
                                    </label>
                                </div>
                                <div className='d-flex gap-3 mt-3 flex-column flex-md-row'>
                                    <label>
                                        <span>Contact Number<span className='mandatory'> *</span></span>
                                        <input
                                            type="text"
                                            className='input-field'
                                            name="contact_number"
                                            placeholder='Enter Contact Person Number'
                                            value={formData.rto_details.contact_number || ''}
                                            onChange={(e) => handleInputChange1(e)}
                                            maxLength={10}
                                            onKeyPress={(e) => {
                                                if (!/\d/.test(e.key)) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        />
                                        <span className="custom-error">{formErrors.contact_number1}</span>
                                    </label>
                                    <label>
                                        Alternate Number
                                        <input
                                            type="text"
                                            className='input-field'
                                            name="alternate_number"
                                            placeholder='Enter Alternate Contact'
                                            value={formData.rto_details.alternate_number || ''}
                                            onChange={(e) => handleInputChange1(e)}
                                            maxLength={10}
                                            onKeyPress={(e) => {
                                                if (!/\d/.test(e.key)) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        />
                                    </label>
                                </div>
                                <div className='d-flex gap-3 mt-3 flex-column flex-md-row'>
                                    <label>
                                        <span>Email<span className='mandatory'> *</span></span>
                                        <input
                                            type="email"
                                            className='input-field'
                                            name="email"
                                            placeholder='Enter Email'
                                            value={formData.rto_details.email || ''}
                                            onChange={(e) => handleInputChange1(e)}

                                        />
                                        <span className="custom-error">{formErrors.email}</span>
                                    </label>
                                    <label>
                                        <span>Address<span className='mandatory'> *</span></span>
                                        <input
                                            type="text"
                                            className='input-field'
                                            name="address"
                                            placeholder='Enter Warehouse Address 1'
                                            value={formData.rto_details.address || ''}
                                            onChange={(e) => handleInputChange1(e)}
                                            maxLength={100}
                                            onKeyPress={(e) => handleKeyPress(e)}
                                        />
                                        <span className="custom-error">{formErrors.address}</span>
                                    </label>
                                </div>
                                <div className='d-flex gap-3 mt-3 flex-column flex-md-row'>
                                    <label>
                                        Landmark
                                        <input
                                            type="text"
                                            className='input-field'
                                            name="landmark"
                                            placeholder='Enter Landmark'
                                            value={formData.rto_details.landmark || ''}
                                            onChange={(e) => handleInputChange1(e)}
                                            maxLength={100}
                                            onKeyPress={(e) => handleKeyPress(e)}
                                        />
                                        <span className="custom-error">{formErrors.contact_number}</span>
                                    </label>
                                    <label>
                                        <span>Pincode<span className='mandatory'> *</span></span>
                                        <input
                                            type="text"
                                            className='input-field'
                                            name="pincode"
                                            placeholder='Enter Pincode'
                                            ref={pincodeRef}
                                            maxLength={6}
                                            onBlur={handlePincodeChange}
                                            value={formData.rto_details.pincode || ''}
                                            onChange={(e) => handleInputChange1(e)}
                                        />
                                        <span className="custom-error">{formErrors.pincode1}</span>
                                    </label>
                                </div>
                                <div className='d-flex gap-3 mt-3 flex-column flex-md-row'>
                                    <label>
                                        <span>City<span className='mandatory'> *</span></span>
                                        <input
                                            type="text"
                                            className='input-field'
                                            name="city"
                                            ref={cityRef}
                                            disabled
                                            value={formData.rto_details.city || ''}
                                            onChange={(e) => handleInputChange1(e)}
                                            maxLength={100}
                                            onKeyPress={(e) => handleKeyPress(e)}
                                        />
                                        <span className="custom-error">{formErrors.city1}</span>
                                    </label>
                                    <label>
                                        <span>State<span className='mandatory'> *</span></span>
                                        <input
                                            type="text"
                                            className='input-field'
                                            name="state"
                                            ref={stateRef}
                                            disabled
                                            value={formData.rto_details.state || ''}
                                            maxLength={100}
                                            onChange={(e) => handleInputChange1(e)}
                                        />
                                        <span className="custom-error">{formErrors.state1}</span>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <span>Country<span className='mandatory'> *</span></span>
                                        <input
                                            type="text"
                                            className='input-field'
                                            name="country"
                                            ref={countryRef}
                                            disabled
                                            value={formData.rto_details.country || ''}
                                            onChange={(e) => handleInputChange1(e)}
                                        />
                                        <span className="custom-error">{formErrors.country1}</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-end my-3'>
                        <button onClick={() => setEditWarehouse(false)} className='btn cancel-button' type='button'>
                            Cancel
                        </button>
                        <button className='btn main-button ms-2' type='submit'>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default EditWareHouse;
