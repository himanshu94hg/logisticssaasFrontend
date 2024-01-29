import React, { useState } from 'react';

const AccountInfo = () => {
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [gstNumber, setGstNumber] = useState('');
    const [gstCertificate, setGstCertificate] = useState(null);
    const [panNumber, setPanNumber] = useState('');
    const [streetName, setStreetName] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [cityName, setCityName] = useState('');
    const [stateName, setStateName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Do something with the form data, like sending it to the server
        console.log({
            companyName,
            email,
            website,
            mobileNumber,
            gstNumber,
            gstCertificate,
            panNumber,
            streetName,
            zipCode,
            cityName,
            stateName,
        });

        // Reset form fields
        setCompanyName('');
        setEmail('');
        setWebsite('');
        setMobileNumber('');
        setGstNumber('');
        setGstCertificate(null);
        setPanNumber('');
        setStreetName('');
        setZipCode('');
        setCityName('');
        setStateName('');
    };

    const handleFileChange = (e) => {
        // Assuming single file upload, you can modify for multiple files
        const file = e.target.files[0];
        setGstCertificate(file);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='customer-details-container'>
                <div className='customer-details-form'>
                    <div className='details-form-row'>
                        <h5>Account Details</h5>
                        <div className='d-flex gap-5 flex-wrap'>
                            <label>
                                Account Holder Name
                                <input className="input-field" type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                            </label>

                            <label>
                                Account Number
                                <input className="input-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </label>

                            <label>
                                IFSC Code
                                <input className="input-field" type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
                            </label>

                            <label>
                                Bank Name
                                <input className="input-field" type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                            </label>
                            <label>
                                Branch Name
                                <input className="input-field" type="text" value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} />
                            </label>
                            <label>
                                Please Upload Cheque Image
                                <input className="input-field" type="file" onChange={handleFileChange} />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            {/* <button type="submit">Submit</button> */}
        </form>
    );
};

export default AccountInfo;
