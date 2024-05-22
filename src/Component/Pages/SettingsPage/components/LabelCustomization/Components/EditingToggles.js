import React from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
// import './ToggleButton.css';

const EditingToggles = ({ label, checked, onChange }) => {
    return (
        <div className="toggle-container">
            <label>
                <span>{label}</span>
                <Toggle
                    defaultChecked={checked}
                    onChange={onChange}
                />
            </label>
        </div>
    );
};

export default EditingToggles;
