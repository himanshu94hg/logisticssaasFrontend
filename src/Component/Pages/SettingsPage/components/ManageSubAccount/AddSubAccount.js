import React, { useState } from 'react';
import './ManageSubAccount.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const AddSubAccount = ({ addNewSubAccount, handleClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addNewSubAccount(formData); // Pass the form data back to the parent component
    };

    return (
        <section className={`add-account-panel open`}>
            <div id='sidepanel-closer' onClick={handleClose}>
                <FontAwesomeIcon icon={faChevronRight} />
            </div>
            <div className='panel-header'>
                <h2>Add Subaccount</h2>
                <p>Add an account here!</p>
            </div>
            <div className='panel-body'>
                <form onSubmit={handleSubmit}>
                    <div className='d-flex flex-column gap-3'>
                        <label>Subaccount Name
                            <input
                                type='text'
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                className='input-field'
                                required
                            />
                        </label>

                        <label>Subaccount Email
                            <input
                                type='email'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                className='input-field'
                                required
                            />
                        </label>

                        <label>Password
                            <input
                                type='password'
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                className='input-field'
                                required
                            />
                        </label>
                    </div>
                    <button type='submit' className='btn main-button mt-3'>
                        Save Subaccount
                    </button>
                </form>
            </div>
        </section>
    );
}

export default AddSubAccount;
