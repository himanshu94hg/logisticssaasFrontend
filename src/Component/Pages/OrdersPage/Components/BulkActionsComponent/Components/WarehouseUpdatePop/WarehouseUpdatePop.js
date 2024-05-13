import React, { useEffect, useRef, useState } from 'react'
import './WarehouseUpdatePop.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { BASE_URL_CORE } from '../../../../../../../axios/config';
import { toast } from 'react-toastify';
import { customErrorFunction } from '../../../../../../../customFunction/errorHandling';

const WarehouseUpdatePop = ({ setUpdateWarehouse, selectedRows, UpdateWarehouse }) => {
    const dispatch = useDispatch()
    const dropdownRef = useRef(null);
    const [warehouses, setWarehouses] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [formData, setFormData] = useState({
        order_details: {
            customer_order_number: '',
            invoice_amount: '',
            is_mps: false,
            warehouse_id: '',
            order_tag: [],
            payment_type: '',
            order_date: '',
            order_type: "",
            channel: "custom",
            channel_id: null
        },
    })
    const [loading, setLoading] = useState(false);
    const authToken = Cookies.get("access_token");
    const sellerData = Cookies.get("user_id");
    const [filteredWarehouses, setFilteredWarehouses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchWarehouses = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL_CORE}/core-api/features/warehouse/`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
                setWarehouses(response.data);
                setFilteredWarehouses(response.data);
            } catch (error) {
                customErrorFunction(error);
            } finally {
                setLoading(false);
            }
        };
        fetchWarehouses();
    }, [authToken]);

    useEffect(() => {
        const filtered = warehouses.filter(warehouse =>
            warehouse.warehouse_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredWarehouses(filtered);
    }, [searchTerm, warehouses]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleOptionClick = (warehouseId) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            order_details: {
                ...prevFormData.order_details,
                warehouse_id: warehouseId
            }
        }));
        setShowDropdown(false);
    };

    const clearSelection = () => {
        setFormData(prevFormData => ({
            ...prevFormData,
            order_details: {
                ...prevFormData.order_details,
                warehouse_id: ''
            }
        }));
        setShowDropdown(false);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    return (
        <>
            <div className={`ba-pop-show warehouse-update ${UpdateWarehouse ? 'open' : ''}`}>
                <div style={{ width: '500px', height: '400px' }} className='d-flex flex-column ws-nowrap '>
                    <div className="pop-heading">
                        <h4>Update Warehouse</h4>
                    </div>
                    <div className='pop-content'>
                        <div className='wd-warehouse-dropdown mt-2' ref={dropdownRef}>
                            <div className="wd-selected-option" onClick={toggleDropdown}>
                                {formData.order_details.warehouse_id ? (
                                    <span>
                                        {warehouses.find(warehouse => warehouse.id === formData.order_details.warehouse_id)?.warehouse_name} {/*- ({warehouses.find(warehouse => warehouse.id === formData.order_details.warehouse_id)?.code}) */}
                                    </span>
                                ) : (<span className='font14'>Select your Warehouse</span>)}
                                <div>
                                    {formData.order_details.warehouse_id && (
                                        <span className="wd-clear-selection me-2" onClick={clearSelection}>
                                            &#x2715;
                                        </span>
                                    )}
                                    {showDropdown ? (<FontAwesomeIcon icon={faChevronUp} />) :
                                        (<FontAwesomeIcon icon={faChevronDown} />)}
                                </div>

                            </div>
                            {showDropdown && (
                                <div className="wd-dropdown-content">
                                    <input
                                        type="text"
                                        placeholder="Search warehouse..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="wd-search-input"
                                    />
                                    <div className="wd-options">
                                        {loading ? (
                                            <div>Loading...</div>
                                        ) : filteredWarehouses.length > 0 ? (
                                            filteredWarehouses.map(warehouse => (
                                                <div key={warehouse.id} className="wd-option" onClick={() => handleOptionClick(warehouse.id)}>
                                                    <span className=''><span className='fw-bold'>{warehouse.warehouse_name}</span> - ({warehouse.warehouse_code || '0000000'})</span> <br /> <span className='font13'>{warehouse.address_line1}, near {warehouse.address_line2}, {warehouse.city}, {warehouse.state}, {warehouse.pincode}, {warehouse.country}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div>No warehouses found.</div>
                                        )}
                                    </div>


                                </div>
                            )}
                        </div>
                    </div>
                    <div className='d-flex justify-content-end w-100 my-2 pe-2'>
                        <button onClick={() => setUpdateWarehouse(false)} className='btn cancel-button me-2'>Cancel</button>
                        <button onClick={() => {
                            setUpdateWarehouse(false)
                            dispatch({
                                type: "BULK_PICKUP_ADDRESS_UPDATE_ACTION", payload: {
                                    order_ids: selectedRows,
                                    warehouse_id: formData?.order_details?.warehouse_id
                                }
                            })
                        }} className='btn main-button'>Apply</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WarehouseUpdatePop