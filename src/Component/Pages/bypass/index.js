import React, { useEffect } from 'react'
import { indexPattern } from '../../../Routes';
import Cookies from "js-cookie";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { BASE_URL_CORE } from '../../../axios/config';

const BypassPage = () => {
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(window.location.search);
    const mobile = searchParams.get('mobile');
    const token = searchParams.get('token');
    Cookies.set("static_token",token)

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await axios.post(`${BASE_URL_CORE}/core-api/accounts/switch-dashboard-token/`, {
                    contact_number: mobile,
                    token: token
                });

                if (response.status === 200) {
                    navigate(indexPattern);
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
