import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

const ActionRequested = ({shipmentCard,selectedRows,setSelectedRows,setBulkActionShow}) => {
    const dispatch = useDispatch()
    const [backDrop, setBackDrop] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [exportButtonClick, setExportButtonClick] = useState(false)
    const exportCard = useSelector(state => state?.exportSectionReducer?.exportCard)
    const handleExport = () => {
        setExportButtonClick(true);
        const requestData = {
            "order_tab": {
              "type": "shipment",
              "subtype": "action_requested"
            },
            "order_id": `${selectedRows.join(',')}`,
            "courier": "",
            "awb_number": "",
            "min_awb_assign_date": "",
            "max_awb_assign_date": "",
            "status": "",
            "order_type": "",
            "customer_order_number": "",
            "channel": "",
            "min_invoice_amount": "",
            "max_invoice_amount": "",
            "warehouse_id": "",
            "product_name": "",
            "delivery_address": "",
            "min_weight": "",
            "max_weight": "",
            "min_product_qty": "",
            "max_product_qty": "",
            "rto_status": false,
            "global_type": "",
            "payment_type": ""
          };
        dispatch({ type: "EXPORT_DATA_ACTION", payload: requestData });
    };

    useEffect(() => {
        if (exportButtonClick) {
            var FileSaver = require('file-saver');
            var blob = new Blob([exportCard], { type: 'application/ms-excel' });
            FileSaver.saveAs(blob, `${"Shipment_Action_Requested"}.xlsx`);
            setExportButtonClick(false);
        }
    }, [exportCard]);  
      
    
    const handleRto = ((orderIds)=>{
        const stringifiedReattempt = JSON.stringify(orderIds);
        dispatch({ type: "SHIPMENT_RTO_DATA_ACTION", payload: {"order_ids":stringifiedReattempt} });
    });

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            // setSelectedRows(orders.map(row => row.id));
            setSelectedRows(shipmentCard.map(row => row.id));
            setBulkActionShow(true)
        } else {
            setSelectedRows([]);
            setBulkActionShow(false)
        }
    };

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
        // if (selectedRows.length === orders.length - 1 && isSelected) {
        //     setSelectAll(false);
        // } else {
        //     setSelectAll(false);
        // }
    };

    const handleSidePanel = () => {
        document.getElementById("sidePanel").style.right = "0"
        setBackDrop(true)
    }

    const CloseSidePanel = () => {
        document.getElementById("sidePanel").style.right = "-50em"
        setBackDrop(false)
    }

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
                                <th>Order Details</th>
                                <th>NDR Reason</th>
                                <th>Package Details</th>
                                <th>Customer details</th>
                                <th>Tracking Detail</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                            <tr className="blank-row"><td></td></tr>
                        </thead>
                        <tbody>
                            {shipmentCard?.map((row, index) => (
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
                                        <td className='align-middle'>
                                            {/* {row.ndr_action}
                                                 {row.ndr_status} */}
                                            <div className='d-flex align-items-center gap-3'>
                                                <button className='btn main-button'><Link to={`/customer-support?awb_number=${row?.awb_number}`}>Escalate</Link></button>
                                                <div className='action-options'>
                                                    <div className='threedots-img'>
                                                        <img src={ThreeDots} alt="ThreeDots" width={24} />
                                                    </div>
                                                    <div className='action-list'>
                                                        <ul>
                                                            {/* <li onClick={() => handleReattempt(row.id)}>Re-attempt</li> */}
                                                            <li onClick={() => handleRto(row.id)}>RTO</li>
                                                            {/* <li><Link to={`/customer-support?awb_number=${row?.awb_number}`}>Escalate</Link></li> */}
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

                <div className={`backdrop ${backDrop ? 'd-block' : 'd-none'}`}></div>

            </div>
        </section>
    );
};

export default ActionRequested;
