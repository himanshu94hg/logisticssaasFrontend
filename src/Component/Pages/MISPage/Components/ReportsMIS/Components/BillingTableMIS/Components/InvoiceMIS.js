import React, { useState } from 'react'
import moment from 'moment'
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

const InvoiceMIS = () => {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const {reportsBillingData}=useSelector(state=>state?.misSectionReducer)

    console.log(reportsBillingData,"reportsBillingDatareportsBillingData")
    
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
                   {/*} <th style={{ width: '1%' }}>
                        <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAll}
                        />
    </th>*/}
                    <th>Invoice Id</th>
                    <th>Invoice Date</th>
                    <th>Due Date</th>
                    <th>Total</th>
                    <th>Status</th>
                </tr>
                <tr className="blank-row"><td></td></tr>
            </thead>
            <tbody>
                {reportsBillingData.length&& reportsBillingData?.map((row, index) => (
                    <React.Fragment key={row.id}>
                        {index > 0 && <tr className="blank-row"><td></td></tr>}
                        <tr className='table-row box-shadow'>
                            {/*<td className='checkbox-cell'>
                                <input
                                    type="checkbox"
                                    checked={selectedRows.includes(row.id)}
                                    onChange={() => handleSelectRow(row.id)}
                                />
                </td>*/}
                            <td>
                                {/* AWB detail */}
                                <div className='cell-inside-box'>
                                    <p className='text-capitalize'>
                                        {row?.invoice_id}
                                    </p>
                                </div>
                            </td>
                            <td>
                                {/* Courier detail */}
                                <div className='cell-inside-box'>
                                    <p className='text-capitalize'>
                                        {`${moment(row?.invoice_date).format('DD MMM YYYY')}`}
                                    </p>
                                </div>
                            </td>
                            <td>
                                {/* AWB Assigned Date */}
                                <div className='cell-inside-box'>
                                    <p className=''>
                                        {`${moment(row?.due_date).format('DD MMM YYYY')}`}
                                    </p>
                                </div>
                            </td>
                            <td>
                                {/* Shipment Status */}
                                <div className='cell-inside-box'>
                                    <p className='text-capitalize'>
                                        {row?.total}
                                    </p>
                                </div>
                            </td>
                            <td>
                                {/* Applied Weight Charges */}
                                <div className='cell-inside-box'>
                                    <p className=''>
                                        {row?.status}
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    )
}

export default InvoiceMIS