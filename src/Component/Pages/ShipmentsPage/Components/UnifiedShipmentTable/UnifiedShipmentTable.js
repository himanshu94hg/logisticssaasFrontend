import moment from "moment";
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { FaRegCopy } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import NoData from '../../../../common/noData';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InfoIcon from '../../../../common/Icons/InfoIcon';
import ThreeDots from '../../../../../assets/image/icons/ThreeDots.png';
import CustomTooltip from "../../../../common/CustomTooltip/CustomTooltip";
import { weightGreater } from '../../../../../customFunction/functionLogic';
import ForwardIcon from '../../../../../assets/image/icons/ForwardIcon.png';
import VerifiedOrderIcon from "../../../../common/Icons/VerifiedOrderIcon";
import CallingDetailsIcon from "../../../../common/Icons/CallingDetailsIcon";
import { customErrorFunction } from "../../../../../customFunction/errorHandling";
import Cookies from 'js-cookie';
import { BASE_URL_COURIER } from "../../../../../axios/config";
import axios from "axios";
import customImg from "../../../../../assets/image/integration/Manual.png";

const TYPE_LABELS = {
    'Action Required': { label: 'Action Required', className: 'badge bg-warning text-dark' },
    'Action Requested': { label: 'Action Requested', className: 'badge bg-info' },
    'RTO': { label: 'RTO', className: 'badge bg-danger' },
    'Delivered': { label: 'Delivered', className: 'badge bg-success' },
};

