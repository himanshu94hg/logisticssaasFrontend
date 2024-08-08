import moment from 'moment';
import React, { useEffect, useState, useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import NoData from '../../../../common/noData';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL_ORDER } from '../../../../../../src/axios/config';
import InvoiceIcon from '../../../OrdersPage/Components/BulkActionsComponent/Components/BulkIcons/InvoiceIcon';
import { MdOutlineFileDownload } from "react-icons/md";


const FreightInvoice = ({ billingCard, selectedRows, setSelectedRows, setBulkActionShow }) => {
    const componentRef = useRef();
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [allinvoicedata, setAllInvoiceData] = useState([]);
    const [exportButtonClick, setExportButtonClick] = useState(false)

    const exportCard = useSelector(state => state?.billingSectionReducer?.billingInvoiceDownloadCard)
    const billingSellerCard = useSelector(state => state?.billingSectionReducer?.billingSellerCard);
    const configurationCard = useSelector(state => state?.paymentSectionReducer.configurationCard)
    const invoiceUrlData = `${BASE_URL_ORDER}/core-api/features/billing/download-invoice-detail/?invoice_id=${allinvoicedata?.id}`
    const gstNumber = billingSellerCard[0]?.gst_number || "";
    const configGstIn = configurationCard[0]?.gstin || "";
    const isSameState = gstNumber.substring(0, 2) === configGstIn.substring(0, 2);

    useEffect(() => {
        dispatch({ type: "BILLING_SELLER_DATA_ACTION" });
    }, [dispatch]);

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
        if (selectedRows.length === data.length - 1 && isSelected) {
            setSelectAll(false);
        } else {
            setSelectAll(false);
        }
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handleDataAndView = (row) => {
        if (row.id !== null) {
            setAllInvoiceData(row);
            setTimeout(() => {
                handlePrint();
            }, 100);
        }
    };

    const handleWorkingDownload = (id, event) => {
        event.preventDefault(); 
        const invoiceUrlData = `${BASE_URL_ORDER}/core-api/features/billing/download-invoice-detail/?invoice_id=${id}`;
        window.open(invoiceUrlData, '_self');
    };
    
    useEffect(() => {
        if (exportButtonClick) {
            var FileSaver = require('file-saver');
            var blob = new Blob([exportCard], { type: 'application/ms-excel' });
            FileSaver.saveAs(blob, `${"Invoice"}.xlsx`);
            setExportButtonClick(false);
        }
    }, [exportCard]);

    const downloadButton = {
        display: 'flex',
        fontSize: '24px',
        height: '30px',
        alignItems: 'center'
    };

    return (
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
                        <th>Invoice Id</th>
                        <th>Invoice Date</th>
                        <th>Due Date</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Actions</th>
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
                                        checked={selectedRows.includes(row?.id)}
                                        onChange={() => handleSelectRow(row?.id)}
                                    />
                                </td>
                                <td>
                                    <div className='cell-inside-box'>
                                        <p className=''>
                                            {row?.invoice_id}
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    <div className='cell-inside-box'>
                                        <p className=''>
                                            <span>{`${moment(row?.invoice_date).format('DD MMM YYYY')}`}</span>
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    <div className='cell-inside-box'>
                                        <p className=''>
                                            <span>{`${moment(row?.due_date).format('DD MMM YYYY')}`}</span>
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
                                            {row?.status ?? "Paid"}
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    <div className='cell-inside-box'>
                                        <div className='d-flex gap-3'>
                                            {row.uploaded_invoice !== null ?
                                                <button title='Download Working' style={downloadButton} className='btn p-0'
                                                    onClick={() => {
                                                        window.open(row.uploaded_invoice?.invoice_file)
                                                    }}
                                                >    <InvoiceIcon /></button>
                                                : <>
                                                    <button title='View Invoice' onClick={() => handleDataAndView(row)} className='btn p-0'>
                                                        <InvoiceIcon />
                                                    </button>
                                                </>}
                                            {row?.uploaded_invoice?.awb_file ?
                                                <button title='Download Working' style={downloadButton} className='btn p-0'
                                                    onClick={() => {
                                                        const pdfUrl = row.uploaded_invoice?.awb_file
                                                        const link = document.createElement('a');
                                                        link.href = pdfUrl;
                                                        link.download = 'invoice.pdf';
                                                        document.body.appendChild(link);
                                                        link.click();
                                                        document.body.removeChild(link);
                                                    }}
                                                ><MdOutlineFileDownload /></button>
                                                :
                                                <button title='Download Working' style={downloadButton} className='btn p-0' onClick={(event) => handleWorkingDownload(row?.id, event)}><MdOutlineFileDownload /></button>
                                            }
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            <div style={{ display: 'none' }}>
                <div ref={componentRef}>
                    {allinvoicedata ? (
                        <div style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: "30px" }}>
                            <div style={{ borderRadius: '10px', background: '#fff', marginBottom: '2mm' }}>
                                <center>
                                    <p><i style={{ width: '100px', height: '100px', color: 'black' }} className="icon-login"></i></p>
                                    <table style={{ width: '100%', padding: '3mm' }} className="tdpl10">
                                        <tbody>
                                            <tr>
                                                <td colSpan="2">
                                                    <img style={{ height: '50px', paddingLeft: '10px' }} src="https://shipease.in/public/assets/admin/images/20201125223903LOGO.png" alt="Logo" />
                                                </td>
                                            </tr>
                                            <br></br>
                                            <tr>
                                                <td style={{ width: '60%', paddingLeft: '25px' }}>
                                                    <p><b>SHIPEASE TECHNOLOGIES PRIVATE LIMITED</b> <br />
                                                        Regd. Add. : 476B 2nd & 3rd Floor, Sector 39 Block C, Gurugram, Haryana, Pin-122001. <br />
                                                    </p>
                                                </td>
                                                <td style={{ width: '40%' }}>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <p>
                                                                        <strong>TAX INVOICE</strong> <br /><br />
                                                                        <span style={{ fontSize: '25px', color: 'green', fontWeight: '600' }}>
                                                                            {allinvoicedata?.status}
                                                                        </span>
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '60%', paddingLeft: '25px', verticalAlign: 'top' }}>
                                                    <strong>PAN Number:</strong> {configurationCard[0]?.pan_number}<br />
                                                    <strong>CIN Number:</strong> {configurationCard[0]?.cin_number}<br />
                                                    <strong>GSTIN:</strong> {configurationCard[0]?.gstin}<br />
                                                    <strong>Phone:</strong> {configurationCard[0]?.mobile} <br />
                                                    <strong>Email:</strong> {configurationCard[0]?.email} <br />
                                                    <strong>IRN:</strong>{configurationCard[0]?.irn_number}
                                                </td>
                                                <td style={{ width: '40%', verticalAlign: 'top' }}>
                                                    <strong>Invoice No. : </strong> {allinvoicedata?.invoice_number}<br />
                                                    <strong>Invoice Date :</strong> {moment(allinvoicedata?.invoice_date).format("DD MMM YYYY")}<br />
                                                    <strong>Due Date :</strong>{moment(allinvoicedata?.due_date).format("DD MMM YYYY")}<br />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    <hr style={{ border: "none", borderBottom: "1px solid #7f7f7f" }} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: "60%", paddingLeft: "25px" }}>
                                                    <strong>Invoice To:</strong><br />
                                                    {billingSellerCard[0]?.company_name}<br />
                                                    {billingSellerCard[0]?.street},{billingSellerCard[0]?.city},{billingSellerCard[0]?.state},{billingSellerCard[0]?.pincode}
                                                </td>
                                                <td style={{ width: "40%" }}>
                                                    <p>
                                                        <strong>State Code:</strong> {billingSellerCard[0]?.state}<br />
                                                        <strong>Place of Supply:</strong> {billingSellerCard[0]?.city}<br />
                                                        <strong>GSTIN:</strong> {billingSellerCard[0]?.gst_number}<br />
                                                        <strong>Reverse Charge:</strong> No
                                                    </p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </center>
                            </div>
                            <div style={{ borderRadius: '10px', background: '#fff', padding: '0px 0 2mm 0' }}>
                                <center>
                                    <table style={{ width: '100%' }} rules="none" ellspacing="0" cellpadding="0" className="fluid-table stripe-table" border="0">
                                        <tbody>
                                            <tr>
                                                <th style={{ paddingLeft: '50px' }}>SAC No.</th>
                                                <th style={{ paddingLeft: '75px' }}>Description</th>
                                                <th style={{ paddingRight: '60px', textAlign: 'right' }}>Total</th>
                                            </tr>
                                            <tr>
                                                <th colSpan="2">
                                                    <hr />
                                                </th>
                                            </tr>
                                            <tr>
                                                <td style={{ paddingLeft: '50px' }}>{configurationCard[0]?.sac_number}</td>
                                                <td style={{ paddingLeft: '50px' }}>ShipEase V2 Freight<sup>*</sup></td>
                                                <td style={{ paddingLeft: '50px', textAlign: 'right', paddingRight: '50px' }}>Rs. {allinvoicedata?.invoice_amount}</td>
                                            </tr>
                                            {isSameState ? (
                                                <>
                                                    <tr>
                                                        <td></td>
                                                        <td style={{ paddingLeft: '50px' }}>9.00% CGST</td>
                                                        <td style={{ paddingLeft: '50px', textAlign: 'right', paddingRight: '50px' }}>
                                                            Rs. {Math.round(allinvoicedata?.gst_amount / 2)}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td style={{ paddingLeft: '50px' }}>9.00% SGST</td>
                                                        <td style={{ paddingLeft: '50px', textAlign: 'right', paddingRight: '50px' }}>
                                                            Rs. {Math.round(allinvoicedata?.gst_amount / 2)}
                                                        </td>
                                                    </tr>
                                                </>
                                            ) : (
                                                <tr>
                                                    <td></td>
                                                    <td style={{ paddingLeft: '50px' }}>18.00% IGST</td>
                                                    <td style={{ paddingLeft: '50px', textAlign: 'right', paddingRight: '50px' }}>
                                                        Rs. {Math.round(allinvoicedata?.gst_amount)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td></td>
                                                <td style={{ paddingLeft: '50px' }}><strong>Grand Total Value</strong></td>
                                                <td style={{ paddingLeft: '50px', textAlign: 'right', paddingRight: '50px' }}>Rs. {allinvoicedata?.total}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </center>
                            </div>

                            <div style={{ borderRadius: '10px', background: '#fff', padding: '1mm', marginTop: '2mm' }}>
                                <center>
                                    <table style={{ width: '100%', padding: '0' }} rules="none" ellspacing="0" cellpadding="0" className="fluid-table" border="0">
                                        <tbody>
                                            <tr>
                                                <th colSpan="2" style={{ paddingLeft: '50px', paddingTop: '1.5mm!important', paddingBottom: '2mm!important' }}>Bank and Other Commercial Details</th>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    <hr style={{ border: "none", borderBottom: "1px solid #7f7f7f" }} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ paddingLeft: '50px', width: '70%' }}>
                                                    All Payments by transfer/check/DD should be draw in favour of<br />
                                                    <strong>Entity Name:</strong> {configurationCard[0]?.account_holder}<br />
                                                    <strong>Account number:</strong> {configurationCard[0]?.account_number}<br />
                                                    <strong>Bank:</strong> {configurationCard[0]?.bank_name} <br />
                                                    <strong>Branch:</strong> {configurationCard[0]?.bank_branch}<br />
                                                    <strong>RTGS/NEFT/IFSC Code:</strong> {configurationCard[0]?.ifsc_code}<br />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </center>
                            </div>

                            <div style={{ borderRadius: '10px', background: '#fff', padding: '0mm 0 2mm 0' }}>
                                <center>
                                    <table style={{ width: '100%' }} rules="none" ellspacing="0" cellpadding="0" className="fluid-table stripe-table" border="0">
                                        <tbody>
                                            <tr>
                                                <th style={{ paddingLeft: '50px' }}>Transaction Date</th>
                                                <th style={{ paddingLeft: '50px' }}>Gateway</th>
                                                <th style={{ paddingLeft: '50px' }}>Transaction ID</th>
                                                <th style={{ paddingLeft: '80px' }}>Amount</th>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    <hr style={{ border: "none", borderBottom: "1px solid #7f7f7f" }} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ paddingLeft: '50px' }}>{moment(allinvoicedata?.invoice_date).format("DD MMM YYYY")}</td>
                                                <td style={{ paddingLeft: '50px' }}>Credit Balance</td>
                                                <td style={{ paddingLeft: '50px' }}>NA</td>
                                                <td style={{ paddingLeft: '50px', textAlign: 'right', paddingRight: '50px' }}>Rs. {allinvoicedata?.total}</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td style={{ paddingLeft: '50px' }}><strong>Amount Due</strong></td>
                                                <td style={{ paddingLeft: '50px', textAlign: 'right', paddingRight: '50px' }}>Rs. 0.00</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </center>
                            </div>

                            <div style={{ borderRadius: '10px', background: '#fff', padding: '0mm 0 2mm 0' }}>
                                <span><b>Download Itemized Shipment Details:</b> <a href={invoiceUrlData} target='_blank' style={{ backgroundColor: '#285eda', color: 'white', padding: '3px' }} >Download Now</a></span>
                            </div>

                        </div>
                    ) : null}
                </div>
            </div>
            {billingCard?.length === 0 && <NoData />}
        </div>
    )
}

export default FreightInvoice;