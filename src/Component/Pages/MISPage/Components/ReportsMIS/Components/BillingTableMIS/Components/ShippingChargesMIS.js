import React, { useState } from 'react'
import moment from 'moment'
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ShippingChargesMIS = () => {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [orders, setAllOrders] = useState([
        {
            "id": 506,
            "seller": 73,
            "transaction_id": "",
            "transaction_type": "d",
            "redeem_type": "o",
            "status": "Success",
            "amount": "23.60",
            "balance": "-247.80",
            "datetime": "2024-03-26T15:12:11.002600+05:30",
            "ip_address": "",
            "method": "Wallet",
            "order_id": 1187,
            "payment_gateway_order_id": null,
            "payment_gateway_signature": "",
            "utr_number": "",
            "order_detail": {
                "id": 1187,
                "awb_number": "TPC1000014",
                "courier_partner": "professional"
            },
            "description": "Order Shipping Charge Deducted"
        },
        {
            "id": 341,
            "seller": 73,
            "transaction_id": "",
            "transaction_type": "d",
            "redeem_type": "o",
            "status": "Success",
            "amount": "23.60",
            "balance": "-224.20",
            "datetime": "2024-03-22T10:37:22.539106+05:30",
            "ip_address": "",
            "method": "Wallet",
            "order_id": 916,
            "payment_gateway_order_id": "",
            "payment_gateway_signature": "",
            "utr_number": "",
            "order_detail": {
                "id": 916,
                "awb_number": "SM100012",
                "courier_partner": "smartr"
            },
            "description": "Order Shipping Charge Deducted"
        },
        // Add more dummy data as needed
    ]);

    // Handler for "Select All" checkbox
    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(orders.map(row => row.id));
        } else {
            setSelectedRows([]);
        }
    };

    // Handler for individual checkbox
    const handleSelectRow = (orderId) => {
        const isSelected = selectedRows.includes(orderId);

        if (isSelected) {
            setSelectedRows(selectedRows.filter(id => id !== orderId));
        } else {
            setSelectedRows([...selectedRows, orderId]);
        }

        // Check if all rows are selected, then select/deselect "Select All"
        if (selectedRows.length === orders.length - 1 && isSelected) {
            setSelectAll(false);
        } else {
            setSelectAll(false);
        }
    };

    return (
        <table className=" w-100">
            <thead className="sticky-header">
                <tr className="table-row box-shadow">
                    <th style={{ width: '1%' }}>
                        <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAll}
                        />
                    </th>
                    <th>AWB Number</th>
                    <th>Courier Details</th>
                    <th>AWB Assigned Date</th>
                    <th>Shipment Status</th>
                    <th>Applied Weight Charges</th>
                    <th>Excess Weight Charges</th>
                    <th>Entered Weight and dimensions</th>
                    <th>Charged Weight and Dimensions</th>
                    <th>Action</th>
                </tr>
                <tr className="blank-row"><td></td></tr>
            </thead>
            <tbody>
                {orders.map((row, index) => (
                    <React.Fragment key={row.id}>
                        {index > 0 && <tr className="blank-row"><td></td></tr>}
                        <tr className='table-row box-shadow'>
                            <td className='checkbox-cell'>
                                <input
                                    type="checkbox"
                                    checked={selectedRows.includes(row.id)}
                                    onChange={() => handleSelectRow(row.id)}
                                />
                            </td>
                            <td>
                                {/* AWB detail */}
                                <div className='cell-inside-box'>
                                    <p className='text-capitalize'>
                                        {row?.order_detail?.awb_number}
                                    </p>
                                </div>
                            </td>
                            <td>
                                {/* Courier detail */}
                                <div className='cell-inside-box'>
                                    <p className='text-capitalize'>
                                        {row?.order_detail?.courier_partner}
                                    </p>
                                </div>
                            </td>
                            <td>
                                {/* AWB Assigned Date */}
                                <div className='cell-inside-box'>
                                    <p className=''>
                                        {`${moment(row?.datetime).format('DD MMM YYYY')}`}
                                    </p>
                                </div>
                            </td>
                            <td>
                                {/* Shipment Status */}
                                <div className='cell-inside-box'>
                                    <p className='text-capitalize'>
                                        {row?.status}
                                    </p>
                                </div>
                            </td>
                            <td>
                                {/* Applied Weight Charges */}
                                <div className='cell-inside-box'>
                                    <p className=''>
                                        -
                                    </p>
                                </div>
                            </td>
                            <td>
                                {/* Excess Weight Charges */}
                                <div className='cell-inside-box'>
                                    <p className=''>
                                        -
                                    </p>
                                </div>
                            </td>
                            <td>
                                {/* Entered Weight and dimensions */}
                                <div className='cell-inside-box'>
                                    <p className=''>
                                        -
                                    </p>

                                </div>
                            </td>
                            <td>
                                {/* Charged Weight and Dimensions */}
                                <div className='cell-inside-box'>
                                    <p className=''>
                                        -
                                    </p>

                                </div>

                            </td>
                            <td>
                                <button className='btn main-button'><FontAwesomeIcon icon={faDownload} /></button>
                            </td>
                        </tr>
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    )
}

export default ShippingChargesMIS