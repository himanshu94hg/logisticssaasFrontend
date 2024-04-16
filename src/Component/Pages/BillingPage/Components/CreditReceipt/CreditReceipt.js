import SidePanel from './SidePanel/SidePanel';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

const CreditReceipt = ({ billingCard, selectedRows, setSelectedRows, setBulkActionShow }) => {

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

    return (
        <section className='position-relative'>
            <div className="position-relative">
                <div className='table-container cr-table-height'>
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
                                <th>Note ID</th>
                                <th>Note Number</th>
                                <th>Note Date</th>
                                <th>Total</th>
                                <th>Action</th>
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
                                                    {row?.id ?? 0}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* Courier detail */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    {row?.note_number ?? 0}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* AWB Assigned Date */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    {row?.created_at ? <DateFormatter dateTimeString={row.created_at} /> : ''}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* Shipment Status */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    ₹ {row?.total ?? 0}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* Applied Weight Charges */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    <button className='btn main-button' style={{ width: '100px' }} onClick={() => handleShow(row)}>View Receipt</button>
                                                </p>
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
        </section>
    );
};

export default CreditReceipt;

function Preview({ show, handleClose, selectedRow }) {
    const dispatch = useDispatch();

    const [exportButtonClick, setExportButtonClick] = useState(false)
    const exportCard = useSelector(state => state?.billingSectionReducer?.billingShipingReceiptExportCard);
    const handleViewDetails = (id) => {
        setExportButtonClick(true);
        dispatch({ type: "BILLING_SHIPING_RECEIPT_EXPORT_DATA_ACTION", payload: id });
    };
    useEffect(() => {
        if (exportButtonClick) {
            var FileSaver = require('file-saver');
            var blob = new Blob([exportCard], { type: 'application/ms-excel' });
            FileSaver.saveAs(blob, `${"Receipt"}.xlsx`);
            setExportButtonClick(false);
        }
    }, [exportCard]);
    return (
        <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Receipt Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="invoice-title">
                                <h2 style={{ textAlign: 'center' }}>Credit Note</h2>
                            </div>
                            <div className="row">
                                <strong>Credit Note No.: {selectedRow?.note_number}</strong><br />
                                <span>Credit Note Date: January 1, 2024</span><br />
                            </div>
                            <br />
                            <div className="row" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <table className="table" style={{ border: 'none !important' }}>
                                    <tr>
                                        <td style={{ width: '50%', border: 'none !important' }}> <strong>TO</strong><br /><br />
                                            <span>Vaghela Infotech</span><br />
                                            <span>vinitm</span><br />
                                            <span>SURAT,GUJARAT</span><br />
                                        </td>
                                        <td style={{ textAlign: 'right', width: '50%', border: 'none !important' }}><strong>SHIPEASE TECHNOLOGIES PRIVATE LIMITED</strong><br /><br />
                                            Regd. Add. : 476B 2nd & 3rd Floor, Sector 39 Block C, Gurugram, Haryana, Pin-122001.<br />
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <br />

                    <div className="row">
                        <div className="col-xs-12">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th className="text-center">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Credit note issue against Lost Credit</td>
                                        <td className="text-center">₹ {Math.round((selectedRow?.total * 100 / 118) * 100) / 100}</td>
                                    </tr>
                                    <tr>
                                        <td>18% GST</td>
                                        <td className="text-center">₹ {selectedRow?.total - Math.round((selectedRow?.total * 100 / 118) * 100) / 100}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Total Credit Note Value</strong></td>
                                        <td className="text-center"><strong>₹ {selectedRow?.total}</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <p>CIN number: U63030HR2022PTC103527</p>
                            <span
                                onClick={() => handleViewDetails(selectedRow?.id)}
                                style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                            >
                                Click to view more details
                            </span>
                            <p>This is a system generated credit note and does not require a signature</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <br></br>
                            <br></br>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}
