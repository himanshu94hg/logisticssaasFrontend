import React, { useState } from 'react';

const AgreementInfo = () => {
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
                        <h5>Upload Agreement</h5>
                        <div className='d-flex gap-5'>
                            <label>
                                <input className="input-field" type="file" onChange={handleFileChange} />
                            </label>
                        </div>
                    <button className='btn main-button mt-5'>View Agreement</button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AgreementInfo;
