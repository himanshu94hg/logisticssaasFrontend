import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfoIcon from '../../../../common/Icons/InfoIcon';
import ThreeDots from '../../../../../assets/image/icons/ThreeDots.png'
import SearchIcon from '../../../../../assets/image/icons/search-icon.png'
import ForwardIcon from '../../../../../assets/image/icons/ForwardIcon.png'
import moment from "moment";

const DateFormatter = ({ dateTimeString }) => {
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        const formattedDateTime = formatDateTime(dateTimeString);
        setFormattedDate(formattedDateTime);
    }, [dateTimeString]);

    const formatDateTime = (dateTimeString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };

        const dateObject = new Date(dateTimeString);
        const formattedDateTime = new Intl.DateTimeFormat('en-US', options).format(dateObject);

        return formattedDateTime;
    };

    return <p>{formattedDate}</p>;
};

const DeliveredShipment = ({shipmentCard,selectedRows,setSelectedRows,setBulkActionShow}) => {

    const dispatch = useDispatch()
    const [selectAll, setSelectAll] = useState(false);
    const [backDrop, setBackDrop] = useState(false);
    const [orders, setAllOrders] = useState([]);
    const [allShipment, setAllShipment] = useState([]);

    useEffect(() => {
        if (shipmentCard) {
            setAllShipment(shipmentCard);
        }
    }, [shipmentCard]);

    const reasons = [
        { count: 2, data: "NETWORK DELAY, WILL IMPACT DELIVERY" },
        { count: 4, data: "Reattempt Requested" },
        { count: 3, data: "Reattempt Requested" },
      ];
    
      const getRandomCount = (reasons) => {
        const randomIndex = Math.floor(Math.random() * reasons.length);
        return reasons[randomIndex].count;
      };
    
      const getRandomReason = (reasons) => {
        const randomIndex = Math.floor(Math.random() * reasons.length);
        return reasons[randomIndex].data;
      };


    // Handler for "Select All" checkbox
    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(shipmentCard.map(row => row.id));
            setBulkActionShow(true)
        } else {
            setSelectedRows([]);
            setBulkActionShow(false)
        }
    };

    // Handler for individual checkbox
    const handleSelectRow = (orderId) => {
        const isSelected = selectedRows.includes(orderId);

        if (isSelected) {
            setSelectedRows(selectedRows.filter(id => id !== orderId));
            setBulkActionShow(true)
        } else {
            setSelectedRows([...selectedRows, orderId]);
        }

        if (setSelectedRows !== ([])) {
            setBulkActionShow(true)
        }

        // Check if all rows are selected, then select/deselect "Select All"
        if (selectedRows.length === orders.length - 1 && isSelected) {
            setSelectAll(false);
        } else {
            setSelectAll(false);
        }
    };
    const handleSidePanel = () => {
        document.getElementById("sidePanel").style.right = "0"
        setBackDrop(true)
    }

    const CloseSidePanel = () => {
        document.getElementById("sidePanel").style.right = "-50em"
        setBackDrop(false)
    }



    // useEffect(() => {
    //   first


    // }, [])


    return (
        <section className='position-relative'>
            <div className="position-relative">
                <div className='table-container'>
                    <table className=" w-100">
                        <thead className="sticky-header">
                            <tr className="table-row box-shadow">
                                <th style={{ width: '1%' }}>
                                    <input
                                        type="checkbox"
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th>Order Details </th>
                                <th>NDR Reason</th>
                                <th>Package Details</th>
                                <th>Customer details</th>
                                <th>Tracking Detail</th>
                                <th>Status</th>
                                {/* <th>Action</th> */}
                            </tr>
                            <tr className="blank-row"><td></td></tr>
                        </thead>
                        <tbody>
                            {allShipment?.map((row, index) => (
                                <React.Fragment key={row.id}>
                                    {index > 0 && <tr className="blank-row"><td></td></tr>}
                                    <tr className='table-row box-shadow'>
                                        <td className='checkbox-cell'>
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(row.id)}
                                                onChange={() => handleSelectRow(row.id)}
                                            />
                                        </td>
                                        <td>
                                            {/* Date detail */}
                                            <div className='cell-inside-box'>
                                                <p>
                                                    <span className=''>{row.customer_order_number}</span>
                                                </p>
                                                <p className='ws-nowrap d-flex align-items-center'>
                                                    <img src={ForwardIcon} className={`${row.order_type === 'Forward' ? '' : 'icon-rotate'}`} alt="Forward/Reverse" width={24} />
                                                    <span className='ms-2'>{`${moment(row?.created_at).format('DD MMM YYYY')} || ${moment(row?.created_at).format('h:mm A')}`}</span>
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* NDR Reason*/}
                                            <div className='cell-inside-box'>
                                                <p><strong>Attempts: </strong>{row?.ndr_details.length}</p>
                                                {row?.ndr_details.length > 0 && (
                                                    row.ndr_details.map((detail, index) => (
                                                        <p key={index}>NDR Reason: {detail.reason}</p>
                                                    ))
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            {/* package  details */}
                                            <div className='cell-inside-box'>
                                                <p className='width-eclipse'>{row.order_products.product_name}</p>
                                                <p>Wt:  {row?.dimension_detail?.weight} kg <br />
                                                    <span>LBH: {row?.dimension_detail?.length} x {row?.dimension_detail?.breadth} x {row?.dimension_detail?.height}</span>
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
                                            <div className='cell-inside-box'>
                                                <p className='details-on-hover anchor-awb'>{row?.awb_number ?? ""} </p>
                                                <p className=''>{row?.courier_partner ?? ""} </p>
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            {/*  Status section  */}
                                            <p className='order-Status-box'>{row.status}</p>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* <div id='sidePanel' className="side-panel">
                    <div className='sidepanel-closer'>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                </div> */}

                <div className={`backdrop ${backDrop ? 'd-block' : 'd-none'}`}></div>

            </div>
        </section >
    );
};

export default DeliveredShipment;
