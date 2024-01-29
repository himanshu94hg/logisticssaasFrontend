import React, { useState } from 'react';

const KYCInfo = () => {
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
                        <h5>KYC Documents</h5>
                        <div className='d-flex gap-5 flex-wrap'>
                            <label>
                                Company Type
                                <select type="text" className="select-field" id="company_type" name="company_type" required="" disabled="">
                                    <option value="">Select Document Type</option>
                                    <option value="Proprietorship">Proprietorship</option>
                                    <option value="Private" selected="">Private</option>
                                    <option value="Partnership Firm">Partnership Firm</option>
                                    <option value="Other">Other</option>
                                </select>
                            </label>

                            <label>
                                Document Type
                                <select type="text" className="select-field" id="document_type" name="document_type" required="">
                                    <option value="">Select Document Type</option>
                                    <option value="aadhar_card">Aadhar Card</option>
                                    <option value="pan_card" selected="">Pan Card</option>
                                    <option value="driving_license">Driving License</option>
                                    <option value="voter_id">Voter ID Card</option>
                                </select>
                            </label>

                            <label>
                                Upload Document
                                <input className="input-field" type="file" value={website} onChange={(e) => setWebsite(e.target.value)} />
                            </label>

                            <label>
                                Ducument Name
                                <input className="input-field" type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                            </label>
                            <label>
                                Ducument Number
                                <input className="input-field" type="text" value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            {/* <button type="submit">Submit</button> */}
        </form>
    );
};

export default KYCInfo;
