import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import { BASE_URL_CORE, BASE_URL_ORDER } from "../../../../../axios/config";
import { customErrorFunction } from '../../../../../customFunction/errorHandling';


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
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Split Order</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-1'>
                <div className="card">
                    <div className="card-body">
                        <table className="table table-bordered">
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
                                                style={{ width: '100%' }}
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
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={handleClose}>
                    Cancel
                </button>
                <button className="btn main-button" onClick={handleSplitOrder} disabled={loading}>
                    {loading ? 'Splitting...' : 'Split Order'}
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default SplitOrderModal;