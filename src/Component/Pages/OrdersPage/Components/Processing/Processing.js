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
import { BASE_URL_CORE } from '../../../../../axios/config';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OrderTagsIcon from '../../../../common/Icons/OrderTagsIcon';
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import ThreeDots from '../../../../../assets/image/icons/ThreeDots.png'
import CustomTooltip from '../../../../common/CustomTooltip/CustomTooltip';
import VerifiedOrderIcon from '../../../../common/Icons/VerifiedOrderIcon';
import ForwardIcon from '../../../../../assets/image/icons/ForwardIcon.png'
import { weightGreater } from '../../../../../customFunction/functionLogic';
import { customErrorFunction } from '../../../../../customFunction/errorHandling';
import customImg from "../../../../../assets/image/integration/Manual.png"
import { getFileData, uploadImageData } from "../../../../../awsUploadFile";
import { awsAccessKey } from "../../../../../config";
import { toast } from "react-toastify";
import RtoPopModal from "./RtoPopModal";
import RtoRiskMediumIcon from "../../../../common/Icons/RtoRiskMediumIcon";
import RtoRiskHighIcon from "../../../../common/Icons/RtoRiskHighIcon";
import RtoRiskLowIcon from "../../../../common/Icons/RtoRiskLowIcon";
import RiskIcon from '../../../../../assets/image/RiskIcon.svg'


