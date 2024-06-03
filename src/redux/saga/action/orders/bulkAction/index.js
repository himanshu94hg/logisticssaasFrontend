import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "../../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_ORDER } from "../../../../../axios/config";
import { BULK_ADD_ORDER_TAG_ACTION, BULK_CANCEL_ORDER_ACTION, BULK_DELETE_ORDER_ACTION, BULK_DIMESION_DETAILS_UPDATE_ACTION, BULK_GENERATE_MENIFEST_ACTION, BULK_GET_DIMENSION_DETAILS_ACTION, BULK_MARK_ORDER_VERIFY_ACTION, BULK_ORDER_DOWNLOAD_MANIFEST_ACTION, BULK_ORDER_GENERATE_INVOICE_ACTION, BULK_ORDER_GENERATE_LABEL_ACTION, BULK_ORDER_GENERATE_PICKUP_ACTION, BULK_PICKUP_ADDRESS_UPDATE_ACTION, BULK_PROCESSING_ORDER_CANCEL_ACTION } from "../../../constant/orders/bulkAction";
import { ORDERS_CANCEL_RES_DATA, ORDERS_DELETE_RES_DATA, ORDERS_DOWNLOAD_MANIFEST_DATA, ORDERS_INVOICE_LIST_DATA, ORDERS_LABEL_LIST_DATA, ORDERS_PRODUCT_DIMENSION_DATA } from "../../../../constants/orders";
import { customErrorFunction } from "../../../../../customFunction/errorHandling";

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
        customErrorFunction(error);
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
        customErrorFunction(error);
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
            if (response?.data?.count >= 1) {
                toast.success(`${response?.data?.count} order deleted successfully`)
            } else {
                toast.error("No order deleted!")
            }
        }

    } catch (error) {
        customErrorFunction(error);
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
        if (response.status === 200) {
            yield put({ type: ORDERS_DELETE_RES_DATA, payload: response?.status })
            toast.success("Order cancelled successfully")
        }

    } catch (error) {
        customErrorFunction(error);
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
        customErrorFunction(error);
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
            yield put({ type: ORDERS_DELETE_RES_DATA, payload: response?.status })
            toast.success("Dimension update successfully")
        }

    } catch (error) {
        customErrorFunction(error);
    }
}

async function bulkGenerateManifestApi(data) {
    return axios.request({
        method: "POST",
        url: `${BASE_URL_ORDER}${API_URL.BULK_ORDER_GENERATE_MENIFEST_API}`,
        data: data
    });
}
function* bulkGenerateManifestAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(bulkGenerateManifestApi, payload);
        if (response.status === 200) {
            toast.success(`${payload?.orderLength.length} Manifest generate successfully!`)
            yield put({ type: ORDERS_DELETE_RES_DATA, payload: response?.status })
        }

    } catch (error) {
        customErrorFunction(error);
    }
}
async function bulkGeneratePickupApi(data) {
    return axios.request({
        method: "POST",
        url: `${BASE_URL_ORDER}${API_URL.BULK_ORDER_GENERATE_PICKUP_API}`,
        data: data
    });
}
function* bulkGeneratePickupAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(bulkGeneratePickupApi, payload);
        if (response.status === 200) {
            toast.success(` Pickup generate successfully!`)
            yield put({ type: ORDERS_DELETE_RES_DATA, payload: response?.status })
        }

    } catch (error) {
        customErrorFunction(error);
    }
}

async function bulkGenerateLabelApi(data) {
    return axios.request({
        method: "POST",
        url: `${BASE_URL_ORDER}${API_URL.BULK_ORDER_GENERATE_LABEL_API}`,
        data: data
    });
}
function* bulkGenerateLabelAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(bulkGenerateLabelApi, payload);
        if (response.status === 200) {
            toast.success(` Label generated successfully!`)
            yield put({ type: ORDERS_DELETE_RES_DATA, payload: response?.status })
            yield put({ type: ORDERS_LABEL_LIST_DATA, payload: response?.data })
        }

    } catch (error) {
        customErrorFunction(error);
    }
}

