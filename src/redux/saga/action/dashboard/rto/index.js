

import axios from "../../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { BASE_URL_ORDER, API_URL } from "../../../../../axios/config";
import { DASHBOARD_RTO_COUNT_MONTHWISE_ACTION, DASHBOARD_RTO_TOP_CITY_ACTION, DASHBOARD_RTO_TOP_COURIER_ACTION, DASHBOARD_RTO_TOP_RTO_ACTION, DASHBOARD_RTO_STATUS_ACTION } from "../../../constant/dashboard/rto";
import { GET_DASHBOARD_RTO_COUNT_MONTH_DATA, GET_DASHBOARD_RTO_TOP_CITY_DATA, GET_DASHBOARD_RTO_TOP_COURIER_DATA, GET_DASHBOARD_RTO_TOP_DATA, GET_DASHBOARD_RTO_STATUS_DATA } from "../../../../constants/dashboard/rto";
import { customErrorFunction } from "../../../../../customFunction/errorHandling";

// GET_DASHBOARD_RTO_TOP_RTO
async function topRtoAPI(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_RTO_TOP_RTO}?${queryParams}`,
        // data: data
    });
    return listData
}
function* topRtoAction(action) {
    let { payload} = action;
    try {
        let response = yield call(topRtoAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_RTO_TOP_DATA, payload: response?.data })
        }
    } catch (error) {
       customErrorFunction(error)
    }
}


// GET_DASHBOARD_RTO_TOP_CITY
async function topRtoCityApi(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_RTO_TOP_CITY}?${queryParams}`,
        // data: data
    });
    return listData
}
function* topRtoCityAction(action) {
    let { payload} = action;
    try {
        let response = yield call(topRtoCityApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_RTO_TOP_CITY_DATA, payload: response?.data })
        }
    } catch (error) {
       customErrorFunction(error)
    }
}


// GET_DASHBOARD_RTO_COUNT_MONTHWISE
async function rtoCountMonthWiseApi(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_RTO_COUNT_MONTHWISE}?${queryParams}`,
        // data: data
    });
    return listData
}
function* rtoCountMonthWiseAction(action) {
    let { payload} = action;

    try {
        let response = yield call(rtoCountMonthWiseApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_RTO_COUNT_MONTH_DATA, payload: response?.data })
        }
    } catch (error) {
       customErrorFunction(error)
    }
}


//GET_DASHBOARD_RTO_TOP_COURIER
async function topRtoCourierApi(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_RTO_TOP_COURIER}?${queryParams}`,
        // data: data
    });
    return listData
}
function* topRtoCourierAction(action) {
    let { payload} = action;

    try {
        let response = yield call(topRtoCourierApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_RTO_TOP_COURIER_DATA, payload: response?.data })
        }
    } catch (error) {
       customErrorFunction(error)
    }
}

//GET_DASHBOARD_RTO_STATUS
async function rtoStatusApi(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_RTO_STATUS}?${queryParams}`,
        // data: data
    });
    return listData
}
function* rtoStatusAction(action) {
    let { payload} = action;

    try {
        let response = yield call(rtoStatusApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_RTO_STATUS_DATA, payload: response?.data })
        }
    } catch (error) {
       customErrorFunction(error)
    }
}


export function* getDashboardRtoWatcher() {
    yield takeLatest(DASHBOARD_RTO_TOP_RTO_ACTION, topRtoAction);
    yield takeLatest(DASHBOARD_RTO_TOP_CITY_ACTION, topRtoCityAction);
    yield takeLatest(DASHBOARD_RTO_COUNT_MONTHWISE_ACTION, rtoCountMonthWiseAction);
    yield takeLatest(DASHBOARD_RTO_TOP_COURIER_ACTION, topRtoCourierAction);
    yield takeLatest(DASHBOARD_RTO_STATUS_ACTION, rtoStatusAction);
}
