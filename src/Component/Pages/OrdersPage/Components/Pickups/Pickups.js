import React, { useState, useEffect, useCallback } from 'react';
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
import { weightCalculation, weightGreater } from '../../../../../customFunction/functionLogic';
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
import { debounce } from 'lodash';
import { customErrorFunction } from '../../../../../customFunction/errorHandling';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Pickups = ({ orders, activeTab, MoreFilters, BulkActionShow, bulkAwb, setbulkAwb, setBulkActionShow, selectedRows, setSelectedRows, setOrderTracking, setAwbNo }) => {
    const dispatch = useDispatch()
    const [selectAll, setSelectAll] = useState(false);
    const [BulkActions, setBulkActions] = useState(false)
    const token = Cookies.get("access_token")
    const [show, setShow] = useState(false);
    const [awb, setAwb] = useState("");
    const handleClose = () => setShow(false);

    const { orderdelete } = useSelector(state => state?.orderSectionReducer)

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
        dispatch({
            type: "GENERATE_MANIFEST_ACTION", payload: {
                order_ids: `${param}`
            }
        })
    };
    const debouncedHandleClick = useCallback(
        debounce((param) => handleClick(param), 1000),
        []
    );

    const generateManifest = (value) => {
        debouncedHandleClick(value);
    }
    const downloadManifest = async (value) => {
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
        }
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
            customErrorFunction(error)
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

    const handleClickAWB = (event, awb) => {
        event.preventDefault();
        setAwbNo(awb)
        setOrderTracking(true)
        // const url = `https://shipease.in/order-tracking/`;
        // window.open(url, '_blank');
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

    const handleShow = (args1) => {
        setShow(true)

    };
    const handleCancelOrder = (awb) => {
        setShow(true)
        setAwb(awb)
    }

    const makeApiCall = () => {
        dispatch({
            type: "BULK_CANCEL_ORDER_ACTION", payload: {
                ids: [awb],
            }
        })
        setShow(false)
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
                                                {row?.courier_image && <img src={row.courier_image} title='partner' />}
                                                <div>
                                                    <p className='details-on-hover anchor-awb' onClick={(e) => handleClickAWB(e, row.awb_number)}>
                                                        {row.awb_number}
                                                    </p>
                                                    <p className='mt-1 cursor-pointer text-capitalize' onClick={(event) => handleClickpartner(event, row)}>
                                                        {row && row.courier_partner}
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
                                                    <button className='btn main-button' onClick={() => generateManifest(row.id)}>Generate Manifest</button>
                                                }

                                                <div className='action-options'>
                                                    <div className='threedots-img'>
                                                        <img src={ThreeDots} alt="ThreeDots" width={24} />
                                                    </div>
                                                    <div className='action-list'>
                                                        <ul>
                                                            <li onClick={() => handleCancelOrder(row.id)}>Cancel Order</li>
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
                onHide={handleClose}
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Are you sure you want to Cancel the order ?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" className="px-5" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" className="px-5" onClick={makeApiCall}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </section >
    );
};

export default Pickups;