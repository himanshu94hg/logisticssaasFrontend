import React, { useRef, useState } from 'react'
import './AddWarehouse.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import "./AddWarehouse.css"

const AddWarehouse = () => {
    const [AddFields, SetAddFields] = useState(false)
    const [SameRTO, setSameRTO] = useState(false)
    const pincodeRef = useRef(null);
    const cityRef = useRef(null);
    const stateRef = useRef(null);
    const countryRef = useRef(null);
    const pincodeRef1 = useRef(null);
    const cityRef1 = useRef(null);
    const stateRef1 = useRef(null);
    const countryRef1 = useRef(null);
    const hardcodedToken = Cookies.get("access_token");
    const sellerData = Cookies.get("user_id");
    const [errors, setErrors] = useState({});


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
              // Get form data
            const warehouseName = event.target.warehouse_name.value;
            const contactName = event.target.contact_name.value;
            const contactNumber = event.target.contact_number.value;
            const gstNumber = event.target.gst_number.value;
            const addressLine1 = event.target.address_line1.value;
            const pincode = event.target.pincode.value;

            const seller = sellerData;
            const warehouse_name = event.target.warehouse_name.value;
            const address_line1 = event.target.address_line1.value;
            const address_line2 = event.target.address_line2.value;
            const contact_name = event.target.contact_name.value;
            const contact_number = event.target.contact_number.value;
            const support_email = event.target.support_email.value;
            const support_phone = event.target.support_phone.value;
            const gst_number = event.target.gst_number.value;
            const country_code = "+91";
            const city = event.target.city.value;
            const state = event.target.state.value;
            const country = event.target.country.value;

            // Validate form fields
            const newErrors = {};
            if (!warehouseName) {
                newErrors.warehouseName = "Warehouse Name is required";
            }
            if (!contactName) {
                newErrors.contactName = "Contact Person Name is required";
            }
            if (!contactNumber) {
                newErrors.contactNumber = "Contact Number is required";
            } else if (contactNumber.length !== 10) {
                newErrors.contactNumber = "Contact Number should be 10 digits";
            }
            if (!gstNumber) {
                newErrors.gstNumber = "GST Number is required";
            }  else if (!/^\d{15}$/.test(gstNumber) && gstNumber.length !== 15) {
                newErrors.gstNumber = "GST Number should contain exactly 15 digits ";
            }
            if (!addressLine1) {
                newErrors.addressLine1 = "Address Line 1 is required";
            }
            if (!pincode) {
                newErrors.pincode = "Pincode is required";
            } 
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }


            let rto_warehouse_name, rto_contact_person_name, rto_contact_number, rto_alternate_number, rto_email, rto_address, rto_landmark, rto_pincode, rto_city, rto_state, rto_country;

            if (!SameRTO) {
                rto_warehouse_name = warehouse_name;
                rto_contact_person_name = contact_name;
                rto_contact_number = contact_number;
                rto_alternate_number = '';
                rto_email = support_email;
                rto_address = address_line1 + ', ' + address_line2;
                rto_landmark = '';
                rto_pincode = pincode;
                rto_city = city;
                rto_state = state;
                rto_country = country;
            } else {
                rto_warehouse_name = event.target.rto_warehouse_name.value;
                rto_contact_person_name = event.target.rto_contact_person_name.value;
                rto_contact_number = event.target.rto_contact_number.value;
                rto_alternate_number = event.target.rto_alternate_number.value;
                rto_email = event.target.rto_email.value;
                rto_address = event.target.rto_address.value;
                rto_landmark = event.target.rto_landmark.value;
                rto_pincode = event.target.rto_pincode.value;
                rto_city = event.target.rto_city.value;
                rto_state = event.target.rto_state.value;
                rto_country = event.target.rto_country.value;
            }

            const formData = {
                seller,
                warehouse_name,
                address_line1,
                address_line2,
                contact_number,
                contact_name,
                support_phone,
                support_email,
                gst_number,
                country_code,
                city,
                state,
                pincode,
                country,
                rto_details: {
                    warehouse_name: rto_warehouse_name,
                    contact_person_name: rto_contact_person_name,
                    contact_number: rto_contact_number,
                    alternate_number: rto_alternate_number,
                    email: rto_email,
                    address: rto_address,
                    landmark: rto_landmark,
                    pincode: rto_pincode,
                    city: rto_city,
                    state: rto_state,
                    country: rto_country
                }
            };

            const response = await axios.post('https://dev.shipease.in/core-api/features/warehouse/', formData,{
                headers: {
                    'Authorization': `Bearer ${hardcodedToken}`,    
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response:', response);

            if (response.status === 201) {
                const responseData = response.data;
                console.log('API Response:', responseData);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Warehouse added successfully!',
                    confirmButtonText: 'OK'
                }).then(() => {
                    const form = document.getElementById('formSubmit');
                    const formInputs = form.querySelectorAll('input');
                    formInputs.forEach(input => {
                        input.value = null;
                    });
                    SetAddFields(false);    
                    setSameRTO(false);
                });
            } else {
                const errorData = response.data;
                console.error('API Error:', errorData);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to add warehouse. Please try again later.',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error('Fetch Error:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to add warehouse. Please try again later.',
                confirmButtonText: 'OK'
            });
        }
    };



    const times = [
        '12:00 AM', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM', '6:00 AM',
        '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
        '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM',
        '9:00 PM', '10:00 PM', '11:00 PM'
    ];

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
                cityRef.current.value = postOffice.District;
                stateRef.current.value = postOffice.State;
                countryRef.current.value = postOffice.Country;
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
                const postOffice1 = data.PostOffice[0];
                cityRef1.current.value = postOffice1.District;
                stateRef1.current.value = postOffice1.State;
                countryRef1.current.value = postOffice1.Country;
            } else {
                throw new Error('No data found for the given pincode.');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
          
        }
    };

    const validateData=()=>{
        
    }

    return (
        <>
            <form id="formSubmit" onSubmit={handleSubmit}>
                <div className='box-shadow shadow-sm p10 w-100 add-warehouse-section'>
                    <div className='inputs-container mx-auto mb-3'>
                        <h3 className='mb-4'>Add New Warehouse</h3>
                        <div className='d-flex gap-3'>
                            <label>
                                Warehouse Name(do not use special symbols)
                                <input
                                    type="text"
                                    className={`input-field ${errors.warehouseName&&'input-field-error'}`}
                                    name="warehouse_name"
                                    placeholder='Enter Warehouse Name'
                                />
                                  {errors.warehouseName && <div className="error">{errors.warehouseName}</div>}
                            </label>
                            <label>
                                Contact Person Name
                                <input
                                    type="text"
                                    className={`input-field ${errors.contactName&&'input-field-error'}`}
                                    name="contact_name"
                                    placeholder='Enter Contact Person Name'
                                />
                                 {errors.contactName && <div className="error">{errors.contactName}</div>}
                            </label>
                        </div>
                        <div className='d-flex gap-3 mt-3'>
                            <label>
                                Contact Number
                                <input
                                    type="text"
                                    className={`input-field ${errors.contactNumber&&'input-field-error'}`}
                                    name="contact_number"
                                    placeholder='Enter Contact Person Number'
                                    maxLength={10} 
                                    onKeyPress={(e) => {
                                        if (!/\d/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                                  {errors.contactNumber && <div className="error">{errors.contactNumber}</div>}
                            </label>
                            <label>
                                GST Number
                                <input
                                    type="text"
                                    className={`input-field ${errors.gstNumber&&'input-field-error'}`}
                                    name="gst_number"
                                    placeholder='Enter GST Number'
                                    maxLength={15}
                                />
                                 {errors.gstNumber && <div className="error">{errors.gstNumber}</div>}
                            </label>
                        </div>
                        <div className='d-flex gap-3 mt-3'>
                            <label>
                                Warehouse Address 1
                                <input
                                    type="text"
                                    className={`input-field ${errors.addressLine1&&'input-field-error'}`}
                                    name="address_line1"
                                    placeholder='Enter Warehouse Address 1'
                                />
                                 {errors.addressLine1 && <div className="error">{errors.addressLine1}</div>}
                            </label>
                            <label>
                                Warehouse Address 2
                                <input
                                    type="text"
                                    className={`input-field`}
                                    name="address_line2"
                                    placeholder='Enter Warehouse Address 2'
                                />
                            </label>
                        </div>
                        <div className='d-flex gap-3 mt-3'>
                            <label>
                                Pincode
                                <input
                                    type="text"
                                    className={`input-field ${errors.pincode&&'input-field-error'}`}
                                    name="pincode"
                                    placeholder='Enter Pincode'
                                    ref={pincodeRef1}
                                    onBlur={handlePincodeChange1}
                                />
                                 {errors.pincode && <div className="error">{errors.pincode}</div>}
                            </label>
                            <label>
                                City
                                <input
                                    type="text"
                                    className='input-field'
                                    name="city"
                                    ref={cityRef1}
                                    disabled
                                />
                            </label>
                            <label>
                                State
                                <input
                                    type="text"
                                    className='input-field'
                                    name="state"
                                    ref={stateRef1}
                                    disabled
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
                                />
                            </label>
                            <label>
                                Support Phone
                                <input
                                    type="text"
                                    className='input-field'
                                    name="support_phone"
                                    placeholder='Enter Support Contact'
                                />
                            </label>
                        </div>


                        <div className="d-flex gap-3 mt-3">
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
                        <label className='d-flex flex-row align-items-center mt-3'>
                            <input type="checkbox" onChange={() => setSameRTO(!SameRTO)} />
                            Use a different address as RTO address
                        </label>
                        <div className={`d-flex flex-column gap-3 ${SameRTO ? '' : 'd-none'}`}>
                            <h3 className='mt-3 mb-0'>Add RTO Address</h3>
                            <div className='d-flex gap-3'>
                                <label>
                                    Warehouse Name(do not use sp    ecial symbols)
                                    <input
                                        type="text"
                                        className='input-field'
                                        name="rto_warehouse_name"
                                        placeholder='Enter Warehouse Name'
                                    />
                                </label>
                                <label>
                                    Contact Person Name
                                    <input
                                        type="text"
                                        className='input-field'
                                        name="rto_contact_person_name"
                                        placeholder='Enter Contact Person Name'
                                    />
                                </label>
                            </div>
                            <div className='d-flex gap-3 mt-3'>
                                <label>
                                    Contact Number
                                    <input
                                        type="text"
                                        className='input-field'
                                        name="rto_contact_number"
                                        plac0eholder='Enter Contact Person Number'
                                    />
                                </label>
                                <label>
                                    Alternate Number
                                    <input
                                        type="text"
                                        className='input-field'
                                        name="rto_alternate_number"
                                        placeholder='Enter Alternate Contact'
                                    />
                                </label>
                                <label>
                                    Email
                                    <input
                                        type="text"
                                        className='input-field'
                                        name="rto_email"
                                        placeholder='Enter Email'
                                    />
                                </label>
                            </div>
                            <div className='d-flex gap-3 mt-3'>
                                <label>
                                    Address
                                    <input
                                        type="text"
                                        className='input-field'
                                        name="rto_address"
                                        placeholder='Enter Warehouse Address 1'
                                    />
                                </label>
                                <label>
                                    Landmark
                                    <input
                                        type="text"
                                        className='input-field'
                                        name="rto_landmark"
                                        placeholder='Enter Landmark'
                                    />
                                </label>
                            </div>
                            <div className='d-flex gap-3 mt-3'>
                                <label>
                                    Pincode
                                    <input
                                        type="text"
                                        className='input-field'
                                        name="rto_pincode"
                                        placeholder='Enter Pincode'
                                        ref={pincodeRef}
                                        onBlur={handlePincodeChange}
                                    />
                                </label>
                                <label>
                                    City
                                    <input
                                        type="text"
                                        className='input-field'
                                        name="rto_city"
                                        ref={cityRef}
                                        disabled
                                    />
                                </label>
                                <label>
                                    State
                                    <input
                                        type="text"
                                        className='input-field'
                                        name="rto_state"
                                        ref={stateRef}
                                        disabled
                                    />
                                </label>
                                <label>
                                    Country
                                    <input
                                        type="text"
                                        className='input-field'
                                        name="rto_country"
                                        ref={countryRef}
                                        disabled
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
    )
}

export default AddWarehouse