import React, { useState } from 'react';
import Logo from '../../../../../assets/image/integration/MagentoLogo.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import EasyComLogo from '../../../../../assets/image/integration/EasyComLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const EasyEcomIntegrationForm = () => {

    const [copiedText, setCopiedText] = useState('');
    const [check, setCheck] = useState([true, true, true]);


    const handleCopy = (text) => {
        setCopiedText(text);
        setTimeout(() => {
            setCopiedText('');
        }, 3000);
    };


    const handleCheckboxChange = (index) => {
        setCheck(prevState => prevState.map((item, i) => (i === index ? !item : item)));
    };


    return (
        <>
            <div className='easycom'>
                <section className='int-header'>
                    <div className='int-header-left'>
                        <img src={EasyComLogo} alt="Logo" />
                        <h2 className='mb-0'>EasyEcom</h2>
                    </div>
                    <div className='int-header-right'>
                        <p className='mb-0'>Need Help?</p>
                    </div>
                </section>
                <div className='int-body'>
                    <section className='box-shadow shadow-sm int-instructions'>
                        <h4>Instruction to integrate EasyEcom to ShipEase</h4>
                        <ul className='timeline mb-3'>
                            {[
                                "Login to EasyEcom Panel.",
                                "Navigate to Carrier Master then Choose Shipease as Carrier Master",
                                "Enter the Credentials as per instructed by Shipease Integration Page",
                                "Set Serviceability Type - Any Pincode",
                                "Shipping Mode - All",
                                "Priority - As per You",
                                "Extra Credentials - Contact EasyEcom Team for eeApiToken and Enter in this Field",
                            ].map(
                                instruction => <li className='timeline-list' key={instruction}>{instruction}</li>
                            )}
                        </ul>
                    </section>
                    <section className='box-shadow shadow-sm int-form'>
                        <form action="">
                            <div className='d-flex w-100 gap-3 mt-4 flex-column flex-lg-row'>
                                <label>
                                    Username
                                    <input className="input-field" type="text" value="username_example" readOnly />
                                    <CopyToClipboard text="username_example" onCopy={() => handleCopy('username_example')}>
                                        <button type='button' className='copy-click' title="Click to copy"><FontAwesomeIcon icon={faCopy} /></button>
                                    </CopyToClipboard>
                                    {copiedText === 'username_example' && <span className='copied-click'>Text Copied</span>}
                                </label>
                                <label>
                                    Password
                                    <input className="input-field" type="text" value="password_example" readOnly />
                                    <CopyToClipboard text="password_example" onCopy={() => handleCopy('password_example')}>
                                        <button type='button' className='copy-click' title="Click to copy"><FontAwesomeIcon icon={faCopy} /></button>
                                    </CopyToClipboard>
                                    {copiedText === 'password_example' && <span className='copied-click'>Text Copied</span>}
                                </label>
                            </div>
                            <div className='d-flex w-100 gap-3 mt-4 flex-column flex-lg-row'>
                                <label>
                                    Shipease Token
                                    <input className="input-field" type="text" value="token_example" readOnly />
                                    <CopyToClipboard text="token_example" onCopy={() => handleCopy('token_example')}>
                                        <button type='button' className='copy-click' title="Click to copy"><FontAwesomeIcon icon={faCopy} /></button>
                                    </CopyToClipboard>
                                    {copiedText === 'token_example' && <span className='copied-click'>Text Copied</span>}
                                </label>
                                <label>
                                    Extra Parameter 1
                                    <input className="input-field" type="text" value="extra_param_example" readOnly />
                                    <CopyToClipboard text="extra_param_example" onCopy={() => handleCopy('extra_param_example')}>
                                        <button type='button' className='copy-click' title="Click to copy"><FontAwesomeIcon icon={faCopy} /></button>
                                    </CopyToClipboard>
                                    {copiedText === 'extra_param_example' && <span className='copied-click'>Text Copied</span>}
                                </label>
                            </div>
                            <div className='int-checkbox mt-3'>
                                {[
                                    "Fulfill orders (Enabling this will auto fulfill order in EasyShip when an order is shipped with ShipEase)",
                                    "Cancel orders (Enabling this will auto cancel order in EasyShip when order is cancelled in ShipEase)",
                                    "Mark as paid (Mark COD orders as paid in EasyShip when orders are delivered to customer)",
                                ].map((text, index) => (
                                    <label key={text}>
                                        <input
                                            className="input-checkbox mt-1"
                                            type="checkbox"
                                            checked={check[index]}
                                            onChange={() => handleCheckboxChange(index)}
                                        />
                                        {text}
                                    </label>
                                ))}
                            </div>
                            <div className='mt-3 d-flex justify-content-end'>
                                <button type='submit' className='btn main-button'>Submit</button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </>
    );
};

export default EasyEcomIntegrationForm;
