import React, { useState, useEffect } from 'react';
import SearchIcon from '../../../../../assets/image/icons/search-icon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import { faChevronRight, faCircle, faCircleInfo, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import AmazonLogo from '../../../../../assets/image/logo/AmazonLogo.png'
import ForwardIcon from '../../../../../assets/image/icons/ForwardIcon.png'
import ThreeDots from '../../../../../assets/image/icons/ThreeDots.png'
import InfoIcon from '../../../../common/Icons/InfoIcon';
import moment from 'moment/moment';
import { useDispatch, useSelector } from 'react-redux';
import shopifyImg from "../../../../../assets/image/integration/shopify.png"
import woocomImg from "../../../../../assets/image/integration/WCLogo.png"
import openCartImg from "../../../../../assets/image/integration/OpenCart.png"
import storeHipImg from "../../../../../assets/image/integration/StoreHippoLogo.png"
import magentoImg from "../../../../../assets/image/integration/magento.png"
import amazonImg from "../../../../../assets/image/logo/AmazonLogo.png"
import amazonDirImg from "../../../../../assets/image/integration/AmazonLogo.png"
import customImg from "../../../../../assets/image/integration/Manual.png"
import MoreFiltersPanel from '../MoreFiltersPanel/MoreFiltersPanel';
import SelectAllDrop from '../SelectAllDrop/SelectAllDrop';
import { weightCalculation } from '../../../../../customFunction/functionLogic';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import CustomIcon from '../../../../common/Icons/CustomIcon';
import CustomTooltip from '../../../../common/CustomTooltip/CustomTooltip';
import OrderTagsIcon from '../../../../common/Icons/OrderTagsIcon';
import VerifiedOrderIcon from '../../../../common/Icons/VerifiedOrderIcon';
import NoData from '../../../../common/noData';
import { Link } from 'react-router-dom';

