import React, { useState } from 'react'
import moment from 'moment'
import InfoIcon from '../../../../../common/Icons/InfoIcon'

const ShippingTableMIS = () => {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [orders, setAllOrders] = useState([
        {
            "id": 1027,
            "customer_order_number": "Test100",
            "courier_partner": "professional",
            "channel": "custom",
            "channel_id": null,
            "awb_number": "TPC1000010  ",
            "order_type": "Forward",
            "order_date": "2024-03-22T11:57:40.080085+05:30",
            "order_courier_status": null,
            "awb_assigned_date": "2024-03-22T12:07:17.161328+05:30",
            "is_mps": false,
            "manifest_sent": false,
            "fulfillment_sent": false,
            "ndr_status": true,
            "rto_status": false,
            "manifest_status": false,
            "payment_type": "Prepaid",
            "invoice_amount": "5000.00",
            "status": "in_transit",
            "created_at": "2024-03-22T11:57:40.080232+05:30",
            "shipping_detail": {
                "recipient_name": "Aman",
                "address": "MG Road Delhi",
                "landmark": "Near Sahara Mall",
                "country": "India",
                "state": "Haryana",
                "city": "Gurgaon",
                "pincode": "122001",
                "mobile_number": "7894587845",
                "email": null,
                "company_name": null,
                "contact_code": "91"
            },
            "order_products": [
                {
                    "id": 1006,
                    "sku": "Prod1",
                    "product_name": "Product 1",
                    "quantity": 10,
                    "product_category": null,
                    "unit_price": null,
                    "hsn_code": null,
                    "tax_rate": null,
                    "product_discount": null
                },
                {
                    "id": 1007,
                    "sku": "Prod2",
                    "product_name": "Product 2",
                    "quantity": 40,
                    "product_category": null,
                    "unit_price": null,
                    "hsn_code": null,
                    "tax_rate": null,
                    "product_discount": null
                },
                {
                    "id": 1008,
                    "sku": "Prod3",
                    "product_name": "Product 3",
                    "quantity": 10,
                    "product_category": null,
                    "unit_price": null,
                    "hsn_code": null,
                    "tax_rate": null,
                    "product_discount": null
                }
            ],
            "dimension_detail": {
                "weight": "100.00",
                "length": "10.00",
                "breadth": "12.00",
                "height": "11.00",
                "vol_weight": null
            },
            "pickup_details": {
                "p_customer_name": "contact name",
                "p_warehouse_name": "first warehouse name test",
                "p_address_line1": "address line one",
                "p_address_line2": "address line two",
                "p_country": "India",
                "p_state": "uttar pradesh",
                "p_city": "Fatehpur",
                "p_pincode": "545678",
                "p_contact": "8790987654",
                "p_contact_code": "+91"
            },
            "ndr_details": []
        },
        {
            "id": 1027,
            "customer_order_number": "Test100",
            "courier_partner": "professional",
            "channel": "custom",
            "channel_id": null,
            "awb_number": "TPC1000010  ",
            "order_type": "Forward",
            "order_date": "2024-03-22T11:57:40.080085+05:30",
            "order_courier_status": null,
            "awb_assigned_date": "2024-03-22T12:07:17.161328+05:30",
            "is_mps": false,
            "manifest_sent": false,
            "fulfillment_sent": false,
            "ndr_status": true,
            "rto_status": false,
            "manifest_status": false,
            "payment_type": "Prepaid",
            "invoice_amount": "5000.00",
            "status": "in_transit",
            "created_at": "2024-03-22T11:57:40.080232+05:30",
            "shipping_detail": {
                "recipient_name": "Aman",
                "address": "MG Road Delhi",
                "landmark": "Near Sahara Mall",
                "country": "India",
                "state": "Haryana",
                "city": "Gurgaon",
                "pincode": "122001",
                "mobile_number": "7894587845",
                "email": null,
                "company_name": null,
                "contact_code": "91"
            },
            "order_products": [
                {
                    "id": 1006,
                    "sku": "Prod1",
                    "product_name": "Product 1",
                    "quantity": 10,
                    "product_category": null,
                    "unit_price": null,
                    "hsn_code": null,
                    "tax_rate": null,
                    "product_discount": null
                },
                {
                    "id": 1007,
                    "sku": "Prod2",
                    "product_name": "Product 2",
                    "quantity": 40,
                    "product_category": null,
                    "unit_price": null,
                    "hsn_code": null,
                    "tax_rate": null,
                    "product_discount": null
                },
                {
                    "id": 1008,
                    "sku": "Prod3",
                    "product_name": "Product 3",
                    "quantity": 10,
                    "product_category": null,
                    "unit_price": null,
                    "hsn_code": null,
                    "tax_rate": null,
                    "product_discount": null
                }
            ],
            "dimension_detail": {
                "weight": "100.00",
                "length": "10.00",
                "breadth": "12.00",
                "height": "11.00",
                "vol_weight": null
            },
            "pickup_details": {
                "p_customer_name": "contact name",
                "p_warehouse_name": "first warehouse name test",
                "p_address_line1": "address line one",
                "p_address_line2": "address line two",
                "p_country": "India",
                "p_state": "uttar pradesh",
                "p_city": "Fatehpur",
                "p_pincode": "545678",
                "p_contact": "8790987654",
                "p_contact_code": "+91"
            },
            "ndr_details": []
        }
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
                    <th>Date</th>
                    <th>NDR Reason</th>
                    <th>Package Details</th>
                    <th>Customer details</th>
                    <th>Tracking Detail</th>
                    <th>Status</th>
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
                                {/* Date */}
                                <div className='cell-inside-box'>
                                    <span className='ms-2'>{`${moment(row?.ndr_details.raised_date).format('DD MMM YYYY')}`}</span>
                                </div>
                            </td>
                            <td>
                                {/* NDR Reason*/}
                                <div className='cell-inside-box'>
                                    <p><strong>Attempts: </strong>{row?.ndr_details.length}</p>
                                    {row?.ndr_details.length > 0 && (
                                        row.ndr_details.map((detail, index) => (
                                            <p key={index}>NDR Reason: {detail.reason}</p>
                                        ))
                                    )}
                                </div>
                            </td>
                            <td>
                                {/* package  details */}
                                <div className='cell-inside-box'>
                                    <p className='width-eclipse'>{row.order_products.product_name}</p>
                                    <p>Wt:  {row?.dimension_detail?.weight} kg <br />
                                        <span>LBH: {row?.dimension_detail?.length} x {row?.dimension_detail?.breadth} x {row?.dimension_detail?.height}</span>
                                        <span className='details-on-hover ms-2 align-middle'>
                                            <InfoIcon />
                                            <span style={{ width: '250px' }}>
                                                {row?.order_products.map((product, index) => (
                                                    <React.Fragment key={index}>
                                                        <strong>Product:</strong> {product.product_name}<br />
                                                        <strong>SKU:</strong> {product.sku}<br />
                                                        <strong>Qt.:</strong> {product.quantity}<br />
                                                    </React.Fragment>
                                                ))}
                                            </span>
                                        </span>
                                    </p>
                                </div>
                            </td>
                            <td>
                                {/* customer detail */}
                                <div className='cell-inside-box'>
                                    <p>{row?.shipping_detail?.recipient_name}</p>
                                    <p>{row?.shipping_detail?.mobile_number ?? null}
                                        <span className='details-on-hover ms-2'>
                                            <InfoIcon />
                                            <span style={{ width: '250px' }}>
                                                {row?.shipping_detail?.address}, {row?.shipping_detail?.landmark}, {row?.shipping_detail?.city},{row?.shipping_detail?.state}, {row?.shipping_detail?.pincode}
                                            </span>
                                        </span>
                                    </p>
                                </div>
                            </td>
                            <td>
                                <div className='cell-inside-box'>
                                    <p className='details-on-hover anchor-awb'>{row?.awb_number ?? ""} </p>
                                    <p className=''>{row?.courier_partner ?? ""} </p>
                                </div>
                            </td>
                            <td className='align-middle'>
                                {/*  Status section  */}
                                <p className='order-Status-box'>{row.status}</p>
                            </td>
                        </tr>
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    )
}

export default ShippingTableMIS