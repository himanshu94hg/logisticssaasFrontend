import moment from 'moment';
import { Modal } from 'react-bootstrap';
import NoData from '../../../../common/noData';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CreditReceipt = ({ billingCard, selectedRows, setSelectedRows, setBulkActionShow }) => {
    const [show, setShow] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(billingCard?.map(row => row.id));
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
        if (selectedRows?.length === billingCard?.length - 1 && isSelected) {
            setSelectAll(false);
        } else {
            setSelectAll(false);
        }
    };

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
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    {row?.id ?? 0}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    {row?.note_number ?? 0}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    <span className=''>{`${moment(row?.created_at).format('DD MMM YYYY')} || ${moment(row?.created_at).format('h:mm A')}`}</span>
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    ₹ {row?.total ?? 0}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
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
                    {billingCard?.length === 0 && <NoData />}
                </div>
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
