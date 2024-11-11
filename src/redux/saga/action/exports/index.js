import { toast } from "react-toastify";
import axios from "../../../../axios/index"
import { ERROR_RESPONSE_DATA } from "../../../constants/error";
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_CORE } from "../../../../axios/config";
import { customErrorFunction } from "../../../../customFunction/errorHandling";
import { EXPORT_DATA_ACTION, EXPORT_PASSBOOK_DATA_ACTION, EXPORT_SHIPPING_DATA_ACTION, EXPORT_RECHARGE_DATA_ACTION, EXPORT_INVOICE_DATA_ACTION, EXPORT_WEIGHT_DATA_ACTION, EXPORT_REMITANCE_DATA_ACTION, EXPORT_RECEIPT_DATA_ACTION, EXPORT_ALL_DATA_ACTION, EXPORT_SHIPMENT_DATA_ACTION, EXPORT_SHIPMENT_ALL_DATA_ACTION } from "../../constant/exports";
import { GET_EXPORT_DATA, GET_EXPORT_PASSBOOK_DATA, GET_EXPORT_SHIPPING_DATA, GET_EXPORT_RECHARGE_DATA, GET_EXPORT_INVOICE_DATA, GET_EXPORT_WEIGHT_DATA, GET_EXPORT_REMITANCE_DATA, GET_EXPORT_RECEIPT_DATA, GET_EXPORT_ALL_DATA, GET_EXPORT_SHIPMENT_DATA, GET_EXPORT_SHIPMENT_ALL_DATA } from "../../../constants/exports";



async function exportFileAPI(data) {
    let listData = axios.request({
        method: "POST",
        responseType: 'blob',
        url: `${BASE_URL_CORE}${API_URL.GET_EXPORT_URL}`,
        data: data
    });
    return listData;
}


function* exportFilesAction(action) {
    let { payload } = action;
    try {
        let response = yield call(exportFileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_EXPORT_DATA, payload: response?.data })
        }

    } catch (error) {
        customErrorFunction(error)
        yield put({ type: ERROR_RESPONSE_DATA, payload: error + new Date() })
    }
}

async function exportPassbookFileAPI(data) {
    let listData = axios.request({
        method: "POST",
        responseType: 'blob',
        url: `${BASE_URL_CORE}${API_URL.GET_EXPORT_PASSBOOK_URL}`,
        data: data
    });
    return listData;
}


function* exportPassbookFilesAction(action) {
    let { payload } = action;
    try {
        let response = yield call(exportPassbookFileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_EXPORT_PASSBOOK_DATA, payload: response?.data })
            toast.success("Data Export Successfully!");
        }
        else {
            toast.success("Go to MIS -> Download and download the Report");

        }

    } catch (error) {
        customErrorFunction(error)
    }
}

async function exportShippingFileAPI(data) {
    let listData = axios.request({
        method: "POST",
        responseType: 'blob',
        url: `${BASE_URL_CORE}${API_URL.GET_EXPORT_SHIPPING_URL}`,
        data: data
    });
    return listData;
}


function* exportShippingFilesAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(exportShippingFileAPI, payload);
        console.log(response, "response")
        if (response.status === 200) {
            yield put({ type: GET_EXPORT_SHIPPING_DATA, payload: response?.data })
            toast.success("Data Export Successfully!");
        }
        else {
            toast.success("Go to MIS -> Download and download the Report");
        }
    } catch (error) {
        customErrorFunction(error)
    }
}

async function exportRechargeFileAPI(data) {
    let listData = axios.request({
        method: "POST",
        responseType: 'blob',
        url: `${BASE_URL_CORE}${API_URL.GET_EXPORT_RECHARGE_URL}`,
        data: data
    });
    return listData;
}


function* exportRechargeFilesAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(exportRechargeFileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_EXPORT_RECHARGE_DATA, payload: response?.data })
            toast.success("Data Export Successfully!");
        }
        else {
        }
    } catch (error) {
        customErrorFunction(error)
    }
}

async function exportInvoiceFileAPI(data) {
    let listData = axios.request({
        method: "POST",
        responseType: 'blob',
        url: `${BASE_URL_CORE}${API_URL.GET_EXPORT_INVOICE_URL}`,
        data: data
    });
    return listData;
}


function* exportInvoiceFilesAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(exportInvoiceFileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_EXPORT_INVOICE_DATA, payload: response?.data })
            toast.success("Data Export Successfully!");
        }
        else {
        }
    } catch (error) {
        customErrorFunction(error)
    }
}

