import React, { useRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import './Components/AddWarehouse.css';

const EditWareHouse = () => {
    const [SameRTO, setSameRTO] = useState(false);
    const pincodeRef = useRef(null);
    const cityRef = useRef(null);
    const stateRef = useRef(null);
    const countryRef = useRef(null);
    const pincodeRef1 = useRef(null);
    const cityRef1 = useRef(null);
    const stateRef1 = useRef(null);
    const countryRef1 = useRef(null);
    const hardcodedToken = Cookies.get("access_token");
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
        is_rto_same: false,
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

    console.log(formData, "this is a address data");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newErrors = {};
            const response = await axios.post('https://dev.shipease.in/core-api/features/warehouse/', formData, {
                headers: {
                    'Authorization': `Bearer ${hardcodedToken}`,
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error('Fetch Error:', error);
            toast.error(error?.response?.data?.detail);
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
                    city: postOffice.District,
                    state: postOffice.State,
                    country: postOffice.Country
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
                console.log(postOffice,"postOfficepostOfficepostOffice")
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
        console.log (name, value,'this is action data')
        if (section === "rto_details") {
            // setFormData({
            //     ...formData,
            //     rto_details: {
            //         ...formData.rto_details,
            //         [name]: value
            //     }
            // });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    return (
        <>
            <form id="formSubmit" onSubmit={handleSubmit}>
                <div className='box-shadow shadow-sm p10 w-100 add-warehouse-section'>
                    <div className='mx-auto mb-3'>
                        <div className='d-flex gap-3'>
                            <label>
                                Warehouse Name
                                <input
                                    type="text"
                                    value={formData.warehouse_name}
                                    onChange={(e) => handleInputChange(e, "")}
                                    className={`input-field`}
                                    name="warehouse_name"
                                    placeholder='Enter Warehouse Name'
                                />
                            </label>
                            <label>
                                Contact Person Name
                                <input
                                    type="text"
                                    value={formData.contact_name}
                                    onChange={(e) => handleInputChange(e, "")}
                                    className={`input-field`}
                                    name="contact_name"
                                    placeholder='Enter Contact Person Name'
                                />
                            </label>
                        </div>
                        <div className='d-flex gap-3 mt-3'>
                            <label>
                                Contact Number
                                <div className='d-flex mobile-number-field'>
                                    <select
                                        className='input-field '
                                        disabled
                                    >
                                        <option value="+91">+91</option>
                                    </select>
                                    <input
                                        type="text"
                                        className={`input-field`}
                                        name="contact_number"
                                        placeholder='XXXXXXXXXX'
                                        value={formData.contact_number || ''}
                                        maxLength={10}
                                        onChange={(e) => handleInputChange(e, "")}
                                        onKeyPress={(e) => {
                                            if (!/\d/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                </div>
                            </label>
                            <label>
                                GST Number
                                <input
                                    type="text"
                                    className={`input-field`}
                                    name="gst_number"
                                    placeholder='Enter GST Number'
                                    maxLength={15}
                                    value={formData.gst_number || ''}
                                    onChange={(e) => handleInputChange(e, "")}
                                />
                            </label>
                        </div>
                        <div className='d-flex gap-3 mt-3'>
                            <label>
                                Warehouse Address 1
                                <input
                                    type="text"
                                    className={`input-field`}
                                    name="address_line1"
                                    placeholder='Enter Warehouse Address 1'
                                    value={formData.address_line1 || ''}
                                    onChange={(e) => handleInputChange(e, "")}
                                />
                            </label>
                            <label>
                                Warehouse Address 2
                                <input
                                    type="text"
                                    className={`input-field`}
                                    name="address_line2"
                                    placeholder='Enter Warehouse Address 2'
                                    value={formData.address_line2 || ''}
                                    onChange={(e) => handleInputChange(e, "")}
                                />
                            </label>
                        </div>
                        <div className='d-flex gap-3 mt-3'>
                            <label>
                                Pincode
                                <input
                                    type="text"
                                    className={`input-field`}
                                    name="pincode"
                                    placeholder='Enter Pincode'
                                    ref={pincodeRef1}
                                    onBlur={handlePincodeChange1}
                                    value={formData.pincode || ''}
                                    onKeyPress={(e) => {
                                        if (!/\d/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    onChange={(e) => handleInputChange(e, "")}
                                />
                            </label>
                            <label>
                                City
                                <input
                                    type="text"
                                    className='input-field'
                                    name="city"
                                    ref={cityRef1}
                                    disabled
                                    value={formData.city || ''}
                                    onChange={(e) => handleInputChange(e, "")}
                                />
                            </label>
                        </div>
                        <div className='d-flex gap-3 mt-3'>
                            <label>
                                State
                                <input
                                    type="text"
                                    className='input-field'
                                    name="state"
                                    ref={stateRef1}
                                    disabled
                                    value={formData.state || ''}
                                    onChange={(e) => handleInputChange(e, "")}
                                />
                            </label>
                            <label>
                                Country
                                <input
                                    type="text"
                                    className='input-field'
                                    name="country"
                                    ref={countryRef1}
                                    disabled
                                    value={formData.country || ''}
                                    onChange={(e) => handleInputChange(e, "")}
                                />
                            </label>
                        </div>
                        <div className='d-flex gap-3 mt-3'>
                            <label>
                                Support Email
                                <input
                                    type="text"
                                    className='input-field'
                                    name="support_email"
                                    placeholder='Enter Support Email'
                                    value={formData.support_email || ''}
                                    onChange={(e) => handleInputChange(e, "")}
                                />
                            </label>
                            <label>
                                Support Phone
                                <input
                                    type="text"
                                    className='input-field'
                                    name="support_phone"
                                    placeholder='Enter Support Contact'
                                    value={formData.support_phone || ''}
                                    onChange={(e) => handleInputChange(e, "")}
                                />
                            </label>
                        </div>
                        <hr />
                        <label className='d-flex flex-row align-items-center mt-3'>
                            <input type="checkbox" onChange={() => setSameRTO(!SameRTO)} defaultChecked={true} />
                            Use a different address as RTO address
                        </label>
                        <div className={`d-flex flex-column gap-3 ${SameRTO ? '' : 'd-none'}`}>
                            <h3 className='mt-3 mb-0'>Add RTO Address</h3>
                            <div className='d-flex gap-3'>
                                <label>
                                    Warehouse Name
                                    <input
                                        type="text"
                                        className='input-field'
                                        name="warehouse_name"
                                        placeholder='Enter Warehouse Name'
                                        value={formData.rto_details.warehouse_name || ''}
                                        onChange={(e) => handleInputChange(e, "rto_details")}
                                    />
                                </label>
                                <label>
                                    Contact Person Name
                                    <input
                                        type="text"
                                        className='input-field'
                                        name="contact_person_name"
                                        placeholder='Enter Contact Person Name'
                                        value={formData.rto_details.contact_person_name}
                                        onChange={(e) => handleInputChange(e, "rto_details")}
                                    />
                                </label>
                            </div>
                            <div className='d-flex gap-3 mt-3'>
                                <label>
                                    Contact Number
                                    <input
                                        type="text"
                                        className='input-field'
                                        name="contact_number"
                                        placeholder='Enter Contact Person Number'
                                        value={formData.rto_details.contact_number || ''}
                                        onChange={(e) => handleInputChange(e, "rto_details")}
                                    />
                                </label>
                                <label>
                                    Alternate Number
                                    <input
                                        type="text"
                                        className='input-field'
                                        name="rto_alternate_number"
                                        placeholder='Enter Alternate Contact'
                                        value={formData.rto_details.alternate_number || ''}
                                        onChange={(e) => handleInputChange(e, "rto_details")}
                                    />
                                </label>
                            </div>
                            <div className='d-flex gap-3 mt-3'>
                                <label>
                                    Email
                                    <input
                                        type="text"
                                        className='input-field'
                                        name="email"
                                        placeholder='Enter Email'
                                        value={formData.rto_details.email || ''}
                                        onChange={(e) => handleInputChange(e, "rto_details")}
                                    />
                                </label>
                                <label>
                                    Address
                                    <input
                                        type="text"
                                        className='input-field'
                                        name="address"
                                        placeholder='Enter Warehouse Address 1'
                                        value={formData.rto_details.address || ''}
                                        onChange={(e) => handleInputChange(e, "rto_details")}
                                    />
                                </label>
                            </div>
                            <div className='d-flex gap-3 mt-3'>
                                <label>
                                    Landmark
                                    <input
                                        type="text"
                                        className='input-field'
                                        name="landmark"
                                        placeholder='Enter Landmark'
                                        value={formData.rto_details.landmark || ''}
                                        onChange={(e) => handleInputChange(e, "rto_details")}
                                    />
                                </label>
                                <label>
                                    Pincode
                                    <input
                                        type="text"
                                        className='input-field'
                                        name="pincode"
                                        placeholder='Enter Pincode'
                                        ref={pincodeRef}
                                        onBlur={handlePincodeChange}
                                        value={formData.rto_details.pincode || ''}
                                        onChange={(e) => handleInputChange(e, "rto_details")}
                                    />
                                </label>
                            </div>
                            <div className='d-flex gap-3 mt-3'>
                                <label>
                                    City
                                    <input
                                        type="text"
                                        className='input-field'
                                        name="city"
                                        ref={cityRef}
                                        disabled
                                        value={formData.rto_details.city || ''}
                                        onChange={(e) => handleInputChange(e, "rto_details")}
                                    />
                                </label>
                                <label>
                                    State
                                    <input
                                        type="text"
                                        className='input-field'
                                        name="state"
                                        ref={stateRef}
                                        disabled
                                        value={formData.rto_details.state || ''}
                                        onChange={(e) => handleInputChange(e, "rto_details")}
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Country
                                    <input
                                        type="text"
                                        className='input-field'
                                        name="country"
                                        ref={countryRef}
                                        disabled
                                        value={formData.rto_details.country || ''}
                                        onChange={(e) => handleInputChange(e, "rto_details")}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-end my-3'>
                        <button className='btn main-button-outline' type='reset'>
                            Reset
                        </button>
                        <button className='btn main-button ms-2' type='submit'>
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default EditWareHouse;
