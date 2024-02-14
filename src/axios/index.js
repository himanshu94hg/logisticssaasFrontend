import axios from "axios";
import { BASE_URL } from "./config";

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        mode: "no-cors",
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        AccessControlAllowMethods: "GET, POST, PUT, DELETE, OPTIONS",

    },
    withCredentials: false,
});

export default instance;