const Processing = React.memo(({ orders, activeTab, setOrderTagId, selectAll, setLoader, setSelectAll, MoreFilters, setEditOrderSection, setCloneOrderSection, setOrderId, setBulkActionShow, selectedRows, setSelectedRows, setaddTagShow }) => {
    const dispatch = useDispatch()
    const rowRefs = useRef([]);
    const [error, setError] = useState("");
    const [show, setShow] = useState(false);
    let authToken = Cookies.get("access_token")
    const [AddQCOrder, setAddQCOrder] = useState("")
    const [actionType, setActionType] = useState({});
    const [SingleShip, setSingleShip] = useState(false)
    const [activeIndex, setActiveIndex] = useState(null);
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const [dropdownPosition, setDropdownPosition] = useState({});
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [shipingResponse, setShipingResponse] = useState(null);
    const { orderdelete } = useSelector(state => state?.orderSectionReducer)
    const channel_list = JSON.parse(localStorage.getItem('channel_list'));
    const { planStatusData } = useSelector(state => state?.authDataReducer);
    const [qcData, setQcData] = useState({
        image: [],
        order_id: "",
        qc_label: "",
        description: "",
        value_to_check: ""
    });

    const userData = useSelector(state => state?.paymentSectionReducer.sellerProfileCard);


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



    rowRefs.current = [];

    const updateDropdownPosition = () => {
        const viewportHeight = window.innerHeight;
        const updatedPositions = {};

        rowRefs.current.forEach((row, index) => {
            if (row) {
                const { top, height } = row.getBoundingClientRect();
                const rowTopRelativeToViewport = top;
                const rowBottomRelativeToViewport = rowTopRelativeToViewport + height;
                const viewportRowsCount = Math.floor(viewportHeight / height);
                let position = 'middle';
                if (rowTopRelativeToViewport < viewportHeight * 0.25) {
                    position = 'below';
                } else if (rowBottomRelativeToViewport > viewportHeight * 0.75) {
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



    const handleAddQC = (id) => {
        setAddQCOrder(id)
        setQcData((prev) => ({ ...prev, order_id: id }))
    }

    const handleCloseAddQC = () => {
        setAddQCOrder("")
        setError("");
        setQcData({
            description: "",
            qc_label: "",
            value_to_check: "",
            image: []
        })
    }

    const makeQcApi = async () => {
        try {
            const response = await axios.post(`${BASE_URL_CORE}/core-api/seller/api/reverse-with-qc-order-update/`, qcData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            }
            );

            if (response?.status === 200) {
                toast.success("Qc info add successfully!")
                setAddQCOrder("")
                setError("");
                setQcData({
                    description: "",
                    qc_label: "",
                    value_to_check: "",
                    image: []
                })
            }
        } catch (error) {
            customErrorFunction(error);
        }
    }

    const handleQc = async (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            const fileInput = e.target;
            const newFiles = Array.from(files);
            const invalidFiles = newFiles.filter((file) => !allowedTypes.includes(file.type));
            if (invalidFiles.length > 0) {
                setError("JPG/JPEG/PNG file are allowed.");
                fileInput.value = "";
                return;
            }
            setError("");
            try {
                const responseData = await getFileData(`qc-data/${e.target.files[0].name.replace(/\s/g, "")}`);
                const awsUrl = responseData.data.url.url
                const formData = new FormData();
                formData.append('key', responseData.data.url.fields.key);
                formData.append('file', e.target.files[0]);
                formData.append('AWSAccessKeyId', awsAccessKey);
                formData.append('policy', responseData.data.url.fields.policy);
                formData.append('signature', responseData.data.url.fields["x-amz-signature"]);
                const additionalData = await uploadImageData(awsUrl, formData);
                if (additionalData?.status === 204) {
                    const imageUrl = `${responseData?.data?.url?.url}qc-data/${e.target.files[0]?.name.replace(/\s/g, "")}`;
                    setQcData((prevData) => ({
                        ...prevData,
                        image: [...prevData.image, imageUrl],
                    }));
                }
            } catch (error) {
                customErrorFunction(error)
            }
        } else {
            setQcData((prevData) => ({
                ...prevData,
                [name]: value,
            }));

        }
    };

    const [RtoData, setRtoData] = useState(null);

    useEffect(() => {
        const fetchRtoPincodeData = async () => {
            try {
                const endDate = new Date();
                const startDate = new Date();
                startDate.setFullYear(endDate.getFullYear() - 1);
                // startDate.setMonth(endDate.getMonth() - 1)

                const formatDate = (date) => {
                    return date.toISOString().split('T')[0]; // YYYY-MM-DD format
                };

                const response = await axios.get("https://app.shipease.in/orders-api/dashboard/rto/rto-pincode/", {
                    params: {
                        start_date: formatDate(startDate),
                        end_date: formatDate(endDate),
                    },
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });

                setRtoData(response.data);
            } catch (err) {
                console.error("API fetch error:", err);
                // setError("Failed to load data");
            } finally {
                // setLoading(false);
            }
        };

        fetchRtoPincodeData();
    }, []);

    console.log(RtoData, "RtoData")

    const rtoLookup = useMemo(() => {
        const result = {};
        RtoData?.forEach(item => {
            const key = Object.keys(item)[0];
            result[key] = item[key];
        });
        return result;
    }, [RtoData]);

    const [rtoPop, setrtoPop] = useState(false)
    const [RtoOrderId, setRtoOrderId] = useState("")

    const handleRtoPop = (e, pincode, orderId) => {
        setrtoPop(!rtoPop)
        setRtoOrderId(orderId)
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
                                    <th style={{ width: '16.5%' }}>Order Details</th>
                                    <th style={{ width: '15.5%' }}>Customer Details</th>
                                    <th style={{ width: '12.5%' }}>Product Details</th>
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
                                    {Array.isArray(orders) && orders?.map((row, index) => {
                                        const rtoInfo = rtoLookup[row?.shipping_detail?.pincode];
                                        return (
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
                                                                {row?.channel && (
                                                                    <img
                                                                        src={channel_list[row?.channel]?.channel_name === row?.channel
                                                                            ? channel_list[row?.channel]?.image || customImg
                                                                            : customImg}
                                                                        alt="channel"
                                                                        width="20"
                                                                    />
                                                                )}
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
                                                            <div className="rto-predictor">
                                                                <p className="d-flex flex-column">
                                                                    <span data-truncate-name>{row?.shipping_detail?.recipient_name || <span className="missing-info-text">Name Missing</span>}</span>
                                                                    <span>
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
                                                                    </span>
                                                                </p>
                                                                {row?.payment_type?.toLowerCase() === "cod" && rtoInfo &&
                                                                    <>
                                                                        <CustomTooltip
                                                                            triggerComponent={<img src={RiskIcon} className="rto-risk" alt="RiskScale" />}
                                                                            // triggerComponent={<div className="cursor-pointer">
                                                                            //     {rtoInfo?.risk === 'High' && <RtoRiskHighIcon />}
                                                                            //     {rtoInfo?.risk === 'Medium' && <RtoRiskMediumIcon />}
                                                                            //     {rtoInfo?.risk === 'Low' && <RtoRiskLowIcon />}
                                                                            // </div>}
                                                                            tooltipComponent={
                                                                                <span>
                                                                                    <span>RTO Risk is
                                                                                        <span
                                                                                            onClick={(e) => handleRtoPop(e, row?.shipping_detail?.pincode, row?.id)}
                                                                                            className={`rto-details-link ms-2 risk-${rtoInfo?.risk}`}
                                                                                        >
                                                                                            {rtoInfo?.risk}
                                                                                        </span>
                                                                                    </span>
                                                                                </span>
                                                                            }
                                                                            addClassName='rto-risk-tooltip'
                                                                        />
                                                                    </>
                                                                }
                                                            </div>
                                                            <p>

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
                                                                            <li
                                                                                onClick={() => globalDebouncedClick(() => handleShow(row.id, "mark-verify"))}
                                                                                className={planStatusData?.order_verification ? '' : 'feature-disabled'}
                                                                            >Mark As Verified</li>
                                                                            <li onClick={() => openCloneSection(row.id)}>Clone Order</li>
                                                                            <li className="action-hr"></li>
                                                                            {
                                                                                row?.order_type === "Reverse" &&
                                                                                <li onClick={() => handleAddQC(row.id)}>Add QC Information</li>
                                                                            }
                                                                            <li></li>
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
                                        )
                                    })}
                                </> : <tr></tr>}
                            </tbody>
                        </table>
                        {orders?.length === 0 && <NoData />}
                    </div>
                    <SingleShipPop setLoader={setLoader} orderId={selectedOrderId} setSingleShip={setSingleShip} SingleShip={SingleShip} shipingResponse={shipingResponse} userData={userData} />
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


                <Modal
                    show={AddQCOrder}
                    onHide={handleCloseAddQC}
                    keyboard={false}
                    className='confirmation-modal add-qc-modal'
                >
                    <Modal.Header>
                        <Modal.Title>
                            <div>
                                <p>Add QC Information for Order</p>
                                <h2>#{AddQCOrder}</h2>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <label htmlFor="">
                                <span>Help Description</span>
                                <textarea className="input-field" name="description" onChange={handleQc} />
                            </label>
                            <label htmlFor="">
                                <span>Label</span>
                                <input className="input-field" name="qc_label" type="text" onChange={handleQc} />
                            </label>
                            <label htmlFor="">
                                <span>Value To Check</span>
                                <input className="input-field" type="text" name="value_to_check" onChange={handleQc} />
                            </label>
                            <label htmlFor="" className="mb-2">
                                <span>Attachement</span>
                                <input className="form-control input-field" name="image" type="file" onChange={handleQc} />
                            </label>
                        </form>
                        {error && <p className="d-flex justify-content-end" style={{ color: "red", fontSize: 12 }}>{error}</p>}
                        {qcData?.image?.map((item, index) => <span style={{ fontSize: 12 }} className="bg-success text-white me-2 p-1 rounded">file{index}</span>)}
                    </Modal.Body>
                    <Modal.Footer>
                        <div className='d-flex gap-2 mt-4'>
                            <button className="btn cancel-button" onClick={handleCloseAddQC}>
                                Cancel
                            </button>
                            <button className="btn main-button" onClick={makeQcApi}>Continue</button>
                        </div>
                    </Modal.Footer>
                </Modal>

            </section>

            <RtoPopModal setLoader={setLoader} token={authToken} orderId={RtoOrderId} rtoPop={rtoPop} setrtoPop={setrtoPop} />
        </>

    );
})

export default Processing;
