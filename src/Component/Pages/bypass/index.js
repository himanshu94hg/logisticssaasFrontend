import React, { useEffect } from 'react'
import { indexPattern } from '../../../Routes';
import Cookies from "js-cookie";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const BypassPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await axios.post('https://dev.shipease.in/core-api/accounts/switch-dashboard-token/', {
                    contact_number: "8090831663",
                    token: "2473874efsdjfhiu4y39857389"
                });

                if (response.status === 200) {
                    toast.success("User Logged in successfully!");
                    //   setTokenExists(true);
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

    }, []);
    return (
        <div>

        </div>
    )
}

export default BypassPage
