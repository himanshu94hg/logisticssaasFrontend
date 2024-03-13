import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("access_token");

let headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};

if (token) {
  headers["Authorization"] = `Bearer ${token}`;
}

const instance = axios.create({
  headers,
  withCredentials: false,
});

export default instance;
