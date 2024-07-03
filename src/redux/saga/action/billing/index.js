import axios from "../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_DUMMY,BASE_URL_BILLING } from "../../../../axios/config";
import { BILLING_DATA_ACTION,BILLING_SHIPING_DATA_ACTION,BILLING_SHIPING_REMITANCE_DATA_ACTION,BILLING_SHIPING_RECHARGE_DATA_ACTION,BILLING_SHIPING_INVOICE_DATA_ACTION,BILLING_SHIPING_RECEIPT_DATA_ACTION,BILLING_SHIPING_RECEIPT_EXPORT_DATA_ACTION,BILLING_SHIPING_REMITANCE_DOWNLOAD_DATA_ACTION,BILLING_PASSBOOK_COUNTER_DATA_ACTION,BILLING_RECHARGE_COUNTER_DATA_ACTION,BILLING_SHIPPING_COUNTER_DATA_ACTION,BILLING_REMITANCE_EXPORT_DATA_ACTION,BILLING_INVOICE_DOWNLOAD_DATA_ACTION } from "../../constant/billing";
import { GET_BILLING_DATA,GET_BILLING_SHIPING_DATA,GET_BILLING_SHIPING_REMITANCE_DATA,GET_BILLING_SHIPING_RECHARGE_DATA,GET_BILLING_SHIPING_INVOICE_DATA,GET_BILLING_SHIPING_RECEIPT_DATA,GET_BILLING_SHIPING_RECEIPT_EXPORT_DATA,GET_BILLING_SHIPING_REMITANCE_DOWNLOAD_DATA,GET_BILLING_PASSBOOK_COUNTER_DATA,GET_BILLING_RECHARGE_COUNTER_DATA,GET_BILLING_SHIPPING_COUNTER_DATA,GET_BILLING_REMITANCE_EXPORT_DATA,GET_BILLING_INVOICE_DOWNLOAD_DATA } from "../../../constants/billing";
import {toast} from "react-toastify";
import { customErrorFunction } from '../../../../customFunction/errorHandling';


async function billingFileAPI(data) {
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_DUMMY}${API_URL.GET_BILLING_URLW}?page_size=${data?.itemsPerPage}&page=${data?.currentPage}`,
        data: data
    });
    return listData;
}

async function billingShippingFileAPI(data) {
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_BILLING}${API_URL.GET_BILLING_SHIP_URL}?page_size=${data?.itemsPerPage}&page=${data?.currentPage}`,
        data: data
    });
    return listData;
}

async function billingShippingRemitanceFileAPI(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_BILLING}${API_URL.GET_BILLING_SHIPING_REMITANCE_URL}?${queryParams}`,
        data: data
    });
    return listData;
}

async function billingShippingRemitanceDownloadFileAPI(data) {
    let listData = axios.request({
        method: "GET",
        responseType: 'blob',
        url: `${BASE_URL_BILLING}${API_URL.GET_BILLING_SHIPING_REMITANCE_DOWNLOAD_URL}?transaction_id=${data}`,
        data: data
    });
    return listData;
}

async function billingShippingRechargeFileAPI(data) {
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_BILLING}${API_URL.GET_BILLING_RECHARGE_URL}?page_size=${data?.itemsPerPage}&page=${data?.currentPage}`,
        data: data
    });
    return listData;
}

async function billingShippingInvoiceFileAPI(data) {
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_BILLING}${API_URL.GET_BILLING_SHIPING_INVOICE_URL}?page_size=${data?.itemsPerPage}&page=${data?.currentPage}`,
        data: data
    });
    return listData;
}

async function billingShippingReceiptFileAPI(data) {
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_BILLING}${API_URL.GET_BILLING_CREDIT_URL}?page_size=${data?.itemsPerPage}&page=${data?.currentPage}`,
        data: data
    });
    return listData;
}

async function billingShippingReceiptExportFileAPI(data) {
    let listData = axios.request({
        method: "GET",
        responseType: 'blob',
        url: `${BASE_URL_BILLING}${API_URL.GET_BILLING_CREDIT_EXPORT_URL}?receipt_id=${data}`,
        data: data
    });
    return listData;
}

function* billingFilesAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(billingFileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_BILLING_DATA, payload: response?.data })
        }
    } catch (error) {
        customErrorFunction(error);
    }
}

function* billingShipingFilesAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(billingShippingFileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_BILLING_SHIPING_DATA, payload: response?.data })
        }
    } catch (error) {
        customErrorFunction(error);
    }
}

function* billingShipingRemitanceFilesAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(billingShippingRemitanceFileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_BILLING_SHIPING_REMITANCE_DATA, payload: response?.data })
        }
    } catch (error) {
        customErrorFunction(error);
    }
}

function* billingShipingRechargeFilesAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(billingShippingRechargeFileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_BILLING_SHIPING_RECHARGE_DATA, payload: response?.data })
        }
    } catch (error) {
        customErrorFunction(error);
    }
}

function* billingShipingInvoiceFilesAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(billingShippingInvoiceFileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_BILLING_SHIPING_INVOICE_DATA, payload: response?.data })
        }
    } catch (error) {
        customErrorFunction(error);
    }
}

function* billingShipingReceiptFilesAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(billingShippingReceiptFileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_BILLING_SHIPING_RECEIPT_DATA, payload: response?.data })
        }
        
    } catch (error) {
        customErrorFunction(error);
    }
}

function* billingShipingReceiptExportFilesAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(billingShippingReceiptExportFileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_BILLING_SHIPING_RECEIPT_EXPORT_DATA, payload: response?.data })
        }
    } catch (error) {
        customErrorFunction(error);
    }
}

function* billingShipingRemitanceDownloadFilesAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(billingShippingRemitanceDownloadFileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_BILLING_SHIPING_REMITANCE_DOWNLOAD_DATA, payload: response?.data })
            toast.success("Logs Export Successfully!");
        }
        else {
            toast.error("Failed to Export Sheet!");
        }
    } catch (error) {
        customErrorFunction(error);
    }
}

//counter
async function billingPassbookCounterFileAPI(data) {
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_BILLING}${API_URL.GET_BILLING_PASSBOOK_COUNTER_URL}`,
        data: data
    });
    return listData;
}

function* billingPassbookCounterFilesAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(billingPassbookCounterFileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_BILLING_PASSBOOK_COUNTER_DATA, payload: response?.data })
        }
    } catch (error) {
        customErrorFunction(error);
    }
}

async function billingRechargeCounterFileAPI(data) {
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_BILLING}${API_URL.GET_BILLING_RECHARGE_COUNTER_URL}`,
        data: data
    });
    return listData;
}

function* billingRechargeCounterFilesAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(billingRechargeCounterFileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_BILLING_RECHARGE_COUNTER_DATA, payload: response?.data })
        }
    } catch (error) {
        customErrorFunction(error);
    }
}

async function billingShippingCounterFileAPI(data) {
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_BILLING}${API_URL.GET_SHIPPING_COUNTER_URL}`,
        data: data
    });
    return listData;
}

function* billingShippingCounterFilesAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(billingShippingCounterFileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_BILLING_SHIPPING_COUNTER_DATA, payload: response?.data })
        }
    } catch (error) {
        customErrorFunction(error);
    }
}


async function billingRemitanceExportFileAPI(data) {
    let listData = axios.request({
        method: "POST",
        responseType: 'blob',
        url: `${BASE_URL_BILLING}${API_URL.GET_REMITANCE_EXPORT_URL}`,
        data: data
    });
    return listData;
}

function* billingRemitanceExportFilesAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(billingRemitanceExportFileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_BILLING_REMITANCE_EXPORT_DATA, payload: response?.data })
        }
    } catch (error) {
        customErrorFunction(error);
    }
}

async function billingInvoiceDownloadFileAPI(data) {
    let listData = axios.request({
        method: "GET",
        responseType: 'blob',
        url: `${BASE_URL_BILLING}${API_URL.GET_BILLING_INVOICE_DOWNLOAD_URL}?invoice_id=${data}`,
        // data: data
    });
    return listData;
}

function* billingInvoiceDownloadFilesAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(billingInvoiceDownloadFileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_BILLING_INVOICE_DOWNLOAD_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        customErrorFunction(error);
    }
}


export function* getBillingWatcher() {
    yield takeLatest(BILLING_DATA_ACTION,billingFilesAction);
    yield takeLatest(BILLING_SHIPING_DATA_ACTION,billingShipingFilesAction);
    yield takeLatest(BILLING_SHIPING_REMITANCE_DATA_ACTION,billingShipingRemitanceFilesAction);
    yield takeLatest(BILLING_SHIPING_REMITANCE_DOWNLOAD_DATA_ACTION,billingShipingRemitanceDownloadFilesAction);
    yield takeLatest(BILLING_SHIPING_RECHARGE_DATA_ACTION,billingShipingRechargeFilesAction);
    yield takeLatest(BILLING_SHIPING_INVOICE_DATA_ACTION,billingShipingInvoiceFilesAction);
    yield takeLatest(BILLING_SHIPING_RECEIPT_DATA_ACTION,billingShipingReceiptFilesAction);
    yield takeLatest(BILLING_SHIPING_RECEIPT_EXPORT_DATA_ACTION,billingShipingReceiptExportFilesAction);

    yield takeLatest(BILLING_PASSBOOK_COUNTER_DATA_ACTION,billingPassbookCounterFilesAction);
    yield takeLatest(BILLING_RECHARGE_COUNTER_DATA_ACTION,billingRechargeCounterFilesAction);
    yield takeLatest(BILLING_SHIPPING_COUNTER_DATA_ACTION,billingShippingCounterFilesAction);
    yield takeLatest(BILLING_REMITANCE_EXPORT_DATA_ACTION,billingRemitanceExportFilesAction);

    yield takeLatest(BILLING_INVOICE_DOWNLOAD_DATA_ACTION,billingInvoiceDownloadFilesAction);
}

