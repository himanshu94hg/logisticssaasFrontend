import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "../../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_ORDER } from "../../../../../axios/config";
import { BULK_ADD_ORDER_TAG_ACTION, BULK_CANCEL_ORDER_ACTION, BULK_DELETE_ORDER_ACTION, BULK_DIMESION_DETAILS_UPDATE_ACTION, BULK_MARK_ORDER_VERIFY_ACTION, BULK_PICKUP_ADDRESS_UPDATE_ACTION } from "../../../constant/orders/bulkAction";
import { ORDERS_DELETE_RES_DATA } from "../../../../constants/orders";


const sellerData = Cookies.get("user_id")


// BULK_ADD_ORDER_TAG
async function bulkAddOrderTagApi(data) {
    let listData = axios.request({
        method: "PUT",
        url: `${BASE_URL_ORDER}${API_URL.BULK_ADD_ORDER_TAG}`,
        data: data
    });
    return listData
}
function* bulkAddOrderTagAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(bulkAddOrderTagApi, payload);
        if (response.status === 200) {
            yield put({ type: ORDERS_DELETE_RES_DATA, payload: response?.status })
            toast.success("Add Order tag successfully!")
        }

    } catch (error) {
        toast.error(error?.response?.data?.detail)
    }
}

// BULK_MARK_ORDER_VERIFY
async function bulkMarkOrderVerifyApi(data) {
    let listData = axios.request({
        method: "PUT",
        url: `${BASE_URL_ORDER}${API_URL.BULK_MARK_ORDER_VERIFY}`,
        data: data
    });
    return listData
}
function* bulkMarkOrderVerifyAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(bulkMarkOrderVerifyApi, payload);
        if (response.status === 200) {
            yield put({ type: ORDERS_DELETE_RES_DATA, payload: response?.status })
            toast.success("Marked verified successfully!")
        }

    } catch (error) {
        toast.error(error?.response?.data?.detail)
    }
}

//BULK_DELETE_ORDER
async function bulkDeleteOrderApi(data) {
    let listData = axios.request({
        method: "DELETE",
        url: `${BASE_URL_ORDER}${API_URL.BULK_DELETE_ORDER}`,
        data: data
    });
    return listData
}
function* bulkDeleteOrderAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(bulkDeleteOrderApi, payload);
        if (response.status === 200) {
            yield put({ type: ORDERS_DELETE_RES_DATA, payload: response?.status })
            toast.success("Order deleted successfully!")
        }

    } catch (error) {
        toast.error(error?.response?.data?.detail)
    }
}

//BULK_CANCEL_ORDER
async function bulkCancelOrderApi(data) {
    let listData = axios.request({
        method: "POST",
        url: `${BASE_URL_ORDER}${API_URL.BULK_CANCEL_ORDER}`,
        data: data
    });
    return listData
}
function* bulkCancelOrderAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(bulkCancelOrderApi, payload);
        console.log(response?.status,"this is a response data")
        if (response.status === 200) {
            yield put({ type: ORDERS_DELETE_RES_DATA, payload: response?.status })
            toast.success("Order cancelled successfully")
        }

    } catch (error) {
        toast.error(error?.response?.data?.detail)
    }
}

//BULK_PICKUP_ADDRESS_UPDATE
async function bulkPickupAddressUpdateApi(data) {
    let listData = axios.request({
        method: "PUT",
        url: `${BASE_URL_ORDER}${API_URL.BULK_PICKUP_ADDRESS_UPDATE}`,
        data: data
    });
    return listData
}
function* bulkPickupAddressUpdateAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(bulkPickupAddressUpdateApi, payload);
        if (response.status === 200) {
            yield put({ type: ORDERS_DELETE_RES_DATA, payload: response?.status })
            toast.success("Pickup address update successfully")
        }

    } catch (error) {
        toast.error(error?.response?.data?.detail)
    }
}

//BULK_PICKUP_ADDRESS_UPDATE
async function bulkDimensionDetailUpdateApi(data) {
    let listData = axios.request({
        method: "PUT",
        url: `${BASE_URL_ORDER}${API_URL.BULK_DIMENSION_DETAILS_UPDATE}`,
        data: data
    });
    return listData
}
function* bulkDimensionDetailUpdateAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(bulkDimensionDetailUpdateApi, payload);
        if (response.status === 200) {
            // yield put({ type: ORDERS_DELETE_RES_DATA, payload: response?.status })
            toast.success("Dimension update successfully")
        }

    } catch (error) {
        toast.error(error?.response?.data?.detail)
    }
}


export function* getBulkOrderActionWatcher() {
    yield takeLatest(BULK_ADD_ORDER_TAG_ACTION, bulkAddOrderTagAction);
    yield takeLatest(BULK_MARK_ORDER_VERIFY_ACTION, bulkMarkOrderVerifyAction);
    yield takeLatest(BULK_DELETE_ORDER_ACTION, bulkDeleteOrderAction);
    yield takeLatest(BULK_CANCEL_ORDER_ACTION, bulkCancelOrderAction);
    yield takeLatest(BULK_PICKUP_ADDRESS_UPDATE_ACTION, bulkPickupAddressUpdateAction);
    yield takeLatest(BULK_DIMESION_DETAILS_UPDATE_ACTION, bulkDimensionDetailUpdateAction);
}
