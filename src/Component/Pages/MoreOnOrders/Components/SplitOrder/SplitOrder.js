import React, { useState, useEffect } from 'react';
import SearchIcon from '../../../../../assets/image/icons/search-icon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faCircleInfo, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import ForwardIcon from '../../../../../assets/image/icons/ForwardIcon.png'
import SidePanel from './SidePanel/SidePanel';
import InfoIcon from '../../../../common/Icons/InfoIcon';
import moment from 'moment';
import SplitOrderModal from "../SplitOrder/SplitOrderModal";

const SplitOrder = ({ orders, handleSearch }) => {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [backDrop, setBackDrop] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleSubmit = () => {
        console.log("Log Data")
    };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(orders.map(row => row?.id));
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

    const handleSidePanel = () => {
        document.getElementById("sidePanel").style.right = "0"
        setBackDrop(true)
    }
    const CloseSidePanel = () => {
        document.getElementById("sidePanel").style.right = "-50em"
        setBackDrop(false)
    }
    const handleShow = (orderDetails) => {
        setShow(true);
        setOrderDetails(orderDetails);
    };

    return (
        <section className='position-relative'>
            <div className="position-relative">
                <div className="box-shadow shadow-sm p7 mb-3 filter-container">
                    <div className="search-container">
                        <div className='d-flex'>
                            <label>
                                <input type="search" placeholder="Search for AWB | Order ID | Mobile Number | Email | SKU | Pickup ID" onChange={(e)=>handleSearch(e.target.value)} />
                                <button>
                                    <img src={SearchIcon} alt="Search" />
                                </button>
                            </label>
                            <button className='btn main-button ms-2' onClick={handleSidePanel}>More Filters</button>
                        </div>
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
                        <button className='btn main-button'>Export</button>
                        <div className='action-options bulk-actions ms-2'>
                            <div className='btn main-button'>
                                <span className='me-2'>Bulk Actions</span><FontAwesomeIcon icon={faEllipsisVertical} />
                            </div>
                            <div className='action-list'>
                                <ul>
                                    <li>Bulk Ship</li>
                                    <li>Mark as Verified</li>
                                    <li>Add Bulk Tag</li>
                                    <li><hr /></li>
                                    <li>Bulk Weight/Dimension Update</li>
                                    <li>Bulk Warehouse Update</li>
                                    <li><hr /></li>
                                    <li>Bulk Delete Order</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='table-container'>
                    <table className="w-100">
                        <thead className="sticky-header">
                        <tr className="table-row box-shadow">
                            <th style={{ width: '1%' }}>
                                <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th style={{ width: '24%' }}>Order Details</th>
                            <th style={{ width: '12.5%' }}>Customer details</th>
                            <th style={{ width: '16%' }}>Package Details</th>
                            <th style={{ width: '8%' }}>Payment</th>
                            <th style={{ width: '12.5%' }}>Pickup Address</th>
                            {/* <th style={{ width: '12.5%' }}>Shipping Details</th> */}
                            <th style={{ width: '6%' }}>Status</th>
                            <th style={{ width: '6%' }}>Action</th>
                        </tr>
                        <tr className="blank-row"><td></td></tr>
                        </thead>
                        <tbody>
                        {Array.isArray(orders) && orders?.map((row, index) => (
                            <React.Fragment key={row?.id}>
                                {index > 0 && <tr className="blank-row"><td></td></tr>}
                                <tr className='table-row box-shadow'>
                                    <td className='checkbox-cell'>
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(row?.id)}
                                            onChange={() => handleSelectRow(row?.id)}
                                        />
                                    </td>
                                    <td>
                                        {/* order detail */}
                                        <div className='cell-inside-box'>
                                            <p className=''>
                                                {/* <img src={AmazonLogo} alt='AmazonLogo' width={24} className='me-2' /><span className='me-2 text-capitalize'>{row?.channel}</span> */}
                                                {row?.customer_order_number}
                                            </p>
                                            <p className='ws-nowrap d-flex align-items-center'>
                                                {/* {formatDate(row?.inserted)} */}
                                                {/*<DateFormatter dateTimeString={row?.inserted} />*/}
                                                <img src={ForwardIcon} className={`${row?.order_type === 'Forward' ? '' : 'icon-rotate'}`} alt="Forward/Reverse" width={24} />
                                                <span className='ms-2'>{`${moment(row?.order_date).format('DD MMM YYYY')} || ${moment(row?.order_date).format('h:mm A')}`}</span>

                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        {/* customer detail */}
                                        <div className='cell-inside-box'>
                                            <p>{row?.customer_order_number}</p>
                                            <p>{row?.shipping_detail?.mobile_number}
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
                                        {/* package  details */}
                                        <div className='cell-inside-box'>
                                            <p className='width-eclipse'>{row?.order_products.product_name}</p>
                                            <p>Wt:  {row?.dimension_detail?.weight} kg <span className='text-blue'><br/></span> LBH: {row?.dimension_detail?.length}x{row?.dimension_detail?.breadth}x{row?.dimension_detail?.height}
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
                                        {/* payment section here */}
                                        <div className='cell-inside-box'>
                                            <p>&#x20B9; {row?.invoice_amount}</p>
                                            <p className='order-Status-box mt-1'>{row?.payment_type}</p>
                                        </div>
                                    </td>
                                    <td className='align-middle'>
                                        {/* pickup adress */}
                                        <td className='align-middle'>
                                            <div className='cell-inside-box'>
                                                <p>{row?.pickup_details?.p_warehouse_name}
                                                    <span className='details-on-hover ms-2'>
                                                            <InfoIcon />
                                                            <span style={{ width: '250px' }}>
                                                                {row?.pickup_details?.p_address_line1},
                                                                {row?.pickup_details?.p_address_line2},<br />
                                                                {row?.pickup_details?.p_city},
                                                                {row?.pickup_details?.p_state},
                                                                {row?.pickup_details?.p_pincode}
                                                            </span>
                                                        </span>
                                                </p>

                                            </div>
                                        </td>
                                    </td>
                                    {/* shiping section here */}
                                    {/* <td>
                                            <div className='cell-inside-box'>
                                                <p className='mt-1'><img src='https://ekartlogistics.com/assets/images/ekblueLogo.png' height={10} className='me-2' />{row?.courier_partner}</p>
                                                <p className='details-on-hover anchor-awb'>{row?.awb_number ?? ""}
                                                    <span style={{right:'23px', width:'100px'}}>AWB Number</span>
                                                </p>
                                            </div>
                                        </td> */}
                                    <td className='align-middle'>
                                        {/*  Status section  */}
                                        <p className='order-Status-box'>{row?.status}</p>
                                    </td>
                                    <td className='align-middle'>
                                        {/* action section */}
                                        <div className='d-flex align-items-center gap-3'>
                                            <button className='btn main-button' onClick={() => handleShow(row)}>Split Order</button>
                                            <div className='action-options'>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                        </tbody>
                    </table>
                </div>
                <SidePanel CloseSidePanel={CloseSidePanel} />
                <div className={`backdrop ${backDrop ? 'd-block' : 'd-none'}`}></div>
            </div>
            <SplitOrderModal
                show={show}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                orderDetails={orderDetails}
            />

        </section >
    );
};
export default SplitOrder;