import axios from "axios";
import { BASE_URL } from "./config";
import Cookies from "js-cookie";


// const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA4NTk3ODE2LCJpYXQiOjE3MDc5OTMwMTYsImp0aSI6IjlkMDA2NDdhNThlMTQ2ZTg4YTY5NDk5NTBkMDYzODIwIiwidXNlcl9pZCI6Mn0.U_LfFwstyHksDD0J1U2oULKxIhbK3D0Htoj1-Bdaqos"
const token=Cookies.get("access_token")

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        // mode: "cors",
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${token}`,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",

    },
    withCredentials: false,
});

export default instance;








