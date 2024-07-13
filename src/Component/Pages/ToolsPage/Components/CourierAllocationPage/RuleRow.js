import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';

const RuleRow = ({ initialRows, setConditions, setOnRowsChange }) => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (initialRows == null || initialRows.length === 0) {
            const initialRow = { condition: '', condition_type: '', match_type: '', match_value: '' };
            setRows([initialRow]);
            setOnRowsChange([initialRow]);
        } else {
            setRows(initialRows);
            setOnRowsChange(initialRows);
        }
    }, [initialRows]);

    const handleSelectChange = (index, field, value) => {
        const newRows = [...rows];
        newRows[index][field] = value;
        setRows(newRows);
        setConditions(newRows);
    };

    const handleInputChange = (index, value) => {
        console.log(index,value,"lllllllllllllllll")
        const newRows = [...rows];
        newRows[index].match_value = value;
        setRows(newRows);
        setConditions(newRows);
    };

    const handleAddRow = () => {
        const newRow = { condition: 'and', condition_type: '', match_type: '', match_value: '' };
        const newRows = [...rows, newRow];
        setRows(newRows);
        setOnRowsChange(newRows);
    };

    const handleRemoveRow = (index) => {
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);
        setConditions(newRows);
    };

    console.log(rows,"dsddddddddddddd")

    return (
        <>
            {rows.map((row, index) => (
                <div key={index} className='minor-rule-row'>
                    <select
                        className='select-field'
                        value={row.condition}
                        style={{ width: '100px' }}
                        onChange={(e) => handleSelectChange(index, 'condition', e.target.value)}
                        disabled={index === 0}
                    >
                        {index === 0 && <option value="">And/Or</option>}
                        <option value="and">And</option>
                        <option value="or">Or</option>
                    </select>
                    <select
                        className='select-field'
                        value={row.condition_type}
                        onChange={(e) => handleSelectChange(index, 'condition_type', e.target.value)}
                    >
                        <option value="">Select Condition</option>
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
                        value={row.match_type}
                        onChange={(e) => handleSelectChange(index, 'match_type', e.target.value)}
                    >
                        <option value="">Select Match Type</option>
                        {row.condition_type === "order_amount" && (
                            <>
                                <option value="greater_than">Greater than</option>
                                <option value="less_than">Less than</option>
                            </>
                        )}
                        {row.condition_type === "payment_type" && (
                            <>
                                <option value="is">Is</option>
                                <option value="is_not">Is not</option>
                            </>
                        )}
                        {row.condition_type === "pickup_pincode" && (
                            <>
                                <option value="is">Is</option>
                                <option value="is_not">Is not</option>
                            </>
                        )}
                        {row.condition_type === "delivery_pincode" && (
                            <>
                                <option value="is">Is</option>
                                <option value="is_not">Is not</option>
                                <option value="starts_with">Starts with</option>
                            </>
                        )}
                        {row.condition_type === "weight" && (
                            <>
                                <option value="greater_than">GT - Greater than</option>
                                <option value="less_than">LE - Less than Equal to</option>
                            </>
                        )}
                        {row.condition_type === "product_name" && (
                            <>
                                <option value="is">Is</option>
                                <option value="is_not">Is not</option>
                                <option value="starts_with">Starts with</option>
                            </>
                        )}
                        {row.condition_type === "product_sku" && (
                            <>
                                <option value="is">Is</option>
                                <option value="is_not">Is not</option>
                                <option value="starts_with">Starts with</option>
                            </>
                        )}
                        {row.condition_type === "order_type" && (
                            <>
                                <option value="is">Is</option>
                            </>
                        )}
                    </select>
                    {row.condition_type === "" && (
                        <input
                            className='input-field'
                            type="text"
                            value={row.match_value}
                            placeholder="Enter text"
                            disabled
                        />
                    )}{row.condition_type === "order_amount" && (
                        <input
                            className='input-field'
                            type="text"
                            value={row.match_value}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            placeholder="Enter amount"
                        />
                    )}
                    {row.condition_type === "payment_type" && (
                        <select className='select-field' onChange={(e) => handleInputChange(index, e.target.value)}>
                            <option value="">Select Option</option>
                            <option value="prepaid">Prepaid</option>
                            <option value="cod">COD</option>
                        </select>
                    )}
                    {row.condition_type === "pickup_pincode" && (
                        <input
                            className='input-field'
                            type="text"
                            value={row.match_value}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            placeholder="Enter pickup pincode"
                        />
                    )}
                    {row.condition_type === "delivery_pincode" && (
                        <input
                            className='input-field'
                            type="text"
                            value={row.match_value}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            placeholder="Enter delivery pincode"
                        />
                    )}
                    {row.condition_type === "weight" && (
                        <input
                            className='input-field'
                            type="text"
                            value={row.match_value}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            placeholder="Enter weight"
                        />
                    )}
                    {row.condition_type === "product_name" && (
                        <select className='select-field' value={row.match_value} onChange={(e) => handleInputChange(index, e.target.value)}>
                            <option value="">Select Option</option>
                            <option value="product1">Product 1</option>
                            <option value="product1">Product 2</option>
                        </select>
                    )}
                    {row.condition_type === "product_sku" && (
                        <select className='select-field'  value={row.match_value} onChange={(e) => handleInputChange(index, e.target.value)}>
                            <option value="">Select Option</option>
                            <option value="sku1">Product 1</option>
                            <option value="sku2">Product 2</option>
                        </select>
                    )}
                    {row.condition_type === "order_type" && (
                        <select className='select-field' value={row.match_value} onChange={(e) => handleInputChange(index, e.target.value)}>
                            <option value="">Select Option</option>
                            <option value="forward">Forward</option>
                            <option value="reverse">Reverse</option>
                        </select>
                    )}

                    <div className='add-rule-btns'>
                        {index > 0 && (
                            <button className='btn delete-btn' onClick={() => handleRemoveRow(index)}><FontAwesomeIcon icon={faTrashCan} /></button>
                        )}
                        {index === rows.length - 1 && (
                            <button className='btn main-button' onClick={handleAddRow}><FontAwesomeIcon icon={faPlus} /></button>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
};

export default RuleRow;
