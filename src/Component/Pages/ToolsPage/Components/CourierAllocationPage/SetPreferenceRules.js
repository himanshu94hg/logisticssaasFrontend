import React, { useState } from 'react';

const SetPreferenceRules = () => {
    const [formData, setFormData] = useState([
        { id: 1, selectField1: 'payment_type', selectField2: 'is', input2: '' }
    ]);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const newData = [...formData];
        newData[index][name] = value;
        setFormData(newData);
    };

    const handleAddRow = () => {
        setFormData([
            ...formData,
            { id: formData.length + 1, selectField1: 'payment_type', selectField2: 'is', input2: '' }
        ]);
    };

    const handleRemoveRow = (index) => {
        if (formData.length === 1) {
            return; // Don't remove if there's only one row
        }
        const newData = formData.filter((item, i) => i !== index);
        setFormData(newData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log(formData);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                {formData.map((item, index) => (
                    <div className="d-flex rule1" key={item.id}>
                        <div>
                            <label htmlFor={`selectField1_${index}`}>Select Field 1:</label>
                            <select
                                id={`selectField1_${index}`}
                                name="selectField1"
                                value={item.selectField1}
                                onChange={(e) => handleChange(e, index)}
                            >
                                <option value="payment_type">Payment Mode</option>
                                <option value="order_amount">Order Amount</option>
                                {/* Add other options here */}
                            </select>
                        </div>
                        <div>
                            <label htmlFor={`selectField2_${index}`}>Select Field 2:</label>
                            <select
                                id={`selectField2_${index}`}
                                name="selectField2"
                                value={item.selectField2}
                                onChange={(e) => handleChange(e, index)}
                            >
                                <option value="is">Is</option>
                                <option value="is_not">Is not</option>
                                {/* Add other options here */}
                            </select>
                        </div>
                        <div>
                            <label htmlFor={`input2_${index}`}>Input 2:</label>
                            <input
                                type="text"
                                id={`input2_${index}`}
                                name="input2"
                                value={item.input2}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </div>
                        <div>
                            {formData.length > 1 && (
                                <button type="button" onClick={() => handleRemoveRow(index)}>Delete</button>
                            )}
                        </div>
                        <button type="button" onClick={handleAddRow}>Add</button>
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default SetPreferenceRules;
