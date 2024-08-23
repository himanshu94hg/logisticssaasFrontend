import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CCAvenueRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const status = queryParams.get('ccavenustatus');

        console.log('Current URL:', window.location.href); 
        console.log('Status parameter:', status); 

        if (status === 'Success') {
            navigate('/');
            toast.success("Recharge Success! Your balance has been updated.");
        } else if (status === 'Failure' || status === null) {
            navigate('/');
            toast.error("Oops! Recharge was unsuccessful.");
        } else {
            navigate('/');
            toast.error("Oops! Recharge was unsuccessful.");
        }
    }, [navigate]);

    return (
        <>
            <p>Processing your payment...</p>
        </>
    );
};

export default CCAvenueRedirect;
