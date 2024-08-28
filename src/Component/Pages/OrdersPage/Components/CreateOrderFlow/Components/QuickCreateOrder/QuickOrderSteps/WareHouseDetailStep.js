import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import SingleShipPop from '../../../../Processing/SingleShipPop/SingleShipPop';
import { BASE_URL_CORE } from '../../../../../../../../axios/config';

const WareHouseDetailStep = ({ onPrev, onSubmit, formData, setFormData, setSingleShip, errors }) => {
    const dropdownRef = useRef(null);
    const authToken = Cookies.get("access_token");
    const [loading, setLoading] = useState(false);
    const [warehouses, setWarehouses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [filteredWarehouses, setFilteredWarehouses] = useState([]);


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
    console.log(errors, "errorserrorserrorserrors")


    return (
        <div>
            <div className='box-shadow p10 w-100 WD-page'>
                <div className='inputs-container mx-auto mb-3'>
                    <label className='mb-0'><span>Pick up from <span className='mandatory'>*</span></span></label>
                    <div className='wd-warehouse-dropdown mt-2' ref={dropdownRef}>
                        <div className={`wd-selected-option ${errors.warehouse_id && "input-field-error"}`} onClick={toggleDropdown}>
                            {formData.order_details.warehouse_id ? (
                                <span>
                                    {warehouses.find(warehouse => warehouse.id === formData.order_details.warehouse_id)?.warehouse_name}
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
                        {errors?.warehouse_id && <span className="custom-error">{errors?.warehouse_id}</span>}

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
            </div>
            <div className='d-flex justify-content-end my-3 cof-btn-container align-items-center'>
                <p style={{ color: '#dc3545' }} className='font13 mb-0'>{Object.keys(errors)?.length > 0 && '**Please fill all mandatory fields'}</p>
                <button className='btn main-button ms-3' onClick={onSubmit}>Quick Ship</button>
            </div>
        </div>
    );
};

export default WareHouseDetailStep;
