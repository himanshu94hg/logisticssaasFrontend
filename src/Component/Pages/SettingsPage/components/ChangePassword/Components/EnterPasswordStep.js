import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import VerificationIcon from './Icons/VerificationIcon';
import { BASE_URL_CORE } from '../../../../../../axios/config';
import { customErrorFunction } from '../../../../../../customFunction/errorHandling';

const EnterPasswordStep = ({ ChangePasswordPop, setChangePasswordPop, setStep, email }) => {
    const [error, setError] = useState('');
    let authToken = Cookies.get("access_token");
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordSubmit = async () => {
        setStep(4);

        // if (!newPassword || !confirmPassword) {
        //     setError('Both fields are required.');
        //     return;
        // }
        // if (newPassword !== confirmPassword) {
        //     setError('Passwords do not match.');
        //     return;
        // }
        // const data = {
        //     username: email,
        //     password: newPassword,
        // }
        // try {
        //     const response = await axios.post(`${BASE_URL_CORE}/core-api/accounts/change-password/`, data, {
        //         headers: {
        //             Authorization: `Bearer ${authToken}`
        //         }
        //     });
        //     if (response?.status === 200) {
        //         setNewPassword('')
        //         setConfirmPassword('')
        //         setChangePasswordPop(false);
        //         toast.success(response?.data?.message);
        //     }
        // } catch (error) {
        //     customErrorFunction(error);
        // }
    };

    return (
        <>
            <div className='verfication-step d-flex flex-column align-items-center w-100'>
                <div className='cp-img-container'>
                    <VerificationIcon />
                </div>
                <div className='fw-bold mt-4 px-5 text-center'>
                    <label>
                        New Password
                        <input
                            placeholder='Enter your new Password'
                            className='input-field'
                            type="password"
                            value={newPassword}
                            onChange={(e) => {
                                setNewPassword(e.target.value);
                                setError('');
                            }}
                        />
                    </label>
                    <label className='mt-3'>
                        Confirm New Password
                        <input
                            placeholder='Re-enter your new password'
                            className='input-field'
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setError('');
                            }}
                        />
                    </label>
                </div>
                {error && <p className="text-danger mt-2">{error}</p>}
            </div>
            <div className='d-flex justify-content-end'>
                <button onClick={handlePasswordSubmit} className='btn main-button'>Reset Password</button>
            </div>
        </>
    );
};

export default EnterPasswordStep;