const UnifiedShipmentTable = ({ selectAll, setSelectAll, shipmentCard, selectedRows, setSelectedRows, setBulkActionShow, setAwbNo, setOrderTracking, partnerList }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [allShipment, setAllShipment] = useState([]);
    const [selectedData, setSelectedData] = useState(null);
    const [copyText, setcopyText] = useState("Tracking Link");
    const channel_list = JSON.parse(localStorage.getItem('channel_list')) || {};

    useEffect(() => {
        if (shipmentCard) {
            setAllShipment(shipmentCard);
        }
    }, [shipmentCard]);

    const handleReattempt = (orderIds) => {
        const updatedRules = allShipment.filter(shipment => shipment.id !== orderIds);
        setAllShipment(updatedRules);
        dispatch({ type: "SHIPMENT_REATTEMPT_DATA_ACTION", payload: { "order_ids": JSON.stringify(orderIds) } });
    };

    const handleRto = (orderIds) => {
        const updatedRules = allShipment.filter(shipment => shipment.id !== orderIds);
        setAllShipment(updatedRules);
        dispatch({ type: "SHIPMENT_RTO_DATA_ACTION", payload: { "order_ids": JSON.stringify(orderIds) } });
    };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(shipmentCard?.map(row => row?.id) || []);
            setBulkActionShow(true);
        } else {
            setSelectedRows([]);
            setBulkActionShow(false);
        }
    };

    const handleSelectRow = (orderId) => {
        const isSelected = selectedRows.includes(orderId);
        if (isSelected) {
            setSelectedRows(selectedRows.filter(id => id !== orderId));
        } else {
            setSelectedRows([...selectedRows, orderId]);
        }
        setBulkActionShow(true);
        if (selectedRows.length === (allShipment?.length || 0) - 1 && isSelected) {
            setSelectAll(false);
        } else {
            setSelectAll(false);
        }
    };

    const handleShow = (row) => {
        setSelectedData(row);
        setShow(true);
    };

    const handleClose = () => setShow(false);

    const handleClickAWB = (awb) => {
        setOrderTracking(true);
        setAwbNo(awb);
    };

    const handleClickpartner = (event, row) => {
        event.preventDefault();
        const courierPartner = row?.courier_partner?.toLowerCase();
        const urls = {
            bluedart: 'https://www.bluedart.com/web/guest/home',
            delhivery: 'https://www.delhivery.com/track/package',
            smartr: 'https://smartr.in/tracking',
            ekart: 'https://ekartlogistics.com/',
            ekart_5kg: 'https://ekartlogistics.com/',
            shadowfax: 'https://tracker.shadowfax.in/#/',
            amazon_swa: 'https://track.amazon.in/',
            xpressbees: 'https://www.xpressbees.com/shipment/tracking',
            'shree maruti': 'https://www.shreemaruti.com/',
            movin: 'https://www.movin.in/shipment/track',
            'ecom express': 'https://ecomexpress.in/tracking/',
            professional: 'https://www.tpcindia.com/Default.aspx',
        };
        if (urls[courierPartner]) {
            window.open(urls[courierPartner], '_blank');
        }
    };

    const handleCopy = (awb) => {
        navigator.clipboard.writeText(`https://shipease.in/order-tracking/${awb}`)
            .then(() => {
                setcopyText("Copied");
                setTimeout(() => setcopyText('Tracking Link'), 2000);
            })
            .catch(() => {});
    };

    const handleEscalate = (awbNumber) => {
        navigate(`/customer-support?awb_number=${awbNumber}`);
    };

    const [ShowCallDetails, setShowCallDetails] = useState(false);
    const authToken = Cookies.get("access_token");
    const [callData, setCallData] = useState([]);

    const handleCallingDetails = async (id) => {
        setShowCallDetails(!ShowCallDetails);
        try {
            if (id != null) {
                const response = await axios.get(`${BASE_URL_COURIER}/courier-api/master/ndr-calling/?awb_number=${id}`, {
                    headers: { Authorization: `Bearer ${authToken}` }
                });
                setCallData(response?.data || []);
            }
        } catch (error) {
            customErrorFunction(error);
        }
    };

    const getTypeConfig = (shipmentType) => TYPE_LABELS[shipmentType] || { label: shipmentType, className: 'badge bg-secondary' };

    return (
        <>
            <section className='position-relative'>
                <div className="position-relative">
                    <div className='table-container'>
                        <table className="w-100">
                            <thead className="sticky-header">
                                <tr className="table-row box-shadow">
                                    <th style={{ width: '1%' }}>
                                        <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                                    </th>
                                    <th>Type</th>
                                    <th>Order Details</th>
                                    <th>NDR Attempt</th>
                                    <th>Package Details</th>
                                    <th>Customer details</th>
                                    <th>Tracking Detail</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                                <tr className="blank-row"><td></td></tr>
                            </thead>
                            <tbody>
                                {allShipment?.map((row, index) => {
                                    const typeConfig = getTypeConfig(row.shipmentType);
                                    const isActionRequired = row.shipmentType === 'Action Required';
                                    const ndrDetails = row?.ndr_details || [];
                                    const orderProducts = Array.isArray(row?.order_products) ? row.order_products : (row?.order_products ? [row.order_products] : []);
                                    return (
                                        <React.Fragment key={`${row?.id}-${row?.shipmentType}-${index}`}>
                                            {index > 0 && <tr className="blank-row"><td></td></tr>}
                                            <tr className='table-row box-shadow'>
                                                <td className='checkbox-cell'>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedRows.includes(row?.id)}
                                                        onChange={() => handleSelectRow(row?.id)}
                                                    />
                                                </td>
                                                <td className='align-middle'>
                                                    <span className={typeConfig.className}>{typeConfig.label}</span>
                                                </td>
                                                <td>
                                                    <div className='cell-inside-box'>
                                                        <p className=''>
                                                            {row?.channel && (
                                                                <img
                                                                    src={channel_list[row?.channel]?.image || customImg}
                                                                    alt="channel"
                                                                    width="20"
                                                                />
                                                            )}
                                                            <span className='d-inline-flex align-items-center gap-1 ms-2'>
                                                                <Link to={`/orderdetail/${row?.id}`} className='anchor-order'>{row?.customer_order_number}</Link>
                                                                {row?.other_details?.is_verified && (
                                                                    <CustomTooltip
                                                                        triggerComponent={<VerifiedOrderIcon />}
                                                                        tooltipComponent='Verified'
                                                                        addClassName='verified-hover'
                                                                    />
                                                                )}
                                                            </span>
                                                            <span onClick={() => handleCallingDetails(row?.awb_number)} className="ms-2 cursor-pointer"><CallingDetailsIcon /></span>
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
                                                            <CustomTooltip
                                                                triggerComponent={
                                                                    <span className='ms-2'>
                                                                        {row?.awb_assigned_date ? moment(row.awb_assigned_date).format('DD MMM YYYY') + ' || ' + moment(row.awb_assigned_date).format('h:mm A') : '-'}
                                                                    </span>
                                                                }
                                                                tooltipComponent={
                                                                    <span>
                                                                        {row?.awb_assigned_date && <span><strong>Booked Date:</strong>{moment(row.awb_assigned_date).format('DD MMM YYYY hh:mm A')}</span>}
                                                                        <span><strong>Order Date:</strong>{row?.order_date ? moment(row.order_date).format('DD MMM YYYY hh:mm A') : 'NA'}</span>
                                                                        <span><strong>Created At:</strong>{row?.created_at ? moment(row.created_at).format('DD MMM YYYY hh:mm A') : 'NA'}</span>
                                                                    </span>
                                                                }
                                                                addClassName='order-related-dates'
                                                            />
                                                            {row?.is_mps === true && <span className="mps-flag">MPS</span>}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='cell-inside-box'>
                                                        <p><strong>Attempts: </strong>{ndrDetails.length}
                                                            <span> </span>
                                                            <InfoIcon onClick={() => handleShow(row)} />
                                                        </p>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='cell-inside-box'>
                                                        <p className='width-eclipse'>{(orderProducts[0]?.product_name) || '-'}</p>
                                                        <p>Wt: {weightGreater(row?.dimension_detail?.weight, row?.dimension_detail?.vol_weight)} kg
                                                            <span className='details-on-hover ms-2 align-middle'>
                                                                <InfoIcon />
                                                                <span style={{ width: '250px' }}>
                                                                    {orderProducts.map((product, idx) => (
                                                                        <React.Fragment key={idx}>
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
                                                        <p>{row?.shipping_detail?.recipient_name}</p>
                                                        <p>{row?.shipping_detail?.mobile_number ?? null}
                                                            <span className='details-on-hover ms-2'>
                                                                <InfoIcon />
                                                                <span style={{ width: '250px' }}>
                                                                    {row?.shipping_detail?.address}, {row?.shipping_detail?.landmark}, {row?.shipping_detail?.city}, {row?.shipping_detail?.state}, {row?.shipping_detail?.pincode}
                                                                </span>
                                                            </span>
                                                        </p>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='cell-inside-box shipping-details'>
                                                        {row?.courier_partner && partnerList?.[row?.courier_partner] && (
                                                            <img src={partnerList[row.courier_partner].image} title='Partner' alt="" />
                                                        )}
                                                        <div>
                                                            <p className='details-on-hover anchor-awb' onClick={() => handleClickAWB(row?.awb_number)}>{row?.awb_number}</p>
                                                            <p className='mt-1 cursor-pointer text-capitalize' onClick={(e) => handleClickpartner(e, row)}>
                                                                {row?.courier_partner && partnerList?.[row?.courier_partner]?.title}
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
                                                    <p className='order-Status-box'>{row?.status?.split("_").join(" ") || '-'}</p>
                                                </td>
                                                <td className='align-middle'>
                                                    {isActionRequired ? (
                                                        <div className='d-flex align-items-center gap-3'>
                                                            <button className='btn main-button' onClick={() => handleReattempt(row?.id)}>Re-Attempt</button>
                                                            <div className='action-options'>
                                                                <div className='threedots-img'>
                                                                    <img src={ThreeDots} alt="ThreeDots" width={24} />
                                                                </div>
                                                                <div className='action-list'>
                                                                    <ul>
                                                                        <li onClick={() => handleRto(row?.id)}>RTO</li>
                                                                        <li onClick={() => handleEscalate(row?.awb_number)}>Escalate</li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <span className='text-muted'>-</span>
                                                    )}
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    );
                                })}
                            </tbody>
                        </table>
                        {(!allShipment || allShipment.length === 0) && <NoData />}
                    </div>
                    <Preview show={show} handleClose={handleClose} selectedData={selectedData} />
                </div>
            </section>
            <Modal show={ShowCallDetails} onHide={handleCallingDetails} centered className="confirmation-modal calling-details">
                <Modal.Header closeButton>
                    <Modal.Title>Call Details for <b>Order Number</b></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ minHeight: '200px' }}>
                        {callData?.length > 0 ? (
                            <table className="w-100">
                                <thead>
                                    <tr className="table-row">
                                        <th>ID</th>
                                        <th>File Name</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {callData.map((row, index) => (
                                        <tr key={row.id} className="table-row box-shadow">
                                            <td>{row.id}</td>
                                            <td>callrec{index + 1}</td>
                                            <td>{moment(row?.call_start_time).format('DD MMM YYYY')} || {moment(row?.call_start_time).format('h:mm A')}</td>
                                            <td>
                                                <a href={row.recording_path} download target="_blank" rel="noopener noreferrer">
                                                    <FiDownload className="text-sh-primary" />
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : "No Recordings found"}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn main-button" onClick={handleCallingDetails}>Close</button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

function Preview({ show, handleClose, selectedData }) {
    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>NDR Attempt History</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="table">
                    <tbody>
                        <tr>
                            <th>Action Date</th>
                            <th>Action By</th>
                            <th>Reason</th>
                            <th>Remark</th>
                            <th>Status</th>
                        </tr>
                        {selectedData?.other_details?.ndr_reason != null && (
                            <tr>
                                <td>{selectedData?.other_details?.ndr_action_date ? moment(selectedData.other_details.ndr_action_date).format("DD MMM YYYY, h:mm A") : "NA"}</td>
                                <td>Courier</td>
                                <td>{selectedData?.other_details?.ndr_reason}</td>
                                <td>{selectedData?.other_details?.ndr_reason}</td>
                                <td>{selectedData?.other_details?.ndr_action}</td>
                            </tr>
                        )}
                        {(selectedData?.ndr_details || []).map((row, index) => (
                            <tr key={index}>
                                <td>{row?.action_date ? moment(row.action_date).format("DD MMM YYYY, h:mm A") : "NA"}</td>
                                <td>{row?.action_by}</td>
                                <td>{row?.reason}</td>
                                <td className="text-capitalize">{row?.remark}</td>
                                <td className="text-capitalize">{row?.action_status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Modal.Body>
        </Modal>
    );
}

export default UnifiedShipmentTable;
