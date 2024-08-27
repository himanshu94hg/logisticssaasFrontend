import moment from 'moment';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { FaRegCopy } from "react-icons/fa";
import SingleShipPop from './SingleShipPop';
import NoData from '../../../../common/noData';
import React, { useState, useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfoIcon from '../../../../common/Icons/InfoIcon';
import { BASE_URL_CORE } from '../../../../../axios/config';
import CustomIcon from '../../../../common/Icons/CustomIcon';
import { faCircle, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OrderTagsIcon from '../../../../common/Icons/OrderTagsIcon';
import ThreeDots from '../../../../../assets/image/icons/ThreeDots.png'
import amazonImg from "../../../../../assets/image/logo/AmazonLogo.png"
import woocomImg from "../../../../../assets/image/integration/WCLogo.png"
import ForwardIcon from '../../../../../assets/image/icons/ForwardIcon.png'
import CustomTooltip from '../../../../common/CustomTooltip/CustomTooltip';
import VerifiedOrderIcon from '../../../../common/Icons/VerifiedOrderIcon';
import { weightGreater } from '../../../../../customFunction/functionLogic';
import shopifyImg from "../../../../../assets/image/integration/shopify.png"
import magentoImg from "../../../../../assets/image/integration/magento.png"
import openCartImg from "../../../../../assets/image/integration/OpenCart.png"
import { customErrorFunction } from '../../../../../customFunction/errorHandling';
import amazonDirImg from "../../../../../assets/image/integration/AmazonLogo.png"
import storeHipImg from "../../../../../assets/image/integration/StoreHippoLogo.png"
import APIChannelIcon from "../../../../../assets/image/integration/APIChannelIcon.png"
import UnicommerceIcon from "../../../../../assets/image/integration/UnicommerceIcon.png"

const ReadyToShip = ({ setOrderTracking, orders, setLoader, partnerList, MoreFilters, activeTab, bulkAwb, setbulkAwb, setPickupStatus, setBulkActionShow, selectedRows, setSelectedRows, setAwbNo, }) => {
    const dispatch = useDispatch()
    const handleClose = () => setShow(false);
    const token = Cookies.get("access_token")
    const [show, setShow] = useState(false);
    const [actionType, setActionType] = useState("");
    const [selectAll, setSelectAll] = useState(false);
    const [actionId, setActionId] = useState("")
    const [SingleShip, setSingleShip] = useState(false)
    const [copyText, setcopyText] = useState("Tracking Link")
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const { loaderState } = useSelector(state => state?.errorLoaderReducer);
    const { orderdelete, orderCancelled } = useSelector(state => state?.orderSectionReducer)
    const reassignCard = useSelector(state => state?.moreorderSectionReducer?.moreorderCard)
    const moreorderCard = useSelector(state => state?.moreorderSectionReducer?.moreorderShipCard)

    useEffect(() => {
        if (moreorderCard?.status) {
            setSingleShip(false);
        }
    }, [moreorderCard])

    useEffect(() => {
        if (orderCancelled || loaderState) {
            setLoader(false)
        }
    }, [orderCancelled, loaderState])

    useEffect(() => {
        if (orderdelete) {
            setSelectAll(false)
        }
    }, [orderdelete])
    useEffect(() => {
        if (activeTab || MoreFilters) {
            setSelectAll(false)
        }
    }, [activeTab, MoreFilters])

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

    const handleDownloadLabel = async (orderId) => {
        setLoader(true)
        try {
            const requestData = {
                order_ids: `${orderId}`
            };

            const response = await fetch(`${BASE_URL_CORE}/core-api/shipping/generate-label/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(requestData)

            });
            if (response.status === 200) {
                setLoader(true)
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
            setLoader(false)
        } catch (error) {
            customErrorFunction(error)
            setLoader(false)
        }
    };

    const handleDownloadInvoice = async (orderId) => {
        setLoader(true)
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
            setLoader(false)
        } catch (error) {
            customErrorFunction(error)
            setLoader(false)
        }
    };

    const handleShipNow = (orderId) => {
        setSelectedOrderId(orderId);
        dispatch({ type: "REASSIGN_DATA_ACTION", payload: orderId });
        setSingleShip(true);

    };

    const handleClickAWB = (e, awb) => {
        e.preventDefault();
        setOrderTracking(true)
        setAwbNo(awb)
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
                window.open(`https://ekartlogistics.com/shipmenttrack/${row?.awb_number}`, '_blank');
                break;
            case "shadowfax":
                window.open('https://tracker.shadowfax.in/#/', '_blank');
                break;
            case "amazon_swa":
                window.open('https://track.amazon.in/', '_blank');
                break;
            case "xpressbees":
                window.open(`https://www.xpressbees.com/shipment/tracking?awbNo=${row?.awb_number}`, '_blank');
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

    const handleShow = (args, type) => {
        setShow(true)
        setActionId(args)
        setActionType(type)
    };

    const handlePickupCancelApiCall = async () => {
        setShow(false)
        setLoader(true)
        if (actionType === "generate-pickup") {
            try {
                const response = await fetch(`${BASE_URL_CORE}/core-api/shipping/generate-pickup/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        orders: [
                            actionId
                        ]
                    })
                });
                if (response?.status === 200) {
                    toast.success("Generate Pickup successfully")
                    setPickupStatus(new Date())
                    setLoader(false)
                }
            } catch (error) {
                toast.error("Something went wrong!")
                setLoader(false)
            }
        } else if (actionType === "cancel-order") {
            dispatch({
                type: "ORDERS_DETAILS_CANCEL_ACTION", payload: {
                    ids: [actionId]
                }
            })
        }
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
                                                onChange={() => handleSelectRow(row?.id, row?.awb_number)}

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
                                                    <span className='ms-2'>{`${moment(row?.created_at).format('DD MMM YYYY')} || ${moment(row?.created_at).format('h:mm A')}`}</span>
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
                                                                        <div className="label-button-container active"><button className='label-button'><FontAwesomeIcon icon={faCircle} className='me-2' />{item?.name}</button></div>

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
                                                    <span> LBH(cm): {row?.dimension_detail?.length} x {row?.dimension_detail?.breadth} x {row?.dimension_detail?.height}</span>
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
                                                                    {row?.pickup_details?.p_address_line1 && `${row?.pickup_details?.p_address_line1},`}
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
                                                    <p className='details-on-hover anchor-awb' onClick={(e) => handleClickAWB(e, row?.awb_number)}>
                                                        {row?.awb_number}
                                                    </p>
                                                    <p className='mt-1 cursor-pointer text-capitalize' onClick={(event) => handleClickpartner(event, row)}>
                                                        {row?.courier_partner && partnerList[row?.courier_partner]["title"]}
                                                    </p>
                                                </div>
                                                <CustomTooltip
                                                    triggerComponent={<button className='btn copy-button p-0 ps-1' onClick={() => handleCopy(row?.awb_number)}><FaRegCopy /></button>}
                                                    tooltipComponent={copyText}
                                                    addClassName='copytext-tooltip'
                                                />
                                            </div>
                                        </td>
                                        <td className='align-middle status-box'>
                                            <p className='order-Status-box'>{row?.status.split("_").join(" ")}</p>
                                        </td>
                                        <td className='align-middle'>
                                            <div className='d-flex align-items-center gap-3'>
                                                <button className="btn main-button" onClick={() => handleShow(row?.id, "generate-pickup")} disabled={row?.status === "cancelled" && true}>
                                                    Generate Pickup
                                                </button>
                                                <div className='action-options'>
                                                    <div className='threedots-img' disabled={true}>
                                                        <img src={ThreeDots} alt="ThreeDots" width={24} />
                                                    </div>
                                                    {row?.status !== "cancelled" ? (
                                                        <div className='action-list'>
                                                            <ul>
                                                                <li onClick={() => handleDownloadLabel(row?.id)}>Download Label</li>
                                                                <li onClick={() => handleDownloadInvoice(row?.id)}>Download Invoice</li>
                                                                <li onClick={() => handleShipNow(row?.id)}>Reassign</li>
                                                                <li className='action-hr'></li>
                                                                <li onClick={() => handleShow(row?.id, "cancel-order")}>Cancel Order</li>
                                                            </ul>
                                                        </div>
                                                    ) : null}
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
                <div onClick={() => setSingleShip(false)} className={`backdrop ${!SingleShip && 'd-none'}`}></div>
                <SingleShipPop reassignCard={reassignCard} setSingleShip={setSingleShip} SingleShip={SingleShip} orderId={selectedOrderId} />
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
                        Are you sure you want to {actionType === "generate-pickup" ? "Generate pickup" : "Cancel"} the order ?
                    </Modal.Body>
                    <Modal.Footer>
                        <div className='d-flex gap-2'>
                            <button className="btn cancel-button" onClick={handleClose}>
                                Cancel
                            </button>
                            <button className="btn main-button" onClick={handlePickupCancelApiCall}>Continue</button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        </section>
    );
};

export default ReadyToShip;