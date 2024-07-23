import moment from 'moment';
import React, { useState, useEffect } from 'react';
import SearchIcon from '../../../../../assets/image/icons/search-icon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faCircle, faCircleInfo, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import ForwardIcon from '../../../../../assets/image/icons/ForwardIcon.png'
import ThreeDots from '../../../../../assets/image/icons/ThreeDots.png'
// import InfoIcon from '../../../../../assets/image/icons/InfoIcon.png'
import InfoIcon from '../../../../common/Icons/InfoIcon';
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
import { weightCalculation, weightGreater } from '../../../../../customFunction/functionLogic';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import CustomIcon from '../../../../common/Icons/CustomIcon';
import SingleShipPop from '../Processing/SingleShipPop/SingleShipPop';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import OrderTagsIcon from '../../../../common/Icons/OrderTagsIcon';
import CustomTooltip from '../../../../common/CustomTooltip/CustomTooltip';
import VerifiedOrderIcon from '../../../../common/Icons/VerifiedOrderIcon';
import NoData from '../../../../common/noData';
import SingleShipPopReassign from './SingleShipPopReassign';
import { Link } from 'react-router-dom';
import { BASE_URL_CORE } from '../../../../../axios/config';
import { customErrorFunction } from '../../../../../customFunction/errorHandling';
import axios from 'axios';
import globalDebouncedClick from '../../../../../debounce';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



