import axios from "../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_DUMMY } from "../../../../axios/config";
import { EXPORT_DATA_ACTION,EXPORT_PASSBOOK_DATA_ACTION,EXPORT_SHIPPING_DATA_ACTION,EXPORT_RECHARGE_DATA_ACTION,EXPORT_INVOICE_DATA_ACTION } from "../../constant/exports";
import { GET_EXPORT_DATA,GET_EXPORT_PASSBOOK_DATA,GET_EXPORT_SHIPPING_DATA,GET_EXPORT_RECHARGE_DATA,GET_EXPORT_INVOICE_DATA } from "../../../constants/exports";



async function exportFileAPI(data) {
    console.log("All Export Data",data)
    let listData = axios.request({
        method: "POST",
        responseType: 'blob',
        url: `${BASE_URL_DUMMY}${API_URL.GET_EXPORT_URL}`,
        data: data
    });
    return listData;
}


function* exportFilesAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(exportFileAPI, payload);

        console.log(response,"All Blob Data ....")
        if (response.status === 200) {
            yield put({ type: GET_EXPORT_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

async function exportPassbookFileAPI(data) {
    console.log("All Export Data",data)
    let listData = axios.request({
        method: "POST",
        responseType: 'blob',
        url: `${BASE_URL_DUMMY}${API_URL.GET_EXPORT_PASSBOOK_URL}`,
        data: data
    });
    return listData;
}


function* exportPassbookFilesAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(exportPassbookFileAPI, payload);

        console.log(response,"All Blob Data ....")
        if (response.status === 200) {
            yield put({ type: GET_EXPORT_PASSBOOK_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

async function exportShippingFileAPI(data) {
    console.log("All Export Data",data)
    let listData = axios.request({
        method: "POST",
        responseType: 'blob',
        url: `${BASE_URL_DUMMY}${API_URL.GET_EXPORT_SHIPPING_URL}`,
        data: data
    });
    return listData;
}


function* exportShippingFilesAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(exportShippingFileAPI, payload);

        console.log(response,"All Blob Data ....")
        if (response.status === 200) {
            yield put({ type: GET_EXPORT_SHIPPING_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

async function exportRechargeFileAPI(data) {
    console.log("All Export Data",data)
    let listData = axios.request({
        method: "POST",
        responseType: 'blob',
        url: `${BASE_URL_DUMMY}${API_URL.GET_EXPORT_RECHARGE_URL}`,
        data: data
    });
    return listData;
}


function* exportRechargeFilesAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(exportRechargeFileAPI, payload);

        console.log(response,"All Blob Data ....")
        if (response.status === 200) {
            yield put({ type: GET_EXPORT_RECHARGE_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

async function exportInvoiceFileAPI(data) {
    console.log("All Export Data",data)
    let listData = axios.request({
        method: "POST",
        responseType: 'blob',
        url: `${BASE_URL_DUMMY}${API_URL.GET_EXPORT_INVOICE_URL}`,
        data: data
    });
    return listData;
}


function* exportInvoiceFilesAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(exportInvoiceFileAPI, payload);

        console.log(response,"All Blob Data ....")
        if (response.status === 200) {
            yield put({ type: GET_EXPORT_INVOICE_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

export function* getexportWatcher() {
    yield takeLatest(EXPORT_DATA_ACTION,exportFilesAction);
    yield takeLatest(EXPORT_PASSBOOK_DATA_ACTION,exportPassbookFilesAction);
    yield takeLatest(EXPORT_SHIPPING_DATA_ACTION,exportShippingFilesAction);
    yield takeLatest(EXPORT_RECHARGE_DATA_ACTION,exportRechargeFilesAction);
    yield takeLatest(EXPORT_INVOICE_DATA_ACTION,exportInvoiceFilesAction);
}
