import moment from 'moment';
import Cookies from 'js-cookie';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import NoData from '../../../../common/noData';
import { useDispatch, useSelector } from 'react-redux';
import InfoIcon from '../../../../common/Icons/InfoIcon';
import { BASE_URL_CORE } from '../../../../../axios/config';
import CustomIcon from '../../../../common/Icons/CustomIcon';
import React, { useState, useEffect, useCallback } from 'react';
import { faCircle, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OrderTagsIcon from '../../../../common/Icons/OrderTagsIcon';
import ThreeDots from '../../../../../assets/image/icons/ThreeDots.png'
import amazonImg from "../../../../../assets/image/logo/AmazonLogo.png"
import CustomTooltip from '../../../../common/CustomTooltip/CustomTooltip';
import woocomImg from "../../../../../assets/image/integration/WCLogo.png"
import ForwardIcon from '../../../../../assets/image/icons/ForwardIcon.png'
import VerifiedOrderIcon from '../../../../common/Icons/VerifiedOrderIcon';
import magentoImg from "../../../../../assets/image/integration/magento.png"
import shopifyImg from "../../../../../assets/image/integration/shopify.png"
import { weightGreater } from '../../../../../customFunction/functionLogic';
import openCartImg from "../../../../../assets/image/integration/OpenCart.png"
import amazonDirImg from "../../../../../assets/image/integration/AmazonLogo.png"
import { customErrorFunction } from '../../../../../customFunction/errorHandling';
import storeHipImg from "../../../../../assets/image/integration/StoreHippoLogo.png"

const Pickups = ({ orders, activeTab, MoreFilters, setLoader, partnerList, bulkAwb, setbulkAwb, setBulkActionShow, selectedRows, setSelectedRows, setOrderTracking, setAwbNo }) => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const token = Cookies.get("access_token")
    const [actionId, setActionId] = useState("")
    const [actionType, setActionType] = useState("");
    const [selectAll, setSelectAll] = useState(false);
    const { orderdelete, orderCancelled } = useSelector(state => state?.orderSectionReducer)

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
    const handleClick = (param) => {

    };
    const debouncedHandleClick = useCallback(
        debounce((param) => handleClick(param), 1000),
        []
    );

    const generateManifest = (value) => {
        setLoader(true)
        debouncedHandleClick(value);
    }
    const downloadManifest = async (value) => {
        setLoader(true)
        const requestData = {
            order_ids: `${value}`
        };
        try {
            const response = await fetch(`${BASE_URL_CORE}/core-api/shipping/generate-manifest/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(requestData)
            });
            if (response.status === 200) {
                setLoader(false)
                toast.success("Download Manifest successfully")
            }
            const data = await response.blob();
            const url = window.URL.createObjectURL(data);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'Manifest.pdf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            customErrorFunction(error)
            setLoader(false)
        }
    }

    const handleDownloadLabel = async (orderId) => {
        setLoader(true)
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
                setLoader(false)
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

    const handleClickAWB = (event, awb) => {
        event.preventDefault();
        setAwbNo(awb)
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
        if (orderdelete || orderCancelled) {
            setLoader(false)
        }
    }, [orderdelete, orderCancelled])


    const handleShow = (awb, type) => {
        setShow(true)
        setActionId(awb)
        setActionType(type)
    };

    const handleApiCall = () => {
        setShow(false)
        setLoader(true)
        if (actionType === "generate-manifest") {
            dispatch({
                type: "GENERATE_MANIFEST_ACTION", payload: {
                    order_ids: `${actionId}`
                }
            })
        } else {
            dispatch({
                type: "BULK_CANCEL_ORDER_ACTION", payload: {
                    ids: [actionId],
                }
            })
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
                                                                                : <CustomIcon />}
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
                                            {/* customer detail */}
                                            <div className='cell-inside-box'>
                                                <p>{row?.shipping_detail?.recipient_name}</p>
                                                <p>{row?.shipping_detail?.mobile_number}
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
                                                {/* <p>{row.s_city}</p>
                                                <p>{row.s_pincode}</p>
                                                <p>{row.s_state}</p> */}
                                            </div>
                                        </td>
                                        <td>
                                            {/* package  details */}
                                            <div className='cell-inside-box'>
                                                {/* <p className='width-eclipse'>{row?.order_products?.product_name}</p> */}
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
                                            {/* payment section here */}
                                            <div className='cell-inside-box'>
                                                <p className=''>₹ {row.invoice_amount}</p>
                                                <p className='order-Status-box mt-1'>{row.payment_type}</p>
                                            </div>
                                        </td>
                                        <td className=''>
                                            {/* pickup adress */}
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
                                            {/* shiping section here */}
                                            <div className='cell-inside-box shipping-details'>
                                                {row?.courier_partner && <img src={partnerList[row.courier_partner]} title='Partner' />}
                                                <div>
                                                    <p className='details-on-hover anchor-awb' onClick={(e) => handleClickAWB(e, row.awb_number)}>
                                                        {row.awb_number}
                                                    </p>
                                                    <p className='mt-1 cursor-pointer text-capitalize' onClick={(event) => handleClickpartner(event, row)}>
                                                        {row && row.courier_partner?.split("_").join(" ")}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='align-middle status-box position-relative'>
                                            {/*  Status section  */}
                                            <p className='order-Status-box'>{row?.status.split("_").join(" ")}</p>
                                            {row?.manifest_status && <p className='text-success fw-bold position-absolute ws-nowrap' style={{ paddingInline: '10px', fontSize: 11 }}>Manifest Generated</p>}
                                        </td>
                                        <td className='align-middle'>
                                            <div className='d-flex align-items-center gap-3'>
                                                {row?.manifest_status ?
                                                    <button className='btn main-button' onClick={() => downloadManifest(row.id)}>Download Manifest</button> :
                                                    <button className='btn main-button' onClick={() => handleShow(row.id, "generate-manifest")}>Generate Manifest</button>
                                                }

                                                <div className='action-options'>
                                                    <div className='threedots-img'>
                                                        <img src={ThreeDots} alt="ThreeDots" width={24} />
                                                    </div>
                                                    <div className='action-list'>
                                                        <ul>
                                                            <li onClick={() => handleShow(row.id, "cancel-order")}>Cancel Order</li>
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
                    Are you sure you want to {actionType === "generate-manifest" ? "Generate manifest" : "Cancel"} the order ?
                </Modal.Body>
                <Modal.Footer>
                    <div className='d-flex gap-2'>
                        <button className="btn cancel-button" onClick={handleClose}>
                            Cancel
                        </button>
                        <button className="btn main-button" onClick={handleApiCall}>Continue</button>
                    </div>
                </Modal.Footer>
            </Modal>
        </section >
    );
};

export default Pickups;