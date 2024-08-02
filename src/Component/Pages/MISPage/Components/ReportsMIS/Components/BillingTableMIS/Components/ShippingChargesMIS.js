import moment from 'moment'
import React, { useState } from 'react'
import { FaRegCopy } from 'react-icons/fa';
import CustomTooltip from '../../../../../../../common/CustomTooltip/CustomTooltip';

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
    ]);
    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(orders.map(row => row.id));
        } else {
            setSelectedRows([]);
        }
    };

    const handleSelectRow = (orderId) => {
        const isSelected = selectedRows.includes(orderId);
        if (isSelected) {
            setSelectedRows(selectedRows.filter(id => id !== orderId));
        } else {
            setSelectedRows([...selectedRows, orderId]);
        }
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
                                <div className='cell-inside-box'>
                                    <p className='text-capitalize'>
                                        {row?.order_detail?.awb_number}
                                    </p>
                                </div>
                            </td>
                            <td>
                                <div className='cell-inside-box'>
                                    <p className='text-capitalize'>
                                        {row?.order_detail?.courier_partner}
                                    </p>
                                </div>
                            </td>
                            <td>
                                <div className='cell-inside-box'>
                                    <p className=''>
                                        {`${moment(row?.datetime).format('DD MMM YYYY')}`}
                                    </p>
                                </div>
                            </td>
                            <td>
                                <div className='cell-inside-box'>
                                    <p className='text-capitalize'>
                                        {row?.status}
                                    </p>
                                </div>
                            </td>
                            <td>
                                <div className='cell-inside-box'>
                                    <p className=''>
                                        -
                                    </p>
                                </div>
                            </td>
                            <td>
                                <div className='cell-inside-box'>
                                    <p className=''>
                                        -
                                    </p>
                                </div>
                            </td>
                            <td>
                                <div className='cell-inside-box'>
                                    <p className=''>-</p>
                                </div>
                            </td>
                            <td>
                                <div className='cell-inside-box'>
                                    <p className=''>-</p>

                                </div>

                            </td>

                        </tr>
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    )
}

export default ShippingChargesMIS