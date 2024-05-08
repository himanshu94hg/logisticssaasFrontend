import axios from 'axios';
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import React, { useEffect } from 'react'
import { indexPattern } from '../../../Routes';
import { useNavigate } from 'react-router-dom';

const BypassPage = () => {
    const navigate = useNavigate();
    const currentUrl = window.location.href;
    const searchParams = new URLSearchParams(window.location.search);
    const mobile = searchParams.get('mobile');

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await axios.post('https://dev.shipease.in/core-api/accounts/switch-dashboard-token/', {
                    contact_number: mobile,
                    token: "2473874efsdjfhiu4y39857389"
                });

                if (response.status === 200) {
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