const ReturnOrders = ({ orders, setOrderId, activeTab, BulkActionShow, setBulkActionShow, selectedRows, setSelectedRows }) => {

    const dispatch = useDispatch()
    const [selectAll, setSelectAll] = useState(false);
    const [MoreFilters, setMoreFilters] = useState(false);
    const [SingleShip, setSingleShip] = useState(false)
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [exportButtonClick, setExportButtonClick] = useState(false)
    const exportCard = useSelector(state => state?.exportSectionReducer?.exportCard)



    useEffect(() => {
        if (activeTab) {
            setSelectAll(false)
        }
    }, [activeTab])
    // Handler for "Select All" checkbox
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

    const handleShipNow = (orderId) => {
        setSelectedOrderId(orderId);
        setSingleShip(true);
    };

    const handleSelectRow = (orderId) => {
        const isSelected = selectedRows.includes(orderId);
        let updatedSelectedRows;
        if (isSelected) {
            updatedSelectedRows = selectedRows.filter(id => id !== orderId);
        } else {
            updatedSelectedRows = [...selectedRows, orderId];
            setBulkActionShow(false)
        }
        setSelectedRows(updatedSelectedRows);
        if (updatedSelectedRows.length > 0) {
            setBulkActionShow(true);
        } else {
            setBulkActionShow(false);
        }
        if (updatedSelectedRows.length === orders.length - 1 && isSelected) {
            setSelectAll(false);
        } else {
            setSelectAll(false);
        }
    };




    const openEditingSection = (id) => {
        setOrderId(id)
    }

    const handleClickAWB = (event, orders) => {
        event.preventDefault();
        const url = `https://shipease.in/order-tracking/`;
        window.open(url, '_blank');
      };

      const handleClickpartner = (event, row) => {
        event.preventDefault();
        if (row.courier_partner === "bluedart") {
            window.location.href = 'https://www.bluedart.com/web/guest/home';
        } else if (row.courier_partner === "delhivery") {
            window.location.href = 'https://www.delhivery.com/track/package';
        } else if (row.courier_partner === "smartr") {
            window.location.href = 'https://smartr.in/tracking';
        } else if (row.courier_partner === "ekart" || row.courier_partner === "ekart_5kg") {
            window.location.href = 'https://ekartlogistics.com/';
        } else if (row.courier_partner === "shadowfax") {
            window.location.href = 'https://tracker.shadowfax.in/#/';
        } else if (row.courier_partner === "amazon_swa") {
            window.location.href = 'https://track.amazon.in/';
        } else if (row.courier_partner === "xpressbees") {
            window.location.href = 'https://www.xpressbees.com/shipment/tracking';
        } else if (row.courier_partner === "shree maruti") {
            window.location.href = 'https://www.shreemaruti.com/';
        } else if (row.courier_partner === "movin") {
            window.location.href = 'https://www.movin.in/shipment/track';
        } else if (row.courier_partner === "ecom express") {
            window.location.href = 'https://ecomexpress.in/tracking/';
        } else if (row.courier_partner === "professional") {
            window.location.href = 'https://www.tpcindia.com/Default.aspx';
        } else {
            window.location.href = '';
        }
    }

    return (
        <section className='position-relative'>
            <div className="position-relative">
                <div className='table-container'>
                    <table className=" w-100">
                        <thead className="sticky-header">
                            <tr className="table-row box-shadow">
                                <th style={{ width: '1%' }}>
                                    <div className='d-flex gap-1 align-items-center'>
                                        <input
                                            type="checkbox"
                                            checked={selectAll}
                                            onChange={handleSelectAll}
                                        />
                                    </div>
                                </th>
                                <th style={{ width: '26%' }}>Order Details</th>
                                <th style={{ width: '12.5%' }}>Customer details</th>
                                <th style={{ width: '20%' }}>Package Details</th>
                                <th style={{ width: '8%' }}>Payment</th>
                                <th style={{ width: '12.5%' }}>Pickup Address</th>
                                <th style={{ width: '12.5%' }}>Shipping Details</th>
                                <th style={{ width: '8%' }}>Status</th>
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
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    {row.channel.toLowerCase() === "shopify" ? <img src={shopifyImg} alt="Manual" width="20" />
                                                        : row.channel.toLowerCase() === "woocommerce" ? <img src={woocomImg} alt="Manual" width="20" />
                                                            : row.channel.toLowerCase() === "opencart" ? <img src={openCartImg} alt="Manual" width="20" />
                                                                : row.channel.toLowerCase() === "storehippo" ? <img src={storeHipImg} alt="Manual" width="20" />
                                                                    : row.channel.toLowerCase() === "magento" ? <img src={magentoImg} alt="Manual" width="20" />
                                                                        : row.channel.toLowerCase() === "amazon" ? <img src={amazonImg} alt="Manual" width="20" />
                                                                            : row.channel.toLowerCase() === "amazondirect" ? <img src={amazonDirImg} alt="Manual" width="20" />
                                                                                : row.channel.toLowerCase() === "custom" ? <CustomIcon />
                                                                                    : ""}
                                                    <span className='d-inline-flex align-items-center gap-1 ms-2'>
                                                         <Link to={`/orderdetail/${row?.id}`} className='anchor-order'>{row.customer_order_number}</Link>
                                                        {row?.other_details?.is_verified &&
                                                            <CustomTooltip
                                                                triggerComponent={<VerifiedOrderIcon />}
                                                                tooltipComponent='Verified'
                                                                addClassName='verified-hover'
                                                            />
                                                        }
                                                    </span>
                                                </p>
                                                <p className='ws-nowrap d-flex align-items-center'>
                                                    <CustomTooltip
                                                        triggerComponent={
                                                            <img
                                                                src={ForwardIcon}
                                                                className={`${row.order_type === 'Forward' ? '' : 'icon-rotate'}`}
                                                                alt="Forward/Reverse"
                                                                width={24}
                                                            />
                                                        }
                                                        tooltipComponent={<>{row?.order_type}</>}
                                                        addClassName='verified-hover'
                                                    />

                                                    <span className='ms-2'>{`${moment(row?.created_at).format('DD MMM YYYY')} || ${moment(row?.created_at).format('h:mm A')}`}</span>
                                                    {row?.order_tag.length > 0 && <CustomTooltip
                                                        triggerComponent={<span className='ms-1'>
                                                            <OrderTagsIcon />
                                                        </span>}
                                                        tooltipComponent={
                                                            <div className='Labels-pool'>
                                                                {row?.order_tag?.map((item) => {
                                                                    return (
                                                                        <div className="label-button-container active"><button className='label-button'><FontAwesomeIcon icon={faCircle} className='me-2' />{item.name}</button></div>

                                                                    )
                                                                })}
                                                            </div>
                                                        }
                                                    />}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                <p>{row?.shipping_detail?.recipient_name}</p>
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
                                            <div className='cell-inside-box'>
                                                <p>Wt:  {weightCalculation(row?.dimension_detail?.weight)} kg
                                                    <span className='details-on-hover ms-2 align-middle'>
                                                        <InfoIcon />
                                                        <span style={{ width: '250px' }}>
                                                            {row?.order_products?.map((product, index) => (
                                                                <React.Fragment key={index}>
                                                                    <strong>Product:</strong> {product.product_name}<br />
                                                                    <strong>SKU:</strong> {product.sku}<br />
                                                                    <strong>Qt.:</strong> {product.quantity}<br />
                                                                </React.Fragment>
                                                            ))}
                                                        </span>
                                                    </span>
                                                    <br />
                                                    <span>LBH(cm): {row?.dimension_detail?.length} x {row?.dimension_detail?.breadth} x {row?.dimension_detail?.height}</span>
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                <p>&#x20B9; {row?.invoice_amount}</p>
                                                <p className='order-Status-box mt-1'>{row?.payment_type}</p>
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            <div className='cell-inside-box' style={{ maxWidth: '70%' }}>
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
                                        <td>
                                            <div className='cell-inside-box'>
                                                <p className='details-on-hover anchor-awb' onClick={handleClickAWB} >{row?.awb_number ?? ""} </p>
                                                <p className='' onClick={(event) => handleClickpartner(event, row)}><img src='https://ekartlogistics.com/assets/images/ekblueLogo.png'  width={30}  className='me-2' />{row?.courier_partner ?? ""} </p>
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            <p className='order-Status-box'>{row?.status || 'New'}</p>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                    {orders?.length === 0 && <NoData />}
                </div>
            </div>
        </section>
    );
};

export default ReturnOrders;
