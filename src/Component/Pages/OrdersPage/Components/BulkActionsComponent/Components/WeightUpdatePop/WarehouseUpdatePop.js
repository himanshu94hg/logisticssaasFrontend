import React, { useEffect, useRef, useState } from 'react'
import './WarehouseUpdatePop.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const WarehouseUpdatePop = ({ setUpdateWarehouse, UpdateWarehouse }) => {
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
        shipping_details: {
            recipient_name: "",
            address: "",
            landmark: "",
            country: "India",
            state: "",
            city: "",
            pincode: "",
            mobile_number: "",
            email: "",
            company_name: "",
            contact_code: "91"
        },
        billing_details: {
            customer_name: "",
            address: "",
            landmark: "",
            country: "India",
            state: "",
            city: "",
            pincode: "",
            mobile_number: "",
            email: "",
            company_name: "",
            contact_code: "91"
        },
        other_details: {
            number_of_packets: 0,
            reseller_name: ""
        },
        charge_details: {
            cod_charges: '',
            shipping_charges: '',
            transaction_fee: '',
            is_gift_wrap: true
        },
        dimension_details: {
            weight: '',
            length: '',
            breadth: '',
            height: '',
            vol_weight: ''
        },
        product_details: [
            {
                product_name: "",
                quantity: '',
                unit_price: 0,
                product_category: "",
                weight: 0,
                sku: "",
                hsn_code: "",
                tax_rate: null,
                product_discount: 0,
                hts_number: "",
                export_reference_number: ""
            }
        ],
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
                const response = await axios.get(`https://dev.shipease.in/core-api/features/warehouse/?seller_id=${sellerData}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
                setWarehouses(response.data);
                setFilteredWarehouses(response.data);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response ? error.response.data.message : 'Failed to fetch warehouses. Please try again later.',
                    confirmButtonText: 'OK'
                });
            } finally {
                setLoading(false);
            }
        };
        fetchWarehouses();
    }, [authToken, sellerData]);

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
                                    <input
                                        type="text"
                                        placeholder="Search warehouse..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="wd-search-input"
                                    />

                                </div>
                            )}
                        </div>
                    </div>
                    <div className='d-flex justify-content-end w-100 my-2 pe-2'>
                        <button onClick={() => setUpdateWarehouse(false)} className='btn main-button'>Apply</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WarehouseUpdatePop