import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CCAvenueRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const status = queryParams.get('ccavenuStatus');

        console.log('Current URL:', window.location.href); 
        console.log('Status parameter:', status); 

        if (status === 'Success') {
            navigate('/');
            toast.success("Recharge Success! Your balance has been updated.")
        } else {
            navigate('/');
            toast.error("Oops! Recharge was unsuccessful.")
        }
    }, [navigate]);

    return (
        <>
            <p>Processing your payment...</p>
        </>
    );
};

export default CCAvenueRedirect;
