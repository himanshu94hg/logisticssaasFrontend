import axios from "axios";
import Cookies from "js-cookie";

const token=Cookies.get("access_token")

const instance = axios.create({
    // baseURL: BASE_URL,
    headers: {
        mode: "no-cors",
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${token}`,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",

    },
    withCredentials: false,
});

export default instance;








