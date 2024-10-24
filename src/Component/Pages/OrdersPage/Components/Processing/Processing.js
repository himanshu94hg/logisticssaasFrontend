import axios from "axios";
import Cookies from 'js-cookie';
import moment from 'moment/moment';
import { debounce } from "lodash";
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import NoData from '../../../../common/noData';
import { useDispatch, useSelector } from 'react-redux';
import InfoIcon from '../../../../common/Icons/InfoIcon';
import SingleShipPop from './SingleShipPop/SingleShipPop';
import globalDebouncedClick from "../../../../../debounce";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import ThreeDots from '../../../../../assets/image/icons/ThreeDots.png'
import ForwardIcon from '../../../../../assets/image/icons/ForwardIcon.png'
import shopifyImg from "../../../../../assets/image/integration/shopify.png"
import woocomImg from "../../../../../assets/image/integration/WCLogo.png"
import openCartImg from "../../../../../assets/image/integration/OpenCart.png"
import storeHipImg from "../../../../../assets/image/integration/StoreHippoLogo.png"
import magentoImg from "../../../../../assets/image/integration/magento.png"
import EasyComLogo from "../../../../../assets/image/integration/EasyComLogo.png"
import amazonImg from "../../../../../assets/image/logo/AmazonLogo.png"
import amazonDirImg from "../../../../../assets/image/integration/AmazonLogo.png"
import APIChannelIcon from "../../../../../assets/image/integration/APIChannelIcon.png"
import UnicommerceIcon from "../../../../../assets/image/integration/UnicommerceIcon.png"
import { weightGreater } from '../../../../../customFunction/functionLogic';
import CustomIcon from '../../../../common/Icons/CustomIcon';
import OrderTagsIcon from '../../../../common/Icons/OrderTagsIcon';
import CustomTooltip from '../../../../common/CustomTooltip/CustomTooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import omsguru from "../../../../../assets/image/logo/OmsGuruIcon.png"
import VerifiedOrderIcon from '../../../../common/Icons/VerifiedOrderIcon';
import { BASE_URL_CORE } from '../../../../../axios/config';
import { customErrorFunction } from '../../../../../customFunction/errorHandling';
import { Color } from "antd/es/color-picker";


