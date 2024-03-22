import { call, put, takeLatest } from "@redux-saga/core/effects";
import axios from "../../../../../axios/index"
import { toast } from "react-toastify";
import { API_URL, BASE_URL_ORDER } from "../../../../../axios/config";
import { CLONE_ORDERS_UPDATE_ACTION, DELETE_ORDERS_ACTION, ORDERS_DETAILS_CANCEL_ACTION } from "../../../constant/orders";
import { GET_ORDERS_DETAILS_DATA, ORDERS_CANCEL_RES_DATA, ORDERS_CLONE_RES_DATA, ORDERS_DELETE_RES_DATA, ORDERS_DETAILS_RES_DATA } from "../../../../constants/orders";
import Cookies from "js-cookie";


const sellerData = Cookies.get("user_id")

async function cancelOrderApi(data) {
    console.log(data,"this is put data")
    let listData = axios.request({
        method: "PUT",
        url: `${BASE_URL_ORDER}${API_URL.CANCEL_ORDERS_API}${data}/`,
        data: data.formData
    });
    return listData
}
function* cancelOrderAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(cancelOrderApi, payload);
        if (response.status === 200) {
            yield put({ type: ORDERS_CANCEL_RES_DATA, payload: response?.status })
            toast.success("Order cancelled successfully")
        }

    } catch (error) {
        toast.error(error?.response?.data?.detail)
    }
}

async function cloneOrderApi(data) {
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.CLONE_ORDERS_API}${data}/`,
        data: data.formData
    });
    return listData
}
function* cloneOrderAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(cloneOrderApi, payload);
        if (response.status === 200) {
            yield put({ type: ORDERS_CLONE_RES_DATA, payload: response?.status })
            toast.success("Order cloned successfully")
        }

    } catch (error) {
        toast.error(error?.response?.data?.detail)
    }
}

async function deleteOrderApi(data) {
    let listData = axios.request({
        method: "DELETE",
        url: `${BASE_URL_ORDER}${API_URL.DELETE_ORDERS_API}${data}/`,
        data: data.formData
    });
    return listData
}
function* deleteOrderAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(deleteOrderApi, payload);
        if (response.status === 204) {
            yield put({ type: ORDERS_DELETE_RES_DATA, payload: response?.status })
            toast.success("Order deleted successfully")
        }

    } catch (error) {
        toast.error(error?.response?.data?.detail)
    }
}

async function updateOrderApi(data) {
    console.log(data,"this is put data")
    let listData = axios.request({
        method: "PUT",
        url: `${BASE_URL_ORDER}${API_URL.DELETE_ORDERS_API}${data}/`,
        data: data.formData
    });
    return listData
}
function* updateOrderAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(updateOrderApi, payload);
        console.log(response,"this is reponse data")
        if (response.status === 200) {
            // yield put({ type: ORDERS_DETAILS_RES_DATA, payload: response?.status })
            toast.success("Order update successfully")
        }

    } catch (error) {
        toast.error(`Please enter valid order id!`)
    }
}

export function* orderActionTabWatcher() {
    yield takeLatest(ORDERS_DETAILS_CANCEL_ACTION, cancelOrderAction);
    yield takeLatest(CLONE_ORDERS_UPDATE_ACTION, cloneOrderAction);
    yield takeLatest(DELETE_ORDERS_ACTION, deleteOrderAction);
    // yield takeLatest(ORDERS_DETAILS_UPDATE_ACTION, updateOrderAction);
}
