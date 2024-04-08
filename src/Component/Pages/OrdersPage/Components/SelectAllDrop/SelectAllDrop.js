import React, { useState, useEffect, useRef } from 'react';
import './SelectAllDrop.css';
import { FaAngleDown } from 'react-icons/fa'; // Import the dropdown icon

const options = [
    { value: 'select_all', label: 'Select All (263 Orders)', isChecked: false },
];

const SelectAllDrop = ({setBulkActionShow}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const toggleSelect = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (e,option) => {
        const updatedOptions = options?.map((opt) =>
            opt?.value === option?.value ? { ...opt, isChecked: !opt.isChecked } : opt
        );
        setSelectedOptions(updatedOptions.filter((opt) => opt.isChecked));
        if(e?.target?.checked){
            setBulkActionShow(true)
        }else{
            setBulkActionShow(false)

        }
    };


    return (
        <section className='select-all-drop'>
            <div ref={dropdownRef} className={`custom-select ${isOpen ? 'open' : ''}`}>
                <div className="selected-option" onClick={toggleSelect}>
                    <FaAngleDown className="dropdown-icon" />
                </div>
                {isOpen && (
                    <ul className="options">
                        {options.map((option) => (
                            <li key={option.value}>
                                <input
                                    type="checkbox"
                                    // checked={options[0].isChecked} // Check the value passed to checked attribute
                                    onChange={(e) => handleOptionClick(e,options[0])} // Pass the first option to handleOptionClick
                                />

                                <label onClick={() => handleOptionClick(option)}>{option.label}</label>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>

    );
};

export default SelectAllDrop;
