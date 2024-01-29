import React, { useState } from 'react';

// Reusable FormInput component
const FormInput = ({ label, type, value, onChange, options }) => (
    <div className='ticket-form-row'>
        <label>{label}</label>
        {type === 'select' ? (
            <select className='select-field' value={value} onChange={onChange}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        ) : type === 'textarea' ? (
            <textarea className='input-field text-field' rows="4" value={value} onChange={onChange} />
        ) : type === 'file' ? (
            <input className='input-field choose-file-container' type={type} onChange={onChange} />
        ) : (
            <input className='input-field x' type={type} value={value} onChange={onChange} />
        )}
    </div>
);

const CreateTicketForm = () => {
    const [awbNumbers, setAwbNumbers] = useState('');
    const [courierPartner, setCourierPartner] = useState('');
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [remarks, setRemarks] = useState('');
    const [attachments, setAttachments] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Do something with the form data, like sending it to the server
        console.log({
            awbNumbers,
            courierPartner,
            category,
            subcategory,
            remarks,
            attachments,
        });

        // Reset form fields
        setAwbNumbers('');
        setCourierPartner('');
        setCategory('');
        setSubcategory('');
        setRemarks('');
        setAttachments(null);
    };

    const handleFileChange = (e) => {
        // Assuming single file upload, you can modify for multiple files
        const file = e.target.files[0];
        setAttachments(file);
    };

    const courierOptions = [
        { value: 'partner1', label: 'Partner 1' },
        { value: 'partner2', label: 'Partner 2' },
        // Add more options as needed
    ];

    const categoryOptions = [
        { value: 'category1', label: 'Category 1' },
        { value: 'category2', label: 'Category 2' },
        // Add more options as needed
    ];

    const subcategoryOptions = [
        { value: 'subcategory1', label: 'Subcategory 1' },
        { value: 'subcategory2', label: 'Subcategory 2' },
        // Add more options as needed
    ];

    return (
        <form onSubmit={handleSubmit}>
            <FormInput
                label="AWB Numbers (Comma Separated)"
                type="text"
                value={awbNumbers}
                onChange={(e) => setAwbNumbers(e.target.value)}
            />
            <FormInput
                label="Courier Partner"
                type="select"
                value={courierPartner}
                onChange={(e) => setCourierPartner(e.target.value)}
                options={courierOptions}
            />
            <FormInput
                label="Choose a Category"
                type="select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                options={categoryOptions}
            />
            <FormInput
                label="Choose a Subcategory"
                type="select"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                options={subcategoryOptions}
            />
            <FormInput
                label="Remarks"
                type="textarea"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
            />
            <FormInput
                label="Attachments (If any)"
                type="file"
                onChange={handleFileChange}
            />

            <div className='ticket-form-btn'>
                <button className='btn cancel-button' type="button" onClick={() => console.log('Cancelled')}>
                    Cancel
                </button>
                <button className='btn main-button' type="submit">
                    Submit
                </button>
            </div>
        </form>
    );
};

export default CreateTicketForm;
