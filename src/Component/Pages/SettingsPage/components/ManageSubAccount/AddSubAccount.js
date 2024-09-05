import React, { useState } from 'react';
import './ManageSubAccount.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL_CORE } from '../../../../../axios/config';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { customErrorFunction } from '../../../../../customFunction/errorHandling';

const AddSubAccount = ({ handleClose, setRefresh }) => {
    let authToken = Cookies.get("access_token")

    const [formData, setFormData] = useState({
        contact_number: '',
        email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${BASE_URL_CORE}/core-api/seller/sub-account/`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            if (response.status === 201) {
                setRefresh(new Date())
                toast.success("Subaccount added successfully!")
                setFormData({
                    contact_number: '',
                    email: '',
                })
                handleClose()
            }
        } catch (error) {
            customErrorFunction(error)
            handleClose()
            setFormData({
                contact_number: '',
                email: '',
            })
        }
    };

    const handleKeyPress = (e) => {
        const allowedCharacters = /^[0-9\b.]+$/;
        const { name, value } = e.target;
        if (!allowedCharacters.test(e.key) && name === "contact_number") {
            e.preventDefault()
        }
    }

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
                        <label>Contact Number
                            <input
                                required
                                type='text'
                                maxLength={10}
                                name='contact_number'
                                onChange={handleChange}
                                className='input-field'
                                value={formData.contact_number}
                                onKeyPress={(e) => handleKeyPress(e)}
                            />
                        </label>

                        <label>Subaccount Email
                            <input
                                type='text'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                className='input-field'
                                maxLength={60}
                                onKeyDown={(e) => {
                                    if (e.key === " " && e.target.value.endsWith(' ')) {
                                        e.preventDefault()
                                    }
                                }}
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
