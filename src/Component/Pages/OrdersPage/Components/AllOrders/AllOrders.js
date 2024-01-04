import React, { useState, useEffect } from 'react';
import SearchIcon from '../../../../../assets/image/icons/search-icon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";

const AllOrders = () => {

    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [backDrop, setBackDrop] = useState(false);
    const [shipmentData, setShipmentData] = useState([]);
    const [orders, setAllOrders] = useState([]);

    useEffect(() => {
        axios
            .get('http://35.154.133.143/api/v1/allorderdetail/') // Replace with your API endpoint
            .then(response => {
                console.log('Data is data:', response.data);
                setAllOrders(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%55", orders)
    // const tableData = [
    //     { id: 1, orderDetails: 'Details 1', orderNumber: '2763812736', timeStamp: '04 Jan 2024 | 11:26 AM', channelDetails: 'Amazon', viewProduct: 'view Product', customerDetails: 'Customer 1', packagingDetails: 'Packaging 1', payment: 'Payment 1', deliveryAddress: 'Address 1', courierPartner: 'Courier 1', status: 'Status 1', action: 'Action 1' },
    //     { id: 2, orderDetails: 'Details 2', orderNumber: '2763812736', timeStamp: '04 Jan 2024 | 11:26 AM', channelDetails: 'Amazon', viewProduct: 'view Product', customerDetails: 'Customer 2', packagingDetails: 'Packaging 2', payment: 'Payment 2', deliveryAddress: 'Address 2', courierPartner: 'Courier 2', status: 'Status 2', action: 'Action 2' },
    //     { id: 3, orderDetails: 'Details 2', orderNumber: '2763812736', timeStamp: '04 Jan 2024 | 11:26 AM', channelDetails: 'Amazon', viewProduct: 'view Product', customerDetails: 'Customer 2', packagingDetails: 'Packaging 2', payment: 'Payment 2', deliveryAddress: 'Address 2', courierPartner: 'Courier 2', status: 'Status 2', action: 'Action 2' },
    //     { id: 5, orderDetails: 'Details 2', orderNumber: '2763812736', timeStamp: '04 Jan 2024 | 11:26 AM', channelDetails: 'Amazon', viewProduct: 'view Product', customerDetails: 'Customer 2', packagingDetails: 'Packaging 2', payment: 'Payment 2', deliveryAddress: 'Address 2', courierPartner: 'Courier 2', status: 'Status 2', action: 'Action 2' },
    //     { id: 6, orderDetails: 'Details 2', orderNumber: '2763812736', timeStamp: '04 Jan 2024 | 11:26 AM', channelDetails: 'Amazon', viewProduct: 'view Product', customerDetails: 'Customer 2', packagingDetails: 'Packaging 2', payment: 'Payment 2', deliveryAddress: 'Address 2', courierPartner: 'Courier 2', status: 'Status 2', action: 'Action 2' },
    //     // Add more rows as needed
    // ];

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

    const handleSidePanel = () => {
        document.getElementById("sidePanel").style.right = "0"
        setBackDrop(true)
    }

    // useEffect(() => {
    //   first


    // }, [])


    return (
        <section>
            <div className="position-relative">
                <div className="box-shadow shadow-sm p7 mb-3 filter-container">
                    <div class="search-container">
                        <label>
                            <input type="text" placeholder="Search for AWB | Order ID | Mobile Number | Email | SKU | Pickup ID" />
                            <button>
                                <img src={SearchIcon} alt="Search" />
                            </button>
                        </label>
                        <p className='font10'>Most Popular Search by
                            <span>COD</span> |
                            <span>Prepaid</span> |
                            <span>Yesterday</span> |
                            <span>One Week</span> |
                            <span>Last Month</span> |
                            <span>Delivered</span> |
                            <span>Cancel order</span> </p>
                    </div>
                    <div className='button-container'>
                        <button className='btn main-button me-2' onClick={handleSidePanel}>Advanced Filters</button>
                        <button className='btn main-button'>Report</button>
                    </div>
                </div>

                <table className="w-100">
                    <thead>
                        <tr className="table-row box-shadow">
                            <th className='checkbox-cell'>
                                <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th>Order Details</th>
                            <th>Customer details</th>
                            <th>Package Details</th>
                            <th>Payment</th>
                            <th>Pickup Address</th>
                            <th>Status</th>
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
                                        {/* order detail */}
                                        <div className='cell-inside-box'>
                                            <p>{row.order_number}</p>
                                            <p>{row.inserted}</p>
                                            <p>{row.channel}</p>
                                            <p>viewProduct
                                            <span>{row.product_name}</span>
                                            <span>{row.product_sku}</span>
                                            
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        {/* customer detail */}
                                        <div className='cell-inside-box'>
                                            <p>{row.b_customer_name}</p>
                                            <p>{row.timeStamp}</p>
                                            
                                            <p>viewProduct
                                                <span>{row.product_name}</span>
                                                <span>{row.product_sku}</span>

                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        {/* package  details */}
                                        <div className='cell-inside-box'>
                                            <p>{row.orderNumber}</p>
                                            <p>{row.timeStamp}</p>
                                            <p>{row.channelDetails}</p>
                                            <p>viewProduct
                                                <span>{row.product_name}</span>
                                                <span>{row.product_sku}</span>

                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        {/* payment section here */}
                                        <div className='cell-inside-box'>
                                            <p>{row.orderNumber}</p>
                                            <p>{row.timeStamp}</p>
                                            <p>{row.channelDetails}</p>
                                            <p>viewProduct
                                                <span>{row.product_name}</span>
                                                <span>{row.product_sku}</span>

                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        {/* pickup adress */}
                                        <div className='cell-inside-box'>
                                            <p>{row.orderNumber}</p>
                                            <p>{row.timeStamp}</p>
                                            <p>{row.channelDetails}</p>
                                            <p>viewProduct
                                                <span>{row.product_name}</span>
                                                <span>{row.product_sku}</span>

                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        {/* status section here */}
                                        <div className='cell-inside-box'>
                                            <p>{row.orderNumber}</p>
                                            <p>{row.timeStamp}</p>
                                            <p>{row.channelDetails}</p>
                                            <p>viewProduct
                                                <span>{row.product_name}</span>
                                                <span>{row.product_sku}</span>

                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        {/*  action section  */}
                                        <div className='cell-inside-box'>
                                            <p>{row.orderNumber}</p>
                                            <p>{row.timeStamp}</p>
                                            <p>{row.channelDetails}</p>
                                            <p>viewProduct
                                                <span>{row.product_name}</span>
                                                <span>{row.product_sku}</span>

                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>

                <div id='sidePanel' className="side-panel">
                    <div className='sidepanel-closer'><FontAwesomeIcon icon="fa-solid fa-chevron-right" /></div>
                </div>

                <div className={`backdrop ${backDrop ? 'd-block' : 'd-none'}`}></div>

            </div>
        </section >
    );
};

export default AllOrders;
