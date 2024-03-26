import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'

const RuleRow = () => {
    const [rows, setRows] = useState([{ selectValue1: '', selectValue2: '', selectValue3: '', inputValue: '' }]);

    const handleSelectChange = (index, field, value) => {
        const newRows = [...rows];
        newRows[index][field] = value;
        setRows(newRows);
    };

    const handleInputChange = (index, value) => {
        const newRows = [...rows];
        newRows[index].inputValue = value;
        setRows(newRows);
    };

    const handleAddRow = () => {
        setRows([...rows, { selectValue1: '', selectValue2: '', selectValue3: '', inputValue: '' }]);
    };

    const handleRemoveRow = (index) => {
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);
    };
    return (
        <>
            {rows.map((row, index) => (
                <div key={index} className='minor-rule-row'>
                    <select
                        className='select-field'
                        value={row.selectValue1}
                        style={{ width: '100px' }}
                        onChange={(e) => handleSelectChange(index, 'selectValue1', e.target.value)}
                        disabled={index === 0} // Disable condition select field for the first row
                    >
                        <option value="">And/Or</option>
                        <option value="and">And</option>
                        <option value="or">Or</option>
                    </select>
                    <select
                        className='select-field'
                        value={row.selectValue2}
                        onChange={(e) => handleSelectChange(index, 'selectValue2', e.target.value)}
                    >
                        <option value="payment_type">Payment Mode</option>
                        <option value="order_amount">Order Amount</option>
                        <option value="pickup_pincode">Pickup Pincode</option>
                        <option value="delivery_pincode">Delivery Pincode</option>
                        <option value="weight">Weight (In Kg.)</option>
                        <option value="product_name">Product Name</option>
                        <option value="product_sku">Product SKU</option>
                        <option value="order_type">Order Type</option>
                    </select>
                    <select
                        className='select-field'
                        value={row.selectValue3}
                        onChange={(e) => handleSelectChange(index, 'selectValue3', e.target.value)}
                    >
                        <option value="is">Is</option>
                        <option value="is_not">Is not</option>
                        <option value="starts_with">Starts with</option>
                        <option value="greater_than">GT - Greater than</option>
                        <option value="less_than">LE - Less than Equal to</option>
                    </select>
                    <input
                        className='input-field'
                        type="text"
                        value={row.inputValue}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        placeholder="Enter text"
                    />
                    <div className='add-rule-btns'>
                        {rows.length > 1 && (
                            <button className='btn delete-btn' onClick={() => handleRemoveRow(index)}><FontAwesomeIcon icon={faTrashCan} /></button>
                        )}
                        {index === rows.length - 1 && (
                            <button className='btn main-button' onClick={handleAddRow}><FontAwesomeIcon icon={faPlus} /></button>
                        )}
                    </div>

                </div>
            ))}
        </>
    )
}

export default RuleRow