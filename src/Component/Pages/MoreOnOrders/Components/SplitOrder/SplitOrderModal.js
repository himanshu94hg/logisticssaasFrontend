import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import { BASE_URL_CORE, BASE_URL_ORDER } from "../../../../../axios/config";
import { customErrorFunction } from '../../../../../customFunction/errorHandling';
import { FaInfoCircle } from 'react-icons/fa';


function SplitOrderModal({ show, handleClose, orderDetails, setSplitStatus }) {
    const [loading, setLoading] = useState(false);
    const authToken = Cookies.get("access_token");
    const [warehouseData, setWarehouseData] = useState([]);
    const [selectedWarehouses, setSelectedWarehouses] = useState([]);

    useEffect(() => {
        if (show && orderDetails?.id) {
            setLoading(true);
            axios.get(`${BASE_URL_CORE}/core-api/features/warehouse/`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }).then((response) => {
                setWarehouseData(response.data);
                const initialSelectedWarehouses = orderDetails.order_products.map(product => {
                    const warehouse = response.data.find(warehouse => warehouse.warehouse_name === (orderDetails?.pickup_details?.p_warehouse_name || ''));
                    return warehouse ? warehouse.id : '';
                });
                setSelectedWarehouses(initialSelectedWarehouses);
                setLoading(false);
            }).catch(error => {
                setLoading(false);
                customErrorFunction(error);
            });
        }
    }, [show, orderDetails]);


    const handleSplitOrder = () => {
        const requestData = {
            order_id: orderDetails.id,
            split: orderDetails.order_products.map((product, index) => ({
                product_id: product.id,
                warehouse_id: selectedWarehouses[index]
            }))
        };
        axios.post(`${BASE_URL_ORDER}/orders-api/orders/split-order/`, requestData, {
            headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json"
            }
        }).then(response => {
            toast.success('Order Split Successfully.');
            setSplitStatus(new Date())
            handleClose();
        }).catch(error => {
            customErrorFunction(error);
        });
    };

    return (
        <Modal className="confirmation-modal split-order-popup" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Split Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mx-3">
                    <table className="w-100">
                        <thead>
                            <tr>
                                <th>Sr.No</th>
                                <th>Item Name & SKU</th>
                                <th>Warehouse to Ship</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetails?.order_products.map((product, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{product.product_name}</td>
                                    <td>
                                        <select
                                            className='select-field'
                                            style={{ width: '100%', maxWidth: '200px' }}
                                            value={selectedWarehouses[index]}
                                            onChange={(e) => {
                                                const newSelectedWarehouses = [...selectedWarehouses];
                                                newSelectedWarehouses[index] = e.target.value;
                                                setSelectedWarehouses(newSelectedWarehouses);
                                            }}>
                                            <option value="">Select Warehouse</option>
                                            {warehouseData.map((warehouse, warehouseIndex) => (
                                                <option
                                                    key={warehouseIndex}
                                                    value={warehouse.id}
                                                >
                                                    {warehouse.warehouse_name}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <p className="font12 d-flex align-items-center gap-1">
                    <FaInfoCircle color="#1975C9" className="font15" />
                    Split will create custom orders.
                </p>
                <div className="d-flex gap-2">
                    <button className="btn cancel-button" onClick={handleClose}>Cancel</button>
                    <button className="btn main-button" onClick={handleSplitOrder} disabled={loading}>{loading ? 'Splitting...' : 'Continue'}</button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default SplitOrderModal;