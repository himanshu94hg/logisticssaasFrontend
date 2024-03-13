import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("access_token");
const pathname = window.location.pathname;

console.log(pathname, "pathname");

let headers = {
  mode: "no-cors",
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};

if (pathname !== '/sign-up') {
  headers["Authorization"] = `Bearer ${token}`;
}

const instance = axios.create({
  headers,
  withCredentials: false,
});

export default instance;
