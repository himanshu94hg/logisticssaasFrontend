import React, { useRef, useState } from 'react'
import './AddWarehouse.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddWarehouse = () => {

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const seller = 1;
            const warehouse_name = event.target.warehouse_name.value;
            const address_line1 = event.target.address_line1.value;
            const address_line2 = event.target.address_line2.value;
            const contact_name = event.target.contact_name.value;
            const contact_number = event.target.contact_number.value;
            const support_email = event.target.support_email.value;
            const support_phone = event.target.support_phone.value;
            const gst_number = event.target.gst_number.value;
            const pincode = event.target.pincode.value;
            const city = event.target.city.value;
            const state = event.target.state.value;
            const country = event.target.country.value;

            const response = await axios.post('http://65.2.38.87:8088/core-api/features/warehouse/', {
                seller,
                warehouse_name,
                address_line1,
                address_line2,
                contact_number,
                contact_name,
                support_phone,
                support_email,
                gst_number,
                city,
                state,
                pincode,
                country,
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



    const [AddFields, SetAddFields] = useState(false)
    const pincodeRef = useRef(null);
    const cityRef = useRef(null);
    const stateRef = useRef(null);
    const countryRef = useRef(null);

    const times = [
        '12:00 AM', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM', '6:00 AM',
        '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
        '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM',
        '9:00 PM', '10:00 PM', '11:00 PM'
    ];

    const handlePincodeChange = async () => {
        const pincode = pincodeRef.current.value;

        if (pincode.length !== 6) {
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

    return (
        <>
            <form id="formSubmit" onSubmit={handleSubmit}>
                <div className='box-shadow shadow-sm p10 w-100 add-warehouse-section'>
                    <div className='inputs-container mx-auto mb-3'>
                        <h3 className='mb-4'>Add New Pickup Address</h3>
                        <div className='d-flex gap-3'>
                            <label>
                                Warehouse Name(do not use special symbols)
                                <input
                                    type="text"
                                    className='input-field'
                                    name="warehouse_name"
                                    placeholder='Enter Warehouse Name'
                                />
                            </label>
                            <label>
                                Contact Person Name
                                <input
                                    type="text"
                                    className='input-field'
                                    name="contact_name"
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
                                    name="contact_number"
                                    placeholder='Enter Contact Person Number'
                                />
                            </label>
                            <label>
                                GST Number
                                <input
                                    type="text"
                                    className='input-field'
                                    name="gst_number"
                                    placeholder='Enter Contact Person Name'
                                />
                            </label>
                        </div>
                        <div className='d-flex gap-3 mt-3'>
                            <label>
                                Warehouse Address 1
                                <input
                                    type="text"
                                    className='input-field'
                                    name="address_line1"
                                    placeholder='Enter Contact Person Name'
                                />
                            </label>
                            <label>
                                Warehouse Address 2
                                <input
                                    type="text"
                                    className='input-field'
                                    name="address_line2"
                                    placeholder='Enter Contact Person Name'
                                />
                            </label>
                        </div>
                        <div className='d-flex gap-3 mt-3'>
                            <label>
                                Pincode
                                <input
                                    type="text"
                                    className='input-field'
                                    name="pincode"
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
                                    name="city"
                                    ref={cityRef}
                                    disabled
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
                                />
                            </label>
                            <label>
                                Country
                                <input
                                    type="text"
                                    className='input-field'
                                    name="country"
                                    ref={countryRef}
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
                                    placeholder='Enter Contact Person Name'
                                />
                            </label>
                            <label>
                                Support Phone
                                <input
                                    type="text"
                                    className='input-field'
                                    name="support_phone"
                                    placeholder='Enter Contact Person Name'
                                />
                            </label>
                        </div>


                        <div className="d-flex gap-3 mt-3">
                            <p onClick={() => SetAddFields(!AddFields)} className='add-fields-text'>
                                <span>Warehouse Timings</span>
                                {/* <span className='text-gray'> (Optional) <FontAwesomeIcon icon={AddFields ? faChevronUp : faChevronDown} /></span> */}
                            </p>
                        </div>

                        <div className={`d-flex gap-3 mt-3`}>
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


                        <h5 className='my-4'>Add RTO Address</h5>
                        <div className='d-flex gap-3'>
                            <label>
                                Warehouse Name(do not use sp    ecial symbols)
                                <input
                                    type="text"
                                    className='input-field'
                                    placeholder='Enter Warehouse Name'
                                />
                            </label>
                            <label>
                                Contact Person Name
                                <input
                                    type="text"
                                    className='input-field'
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
                                    plac0eholder='Enter Contact Person Name'
                                />
                            </label>
                            <label>
                                Alternate Number
                                <input
                                    type="text"
                                    className='input-field'
                                    placeholder='Enter Contact Person Name'
                                />
                            </label>
                            <label>
                                Email
                                <input
                                    type="text"
                                    className='input-field'
                                    placeholder='Enter Contact Person Name'
                                />
                            </label>
                        </div>
                        <div className='d-flex gap-3 mt-3'>
                            <label>
                                Address
                                <input
                                    type="text"
                                    className='input-field'
                                    placeholder='Enter Contact Person Name'
                                />
                            </label>
                            <label>
                                Landmark
                                <input
                                    type="text"
                                    className='input-field'
                                    placeholder='Enter Contact Person Name'
                                />
                            </label>
                        </div>
                        <div className='d-flex gap-3 mt-3'>
                            <label>
                                Pincode
                                <input
                                    type="text"
                                    className='input-field'
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
                                    ref={cityRef}
                                    disabled
                                />
                            </label>
                            <label>
                                State
                                <input
                                    type="text"
                                    className='input-field'
                                    ref={stateRef}
                                    disabled
                                />
                            </label>
                            <label>
                                Country
                                <input
                                    type="text"
                                    className='input-field'
                                    ref={countryRef}
                                    disabled
                                />
                            </label>
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