const AllOrders = ({ orders, setRateRef, activeTab, partnerList, selectAll, setStatusType, setSelectAll, bulkAwb, setbulkAwb, setBulkActionShow, selectedRows, setSelectedRows, setCloneOrderSection, setOrderId, setAwbNo, setOrderTracking }) => {
    const dispatch = useDispatch()
    const token = Cookies.get("access_token")
    const [show, setShow] = useState(false);
    const [showCancel, setShowCancel] = useState(false);
    const [deleteOrderId, setDeleteOrderId] = useState("");
    const [cancelOrderId, setCancelOrderId] = useState("");
    const [cancelAwbNo, setCancelAwbNo] = useState("");
    const [cancelOrderStatus, setCancelOrderStatus] = useState("");
    const [SingleShip, setSingleShip] = useState(false)
    const [genaratelabel, setGenaratelabel] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [shipingResponse, setShipingResponse] = useState(null);
    const [generateinvoice, setGenerateinvoice] = useState(false);
    const [SingleShipReassign, setSingleShipReassign] = useState(false)
    const { orderdelete } = useSelector(state => state?.orderSectionReducer)
    const reassignCard = useSelector(state => state?.moreorderSectionReducer?.moreorderCard)
    const { labelData, invoiceData } = useSelector(state => state?.orderSectionReducer)

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
        if (status === "pending") {
            toast.error("Order not shipped yet")
        } else {
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
        if (status === "pending") {
            toast.error("Order not shipped yet")
        } else {
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
            dispatch({ type: "REASSIGN_DATA_ACTION", payload: orderId });
            setSelectedOrderId(orderId);
            setSingleShipReassign(true);
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
        const courierPartner = row.courier_partner.toLowerCase();

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
                                                        {row.is_mps === true &&
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
                                                                {row?.shipping_detail?.address && `${row.shipping_detail.address}, `}
                                                                {row?.shipping_detail?.landmark && `${row.shipping_detail.landmark}, `}
                                                                {row?.shipping_detail?.city && `${row.shipping_detail.city}, `}
                                                                {row?.shipping_detail?.state && `${row.shipping_detail.state}, `}
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
                                                    {row?.pickup_details ? (
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
                                                    ) : ''}
                                                </div>
                                            </td>
                                            <td>
                                                {/* shiping section here */}
                                                <div className='cell-inside-box shipping-details'>
                                                    {row?.courier_partner && <img src={partnerList[row.courier_partner]} title='Partner' />}
                                                    <div>
                                                        <p className='details-on-hover anchor-awb' onClick={(e) => handleClickAWB(row.awb_number)}>
                                                            {row.awb_number}
                                                        </p>
                                                        <p className='mt-1 cursor-pointer text-capitalize' onClick={(event) => handleClickpartner(event, row)}>
                                                            {row && row.courier_partner?.split("_").join(" ")}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='align-middle status-box position-relative'>
                                                <p className='order-Status-box'>{row?.status.split("_").join(" ")}</p>
                                                {row?.status === "pickup_requested" && row?.manifest_status && <p className='text-success fw-bold position-absolute ws-nowrap' style={{ paddingInline: '10px', fontSize: 11 }}>Manifest Generated</p>}
                                            </td>
                                            <td className='align-middle'>
                                                <div className='d-flex align-items-center gap-3 justify-content-end'>
                                                    <button className='btn main-button' style={{ width: '100%' }}>{
                                                        row?.order_courier_status === 'Unprocessable' ? <span>Edit Order</span>
                                                            : row?.status === "pending" ? <span onClick={() => globalDebouncedClick(() => handleShipNow(row?.id))}>Ship Now</span>
                                                                : row?.status === "pickup_requested" ? <span onClick={() => globalDebouncedClick(() => generateManifest(row?.id))}>Generate Manifest</span>
                                                                    : row?.status === "shipped" ? <span onClick={() => globalDebouncedClick(() => handleGeneratePickup(row?.id))}>Generate Pickup</span>
                                                                        : <span onClick={() => globalDebouncedClick(() => openCloneSection(row?.id))}>Clone Order</span>
                                                    }</button>
                                                    <div className='action-options'>
                                                        <div className='threedots-img'>
                                                            <img src={ThreeDots} alt="ThreeDots" width={24} />
                                                        </div>
                                                        <div className='action-list'>
                                                            <ul>
                                                                <li onClick={() => openCloneSection(row?.id)}>Clone Order</li>
                                                                <li onClick={() => handleShowCancel(row?.id, row?.id, row.status)}>Cancel Order</li>
                                                                <li onClick={() => handleShowDelete(row?.id)}>Delete Order</li>
                                                                <li onClick={() => globalDebouncedClick(() => handleShipReassign(row?.id, row.status))}>Reassign Order</li>
                                                                <li onClick={() => globalDebouncedClick(() => handleDownloadLabel(row?.id, row.status))}>Download label</li>
                                                                <li onClick={() => globalDebouncedClick(() => handleDownloadInvoice(row?.id, row.status))}>Download Invoice</li>
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
                    <SingleShipPop orderId={selectedOrderId} setSingleShip={setSingleShip} SingleShip={SingleShip} shipingResponse={shipingResponse} />
                    <SingleShipPopReassign reassignCard={reassignCard} orderId={selectedOrderId} setSingleShipReassign={setSingleShipReassign} SingleShipReassign={SingleShipReassign} />
                    <div onClick={() => setSingleShip(false)} className={`backdrop ${!SingleShip && 'd-none'}`}></div>
                    <div onClick={() => setSingleShipReassign(false)} className={`backdrop ${!SingleShipReassign && 'd-none'}`}></div>

                    <Modal
                        show={show}
                        onHide={handleClose}
                        keyboard={false}
                    >
                        <Modal.Header>
                            <Modal.Title>Are you sure you want to delete the order ?</Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                            <Button variant="secondary" className="px-5" onClick={handleClose}>
                                No
                            </Button>
                            <Button variant="primary" className="px-5" onClick={handleDeleteOrder}>Yes</Button>
                        </Modal.Footer>
                    </Modal>


                    <Modal
                        show={showCancel}
                        onHide={handleCloseCancel}
                        keyboard={false}
                    >
                        <Modal.Header>
                            <Modal.Title>Are you sure you want to Cancel the order ?</Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                            <Button variant="secondary" className="px-5" onClick={handleCloseCancel}>
                                No
                            </Button>
                            <Button variant="primary" className="px-5" onClick={handleCancelOrder}>Yes</Button>
                        </Modal.Footer>
                    </Modal>

                </div>
            </section>
        </>
    );
};

export default AllOrders;