async function bulkGenerateInvoiceApi(data) {
    return axios.request({
        method: "POST",
        url: `${BASE_URL_ORDER}${API_URL.BULK_ORDER_GENERATE_INVOICE_API}`,
        data: data
    });
}
function* bulkGenerateInvoiceAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(bulkGenerateInvoiceApi, payload);
        if (response.status === 200) {
            toast.success(` Invoice downloaded successfully!`)
            yield put({ type: ORDERS_DELETE_RES_DATA, payload: response?.status })
            yield put({ type: ORDERS_INVOICE_LIST_DATA, payload: response?.data })

        }

    } catch (error) {
        customErrorFunction(error);
    }
}

async function bulkDownloadManifestApi(data) {
    return axios.request({
        method: "POST",
        url: `${BASE_URL_ORDER}${API_URL.BULK_ORDER_DOWNLOAD_MANIFEST_API}`,
        data: data
    });
}
function* bulkDownloadManifestAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(bulkDownloadManifestApi, payload);
        if (response.status === 200) {
            toast.success(` Manifest downloaded successfully!`)
            yield put({ type: ORDERS_DELETE_RES_DATA, payload: response?.status })
            yield put({ type: ORDERS_DOWNLOAD_MANIFEST_DATA, payload: response?.data })

        }

    } catch (error) {
        customErrorFunction(error);
    }
}

// BULK_DIMENSION_GET_API
async function bulkOrderDimensionApi(data) {
    return axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.BULK_DIMENSION_GET_API}?order_ids=${data}`,
        // data: data
    });
}
function* bulkOrderDimensionAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(bulkOrderDimensionApi, payload);
        if (response.status === 200) {
            yield put({ type: ORDERS_PRODUCT_DIMENSION_DATA, payload: response?.data })
        }

    } catch (error) {
        customErrorFunction(error);
    }
}


// BULK_CANCEL_ORDER_PROCESSING
async function bulkCancelOrderProcessingApi(data) {
    return axios.request({
        method: "PUT",
        url: `${BASE_URL_ORDER}${API_URL.BULK_CANCEL_ORDER_PROCESSING}`,
        data: data
    });
}
function* bulkCancelOrderProcessingAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(bulkCancelOrderProcessingApi, payload);
        if (response.status === 200) {
            toast.success(`${payload?.order_ids?.length} Orders cancelled successfully!`)
            yield put({ type: ORDERS_CANCEL_RES_DATA, payload: response?.status })
        }

    } catch (error) {
        customErrorFunction(error);
    }
}


export function* getBulkOrderActionWatcher() {
    yield takeLatest(BULK_ADD_ORDER_TAG_ACTION, bulkAddOrderTagAction);
    yield takeLatest(BULK_MARK_ORDER_VERIFY_ACTION, bulkMarkOrderVerifyAction);
    yield takeLatest(BULK_DELETE_ORDER_ACTION, bulkDeleteOrderAction);
    yield takeLatest(BULK_CANCEL_ORDER_ACTION, bulkCancelOrderAction);
    yield takeLatest(BULK_PICKUP_ADDRESS_UPDATE_ACTION, bulkPickupAddressUpdateAction);
    yield takeLatest(BULK_DIMESION_DETAILS_UPDATE_ACTION, bulkDimensionDetailUpdateAction);
    yield takeLatest(BULK_GENERATE_MENIFEST_ACTION, bulkGenerateManifestAction);
    yield takeLatest(BULK_ORDER_GENERATE_PICKUP_ACTION, bulkGeneratePickupAction);
    yield takeLatest(BULK_ORDER_GENERATE_LABEL_ACTION, bulkGenerateLabelAction);
    yield takeLatest(BULK_ORDER_GENERATE_INVOICE_ACTION, bulkGenerateInvoiceAction);
    yield takeLatest(BULK_ORDER_DOWNLOAD_MANIFEST_ACTION, bulkDownloadManifestAction);
    yield takeLatest(BULK_GET_DIMENSION_DETAILS_ACTION, bulkOrderDimensionAction);
    yield takeLatest(BULK_PROCESSING_ORDER_CANCEL_ACTION, bulkCancelOrderProcessingAction);

}
