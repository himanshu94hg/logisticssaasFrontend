import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "../../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_ORDER } from "../../../../../axios/config";
import { CLONE_ORDERS_UPDATE_ACTION, DELETE_ORDERS_ACTION, GENERATE_MANIFEST_ACTION, ORDERS_DETAILS_CANCEL_ACTION, } from "../../../constant/orders";
import { ORDERS_CANCEL_RES_DATA, ORDERS_CLONE_RES_DATA, ORDERS_DELETE_RES_DATA, } from "../../../../constants/orders";


const sellerData = Cookies.get("user_id")

async function cancelOrderApi(data) {
    console.log(data, "this is put data")
    let listData = axios.request({
        method: "POST",
        url: `${BASE_URL_ORDER}${API_URL.CANCEL_ORDERS_API}`,
        data: data
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
        toast.error("Awb number is not correct!")
        console.log(error,"this is error page dtta")
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

async function generateManifestApi(data) {
    let listData = axios.request({
        method: "POST",
        url: `${BASE_URL_ORDER}${API_URL.GENERATE_MANIFEST_API}`,
        data: data
    });
    return listData
}
function* generateManifestAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(generateManifestApi, payload);
        if (response.status === 200) {
            // yield put({ type: ORDERS_DELETE_RES_DATA, payload: response?.status })
            toast.success("Manifest generated successfully!")
        }

    } catch (error) {
        toast.error(error?.response?.data?.detail)
    }
}


export function* orderActionTabWatcher() {
    yield takeLatest(ORDERS_DETAILS_CANCEL_ACTION, cancelOrderAction);
    yield takeLatest(CLONE_ORDERS_UPDATE_ACTION, cloneOrderAction);
    yield takeLatest(DELETE_ORDERS_ACTION, deleteOrderAction);
    yield takeLatest(GENERATE_MANIFEST_ACTION, generateManifestAction);
}
