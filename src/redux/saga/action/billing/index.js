import axios from "../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_DUMMY,BASE_URL_BILLING } from "../../../../axios/config";
import { BILLING_DATA_ACTION,BILLING_SHIPING_DATA_ACTION,BILLING_SHIPING_REMITANCE_DATA_ACTION,BILLING_SHIPING_RECHARGE_DATA_ACTION,BILLING_SHIPING_INVOICE_DATA_ACTION,BILLING_SHIPING_RECEIPT_DATA_ACTION,BILLING_SHIPING_RECEIPT_EXPORT_DATA_ACTION,BILLING_SHIPING_REMITANCE_DOWNLOAD_DATA_ACTION } from "../../constant/billing";
import { GET_BILLING_DATA,GET_BILLING_SHIPING_DATA,GET_BILLING_SHIPING_REMITANCE_DATA,GET_BILLING_SHIPING_RECHARGE_DATA,GET_BILLING_SHIPING_INVOICE_DATA,GET_BILLING_SHIPING_RECEIPT_DATA,GET_BILLING_SHIPING_RECEIPT_EXPORT_DATA,GET_BILLING_SHIPING_REMITANCE_DOWNLOAD_DATA } from "../../../constants/billing";


async function billingFileAPI(data) {
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_DUMMY}${API_URL.GET_BILLING_URLW}`,
        data: data
    });
    return listData;
}

async function billingShippingFileAPI(data) {
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_BILLING}${API_URL.GET_BILLING_SHIP_URL}`,
        data: data
    });
    return listData;
}

async function billingShippingRemitanceFileAPI(data) {
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_BILLING}${API_URL.GET_BILLING_SHIPING_REMITANCE_URL}`,
        data: data
    });
    return listData;
}

async function billingShippingRemitanceDownloadFileAPI(data) {
    let listData = axios.request({
        method: "GET",
        responseType: 'blob',
        url: `${BASE_URL_BILLING}${API_URL.GET_BILLING_SHIPING_REMITANCE_DOWNLOAD_URL}`,
        data: data
    });
    return listData;
}

async function billingShippingRechargeFileAPI(data) {
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_BILLING}${API_URL.GET_BILLING_RECHARGE_URL}`,
        data: data
    });
    return listData;
}

async function billingShippingInvoiceFileAPI(data) {
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_BILLING}${API_URL.GET_BILLING_SHIPING_INVOICE_URL}`,
        data: data
    });
    return listData;
}

async function billingShippingReceiptFileAPI(data) {
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_BILLING}${API_URL.GET_BILLING_CREDIT_URL}`,
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
        else {
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

function* billingShipingFilesAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(billingShippingFileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_BILLING_SHIPING_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

function* billingShipingRemitanceFilesAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(billingShippingRemitanceFileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_BILLING_SHIPING_REMITANCE_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

function* billingShipingRechargeFilesAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(billingShippingRechargeFileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_BILLING_SHIPING_RECHARGE_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

function* billingShipingInvoiceFilesAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(billingShippingInvoiceFileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_BILLING_SHIPING_INVOICE_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

function* billingShipingReceiptFilesAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(billingShippingReceiptFileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_BILLING_SHIPING_RECEIPT_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

function* billingShipingReceiptExportFilesAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(billingShippingReceiptExportFileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_BILLING_SHIPING_RECEIPT_EXPORT_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

function* billingShipingRemitanceDownloadFilesAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(billingShippingRemitanceDownloadFileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_BILLING_SHIPING_REMITANCE_DOWNLOAD_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        if (reject) reject(error);
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
}
