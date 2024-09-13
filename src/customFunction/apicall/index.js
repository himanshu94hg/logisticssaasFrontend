import axios from "axios";
import Cookies from "js-cookie";
import { customErrorFunction } from "../errorHandling";

export const globalGetApiCallFunction = async (endPoint) => {
    const authToken = Cookies.get("access_token");
    try {
        const response = await axios.get(endPoint, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data;

    } catch (error) {
        customErrorFunction(error)
    }
};
