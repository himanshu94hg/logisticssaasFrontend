import React, { useEffect } from 'react'
import { indexPattern } from '../../../Routes';
import Cookies from "js-cookie";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const BypassPage = () => {
    const navigate = useNavigate();
    const currentUrl = window.location.href;
    const searchParams = new URLSearchParams(window.location.search);
    const mobile = searchParams.get('mobile');
    const token = searchParams.get('token');

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await axios.post('https://dev.shipease.in/core-api/accounts/switch-dashboard-token/', {
                    contact_number: mobile,
                    token: token
                });

                if (response.status === 200) {
                    toast.success("User Logged in successfully!");
                    navigate(indexPattern);
                    Cookies.set('user_id', response?.data?.user_id);
                    Cookies.set('access_token', response?.data?.access);
                    window.location.reload();
                }
            } catch (error) {
                toast.error("Something went wrong!");
            }
        };
        fetchApi();
    }, [mobile]);
    return (
        <div>

        </div>
    )
}

export default BypassPage