const Processing = React.memo(({ orders, activeTab, setOrderTagId, selectAll, setLoader, setSelectAll, MoreFilters, setEditOrderSection, setCloneOrderSection, setOrderId, setBulkActionShow, selectedRows, setSelectedRows, setaddTagShow }) => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    let authToken = Cookies.get("access_token")
    const [actionType, setActionType] = useState({});
    const [SingleShip, setSingleShip] = useState(false)
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [shipingResponse, setShipingResponse] = useState(null);
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
                setBulkActionShow(true)
            } else {
                setSelectedRows([]);
                setBulkActionShow(false)
                setSelectAll(false)
            }

        } else {
            setSelectAll(!selectAll);
            if (!selectAll) {
                setSelectedRows(orders.map(row => row?.id));
                setBulkActionShow(true)
            } else {
                setSelectedRows([]);
                setBulkActionShow(false)
                setSelectAll(false)
            }
        }
    };

    const handleClick = (param) => {
        if (param !== null) {
            axios.get(`${BASE_URL_CORE}/core-api/shipping/ship-rate-card/?order_id=${param}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
                .then((response) => {
                    if (response?.status === 200) {
                        setShipingResponse(response.data);
                        setSingleShip(true);
                    }
                })
                .catch((error) => {
                    customErrorFunction(error);
                    setSingleShip(false);
                });
        }
    };


    const debouncedHandleClick = useCallback(
        debounce((orderId) => handleClick(orderId), 500),
        []
    );

    const handleShipNow = (orderId) => {
        debouncedHandleClick(orderId);
        setSelectedOrderId(orderId)
    }

    const handleSelectRow = (orderId, awb) => {
        const isSelected = selectedRows.includes(orderId);
        let updatedSelectedRows;
        if (isSelected) {
            updatedSelectedRows = selectedRows.filter(id => id !== orderId);
        } else {
            updatedSelectedRows = [...selectedRows, orderId];
        }
        setSelectedRows(updatedSelectedRows);
        if (updatedSelectedRows.length > 0) {
            setBulkActionShow(true);
        } else {
            setBulkActionShow(false);
        }

        if (updatedSelectedRows?.length === orders?.length - 1 && isSelected) {
            setSelectAll(false);
        } else {
            setSelectAll(false);
        }
    };

    const openEditingSection = (id) => {
        setEditOrderSection(true)
        setOrderId(id)
    }

    const openCloneSection = (id) => {
        setCloneOrderSection(true)
        setOrderId(id)
    }




    const handleClose = () => setShow(false);


    const handleShow = (args1, args2) => {
        setShow(true)
        setActionType({
            id: args1,
            action: args2
        })
    };

    const makeApiCall = () => {
        setLoader(true)
        if (actionType.action === "cancel") {
            dispatch({
                type: "BULK_PROCESSING_ORDER_CANCEL_ACTION", payload: {
                    order_ids: [actionType?.id],
                }
            }
            )
        }
        else if (actionType.action === "delete") {
            dispatch({ type: "DELETE_ORDERS_ACTION", payload: actionType?.id })
        }
        else {
            dispatch({
                type: "BULK_MARK_ORDER_VERIFY_ACTION", payload: {
                    order_ids: [actionType.id],
                }
            })
        }
        setShow(false)
    }


    const [dropdownPosition, setDropdownPosition] = useState({});
    const [activeIndex, setActiveIndex] = useState(null);
    const rowRefs = useRef([]);

    rowRefs.current = [];

    const updateDropdownPosition = () => {
        const viewportHeight = window.innerHeight;
        const updatedPositions = {};

        rowRefs.current.forEach((row, index) => {
            if (row) {
                const { top, height } = row.getBoundingClientRect();
                const rowTopRelativeToViewport = top; // Distance from the top of the viewport
                const rowBottomRelativeToViewport = rowTopRelativeToViewport + height;

                const viewportRowsCount = Math.floor(viewportHeight / height); // How many rows fit in the viewport

                let position = 'middle'; // Default to middle

                if (rowTopRelativeToViewport < viewportHeight * 0.25) {
                    // Top 25% of the viewport (top rows)
                    position = 'below';
                } else if (rowBottomRelativeToViewport > viewportHeight * 0.75) {
                    // Bottom 25% of the viewport (bottom rows)
                    position = 'above';
                }

                updatedPositions[index] = position;
            }
        });

        setDropdownPosition(updatedPositions);
    };

    useEffect(() => {
        updateDropdownPosition(); // Initial positioning
        window.addEventListener('scroll', updateDropdownPosition); // Add scroll event listener
        window.addEventListener('resize', updateDropdownPosition); // Update on window resize
        return () => {
            window.removeEventListener('scroll', updateDropdownPosition); // Cleanup
            window.removeEventListener('resize', updateDropdownPosition); // Cleanup
        };
    }, []);



    const handleMouseEnter = (index) => {
        setActiveIndex(index);
        updateDropdownPosition(); // Ensure position is updated on mouse enter
    };

    const handleMouseLeave = () => {
        setActiveIndex(null);
        setDropdownPosition({})
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
                                <th style={{ width: '16.5%' }}>Order Details</th>
                                <th style={{ width: '15.5%' }}>Customer details</th>
                                <th style={{ width: '12.5%' }}>Product details</th>
                                <th style={{ width: '15.5%' }}>Package Details</th>
                                <th style={{ width: '8.5%' }}>Payment</th>
                                <th style={{ width: '12.5%' }}>Pickup Address</th>
                                <th style={{ width: '8%' }}>Status</th>
                                <th style={{ width: '11%' }}>Action</th>
                            </tr>
                            <tr className="blank-row"><td></td></tr>
                        </thead>
                        <tbody>
                            {orders?.length ? <>
                                {Array.isArray(orders) && orders?.map((row, index) => (
                                    <React.Fragment key={row?.id}>
                                        {index > 0 && <tr className="blank-row"><td></td></tr>}
                                        <tr className='table-row box-shadow'>
                                            <td className='checkbox-cell'>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRows?.includes(row?.id)}
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
                                                                                            : row?.channel.toLowerCase() === "omsguru" ? <img src={omsguru} alt="Manual" width="30" />
                                                                                                : row?.channel.toLowerCase() === "easyecom" ? <img src={EasyComLogo} alt="Manual" width="30" />
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
                                                        <CustomTooltip
                                                            triggerComponent={
                                                                <span className='ms-2'>{`${moment(row?.order_date).format('DD MMM YYYY')} || ${moment(row?.order_date).format('hh:mm A')}`}</span>
                                                            }
                                                            tooltipComponent={
                                                                <span>
                                                                    <span><strong>Order Date:</strong>{`${moment(row?.order_date).format('DD MMM YYYY')} || ${moment(row?.order_date).format('hh:mm A')}`}</span>
                                                                    <span><strong>Created At:</strong>{`${moment(row?.created_at).format('DD MMM YYYY')} || ${moment(row?.created_at).format('hh:mm A')}`}</span>
                                                                </span>
                                                            }
                                                            addClassName='order-related-dates'
                                                        />
                                                        {row?.is_mps === true &&
                                                            <span className="mps-flag">MPS</span>
                                                        }
                                                        {
                                                            row?.order_tag.length > 0 && <CustomTooltip
                                                                triggerComponent={<span className='ms-1'>
                                                                    <OrderTagsIcon />
                                                                </span>}
                                                                tooltipComponent={
                                                                    <div className='Labels-pool'>
                                                                        {row?.order_tag?.map((item) => {
                                                                            return (
                                                                                <div className="label-button-container active">
                                                                                    <button className='label-button'>
                                                                                        <FontAwesomeIcon icon={faCircle} className='me-2' />{item?.name}
                                                                                    </button>
                                                                                </div>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                }
                                                            />
                                                        }
                                                    </p>
                                                </div>
                                            </td>
                                            <td>
                                                {/* customer detail */}
                                                <div className='cell-inside-box'>
                                                    <p>
                                                        <span data-truncate-name>{row?.shipping_detail?.recipient_name || <span className="missing-info-text">Name Missing</span>}</span>
                                                    </p>
                                                    <p>
                                                        {row?.shipping_detail?.mobile_number ?
                                                            row?.shipping_detail?.mobile_number :
                                                            <span className="missing-info-text">Contact Missing</span>
                                                        }
                                                        <span className={`details-on-hover ms-2 ${(row?.shipping_detail?.address && row?.shipping_detail?.city && row?.shipping_detail?.state && row?.shipping_detail?.pincode && row?.shipping_detail?.mobile_number && row?.shipping_detail?.recipient_name) ? null : 'missing-address'}`}>
                                                            <InfoIcon />
                                                            <span style={{ width: '250px' }}>
                                                                <>
                                                                    <b>Address:</b> {row?.shipping_detail?.address || <span className="text-sh-red">Address Missing</span>}<br />
                                                                    <b>Landmark:</b> {row?.shipping_detail?.landmark}<br />
                                                                    <b>City:</b> {row?.shipping_detail?.city || <span className="text-sh-red">City Missing</span>}<br />
                                                                    <b>State:</b> {row?.shipping_detail?.state || <span className="text-sh-red">State Missing</span>}<br />
                                                                    <b>Pincode:</b> {row?.shipping_detail?.pincode || <span className="text-sh-red">Pincode Missing</span>}
                                                                </>
                                                            </span>
                                                        </span>
                                                    </p>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="cell-inside-box">
                                                    <p className="d-flex align-items-center gap-2">
                                                        <p className="width-eclipse">{row?.order_products[0]?.product_name || <span className="missing-info-text">Product Name Missing</span>}</p>
                                                        <span className={`details-on-hover ms-2 ${row?.order_products.some((product) => !product.product_name || !product.sku) && 'missing-address'}`}>
                                                            <InfoIcon />
                                                            <span style={{ width: '250px' }}>
                                                                {row?.order_products?.map((product, index) => (
                                                                    <React.Fragment key={index}>
                                                                        <strong>Product:</strong> {product.product_name || <span className="missing-info-text">Product Name Missing</span>}<br />
                                                                        <strong>SKU:</strong> {product.sku || <span className="missing-info-text">SKU Missing</span>}<br />
                                                                        <strong>Qt.:</strong> {product.quantity}<br />
                                                                        <hr />
                                                                    </React.Fragment>
                                                                ))}
                                                            </span>
                                                        </span>
                                                    </p>
                                                    <p className="d-flex align-items-center gap-2">
                                                        <div>Qt.<span> {row?.order_products[0]?.quantity}</span></div>||
                                                        <div className="d-flex align-items-center gap-1">SKU: <span data-truncate-name>{row?.order_products[0]?.sku || <span className="missing-info-text">SKU Missing</span>}</span></div>
                                                    </p>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='cell-inside-box'>
                                                    <p>Wt:  {weightGreater(row?.dimension_detail?.weight, row?.dimension_detail?.vol_weight)} kg
                                                        <br />
                                                        LBH(cm): {(row?.dimension_detail?.length || row?.dimension_detail?.breadth || row?.dimension_detail?.height) ? <span>{row?.dimension_detail?.length} x {row?.dimension_detail?.breadth} x {row?.dimension_detail?.height}</span> : <span className="missing-info-text">Dimension Missing</span>}
                                                    </p>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='cell-inside-box'>
                                                    <p>
                                                        {row?.invoice_amount != null ? (
                                                            Number(row.invoice_amount) === 0 ? (
                                                                <span className="missing-info-text">Amount is Zero</span>
                                                            ) : (
                                                                <span>&#x20B9; {row.invoice_amount}</span>
                                                            )
                                                        ) : (
                                                            <span className="missing-info-text">Invoice Amount Missing</span>
                                                        )}
                                                    </p>

                                                    <p className='order-Status-box mt-1'>{row?.payment_type}</p>
                                                </div>
                                            </td>
                                            <td className='align-middle'>
                                                <div className='cell-inside-box' style={{ maxWidth: '70%' }}>
                                                    {
                                                        row?.order_type === "Forward" ?
                                                            <p>
                                                                {row?.pickup_details?.p_warehouse_name}
                                                                <span className='details-on-hover ms-2'>
                                                                    <InfoIcon />
                                                                    <span style={{ width: '250px' }}>
                                                                        <b>Address:</b> {row?.pickup_details?.p_address_line1}<br />
                                                                        <b>Landmark:</b> {row?.pickup_details?.p_address_line2}<br />
                                                                        <b>City:</b> {row?.pickup_details?.p_city}<br />
                                                                        <b>State:</b> {row?.pickup_details?.p_state}<br />
                                                                        <b>Pincode:</b> {row?.pickup_details?.p_pincode}
                                                                    </span>
                                                                </span>
                                                            </p> : <p>{row?.shipping_detail?.recipient_name}
                                                                <span className='details-on-hover ms-2'>
                                                                    <InfoIcon />
                                                                    <span style={{ width: '250px' }}>
                                                                        <b>Address:</b> {row?.shipping_detail?.address}<br />
                                                                        <b>Landmark:</b>{row?.shipping_detail?.landmark}<br />
                                                                        <b>City:</b> {row?.shipping_detail?.city}<br />
                                                                        <b>State:</b> {row?.shipping_detail?.state}<br />
                                                                        <b>Pincode:</b> {row?.shipping_detail?.pincode}
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
                                            <td className='align-middle status-box'>
                                                <p className='order-Status-box'>{row?.status.split("_").join(" ")}</p>
                                            </td>
                                            <td className='align-middle'>
                                                <div className='d-flex align-items-center gap-3'>
                                                    <button onClick={() => handleShipNow(row?.id)} className='btn main-button'>Ship Now</button>
                                                    <div ref={(el) => (rowRefs.current[index] = el)}
                                                        onMouseEnter={() => handleMouseEnter(index)}
                                                        onMouseLeave={handleMouseLeave} className="action-options">
                                                        <div className="threedots-img">
                                                            <img src={ThreeDots} alt="ThreeDots" width={24} />
                                                        </div>
                                                        {activeIndex === index && (
                                                            <div className={`action-list processing ${dropdownPosition[index] || ''}`}>
                                                                <ul>
                                                                    <li onClick={() => openEditingSection(row.id)}>Edit Order</li>
                                                                    <li onClick={() => { setaddTagShow(true); setSelectedRows([row.id]); setOrderTagId(row.order_tag) }}>Add Tag</li>
                                                                    <li className="action-hr"></li>
                                                                    <li>Call Buyer</li>
                                                                    <li onClick={() => globalDebouncedClick(() => handleShow(row.id, "mark-verify"))}>Mark As Verified</li>
                                                                    <li onClick={() => openCloneSection(row.id)}>Clone Order</li>
                                                                    <li className="action-hr"></li>
                                                                    <li onClick={() => handleShow(row.id, "cancel")}>Cancel Order</li>
                                                                    <li onClick={() => handleShow(row.id, "delete")}>Delete Order</li>
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </> : <tr></tr>}
                        </tbody>
                    </table>
                    {orders?.length === 0 && <NoData />}
                </div>
                <SingleShipPop setLoader={setLoader} orderId={selectedOrderId} setSingleShip={setSingleShip} SingleShip={SingleShip} shipingResponse={shipingResponse} />
                <div onClick={() => setSingleShip(false)} className={`backdrop ${!SingleShip && 'd-none'}`}></div>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                keyboard={false}
                className='confirmation-modal'
            >
                <Modal.Header>
                    <Modal.Title>Confirmation Required</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to {actionType.action} the order ?
                </Modal.Body>
                <Modal.Footer>
                    <div className='d-flex gap-2'>
                        <button className="btn cancel-button" onClick={handleClose}>
                            Cancel
                        </button>
                        <button className="btn main-button" onClick={makeApiCall}>Continue</button>
                    </div>
                </Modal.Footer>
            </Modal>

        </section >
    );
})

export default Processing;
