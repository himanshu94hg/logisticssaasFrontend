import moment from 'moment';
import React, { useState, useEffect } from 'react';
import SearchIcon from '../../../../../assets/image/icons/search-icon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faCircleInfo, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import ForwardIcon from '../../../../../assets/image/icons/ForwardIcon.png'
import ThreeDots from '../../../../../assets/image/icons/ThreeDots.png'
import InfoIcon from '../../../../common/Icons/InfoIcon';
import { useDispatch, useSelector } from 'react-redux';
import InfoMissingIcon from '../../../../common/Icons/InfoMissingIcon';
import shopifyImg from "../../../../../assets/image/integration/shopify.png"
import woocomImg from "../../../../../assets/image/integration/WCLogo.png"
import openCartImg from "../../../../../assets/image/integration/OpenCart.png"
import storeHipImg from "../../../../../assets/image/integration/StoreHippoLogo.png"
import magentoImg from "../../../../../assets/image/integration/magento.png"
import amazonImg from "../../../../../assets/image/logo/AmazonLogo.png"
import amazonDirImg from "../../../../../assets/image/integration/AmazonLogo.png"
import customImg from "../../../../../assets/image/integration/Manual.png"
import MoreFiltersPanel from '../MoreFiltersPanel/MoreFiltersPanel';


const Unprocessable = ({ orders, setBulkActionShow, selectedRows, setSelectedRows }) => {
    const dispatch = useDispatch()
    const [selectAll, setSelectAll] = useState(false);
    const [backDrop, setBackDrop] = useState(false);

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(orders.map(row => row?.id));
            setBulkActionShow(true)
        } else {
            setSelectedRows([]);
            setBulkActionShow(false)
        }
    };

    const handleSelectRow = (orderId) => {
        const isSelected = selectedRows?.includes(orderId);

        if (isSelected) {
            setSelectedRows(selectedRows.filter(id => id !== orderId));
            setBulkActionShow(true)
        } else {
            setSelectedRows([...selectedRows, orderId]);
            setBulkActionShow(false)
        }

        if (selectedRows.length === orders.length - 1 && isSelected) {
            setSelectAll(false);
        } else {
            setSelectAll(false);
        }
    };


    return (
        <section className='position-relative'>
            <div className="position-relative">
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
                                                checked={selectedRows?.includes(row?.id)}
                                                onChange={() => handleSelectRow(row?.id)}
                                            />
                                        </td>
                                        <td>
                                            {/* order detail */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    {row.channel.toLowerCase() === "shopify" ? <img src={shopifyImg} alt="Manual" width="20" />
                                                        : row.channel.toLowerCase() === "woocommerce" ? <img src={woocomImg} alt="Manual" width="20" />
                                                            : row.channel.toLowerCase() === "opencart" ? <img src={openCartImg} alt="Manual" width="20" />
                                                                : row.channel.toLowerCase() === "storehippo" ? <img src={storeHipImg} alt="Manual" width="20" />
                                                                    : row.channel.toLowerCase() === "magento" ? <img src={magentoImg} alt="Manual" width="20" />
                                                                        : row.channel.toLowerCase() === "amazon" ? <img src={amazonImg} alt="Manual" width="20" />
                                                                            : row.channel.toLowerCase() === "amazondirect" ? <img src={amazonDirImg} alt="Manual" width="20" />
                                                                                : row.channel.toLowerCase() === "custom" ? <img src={customImg} alt="Manual" width="20" />
                                                                                    : ""}
                                                    &nbsp; <span className=''>{row.customer_order_number}</span>
                                                </p>
                                                <p className='ws-nowrap d-flex align-items-center'>
                                                    {/* {formatDate(row?.inserted)} */}
                                                    {/*<DateFormatter dateTimeString={row?.inserted} />*/}
                                                    <img src={ForwardIcon} className={`${row?.order_type === 'Forward' ? '' : 'icon-rotate'}`} alt="Forward/Reverse" width={24} />
                                                    <span className='ms-2'>{`${moment(row?.order_date).format('DD MMM YYYY')} || ${moment(row?.order_date).format('h:mm A')}`}</span>

                                                </p>
                                                {/* <p>{row?.channel}</p> */}
                                                {/* <img src={ForwardIcon} className={`${row?.o_type === 'forward' ? '' : 'icon-rotate'}`} alt="Forward/Reverse" width={24} /> */}
                                                {/* <p>W {row?.p_warehouse_name}</p> */}
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
                                                {/* <p>{row?.s_city}</p>
                                                <p>{row?.s_pincode}</p>
                                                <p>{row?.s_state}</p> */}
                                            </div>
                                        </td>
                                        <td>
                                            {/* package  details */}
                                            <div className='cell-inside-box'>
                                                <p className='width-eclipse'>{row?.order_products.product_name}</p>
                                                <p>Wt:  {row?.dimension_detail?.weight} kg <span className='text-blue'>||</span> LBH: {row?.dimension_detail?.length}x{row?.dimension_detail?.breadth}x{row?.dimension_detail?.height}
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
                                                <button className='btn main-button'>Edit Order</button>
                                                <div className='action-options'>
                                                    <div className='threedots-img'>
                                                        <img src={ThreeDots} alt="ThreeDots" width={24} />
                                                    </div>
                                                    <div className='action-list'>
                                                        <ul>
                                                            <li>Add Tag</li>
                                                            <li>Verify Order</li>
                                                            <li className='action-hr'></li>
                                                            <li>Call Buyer</li>
                                                            <li>Clone Order</li>
                                                            <li>Mark As Verified</li>
                                                            <li className='action-hr'></li>
                                                            <li>Cancel Order</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    {/* Additional information row */}
                                    {/* <tr>
                                        <td colSpan="9">
                                            <div>
                                                <p><strong>Product Name:</strong> {row?.product_name}</p>
                                                <p><strong>Product SKU:</strong> {row?.product_sku}</p>
                                            </div>
                                        </td>
                                    </tr> */}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={`backdrop ${backDrop ? 'd-block' : 'd-none'}`}></div>
            </div>
        </section>
    );
};

export default Unprocessable;
