import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import moment from 'moment';
import NoData from '../../../../common/noData';
import { weightGreater } from '../../../../../customFunction/functionLogic';

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

const ShippingCharges = ({ billingCard, selectedRows, selectAll, setSelectAll, setSelectedRows, setBulkActionShow, setSelectedOrderRows, billingShippingCounterCard }) => {

    const [backDrop, setBackDrop] = useState(false);
    const [data, setData] = useState([]);

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(billingCard.map(row => row.id));
            setSelectedOrderRows(billingCard.map(row => row.order_id));
            setBulkActionShow(true)
        } else {
            setSelectedRows([]);
            setSelectedOrderRows([]);
            setBulkActionShow(false)
        }
    };

    // Handler for individual checkbox
    const handleSelectRow = (orderId, order_id) => {
        const isSelected = selectedRows.includes(orderId);

        if (isSelected) {
            setSelectedRows(selectedRows.filter(id => id !== orderId));
            setSelectedOrderRows(selectedRows.filter(id => id !== order_id));
            setBulkActionShow(true)
        } else {
            setSelectedRows([...selectedRows, orderId]);
            setSelectedOrderRows([...selectedRows, order_id]);
        }

        if (setSelectedRows !== ([])) {
            setBulkActionShow(true)
        }

        // Check if all rows are selected, then select/deselect "Select All"
        if (selectedRows.length === data.length - 1 && isSelected) {
            setSelectAll(false);
        } else {
            setSelectAll(false);
        }
    };

    const [show, setShow] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleShow = (row) => {
        setSelectedRow(row);
        setShow(true);
    };

    const handleClose = () => setShow(false);

    console.log("Billing Count", billingCard);


    return (
        <section className='position-relative'>
            <div className="position-relative">
                <div className="mb-3 billing-count-container">
                    <div className='box-shadow shadow-sm count-card'>
                        <p>Total Freight Charges: <span>&#8377; {billingShippingCounterCard?.total_freight_charge || 0}</span></p>
                    </div>
                    <div className='box-shadow shadow-sm count-card'>
                        <p>Billed Freight Charges: <span>&#8377; {billingShippingCounterCard?.billed_freight_charge || 0}</span></p>
                    </div>
                    <div className='box-shadow shadow-sm count-card'>
                        <p>Unbilled Freight Charges: <span>&#8377; {billingShippingCounterCard?.unbilled_freight_charge || 0}</span></p>
                    </div>
                    <div className='box-shadow shadow-sm count-card'>
                        <p>Total On-Hold Amount: <span>&#8377; {billingShippingCounterCard?.total_on_hold || 0}</span></p>
                    </div>
                    <div className='box-shadow shadow-sm count-card'>
                        <p>Invoice Due Amount: <span>&#8377; {billingShippingCounterCard?.invoice_due_amount || 0}</span></p>
                    </div>
                </div>
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
                                <th>AWB Number</th>
                                <th>Courier Details</th>
                                <th style={{ width: '12%' }}>AWB Assigned Date</th>
                                <th>Shipment Status</th>
                                <th>Applied Weight Charges</th>
                                <th>Excess Weight Charges</th>
                                <th>Entered Weight and dimensions</th>
                                <th>Charged Weight and Dimensions</th>
                                <th>View Transaction Details</th>
                            </tr>
                            <tr className="blank-row"><td></td></tr>
                        </thead>
                        <tbody>
                            {billingCard?.map((row, index) => (
                                <React.Fragment key={row.id}>
                                    {index > 0 && <tr className="blank-row"><td></td></tr>}
                                    <tr className='table-row box-shadow'>
                                        <td className='checkbox-cell'>
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(row.id)}
                                                onChange={() => handleSelectRow(row.id, row.order_id)}
                                            />
                                        </td>
                                        <td>
                                            {/* order detail */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    {row?.awb_number}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* Courier detail */}
                                            <div className='cell-inside-box'>
                                                <p className='text-capitalize'>
                                                    {row?.courier_partner}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* AWB Assigned Date */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    <span className=''>{`${moment(row?.awb_assigned_date).format('DD MMM YYYY')} || ${moment(row?.awb_assigned_date).format('h:mm A')}`}</span>
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* Shipment Status */}
                                            <div className='cell-inside-box'>
                                                <p className='text-capitalize'>
                                                    {row?.status}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* Applied Weight Charges */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    {row?.charge_detail?.total_charges || "-"}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* Excess Weight Charges */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    {row?.charge_detail?.excess_weight_charges || "-"}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* Entered Weight and dimensions */}
                                            <div className='cell-inside-box'>
                                                {row?.dimension_detail?.weight ?
                                                    <p>Wt:  {weightGreater(row?.dimension_detail?.weight, row?.dimension_detail?.vol_weight)} kg
                                                        LBH(cm): {row?.dimension_detail?.length} x {row?.dimension_detail?.breadth} x {row?.dimension_detail?.height}
                                                    </p> : ""
                                                }
                                            </div>
                                        </td>
                                        <td>
                                            {/* Charged Weight and Dimensions */}
                                            <div className='cell-inside-box'>
                                                {row.charge_detail?.c_weight ? <p>Wt:  {row?.charge_detail?.c_weight} kg
                                                    LBH(cm): {row?.charge_detail?.c_length} x {row?.charge_detail?.c_breadth} x {row?.charge_detail?.c_height}
                                                </p> : "-"}
                                            </div>

                                        </td>
                                        <td>
                                            {/* View Transaction Details */}
                                            <div className='cell-inside-box'>
                                                <button className='btn main-button' onClick={() => handleShow(row)}>View</button>
                                            </div>
                                        </td>

                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                    {billingCard?.length === 0 && <NoData />}
                </div>

                <div className={`backdrop ${backDrop ? 'd-block' : 'd-none'}`}></div>
                <Preview show={show} handleClose={handleClose} selectedRow={selectedRow} />
            </div>
        </section>
    );
};

export default ShippingCharges;

function Preview({ show, handleClose, selectedRow }) {
    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Transaction Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="table">
                    <tbody>
                        <tr>
                            <th>Date</th>
                            <th>AWB CODE</th>
                            <th>Amount</th>
                            <th>Description</th>
                        </tr>
                        <tr>
                            <td>{moment(selectedRow?.awb_assigned_date).format("DD MMM YYYY") || moment(selectedRow?.awb_assigned_date).format("h:mm A")}</td>
                            <td>{selectedRow?.awb_number}</td>
                            <td>{selectedRow?.charge_detail?.total_charges}</td>
                            <td> Order Shipping Charges Deducted</td>
                        </tr>
                    </tbody>
                </table>
            </Modal.Body>
        </Modal>
    );
}