async function exportWeightFileAPI(data) {
    let listData = axios.request({
        method: "POST",
        responseType: 'blob',
        url: `${BASE_URL_CORE}${API_URL.GET_EXPORT_WEIGHT_URL}`,
        data: data
    });
    return listData;
}


function* exportWeightFilesAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(exportWeightFileAPI, payload);

        if (response.status === 200) {
            yield put({ type: GET_EXPORT_WEIGHT_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        customErrorFunction(error)
    }
}

async function exportRemitanceFileAPI(data) {
    let listData = axios.request({
        method: "GET",
        responseType: 'blob',
        url: `${BASE_URL_CORE}${API_URL.GET_EXPORT_REMITANCE_URL}`,
        data: data
    });
    return listData;
}


function* exportRemitanceFilesAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(exportRemitanceFileAPI, payload);

        if (response.status === 200) {
            yield put({ type: GET_EXPORT_REMITANCE_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        customErrorFunction(error)
    }
}

async function exportReceiptFileAPI(data) {
    let listData = axios.request({
        method: "GET",
        responseType: 'blob',
        url: `${BASE_URL_CORE}${API_URL.GET_EXPORT_RECEIPT_URL}`,
        data: data
    });
    return listData;
}


function* exportReceiptFilesAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(exportReceiptFileAPI, payload);
        if (response.status === 200) {
            toast.success("Data Export Successfully!");
            yield put({ type: GET_EXPORT_RECEIPT_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        customErrorFunction(error)
    }
}

async function exportAllFileAPI(data) {
    let listData = axios.request({
        method: "POST",
        url: `${BASE_URL_CORE}${API_URL.GET_EXPORT_ALL_URL}`,
        data: data
    });
    return listData;
}


function* exportAllFilesAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(exportAllFileAPI, payload);
        if (response.status === 200) {
            toast.success(response?.data?.message);
            yield put({ type: GET_EXPORT_ALL_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        customErrorFunction(error)
        yield put({ type: ERROR_RESPONSE_DATA, payload: error + new Date() })
    }
}

async function exportShipmentFileAPI(data) {
    let listData = axios.request({
        method: "POST",
        responseType: 'blob',
        url: `${BASE_URL_CORE}${API_URL.GET_EXPORT_SHIPMENT_URL}`,
        data: data
    });
    return listData;
}


function* exportShipmentFilesAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(exportShipmentFileAPI, payload);

        if (response.status === 200) {
            yield put({ type: GET_EXPORT_SHIPMENT_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        customErrorFunction(error)
    }
}

async function exportShipmentAllFileAPI(data) {
    let listData = axios.request({
        method: "POST",
        url: `${BASE_URL_CORE}${API_URL.GET_EXPORT_SHIPMENT_ALL_URL}`,
        data: data
    });
    return listData;
}


function* exportShipmentAllFilesAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(exportShipmentAllFileAPI, payload);
        if (response.status === 200) {
            toast.success(response?.data?.message);
            yield put({ type: GET_EXPORT_SHIPMENT_ALL_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        customErrorFunction(error)
    }
}




export function* getexportWatcher() {
    yield takeLatest(EXPORT_PASSBOOK_DATA_ACTION, exportPassbookFilesAction);
    yield takeLatest(EXPORT_SHIPPING_DATA_ACTION, exportShippingFilesAction);
    yield takeLatest(EXPORT_RECHARGE_DATA_ACTION, exportRechargeFilesAction);
    yield takeLatest(EXPORT_INVOICE_DATA_ACTION, exportInvoiceFilesAction);
    yield takeLatest(EXPORT_WEIGHT_DATA_ACTION, exportWeightFilesAction);
    yield takeLatest(EXPORT_REMITANCE_DATA_ACTION, exportRemitanceFilesAction);
    yield takeLatest(EXPORT_RECEIPT_DATA_ACTION, exportReceiptFilesAction);

    yield takeLatest(EXPORT_DATA_ACTION, exportFilesAction);
    yield takeLatest(EXPORT_ALL_DATA_ACTION, exportAllFilesAction);

    //shipment
    yield takeLatest(EXPORT_SHIPMENT_DATA_ACTION, exportShipmentFilesAction);
    yield takeLatest(EXPORT_SHIPMENT_ALL_DATA_ACTION, exportShipmentAllFilesAction);
}
