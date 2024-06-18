import React, { useState, useEffect } from 'react';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import './GSTInvoicingPage.css';
import { useNavigate } from 'react-router-dom';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';

// Function to generate random alphanumeric string
const randomString = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

// Function to generate random state names
const randomState = () => {
    const states = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
        'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
        'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
        'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
        'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
    ];
    return states[Math.floor(Math.random() * states.length)];
};

// Function to generate random GSTIN
const randomGstin = () => {
    return `${randomString(2)}${Math.floor(10000000000 + Math.random() * 90000000000)}${randomString(1)}${Math.floor(Math.random() * 9)}${randomString(1)}`;
};

// Function to generate random state GST list
const generateRandomStateGstList = (numItems) => {
    return Array.from({ length: numItems }, () => ({
        id: randomString(8),
        state: randomState(),
        gstin: randomGstin(),
    }));
};

const GSTInvoicingPage = () => {
    const Navigate = useNavigate();
    const [TDSPayment, setTDSPayment] = useState(false);
    const [StateGST, setStateGST] = useState(false);
    const [gstin, setGstin] = useState('');
    const [invoicePrefix, setInvoicePrefix] = useState('');
    const [invoiceSuffix, setInvoiceSuffix] = useState('');
    const [tanNumber, setTanNumber] = useState('');
    const [stateGstlist, setStateGstlist] = useState([]);

    useEffect(() => {
        // Generate 5 random items for stateGstlist
        setStateGstlist(generateRandomStateGstList(5));
    }, []);

    const handleTDSPayment = () => {
        setTDSPayment(!TDSPayment);
    };

    const handleStateGST = () => {
        setStateGST(!StateGST);
    };

    const handleSaveDetails = () => {
        console.log('GST details saved:', { gstin, invoicePrefix, invoiceSuffix, TDSPayment, tanNumber });
    };

    const handleAddState = () => {
        console.log('Add state clicked');
    };

    const handleEdit = (id) => {
        console.log('Edit clicked for state ID:', id);
    };

    return (
        <div className='gst-invoicing-page'>
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <h4>GSTIN Invoicing</h4>
                <button className='btn main-button-outline' onClick={() => Navigate(-1)}><MdOutlineKeyboardBackspace className='align-text-bottom' /> Go back</button>
            </div>
            <section className='box-shadow shadow-sm p10 mb-4'>
                <p>Enter your registered GST Identification Number below to add it to your freight and customer invoice:</p>
                <div className='mt-3 d-flex flex-column gap-4'>
                    <div className='d-flex w-100 align-items-center gap-4'>
                        <label className='w-100'>
                            GSTIN
                            <input
                                className='input-field'
                                type='text'
                                value={gstin}
                                onChange={(e) => setGstin(e.target.value)}
                            />
                        </label>
                        <label className='w-100'>
                            Invoice Prefix
                            <input
                                className='input-field'
                                type='text'
                                value={invoicePrefix}
                                onChange={(e) => setInvoicePrefix(e.target.value)}
                            />
                        </label>
                        <label className='w-100'>
                            Invoice Suffix
                            <input
                                className='input-field'
                                type='text'
                                value={invoiceSuffix}
                                onChange={(e) => setInvoiceSuffix(e.target.value)}
                            />
                        </label>
                    </div>
                    <div>
                        <label className='d-flex gap-4 align-items-center'>
                            I want to deduct TDS payment
                            <Toggle
                                checked={TDSPayment}
                                onChange={handleTDSPayment}
                                aria-label='Toggle TDS Payment'
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            TAN Number
                            <input
                                className='input-field'
                                type='text'
                                value={tanNumber}
                                onChange={(e) => setTanNumber(e.target.value)}
                                disabled={!TDSPayment}
                            />
                        </label>
                    </div>
                </div>
                <div className='d-flex justify-content-end mt-4'>
                    <button className='btn main-button' onClick={handleSaveDetails}>Save Details</button>
                </div>
            </section>
            <section className='mt-4 box-shadow shadow-sm p10'>
                <div style={{ minHeight: '36px' }} className='d-flex align-items-center justify-content-between'>
                    <label className='d-flex gap-4 align-items-center'>
                        Enable State GST Invoicing
                        <Toggle
                            checked={StateGST}
                            onChange={handleStateGST}
                            aria-label='Toggle State GST Invoicing'
                        />
                    </label>
                    <button className='btn main-button' onClick={handleAddState}>Add State</button>
                </div>
                <div className='mt-4'>
                    <p>When to enable State GST?</p>
                    <ul>
                        <li>When you have multiple GSTINs from different states.</li>
                        <li>When you want to generate separate freight invoices for each pickup address.</li>
                        <li>When you want to claim input credit on tax paid by you on your purchase.</li>
                    </ul>
                    <p>Note: Customer invoices will be generated with the pickup address (shown under Sold by) and respective state GSTIN.</p>
                </div>
            </section>
            <section className='my-3'>
                <table className='w-100'>
                    <thead className='sticky-header'>
                        <tr className='table-row box-shadow'>
                            <th>State</th>
                            <th>GSTIN</th>
                            <th>Action</th>
                        </tr>
                        <tr className='blank-row'>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {stateGstlist.length === 0 ? (
                            <tr>
                                <td colSpan='3' className='text-center'>No states added yet.</td>
                            </tr>
                        ) : (
                            stateGstlist.map((row, index) => (
                                <React.Fragment key={row.id}>
                                    {index > 0 && <tr className="blank-row"><td></td></tr>}
                                    <tr className='table-row box-shadow'>
                                        <td>
                                            <div className='cell-inside-box'>{row.state}</div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>{row.gstin}</div>
                                        </td>
                                        <td>
                                            <button className='btn main-button' onClick={() => handleEdit(row.id)}>Edit</button>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))
                        )}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default GSTInvoicingPage;
