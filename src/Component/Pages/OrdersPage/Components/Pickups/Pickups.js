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


const Pickups = ({ orders, activeTab, BulkActionShow, setBulkActionShow, selectedRows, setSelectedRows }) => {
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
            const response = await fetch(`https://dev.shipease.in/core-api/shipping/generate-label/`, {
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
            const response = await fetch(`https://dev.shipease.in/core-api/shipping/generate-invoice/`, {
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
                                        <SelectAllDrop BulkActionShow={BulkActionShow} setBulkActionShow={setBulkActionShow} />
                                    </div>
                                </th>
                                <th style={{ width: '24%' }}>Order Details</th>
                                <th style={{ width: '12.5%' }}>Customer details</th>
                                <th style={{ width: '16%' }}>Package Details</th>
                                <th style={{ width: '8%' }}>Payment</th>
                                <th style={{ width: '12.5%' }}>Pickup Address</th>
                                <th style={{ width: '10.5%' }}>Shipping Details</th>
                                <th style={{ width: '6%' }}>Status</th>
                                <th style={{ width: '6%' }}>Action</th>

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
                                                    &nbsp; <span className=''>{row.customer_order_number}</span>
                                                </p>
                                                <p className='ws-nowrap d-flex align-items-center'>
                                                    {/* {formatDate(row.inserted)} */}
                                                    {/*<DateFormatter dateTimeString={row.inserted} />*/}
                                                    <OverlayTrigger
                                                        placement="right"
                                                        overlay={
                                                            <Tooltip id={`tooltip-right`}>
                                                                {row?.order_type}
                                                            </Tooltip>
                                                        }
                                                    >
                                                        <img src={ForwardIcon} className={`${row?.order_type === 'Forward' ? '' : 'icon-rotate'}`} alt="Forward/Reverse" width={24} />
                                                    </OverlayTrigger>
                                                    <span className='ms-2'>{`${moment(row?.created_at).format('DD MMM YYYY')} || ${moment(row?.created_at).format('h:mm A')}`}</span>
                                                    <CustomTooltip
                                                        triggerComponent={<span className='ms-1'>
                                                            <OrderTagsIcon />
                                                        </span>}
                                                        tooltipComponent={
                                                            <div className='Labels-pool'>
                                                                <div className="label-button-container active"><button className='label-button'><FontAwesomeIcon icon={faCircle} className='me-2' />Shopify</button></div>
                                                                <div className="label-button-container active"><button className='label-button'><FontAwesomeIcon icon={faCircle} className='me-2' />Amazon</button></div>
                                                                <div className="label-button-container active"><button className='label-button'><FontAwesomeIcon icon={faCircle} className='me-2' />Custom</button></div>
                                                                <div className="label-button-container active"><button className='label-button'><FontAwesomeIcon icon={faCircle} className='me-2' />Woocommerce</button></div>
                                                            </div>
                                                        }
                                                        addClassName=''
                                                    />
                                                </p>
                                                {/* <p>{row.channel}</p> */}
                                                {/* <img src={ForwardIcon} className={`${row.o_type === 'forward' ? '' : 'icon-rotate'}`} alt="Forward/Reverse" width={24} /> */}
                                                {/* <p>W {row.p_warehouse_name}</p> */}
                                            </div>
                                        </td>
                                        <td>
                                            {/* customer detail */}
                                            <div className='cell-inside-box'>
                                                <p>{row?.customer_order_number}</p>
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
                                                <p className='width-eclipse'>{row?.order_products?.product_name}</p>
                                                <p>Wt:  {weightCalculation(row?.dimension_detail?.weight)} kg <span className='text-blue'>||</span> LBH: {row?.dimension_detail?.length}x{row?.dimension_detail?.breadth}x{row?.dimension_detail?.height}
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
                                                <div className='cell-inside-box'>
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
                                                <p className='details-on-hover anchor-awb'>{row.awb_number ?? ""}
                                                    {/* <span style={{right:'23px', width:'100px'}}>AWB Number</span> */}
                                                </p>
                                                {/* <img src='https://ekartlogistics.com/assets/images/ekblueLogo.png' height={10} className='me-2' /> */}
                                                <p className='mt-1'>{row.courier_partner}</p>
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            {/*  Status section  */}
                                            <p className='order-Status-box'>{row?.status}</p>
                                        </td>
                                        <td className='align-middle'>
                                            <div className='d-flex align-items-center gap-3'>
                                                <button className='btn main-button' onClick={() => generateManifest(row.id)}>Generate Manifest</button>
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
                </div>
            </div>
        </section>
    );
};

export default Pickups;