import axios from "../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_ORDER } from "../../../../axios/config";
import { MIS_ACTIVITIES_LOG_ACTION, MIS_DOWNLOAD_ACTION, MIS_REPORT_BILLING_ACTION, MIS_REPORT_ORDERS_ACTION, MIS_REPORT_RETURNS_ACTION, MIS_REPORT_SHIPMENTS_ACTION, MIS_SCHEDULED_REPEORTS_ACTION } from "../../constant/mis";
import { ACTIVIES_LOG_DATA, GET_MIS_DOWNLOAD_DATA, GET_REPORTS_BILLING_DATA, GET_REPORTS_ORDERS_DATA, GET_REPORTS_RETURNS_DATA, GET_REPORTS_SHIPMENTS_DATA, GET_SCHEDULE_REPORTS_DATA } from "../../../constants/mis";

//MIS_DOWNLOAD_ACTION
async function misDownloadApi(data) {
    return axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.MIS_DOWNLOAD}`,
        data: data
    });
}
function* misDownloadAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(misDownloadApi, payload);
        console.log(response,"this is response dta")
        if (response.status === 200) {
            yield put({ type: GET_MIS_DOWNLOAD_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

//MIS_REPORT_BILLING_ACTION
async function misReportBillingApi(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');

    return axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.MIS_REPORT_BILLING}?${queryParams}`,
        data: data
    });
}
function* misReportBillingAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(misReportBillingApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_REPORTS_BILLING_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

//MIS_REPORT_ORDERS_ACTION
async function misReportsOrdersApi(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
     console.log(queryParams,"queryParams")
    return axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.MIS_REPORT_ORDERS}?${queryParams}`,
        data: data
    });
}
function* misReportsOrdersAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(misReportsOrdersApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_REPORTS_ORDERS_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

//MIS_REPORT_RETURNS_ACTION
async function misReportReturnsApi(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');

    return axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.MIS_REPORT_RETURNS}?${queryParams}`,
        data: data
    });
}
function* misReportReturnsAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(misReportReturnsApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_REPORTS_RETURNS_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

//MIS_REPORT_SHIPMENTS_ACTION
async function misReportsShipmentsApi(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    
    return axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.MIS_REPORT_SHIPMENTS}?${queryParams}`,
        data: data
    });
}
function* misReportsShipmentsAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(misReportsShipmentsApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_REPORTS_SHIPMENTS_DATA, payload: response?.data })

        }
        else {
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

// MIS_SCHEDULED_REPEORTS_ACTION
async function misScheduledReportsApi(data) {
    return axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.MIS_SCHEDULED_REPEORTS}?page_size=${data?.itemsPerPage}&page=${data?.currentPage}`,
        data: data
    });
}
function* misScheduledReportsAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(misScheduledReportsApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_SCHEDULE_REPORTS_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

//MIS_ACTIVITIES_LOG_ACTION
async function misActivitiesLogApi(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    return axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.MIS_ACTIVITIES_LOG}?${queryParams}`,
        data: data
    });
}
function* misActivitiesLogAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(misActivitiesLogApi, payload);
        if (response.status === 200) {
            yield put({ type: ACTIVIES_LOG_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

export function* getMisOrdersWatcher() {
    yield takeLatest(MIS_DOWNLOAD_ACTION, misDownloadAction);
    yield takeLatest(MIS_REPORT_BILLING_ACTION, misReportBillingAction);
    yield takeLatest(MIS_REPORT_ORDERS_ACTION, misReportsOrdersAction);
    yield takeLatest(MIS_REPORT_RETURNS_ACTION, misReportReturnsAction);
    yield takeLatest(MIS_REPORT_SHIPMENTS_ACTION, misReportsShipmentsAction);
    yield takeLatest(MIS_SCHEDULED_REPEORTS_ACTION, misScheduledReportsAction);
    yield takeLatest(MIS_ACTIVITIES_LOG_ACTION, misActivitiesLogAction);
}
