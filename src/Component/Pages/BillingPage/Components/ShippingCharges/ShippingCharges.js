import React, { useState, useEffect } from 'react';
import SidePanel from './SidePanel/SidePanel';
import { Modal } from 'react-bootstrap';

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

const ShippingCharges = ({ billingCard, selectedRows, setSelectedRows, setBulkActionShow }) => {

    const [selectAll, setSelectAll] = useState(false);
    // const [selectedRows, setSelectedRows] = useState([]);
    const [backDrop, setBackDrop] = useState(false);
    const [data, setData] = useState([]);

    // Handler for "Select All" checkbox
    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(billingCard.map(row => row.id));
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
        if (selectedRows.length === data.length - 1 && isSelected) {
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
                        <p>Total Freight Charges: <span>&#8377; {data?.Total_freight_charges || 0}</span></p>
                    </div>
                    <div className='box-shadow shadow-sm count-card'>
                        <p>Billed Freight Charges: <span>&#8377; 0</span></p>
                    </div>
                    <div className='box-shadow shadow-sm count-card'>
                        <p>Unbilled Freight Charges: <span>&#8377; 0</span></p>
                    </div>
                    <div className='box-shadow shadow-sm count-card'>
                        <p>Total On-Hold Amount: <span>&#8377; 0</span></p>
                    </div>
                    <div className='box-shadow shadow-sm count-card'>
                        <p>Invoice Due Amount: <span>&#8377; 0</span></p>
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
                                                onChange={() => handleSelectRow(row.id)}
                                            />
                                        </td>
                                        <td>
                                            {/* order detail */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    {row?.order_detail?.awb_number}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* Courier detail */}
                                            <div className='cell-inside-box'>
                                                <p className='text-capitalize'>
                                                    {row?.order_detail?.courier_partner}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* AWB Assigned Date */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    {row?.datetime ? <DateFormatter dateTimeString={row.datetime} /> : ''}
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
                                                    -
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* Excess Weight Charges */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    -
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* Entered Weight and dimensions */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    -
                                                </p>

                                            </div>
                                        </td>
                                        <td>
                                            {/* Charged Weight and Dimensions */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    -
                                                </p>

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
                </div>
                <SidePanel CloseSidePanel={CloseSidePanel} />

                {/* <div id='sidePanel' className="side-panel">
                    <div className='sidepanel-closer'>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                </div> */}

                <div className={`backdrop ${backDrop ? 'd-block' : 'd-none'}`}></div>
                <Preview show={show} handleClose={handleClose} selectedRow={selectedRow} />
            </div>
        </section >
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
                            <th>Balance</th>
                            <th>Amount</th>
                            <th>Description</th>
                        </tr>
                        <tr>
                            <td>{selectedRow?.datetime ? <DateFormatter dateTimeString={selectedRow?.datetime} /> : ''}</td>
                            <td>{selectedRow?.order_detail?.awb_number}</td>
                            <td>{selectedRow?.balance}</td>
                            <td>{selectedRow?.amount}</td>
                            <td>{selectedRow?.description}</td>
                        </tr>
                    </tbody>
                </table>
            </Modal.Body>
        </Modal>
    );
}