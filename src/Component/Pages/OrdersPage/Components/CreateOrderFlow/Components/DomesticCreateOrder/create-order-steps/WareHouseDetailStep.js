import axios from 'axios';
import Swal from 'sweetalert2';
import 'react-toggle/style.css';
import Cookies from 'js-cookie';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';



export const WareHouseDetailStep = ({ onPrev, onSubmit, formData, setFormData,wareHouseName }) => {
    const [warehouses, setWarehouses] = useState([]);
    const [loading, setLoading] = useState(false);

    const authToken = Cookies.get("access_token");
    const sellerData = Cookies.get("user_id");


    useEffect(() => {
        const fetchWarehouses = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://dev.shipease.in/core-api/features/warehouse/?seller_id=${sellerData}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
                setWarehouses(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                toast.error("Failed to fetch warehouses. Please try again later")
            }
        };

        fetchWarehouses();
    }, []);

    useEffect(() => {
        if (warehouses) {
            let data = warehouses?.filter(item => item?.warehouse_name === wareHouseName)
            setFormData(prevFormData => ({
                ...prevFormData,
                order_details: {
                    ...prevFormData.order_details,
                    warehouse_id: data[0]?.id
                }
            }));
        }
    }, [warehouses])

    const handleRadioChange = (e) => {
        const selectedWarehouseId = parseInt(e.target.value);
        setFormData(prevFormData => ({
            ...prevFormData,
            order_details: {
                ...prevFormData.order_details,
                warehouse_id: selectedWarehouseId
            }
        }));
    };

   

    return (
        <div>
            <div className='box-shadow shadow-sm p10 w-100 form-box-h'>
                <div className='inputs-container mx-auto mb-3'>
                    <h3 className='mb-4'>Warehouse Details</h3>
                    <div className='warehouse-options mt-3'>
                        <div className="row">
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                warehouses.map(warehouse => (
                                    <div key={warehouse.id} className="col-lg-4 col-md-6 mb-4 cursor-pointer sm-warehouse-item">
                                        <label>
                                            <input
                                                type="radio"
                                                name="warehouse"
                                                value={warehouse.id}
                                                checked={formData.order_details.warehouse_id === warehouse.id}
                                                onChange={handleRadioChange}
                                            />
                                            <div className='d-flex h-100 flex-column justify-content-between'>
                                                <div>
                                                    <p className='warehouse-heading'>{warehouse.warehouse_name}</p>
                                                    <p className='warehouse-description'>{warehouse.address_line1}, near {warehouse.address_line2}, {warehouse.city}, {warehouse.state}, {warehouse.pincode}, {warehouse.country}</p>
                                                </div>
                                                <p className="warehouse-description font13 mt-3">Mobile: {warehouse.contact_number}</p>
                                            </div>
                                        </label>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-end my-3 cof-btn-container'>
                <button className='btn main-button-outline' onClick={onPrev}>Previous</button>
                <button className='btn main-button ms-3' onClick={onSubmit}>Submit</button>
            </div>
        </div>
    );
};
