import axios from 'axios';
import moment from 'moment';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { FaRegCopy } from "react-icons/fa";
import NoData from '../../../../common/noData';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfoIcon from '../../../../common/Icons/InfoIcon';
import globalDebouncedClick from '../../../../../debounce';
import SingleShipPopReassign from './SingleShipPopReassign';
import { BASE_URL_CORE } from '../../../../../axios/config';
import CustomIcon from '../../../../common/Icons/CustomIcon';
import { faCircle, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OrderTagsIcon from '../../../../common/Icons/OrderTagsIcon';
import SingleShipPop from '../Processing/SingleShipPop/SingleShipPop';
import ThreeDots from '../../../../../assets/image/icons/ThreeDots.png'
import amazonImg from "../../../../../assets/image/logo/AmazonLogo.png"
import omsguru from "../../../../../assets/image/logo/OmsGuruIcon.png"
import woocomImg from "../../../../../assets/image/integration/WCLogo.png"
import shopifyImg from "../../../../../assets/image/integration/shopify.png"
import ForwardIcon from '../../../../../assets/image/icons/ForwardIcon.png'
import magentoImg from "../../../../../assets/image/integration/magento.png"
import { weightGreater } from '../../../../../customFunction/functionLogic';
import openCartImg from "../../../../../assets/image/integration/OpenCart.png"
import CustomTooltip from '../../../../common/CustomTooltip/CustomTooltip';
import VerifiedOrderIcon from '../../../../common/Icons/VerifiedOrderIcon';
import amazonDirImg from "../../../../../assets/image/integration/AmazonLogo.png"
import { customErrorFunction } from '../../../../../customFunction/errorHandling';
import storeHipImg from "../../../../../assets/image/integration/StoreHippoLogo.png"
import APIChannelIcon from "../../../../../assets/image/integration/APIChannelIcon.png"
import UnicommerceIcon from "../../../../../assets/image/integration/UnicommerceIcon.png"
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const AllOrders = ({ orders, setRateRef, activeTab, partnerList, setEditOrderSection, selectAll, setLoader, setSelectAll, bulkAwb, setbulkAwb, setBulkActionShow, selectedRows, setSelectedRows, setCloneOrderSection, setOrderId, setAwbNo, setOrderTracking }) => {
    const dispatch = useDispatch()
    const token = Cookies.get("access_token")
    const [show, setShow] = useState(false);
    const [cancelAwbNo, setCancelAwbNo] = useState("");
    const [showCancel, setShowCancel] = useState(false);
    const [SingleShip, setSingleShip] = useState(false)
    const [deleteOrderId, setDeleteOrderId] = useState("");
    const [cancelOrderId, setCancelOrderId] = useState("");
    const [genaratelabel, setGenaratelabel] = useState(false);
    const [copyText, setcopyText] = useState("Tracking Link")
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [shipingResponse, setShipingResponse] = useState(null);
    const [generateinvoice, setGenerateinvoice] = useState(false);
    const [reassignResponse, setReassignResponse] = useState(null);
    const [cancelOrderStatus, setCancelOrderStatus] = useState("");
    const [SingleShipReassign, setSingleShipReassign] = useState(false)
    const { orderdelete } = useSelector(state => state?.orderSectionReducer)
    const { labelData, invoiceData } = useSelector(state => state?.orderSectionReducer)
    const reassignCard = useSelector(state => state?.moreorderSectionReducer?.moreorderCard)
    const [ShowQCStatus, setShowQCStatus] = useState(false)

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
                setbulkAwb(orders.map(row => row?.status));
                setSelectedRows(orders.map(row => row?.id));
                setBulkActionShow(true)
            } else {
                setSelectedRows([]);
                setbulkAwb([])
                setBulkActionShow(false)
            }

        }
        else {
            setSelectAll(!selectAll);
            if (!selectAll) {
                setbulkAwb(orders.map(row => row?.status));
                setSelectedRows(orders.map(row => row?.id));
                setBulkActionShow(true)
            } else {
                setSelectedRows([]);
                setbulkAwb([])
                setBulkActionShow(false)
            }
        }
    };




    const handleSelectRow = (orderId, awb) => {
        const isSelected = selectedRows.includes(orderId);
        const isSelected1 = bulkAwb.includes(awb);
        let updatedSelectedRows;
        let updatedBulkAwb;
        if (isSelected || isSelected1) {
            updatedSelectedRows = selectedRows.filter(id => id !== orderId);
            updatedBulkAwb = bulkAwb.filter(id => id !== awb);
        } else {
            updatedSelectedRows = [...selectedRows, orderId];
            updatedBulkAwb = [...bulkAwb, awb];
        }
        setSelectedRows(updatedSelectedRows);
        setbulkAwb(updatedBulkAwb);
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

    const handleDownloadLabel = async (orderId, status) => {
        setLoader(true)
        if (status === "pending" || status === "cancelled") {
            toast.error("Oops... You can not download the label of Pending or Cancelled Orders!")
            setLoader(false)
        }
        else {
            dispatch({
                type: "BULK_ORDER_GENERATE_LABEL_ACTION",
                payload: {
                    order_ids: `${orderId}`
                }
            });
            setGenaratelabel(true)
        }
    };

    const handleDownloadInvoice = async (orderId, status) => {
        setLoader(true)
        if (status === "pending" || status === "cancelled") {
            toast.error("Oops... You can not download the invoice of Pending or Cancelled Orders!")
            setLoader(false)
        }
        else {
            dispatch({
                type: "BULK_ORDER_GENERATE_INVOICE_ACTION", payload: {
                    order_ids: `${orderId}`
                }
            });
            setGenerateinvoice(true)
        }
    };

    const handleShipNow = (orderId) => {
        setSelectedOrderId(orderId);
        if (orderId !== null) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            axios.get(`${BASE_URL_CORE}/core-api/shipping/ship-rate-card/?order_id=${orderId}`, config)
                .then((response) => {
                    setShipingResponse(response.data);
                    setSingleShip(true);

                }).catch((error) => {
                    customErrorFunction(error)
                });
        }
    };


    const handleShipReassign = (orderId, status) => {
        if (status === "pending") {
            toast.error("Order not shipped yet")
        }
        else if (status === "cancelled") {
            toast.error("Cancelled order can't be reassign!")
        }
        else {
            if (orderId !== null) {
                axios.get(`${BASE_URL_CORE}/core-api/shipping/ship-rate-card-reassign/?order_id=${orderId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then((response) => {
                        if (response?.status === 200) {
                            setReassignResponse(response?.data);
                            setSingleShipReassign(true);

                        }
                    })
                    .catch((error) => {
                        customErrorFunction(error);
                        setSingleShipReassign(false);
                    });
            }
            setSelectedOrderId(orderId);
        }
    };

    const handleGeneratePickup = async (orderId) => {
        let authToken = Cookies.get("access_token")
        try {
            const response = await fetch(`${BASE_URL_CORE}/core-api/shipping/generate-pickup/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    orders: [
                        orderId
                    ]
                })
            });
            if (response?.status === 200) {
                toast.success("Generate Pickup successfully")
                setRateRef(new Date())
            }
        } catch (error) {
            toast.error("Something went wrong!")
        }
    };

    const generateManifest = (value) => {
        dispatch({
            type: "GENERATE_MANIFEST_ACTION", payload: {
                order_ids: `${value}`
            }
        })
    }

    const openCloneSection = (id) => {
        setCloneOrderSection(true)
        setOrderId(id)
    }

    const handleClickAWB = (orders) => {
        setAwbNo(orders)
        setOrderTracking(true)
    };

    const handleClickpartner = (event, row) => {
        event.preventDefault();
        const courierPartner = row?.courier_partner.toLowerCase();

        switch (courierPartner) {
            case "bluedart":
                window.open('https://www.bluedart.com/web/guest/home', '_blank');
                break;
            case "delhivery":
                window.open('https://www.delhivery.com/track/package', '_blank');
                break;
            case "smartr":
                window.open('https://smartr.in/tracking', '_blank');
                break;
            case "ekart":
            case "ekart_5kg":
                window.open('https://ekartlogistics.com/', '_blank');
                break;
            case "shadowfax":
                window.open('https://tracker.shadowfax.in/#/', '_blank');
                break;
            case "amazon_swa":
                window.open('https://track.amazon.in/', '_blank');
                break;
            case "xpressbees":
                window.open('https://www.xpressbees.com/shipment/tracking', '_blank');
                break;
            case "shree maruti":
                window.open('https://www.shreemaruti.com/', '_blank');
                break;
            case "movin":
                window.open('https://www.movin.in/shipment/track', '_blank');
                break;
            case "ecom express":
                window.open('https://ecomexpress.in/tracking/', '_blank');
                break;
            case "professional":
                window.open('https://www.tpcindia.com/Default.aspx', '_blank');
                break;
            default:
                break;
        }
    }


    useEffect(() => {
        if (labelData) {
            if (genaratelabel === true) {
                const blob = new Blob([labelData], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'label.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                setGenaratelabel(false)
            }
        }
    }, [labelData])

    useEffect(() => {
        if (invoiceData) {
            if (generateinvoice === true) {
                const blob = new Blob([invoiceData], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'Invoice.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                setGenerateinvoice(false)
            }
        }
    }, [invoiceData])


    const handleClose = () => setShow(false);
    const handleCloseCancel = () => setShowCancel(false);

    const [qc, setQc] = useState(null)

    const handleQCCheckStatus = async (id) => {
        try {
            const response = await axios.get(`${BASE_URL_CORE}/orders-api/orders/get-qc-info/${id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setQc(response?.data)
            setShowQCStatus(true)

        } catch (error) {
            customErrorFunction(error);
        }
    };

    const handleShowDelete = (id) => {
        setShow(true)
        setDeleteOrderId(id)
    };

    const handleShowCancel = (args1, args2, args3) => {
        setShowCancel(true)
        setCancelOrderId(args1)
        setCancelAwbNo(args2)
        setCancelOrderStatus(args3)
    };


    const handleDeleteOrder = () => {
        dispatch({ type: "DELETE_ORDERS_ACTION", payload: deleteOrderId })
        setShow(false)
    }

    const handleCancelOrder = () => {
        if (cancelOrderStatus === "cancelled") {
            toast.error("Order is already cancelled!")
        } else {
            if (cancelOrderStatus !== "pending") {
                dispatch({
                    type: "ORDERS_DETAILS_CANCEL_ACTION",
                    payload: {
                        ids: [cancelAwbNo]
                    }
                });
            }
            else {
                dispatch({
                    type: "BULK_PROCESSING_ORDER_CANCEL_ACTION",
                    payload: {
                        order_ids: [cancelOrderId],
                    }
                });
            }
        }
        setShowCancel(false)
    }

    const handleCopy = (awb) => {
        const temp_url = `https://shipease.in/order-tracking/${awb}`
        navigator.clipboard.writeText(temp_url)
            .then(() => {
                setcopyText("Copied")
                setTimeout(() => {
                    setcopyText('Tracking Link');
                }, 2000);
            })
            .catch(err => {
            });
    };

    const handleEditOrder = (id) => {
        setEditOrderSection(true)
        setOrderId(id)
    }

    const handleDownload = async () => {
        if (qc?.images?.length === 1) {
            window.location.href = qc.images[0];
        } else if (qc?.images?.length > 1) {
            const zip = new JSZip();
            const folder = zip.folder('attachments');
            const promises = qc.images.map(async (url, index) => {
                const response = await fetch(url);
                const blob = await response.blob();
                const fileName = `image_${index + 1}.${blob.type.split('/')[1]}`;
                folder.file(fileName, blob);
            });
            await Promise.all(promises);
            zip.generateAsync({ type: 'blob' }).then((content) => {
                saveAs(content, 'attachments.zip');
            });
        }
    };

    return (
        <>
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
                                                    checked={selectedRows?.includes(row?.id)}
                                                    onChange={() => handleSelectRow(row?.id, row?.status)}
                                                />
                                            </td>
                                            <td>
                                                <div className='cell-inside-box'>
                                                    <p className=''>
                                                        {row?.channel.toLowerCase() === "shopify" ? <img src={shopifyImg} alt="Manual" width="20" />
                                                            : row?.channel.toLowerCase() === "woocommerce" ? <img src={woocomImg} alt="Manual" width="20" />
                                                                : row?.channel.toLowerCase() === "opencart" ? <img src={openCartImg} alt="Manual" width="20" />
                                                                    : row?.channel.toLowerCase() === "storehippo" ? <img src={storeHipImg} alt="Manual" width="20" />
                                                                        : row?.channel.toLowerCase() === "magento" ? <img src={magentoImg} alt="Manual" width="20" />
                                                                            : row?.channel.toLowerCase() === "amazon" ? <img src={amazonImg} alt="Manual" width="20" />
                                                                                : row?.channel.toLowerCase() === "amazon_direct" ? <img src={amazonDirImg} alt="Manual" width="20" />
                                                                                    : row?.channel.toLowerCase() === "unicommerce" ? <img src={UnicommerceIcon} alt="Manual" width="20" />
                                                                                        : row?.channel.toLowerCase() === "api" ? <img src={APIChannelIcon} alt="Manual" width="30" />
                                                                                            : row?.channel.toLowerCase() === "omsguru" ? <img src={omsguru} alt="Manual" width="30" />
                                                                                                : <CustomIcon />}
                                                        <span className='d-inline-flex align-items-center gap-1 ms-2'>
                                                            <Link to={`/orderdetail/${row?.id}`} className='anchor-order'>{row?.customer_order_number}</Link>
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
                                                                    className={`${row?.order_type === 'Forward' ? '' : 'icon-rotate'}`}
                                                                    alt="Forward/Reverse"
                                                                    width={24}
                                                                />
                                                            }
                                                            tooltipComponent={<>{row?.order_type}</>}
                                                            addClassName='verified-hover'
                                                        />
                                                        <span className='ms-2'>{`${moment(row?.order_date).format('DD MMM YYYY')} || ${moment(row?.order_date).format('h:mm A')}`}</span>
                                                        {row?.is_mps === true &&
                                                            <span className="mps-flag">MPS</span>
                                                        }
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
                                                    <p>{row?.shipping_detail?.mobile_number ?? null}
                                                        <span className='details-on-hover ms-2'>
                                                            <InfoIcon />
                                                            <span style={{ width: '250px' }}>
                                                                {row?.shipping_detail?.address && `${row?.shipping_detail.address}, `}
                                                                {row?.shipping_detail?.landmark && `${row?.shipping_detail.landmark}, `}
                                                                {row?.shipping_detail?.city && `${row?.shipping_detail.city}, `}
                                                                {row?.shipping_detail?.state && `${row?.shipping_detail.state}, `}
                                                                {row?.shipping_detail?.pincode}
                                                            </span>
                                                        </span>
                                                    </p>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='cell-inside-box'>
                                                    <p>Wt:  {weightGreater(row?.dimension_detail?.weight, row?.dimension_detail?.vol_weight)} kg
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
                                                <div className='cell-inside-box'>
                                                    <p className='ws-nowrap'>₹ {row?.invoice_amount}</p>
                                                    <p className='order-Status-box mt-1'>{row?.payment_type}</p>
                                                </div>
                                            </td>
                                            <td className='align-middle'>
                                                <div className='cell-inside-box' style={{ maxWidth: '70%' }}>
                                                    {
                                                        row?.order_type === "Forward" ?
                                                            <p>{row?.pickup_details?.p_warehouse_name}
                                                                <span className='details-on-hover ms-2'>
                                                                    <InfoIcon />
                                                                    <span style={{ width: '250px' }}>
                                                                        {row?.pickup_details?.p_address_line1 && `${(row?.pickup_details?.p_address_line1)},`}
                                                                        {row?.pickup_details?.p_address_line2 && `${row?.pickup_details?.p_address_line2},`}<br />
                                                                        {row?.pickup_details?.p_city && `${row?.pickup_details?.p_city},`}
                                                                        {row?.pickup_details?.p_state && `${row?.pickup_details?.p_state},`}
                                                                        {row?.pickup_details?.p_pincode}
                                                                    </span>
                                                                </span>
                                                            </p> : <p>{row?.shipping_detail?.recipient_name}
                                                                <span className='details-on-hover ms-2'>
                                                                    <InfoIcon />
                                                                    <span style={{ width: '250px' }}>
                                                                        {row?.shipping_detail?.address && `${row?.shipping_detail?.address},`}
                                                                        {row?.shipping_detail?.landmark && `${row?.shipping_detail?.landmark},`} < br />
                                                                        {row?.shipping_detail?.city && `${row?.shipping_detail?.city},`}
                                                                        {row?.shipping_detail?.state && `${row?.shipping_detail?.state},`}
                                                                        {row?.shipping_detail?.pincode}
                                                                    </span>
                                                                </span>
                                                            </p>
                                                    }
                                                    {row?.other_details?.channel_name &&
                                                        <CustomTooltip
                                                            triggerComponent={<p className="order-Status-box mt-1">{row?.other_details?.channel_name}</p>}
                                                            tooltipComponent={"Store Name"}
                                                            addClassName='store-name-info'
                                                        />
                                                    }
                                                </div>
                                            </td>
                                            <td>
                                                <div className='cell-inside-box shipping-details'>
                                                    {row?.courier_partner && <img src={partnerList[row?.courier_partner]["image"]} alt='Partner' />}
                                                    <div>
                                                        <p className='details-on-hover anchor-awb' onClick={(e) => handleClickAWB(row?.awb_number)}>
                                                            {row?.awb_number}
                                                        </p>
                                                        <p className='mt-1 cursor-pointer text-capitalize' onClick={(event) => handleClickpartner(event, row)}>
                                                            {row?.courier_partner && partnerList[row?.courier_partner]["title"]}
                                                        </p>
                                                    </div>
                                                    {row?.awb_number && <CustomTooltip
                                                        triggerComponent={<button className='btn copy-button p-0 ps-1' onClick={() => handleCopy(row?.awb_number)}><FaRegCopy /></button>}
                                                        tooltipComponent={copyText}
                                                        addClassName='copytext-tooltip'
                                                    />}
                                                </div>
                                            </td>
                                            <td className='align-middle status-box position-relative'>
                                                <p className='order-Status-box'>{row?.status.split("_").join(" ")}</p>
                                                {row?.status === "pickup_requested" && row?.manifest_status && <p className='text-success fw-bold position-absolute ws-nowrap' style={{ paddingInline: '10px', fontSize: 11 }}>Manifest Generated</p>}
                                            </td>
                                            <td className='align-middle'>
                                                <div className='d-flex align-items-center gap-3 justify-content-end'>
                                                    {row?.order_courier_status === 'Unprocessable' && (
                                                        <button className='btn main-button' style={{ width: '100%' }} onClick={() => handleEditOrder(row?.id)}>
                                                            Edit Order
                                                        </button>
                                                    )}
                                                    {(row?.order_courier_status === 'Processing' && row?.status === "pending") && (
                                                        <button className='btn main-button' style={{ width: '100%' }} onClick={() => globalDebouncedClick(() => handleShipNow(row?.id))}>
                                                            Ship Now
                                                        </button>
                                                    )}
                                                    {row?.status === 'pickup_requested' && (
                                                        <button className='btn main-button' style={{ width: '100%' }} onClick={() => globalDebouncedClick(() => generateManifest(row?.id))}>
                                                            Generate Manifest
                                                        </button>
                                                    )}
                                                    {row?.status === 'shipped' && (
                                                        <button className='btn main-button' style={{ width: '100%' }} onClick={() => globalDebouncedClick(() => handleGeneratePickup(row?.id))}>
                                                            Generate Pickup
                                                        </button>
                                                    )}
                                                    {row?.status !== 'Unprocessable' && row?.status !== 'pending' && row?.status !== 'pickup_requested' && row?.status !== 'shipped' && (
                                                        <button className='btn main-button' style={{ width: '100%' }} onClick={() => globalDebouncedClick(() => openCloneSection(row?.id))}>
                                                            Clone Order
                                                        </button>
                                                    )}
                                                    <div className='action-options'>
                                                        <div className='threedots-img'>
                                                            <img src={ThreeDots} alt="ThreeDots" width={24} />
                                                        </div>
                                                        <div className='action-list'>
                                                            <ul>
                                                                <li onClick={() => openCloneSection(row?.id)}>Clone Order</li>
                                                                <li onClick={() => handleShowCancel(row?.id, row?.id, row?.status)}>Cancel Order</li>
                                                                <li onClick={() => handleShowDelete(row?.id)}>Delete Order</li>
                                                                <li onClick={() => globalDebouncedClick(() => handleShipReassign(row?.id, row?.status))}>Reassign Order</li>
                                                                <li onClick={() => globalDebouncedClick(() => handleDownloadLabel(row?.id, row?.status))}>Download label</li>
                                                                <li onClick={() => globalDebouncedClick(() => handleDownloadInvoice(row?.id, row?.status))}>Download Invoice</li>
                                                                {
                                                                    row?.order_type === "Reverse" &&
                                                                    <li onClick={() => handleQCCheckStatus(row?.id)}>QC Information</li>
                                                                }
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
                    <SingleShipPop setLoader={setLoader} orderId={selectedOrderId} setSingleShip={setSingleShip} SingleShip={SingleShip} shipingResponse={shipingResponse} />
                    <SingleShipPopReassign reassignCard={reassignResponse} orderId={selectedOrderId} setSingleShipReassign={setSingleShipReassign} SingleShipReassign={SingleShipReassign} />
                    <div onClick={() => setSingleShip(false)} className={`backdrop ${!SingleShip && 'd-none'}`}></div>
                    <div onClick={() => setSingleShipReassign(false)} className={`backdrop ${!SingleShipReassign && 'd-none'}`}></div>

                    <Modal
                        show={show}
                        keyboard={false}
                        onHide={handleClose}
                        className='confirmation-modal'
                    >
                        <Modal.Header>
                            <Modal.Title>Confirmation Required</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure you want to delete the order ?
                        </Modal.Body>
                        <Modal.Footer>
                            <div className='d-flex gap-2'>
                                <button className="btn cancel-button" onClick={handleClose}>
                                    Cancel
                                </button>
                                <button className="btn main-button" onClick={handleDeleteOrder}>Continue</button>
                            </div>
                        </Modal.Footer>
                    </Modal>

                    <Modal
                        keyboard={false}
                        show={showCancel}
                        onHide={handleCloseCancel}
                        className='confirmation-modal'
                    >
                        <Modal.Header>
                            <Modal.Title>Confirmation Required</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure you want to Cancel the order ?
                        </Modal.Body>
                        <Modal.Footer>
                            <div className='d-flex gap-2'>
                                <button className="btn cancel-button" onClick={handleCloseCancel}>
                                    Cancel
                                </button>
                                <button className="btn main-button" onClick={handleCancelOrder}>Continue</button>
                            </div>
                        </Modal.Footer>
                    </Modal>

                    <Modal
                        show={ShowQCStatus}
                        keyboard={false}
                        onHide={() => setShowQCStatus(false)}
                        className='qc-check-modal'
                        size="lg"
                    >
                        <Modal.Header>
                            <Modal.Title>Quality Check Information</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <section className='d-flex flex-column gap-3 w-100'>
                                <div className='d-flex w-100 justify-content-between align-items-start gap-5'>
                                    <p className='ws-nowrap'>Help Description:</p>
                                    <p style={{ maxWidth: '370px', textAlign: 'end' }}>{qc?.description}</p>
                                </div>
                                <div className='d-flex w-100 justify-content-between align-items-start gap-5'>
                                    <p>label</p>
                                    <p>
                                        {
                                            qc?.qc_checks != null && Object.keys(qc.qc_checks)?.map((key, index, array) =>
                                                <span key={key}>
                                                    {key}
                                                    {index < array.length - 1 && ", "}
                                                </span>
                                            )
                                        }
                                    </p>
                                </div>
                                <div className='d-flex w-100 justify-content-between align-items-start gap-5'>
                                    <p>Value To check:</p>
                                    <p>
                                        {
                                            qc?.qc_checks != null && Object.values(qc.qc_checks)?.map((value, index, array) =>
                                                <span key={index}>
                                                    {value === "" ? "NA" : value}
                                                    {index < array.length - 1 && ", "}
                                                </span>
                                            )
                                        }
                                    </p>
                                </div>
                                <div className='d-flex w-100 justify-content-between align-items-start gap-5'>
                                    <p>Attachment(s):</p>
                                    <button onClick={handleDownload} className='btn main-button'>Download</button>
                                </div>
                            </section>
                        </Modal.Body>
                        <Modal.Footer>
                            <div className='d-flex gap-2'>
                                <button className="btn cancel-button" onClick={() => setShowQCStatus(false)}>
                                    Close
                                </button>
                            </div>
                        </Modal.Footer>
                    </Modal>

                </div>
            </section>
        </>
    );
};

export default AllOrders;