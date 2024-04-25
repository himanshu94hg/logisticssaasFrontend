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
import { weightCalculation } from '../../../../../customFunction/functionLogic';
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

const AllOrders = ({ orders, activeTab, setBulkActionShow, BulkActionShow, selectedRows, setSelectedRows, setCloneOrderSection, setOrderId }) => {
    const dispatch = useDispatch()
    const [selectAll, setSelectAll] = useState(false);
    const { orderdelete } = useSelector(state => state?.orderSectionReducer)
    const reassignCard = useSelector(state => state?.moreorderSectionReducer?.moreorderCard)

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

        if (updatedSelectedRows.length === orders.length - 1 && isSelected) {
            setSelectAll(false);
        } else {
            setSelectAll(false);
        }
    };


    const handleDownloadLabel = async (orderId) => {
        try {
            const response = await fetch(`https://dev.shipease.in/core-api/shipping/generate-label/${orderId}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Something went wrong');
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
        }
    };

    const handleDownloadInvoice = async (orderId) => {
        try {
            const response = await fetch(`https://dev.shipease.in/core-api/shipping/generate-invoice/${orderId}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Something went wrong');
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
        }
    };
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [SingleShip, setSingleShip] = useState(false)
    const [SingleShipReassign, setSingleShipReassign] = useState(false)


    const handleShipNow = (orderId) => {
        setSelectedOrderId(orderId);
        setSingleShip(true);
    };

    const handleShipReassign = (orderId) => {
        setSelectedOrderId(orderId);
        dispatch({ type: "REASSIGN_DATA_ACTION", payload: orderId });
        setSingleShipReassign(true);
    };

    const handleGeneratePickup = async (orderId) => {
        let authToken = Cookies.get("access_token")
        try {
            const response = await fetch(`https://dev.shipease.in/core-api/shipping/generate-pickup/`, {
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
                                            <SelectAllDrop BulkActionShow={BulkActionShow} setBulkActionShow={setBulkActionShow} />
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
                                                                                    : row.channel.toLowerCase() === "custom" ? <CustomIcon />
                                                                                        : ""}
                                                        <span className='d-inline-flex align-items-center gap-1 ms-2'>
                                                            {row.customer_order_number}
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
                                                    <p>{row?.shipping_detail?.mobile_number ?? null}
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
                                                {/* package  details */}
                                                <div className='cell-inside-box'>
                                                    {/* <p className='width-eclipse'>{row.order_products.product_name}</p> */}
                                                    <p>Wt:{weightCalculation(row?.dimension_detail?.weight)} kg
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
                                                    <p>&#x20B9; {row?.invoice_amount}</p>
                                                    <p className='order-Status-box mt-1'>{row?.payment_type}</p>
                                                </div>
                                            </td>
                                            {/* pickup adress */}
                                            <td className='align-middle'>
                                                <div className='cell-inside-box' style={{ maxWidth: '70%' }}>
                                                    {row?.pickup_details ? (
                                                        <p>{row?.pickup_details?.p_warehouse_name}
                                                            <span className='details-on-hover ms-2'>
                                                                <InfoIcon />
                                                                {/* {!row?.pickup_details?.p_warehouse_name && ( */}
                                                                <span style={{ width: '250px' }}>
                                                                    {row?.pickup_details?.p_address_line1},
                                                                    {row?.pickup_details?.p_address_line2},<br />
                                                                    {row?.pickup_details?.p_city},
                                                                    {row?.pickup_details?.p_state},
                                                                    {row?.pickup_details?.p_pincode}
                                                                </span>
                                                                {/* )} */}

                                                            </span>
                                                        </p>
                                                    ) : ''}
                                                </div>
                                            </td>
                                            {/* shiping section here */}
                                            <td>
                                                <div className='cell-inside-box'>
                                                    <p className='details-on-hover anchor-awb'>{row?.awb_number ?? ""} </p>
                                                    <p className=''>{row?.courier_partner ?? ""} </p>
                                                </div>
                                            </td>
                                            <td className='align-middle'>
                                                {/*  Status section  */}
                                                <p className='order-Status-box'>{row?.status || 'New'}</p>
                                            </td>
                                            <td className='align-middle'>
                                                <div className='d-flex align-items-center gap-3 justify-content-end'>
                                                    <button className='btn main-button' style={{ width: '100%' }}>{
                                                        row?.order_courier_status === 'Unprocessable' ? <span>Edit Order</span>
                                                            : row?.status === "pending" ? <span onClick={() => handleShipNow(row?.id)}>Ship Now</span>
                                                                : row?.status === "cancelled" ? <span onClick={() => openCloneSection(row?.id)}>Clone Order</span>
                                                                    : row?.status === "pickup_requested" ? <span onClick={() => generateManifest(row.id)}>Generate Manifest</span>
                                                                        : row?.status === "shipped" ? <span onClick={() => handleGeneratePickup(row.id)}>Generate Pickup</span> : ""
                                                    }</button>
                                                    <div className='action-options'>
                                                        <div className='threedots-img'>
                                                            <img src={ThreeDots} alt="ThreeDots" width={24} />
                                                        </div>
                                                        {row.status !== "cancelled" ? <div className='action-list'>
                                                            <ul>
                                                                {row?.courier_partner != null && (
                                                                    <>
                                                                        <li onClick={() => handleDownloadLabel(row.id)}>Download label</li>
                                                                        <li onClick={() => handleDownloadInvoice(row.id)}>Download Invoice</li>
                                                                    </>
                                                                )}
                                                                {/*<li >Reassign</li>*/} 
                                                                {/* <li onClick={() => dispatch({ type: "CLONE_ORDERS_UPDATE_ACTION", payload: row?.id })}>Clone Order</li> */}
                                                                <li onClick={() => openCloneSection(row?.id)}>Clone Order</li>
                                                                <li onClick={() => dispatch({
                                                                    type: "ORDERS_DETAILS_CANCEL_ACTION", payload: {
                                                                        awb_numbers: [
                                                                            row?.awb_number]
                                                                    }
                                                                })}>Cancel Order</li>
                                                                    <li onClick={() => dispatch({ type: "DELETE_ORDERS_ACTION", payload: row?.id })}>Delete Order</li>
                                                                 {row?.status === "shipped" &&
                                                                    <li onClick={() => handleShipReassign(row?.id)}>Reassign</li>
                                                                }
                                                            </ul>
                                                        </div> : ""}
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
                    <SingleShipPop orderId={selectedOrderId} setSingleShip={setSingleShip} SingleShip={SingleShip} />
                    <SingleShipPopReassign reassignCard={reassignCard} orderId={selectedOrderId} setSingleShipReassign={setSingleShipReassign} SingleShipReassign={SingleShipReassign} />
                </div>
            </section>
        </>
    );
};

export default AllOrders;