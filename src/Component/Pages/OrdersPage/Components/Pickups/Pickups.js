import React, { useState, useEffect } from 'react';
import SearchIcon from '../../../../../assets/image/icons/search-icon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import { faChevronRight, faCircle, faCircleInfo, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import AmazonLogo from '../../../../../assets/image/logo/AmazonLogo.png'
import ForwardIcon from '../../../../../assets/image/icons/ForwardIcon.png'
import ThreeDots from '../../../../../assets/image/icons/ThreeDots.png'
// import InfoIcon from '../../../../../assets/image/icons/InfoIcon.png'
import InfoIcon from '../../../../common/Icons/InfoIcon';
import moment from 'moment';
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
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import CustomIcon from '../../../../common/Icons/CustomIcon';
import CustomTooltip from '../../../../common/CustomTooltip/CustomTooltip';
import OrderTagsIcon from '../../../../common/Icons/OrderTagsIcon';
import VerifiedOrderIcon from '../../../../common/Icons/VerifiedOrderIcon';
import NoData from '../../../../common/noData';
import { Link } from 'react-router-dom';
import { BASE_URL_CORE } from '../../../../../axios/config';


const Pickups = ({ orders, activeTab, BulkActionShow, bulkAwb, setbulkAwb, setBulkActionShow, selectedRows, setSelectedRows }) => {
    const dispatch = useDispatch()
    const [selectAll, setSelectAll] = useState(false);
    const [BulkActions, setBulkActions] = useState(false)
    const token = Cookies.get("access_token")

    const { orderdelete } = useSelector(state => state?.orderSectionReducer)

    useEffect(() => {
        if (orderdelete) {
            setSelectAll(false)
        }
    }, [orderdelete])
    useEffect(() => {
        if (activeTab) {
            setSelectAll(false)
        }
    }, [activeTab])

    const handleSelectAll = (data) => {
        if (data === "selectAll") {
            setSelectAll(!selectAll);
            if (!selectAll) {
                setSelectedRows(orders.map(row => row?.id));
                setbulkAwb(orders.map(row => row?.awb_number));
                setBulkActionShow(true)
            } else {
                setSelectedRows([]);
                setbulkAwb([])
                setBulkActionShow(false)
                setSelectAll(false)
            }

        } else {
            setSelectAll(!selectAll);
            if (!selectAll) {
                setSelectedRows(orders.map(row => row?.id));
                setbulkAwb(orders.map(row => row?.awb_number));
                setBulkActionShow(true)
            } else {
                setSelectedRows([]);
                setbulkAwb([]);
                setBulkActionShow(false)
                setSelectAll(false)
            }
        }

    };


    const handleSelectRow = (orderId, awb) => {
        const isSelected = selectedRows?.includes(orderId);
        const isSelected1 = bulkAwb?.includes(awb);
        let updatedSelectedRows;
        let updatedBulkAwb;
        if (isSelected || isSelected1) {
            updatedSelectedRows = selectedRows?.filter(id => id !== orderId);
            updatedBulkAwb = bulkAwb?.filter(id => id !== awb);
        } else {
            updatedSelectedRows = [...selectedRows, orderId];
            updatedBulkAwb = [...bulkAwb, awb];
        }
        setSelectedRows(updatedSelectedRows);
        setbulkAwb(updatedBulkAwb);
        if (updatedSelectedRows?.length > 0) {
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


    const generateManifest = (value) => {
        dispatch({
            type: "GENERATE_MANIFEST_ACTION", payload: {
                order_ids: `${value}`
            }
        })
    }

    const handleDownloadLabel = async (orderId) => {
        const requestData = {
            order_ids: `${orderId}`
        };
        try {
            const response = await fetch(`${BASE_URL_CORE}/core-api/shipping/generate-label/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(requestData)
            });
            if (response.status === 200) {
                toast.success("Download label successfully")
            }
            const data = await response.blob();
            const url = window.URL.createObjectURL(data);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'label.pdf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast.error("Somethng went wrong!")
        }
    };


    const handleDownloadInvoice = async (orderId) => {
        const requestData = {
            order_ids: `${orderId}`
        };
        try {
            const response = await fetch(`${BASE_URL_CORE}/core-api/shipping/generate-invoice/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(requestData)
            });
            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const data = await response.blob();
            const url = window.URL.createObjectURL(data);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'Invoice.pdf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast.error("Somethng went wrong!")
        }
    };

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
                                <th style={{ width: '20%' }}>Order Details</th>
                                <th style={{ width: '12.5%' }}>Customer details</th>
                                <th style={{ width: '21%' }}>Package Details</th>
                                <th style={{ width: '5%' }}>Payment</th>
                                <th style={{ width: '12.5%' }}>Pickup Address</th>
                                <th style={{ width: '12.5%' }}>Shipping Details</th>
                                <th style={{ width: '5%' }}>Status</th>
                                <th style={{ width: '5%' }}>Action</th>

                            </tr>
                            <tr className="blank-row"><td></td></tr>
                        </thead>
                        <tbody>
                            {orders?.map((row, index) => (
                                <React.Fragment key={row?.id}>
                                    {index > 0 && <tr className="blank-row"><td></td></tr>}
                                    <tr className='table-row box-shadow'>
                                        <td className='checkbox-cell'>
                                            <input
                                                type="checkbox"
                                                checked={selectedRows?.includes(row?.id) || bulkAwb?.includes(row?.id)}
                                                onChange={() => handleSelectRow(row?.id, row.awb_number)}
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
                                            {/* customer detail */}
                                            <div className='cell-inside-box'>
                                                <p>{row?.shipping_detail?.recipient_name}</p>
                                                <p>{row?.shipping_detail?.mobile_number}
                                                    <span className='details-on-hover ms-2'>
                                                        <InfoIcon />
                                                        <span style={{ width: '250px' }}>
                                                            {row?.shipping_detail?.city}, {row?.shipping_detail?.state}, {row?.shipping_detail?.pincode}
                                                        </span>
                                                    </span>
                                                </p>
                                                {/* <p>{row.s_city}</p>
                                                <p>{row.s_pincode}</p>
                                                <p>{row.s_state}</p> */}
                                            </div>
                                        </td>
                                        <td>
                                            {/* package  details */}
                                            <div className='cell-inside-box'>
                                                {/* <p className='width-eclipse'>{row?.order_products?.product_name}</p> */}
                                                <p>Wt:  {weightCalculation(row?.dimension_detail?.weight)} kg
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
                                                    <br />
                                                    <span>LBH(cm): {row?.dimension_detail?.length} x {row?.dimension_detail?.breadth} x {row?.dimension_detail?.height}</span>
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* payment section here */}
                                            <div className='cell-inside-box'>
                                                <p>&#x20B9; {row.invoice_amount}</p>
                                                <p className='order-Status-box mt-1'>{row.payment_type}</p>
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            {/* pickup adress */}
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
                                        </td>
                                        <td>
                                            {/* shiping section here */}
                                            <div className='cell-inside-box'>
                                                <p className='details-on-hover anchor-awb ' onClick={handleClickAWB}>{row.awb_number ?? ""}
                                                    {/* <span style={{right:'23px', width:'100px'}}>AWB Number</span> */}
                                                </p>
                                                <p className='mt-1 cursor-pointer' onClick={(event) => handleClickpartner(event, row)}><img src='https://ekartlogistics.com/assets/images/ekblueLogo.png' width={30} className='me-2' />{row && row.courier_partner}</p>
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            {/*  Status section  */}
                                            <div className='d-flex flex-column gap-2 justify-content-center'>
                                                <p className='order-Status-box'>{row?.status}</p>
                                                <p className='text-success fw-bold' style={{ paddingInline: '10px', fontSize: 11 }}>{row?.manifest_status ? "Manifest Generated" : ""}</p>
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            <div className='d-flex align-items-center gap-3'>
                                                {row?.manifest_status ?
                                                    <button className='btn main-button' onClick={() => generateManifest(row.id)}>Download Manifest</button> :
                                                    <button className='btn main-button' onClick={() => generateManifest(row.id)}>Generate Manifest</button>
                                                }

                                                <div className='action-options'>
                                                    <div className='threedots-img'>
                                                        <img src={ThreeDots} alt="ThreeDots" width={24} />
                                                    </div>
                                                    <div className='action-list'>
                                                        <ul>
                                                            <li onClick={() => handleDownloadLabel(row.id)}>Download Label</li>
                                                            <li onClick={() => handleDownloadInvoice(row.id)}>Download Invoice</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
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

export default Pickups;