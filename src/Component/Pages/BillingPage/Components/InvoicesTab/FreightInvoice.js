import React, { useEffect, useState, useRef } from 'react'
import { useReactToPrint } from 'react-to-print';

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

const FreightInvoice = ({ billingCard }) => {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [data, setData] = useState([]);
    const [showPdf, setShowPdf] = useState(false); // State to control rendering of PDF
    const componentRef = useRef();

    console.log("All Invoices Data", billingCard)

    // Handler for "Select All" checkbox
    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(data.map(row => row.id));
        } else {
            setSelectedRows([]);
        }
    };

    // Handler for individual checkbox
    const handleSelectRow = (orderId) => {
        const isSelected = selectedRows.includes(orderId);

        if (isSelected) {
            setSelectedRows(selectedRows.filter(id => id !== orderId));
        } else {
            setSelectedRows([...selectedRows, orderId]);
        }

        // Check if all rows are selected, then select/deselect "Select All"
        if (selectedRows.length === data.length - 1 && isSelected) {
            setSelectAll(false);
        } else {
            setSelectAll(false);
        }
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    // Function to handle showing/hiding PDF content
    const handleViewPdf = () => {
        setShowPdf(!showPdf); // Toggle showPdf state
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
                                        checked={selectedRows.includes(row?.id)}
                                        onChange={() => handleSelectRow(row?.id)}
                                    />
                                </td>
                                <td>
                                    <div className='cell-inside-box'>
                                        <p className=''>
                                            {row?.id ?? 1}
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    <div className='cell-inside-box'>
                                        <p className=''>
                                            {row?.invoice_date ?? "2024-01-01"}
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    <div className='cell-inside-box'>
                                        <p className=''>
                                            {row?.due_date ?? "2024-01-01"}
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    <div className='cell-inside-box'>
                                        <p className=''>
                                            {row?.total ?? 0}
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
                                        <p className=''>
                                            <button className='btn main-button' style={{ width: '100px' }} onClick={handlePrint}>View</button>
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            <div style={{ display: 'none' }}>
                <div ref={componentRef}>
                    <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
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
                                                                        Paid
                                                                    </span>
                                                                    <br />
                                                                    <a href="/" style={{ height: '17px' }}> Download Invoice</a>
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '60%', paddingLeft: '25px', verticalAlign: 'top' }}>
                                                <strong>PAN Number:</strong> ABICS4825P<br />
                                                <strong>CIN Number:</strong> U63030HR2022PTC103527<br />
                                                <strong>GSTIN:</strong> 06ABICS4825P1ZQ<br />
                                                <strong>Phone:</strong> 9399262217 <br />
                                                <strong>Email:</strong> info@shipease.in <br />
                                                <strong>IRN:</strong> 
                                            </td>
                                            <td style={{ width: '40%', verticalAlign: 'top' }}>
                                                <strong>Invoice No. : </strong> SE/2425/1006812<br />
                                                <strong>Invoice Date :</strong> 2024-01-31<br />
                                                <strong>Due Date :</strong> 2024-02-08<br />
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
                                                vaghela<br/>
                                                vinitm,SURAT,GUJARAT,394221
                                            </td>
                                            <td style={{ width: "40%" }}>
                                                <p>
                                                    <strong>State Code:</strong> GUJARAT<br />
                                                    <strong>Place of Supply:</strong> SURAT<br />
                                                    <strong>GSTIN:</strong> SFDVDFG4564DFGB<br />
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
                                            <td style={{ paddingLeft: '50px' }}>996812</td>
                                            <td style={{ paddingLeft: '50px' }}>ShipEase V2 Freight<sup>*</sup></td>
                                            <td style={{ paddingLeft: '50px', textAlign: 'right', paddingRight: '50px' }}>Rs. 20</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td style={{ paddingLeft: '50px' }}>18.00% IGST</td>
                                            <td style={{ paddingLeft: '50px', textAlign: 'right', paddingRight: '50px' }}>Rs. 4</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td style={{ paddingLeft: '50px' }}><strong>Grand Total Value</strong></td>
                                            <td style={{ paddingLeft: '50px', textAlign: 'right', paddingRight: '50px' }}>Rs. 4</td>
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
                                                <strong>Entity Name:</strong> SHIPEASE TECHNOLOGIES PRIVATE LIMITED<br />
                                                <strong>Account number:</strong> 165105002442<br />
                                                <strong>Bank:</strong> ICICI Bank <br />
                                                <strong>Branch:</strong> Gurgaon, Sec 49 Branch, Pin-122101<br />
                                                <strong>RTGS/NEFT/IFSC Code:</strong> ICIC0001651<br />
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
                                            <th style={{ paddingLeft: '50px' }}>Amount</th>
                                        </tr>
                                        <tr>
                                            <td colSpan="2">
                                                <hr style={{ border: "none", borderBottom: "1px solid #7f7f7f" }} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ paddingLeft: '50px' }}>31/01/2024</td>
                                            <td style={{ paddingLeft: '50px' }}>Credit Balance</td>
                                            <td style={{ paddingLeft: '50px' }}>NA</td>
                                            <td style={{ paddingLeft: '50px', textAlign: 'right', paddingRight: '50px' }}>Rs. 240</td>
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
                        <center style={{ borderRadius: '10px', padding: '1mm', background: '#fff', textAlign: 'left', wordBreak: 'break-all' }}>
                            <p style={{ paddingLeft: '50px' }}>Download Itemized Shipment Details: <a href="#" className="link-btn">Download Now</a></p>
                            <p style={{ paddingLeft: '50px' }}>* Indicates taxable item</p>
                            <p style={{ paddingLeft: '50px' }}>It's system generated invoice & dont require signature.</p>
                        </center>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FreightInvoice;