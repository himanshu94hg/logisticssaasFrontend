import Cookies from "js-cookie";
import axios from "../../../../axios/index"
import {  GET_RATE_CARD } from "../../constant/tools";
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_CORE } from "../../../../axios/config";
import { CUSTOMER_SUPPORT_ACTION } from "../../../constants/tools";
import { toast } from "react-toastify";



const sellerId=Cookies.get("user_id")

async function customerSupportAPI(id,status) {
    let listData = axios.request({
        method: "PUT",
        url:  `${BASE_URL_CORE}${API_URL.GET_CUSTOMER_SUPPORT}${id}/`,
        data: {
            status:status
        }
    });
    return listData

}

function* customerSupportAction(action) {
    let { payload, status} = action;


    try {
        let response = yield call(customerSupportAPI, payload,status);
        if (response.status === 200) {
            toast.success("Ticket closed successfully!")
        }

        else {

        }
    } catch (error) {
       toast.error("Something went wrong!")
    }
}

export function*  customerSupportWatcher() {
    yield takeLatest(CUSTOMER_SUPPORT_ACTION, customerSupportAction);
}
