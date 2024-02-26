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
                        onChange={(e) => handleSelectChange(index, 'selectValue1', e.target.value)}
                        disabled={index === 0} // Disable condition select field for the first row
                    >
                        <option value="">Select Condition</option>
                        <option value="and">And</option>
                        <option value="or">Or</option>
                    </select>
                    <select
                        className='select-field'
                        value={row.selectValue2}
                        onChange={(e) => handleSelectChange(index, 'selectValue2', e.target.value)}
                    >
                        <option value="">Select Option 2</option>
                        {/* Add other options as needed */}
                    </select>
                    <select
                        className='select-field'
                        value={row.selectValue3}
                        onChange={(e) => handleSelectChange(index, 'selectValue3', e.target.value)}
                    >
                        <option value="">Select Option 3</option>
                        {/* Add other options as needed */}
                    </select>
                    <input
                        className='input-field'
                        type="text"
                        value={row.inputValue}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        placeholder="Enter text"
                    />
                    {index === rows.length - 1 && (
                        <button onClick={handleAddRow}>Add</button>
                    )}
                    {rows.length > 1 && (
                        <button onClick={() => handleRemoveRow(index)}>Delete</button>
                    )}
                </div>
            ))}
        </>
    )
}

export default RuleRow