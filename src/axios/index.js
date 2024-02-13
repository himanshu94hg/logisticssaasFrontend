import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "./config";

const accessToken = Cookies.get('access_token');

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 60000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        AccessControlAllowMethods: "GET, POST, PUT, DELETE, OPTIONS",
        "Cache-Control": "no-cache",
        "X-Requested-With": "XMLHttpRequest",
        "encrypted-authrorisation": `${accessToken}`,
    },
    withCredentials: false,
});

instance.interceptors.request.use(
    (reqConfig) => {
        return reqConfig;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        if (response) {
            if (response.status === 200) {
            }
        }
        return response;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default instance;
