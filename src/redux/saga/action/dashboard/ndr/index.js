

import axios from "../../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { BASE_URL_ORDER, API_URL } from "../../../../../axios/config";
import { DASHBOARD_NDR_COUNTER_CARDS_ACTION, DASHBOARD_NDR_STATUS_ACTION, DASHBOARD_NDR_SUCCESS_BY_COURIER_ACTION, DASHBOARD_NDR_SUCCESS_BY_ZONE_ACTION } from "../../../constant/dashboard/ndr";
import { GET_DASHBOARD_NDR_COUNTER_CARDS_DATA, GET_DASHBOARD_NDR_STATUS_DATA, GET_DASHBOARD_NDR_SUCCESS_BY_COURIER_DATA, GET_DASHBOARD_NDR_SUCCESS_BY_ZONE_DATA } from "../../../../constants/dashboard/ndr";


// GET_DASHBOARD_NDR_COUNTER_CARDS API 
async function ndrCounterCardsApi(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_NDR_COUNTER_CARDS}?${queryParams}`,
    });
    return listData
}
function* ndrCounterCardsAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(ndrCounterCardsApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_NDR_COUNTER_CARDS_DATA, payload: response?.data })
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

// GET_DASHBOARD_NDR_NDR_STATUS API 
async function ndrStatusApi(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_NDR_NDR_STATUS}?${queryParams}`,
    });
    return listData
}
function* ndrStatusAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(ndrStatusApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_NDR_STATUS_DATA, payload: response?.data })
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

// GET_DASHBOARD_NDR_SUCCESS_BY_COURIER API 
async function ndrSuccessByCourierApi(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_NDR_SUCCESS_BY_COURIER}?${queryParams}`,
    });
    return listData
}
function* ndrSuccessByCourierAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(ndrSuccessByCourierApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_NDR_SUCCESS_BY_COURIER_DATA, payload: response?.data })
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

// GET_DASHBOARD_NDR_SUCCESS_BY_ZONE API 
async function ndrSuccessByZoneApi(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_NDR_SUCCESS_BY_ZONE}?${queryParams}`,
    });
    return listData
}
function* ndrSuccessByZoneAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(ndrSuccessByZoneApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_NDR_SUCCESS_BY_ZONE_DATA, payload: response?.data })
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

export function* getDashboardNdrWatcher() {
    yield takeLatest(DASHBOARD_NDR_COUNTER_CARDS_ACTION, ndrCounterCardsAction);
    yield takeLatest(DASHBOARD_NDR_STATUS_ACTION, ndrStatusAction);
    yield takeLatest(DASHBOARD_NDR_SUCCESS_BY_COURIER_ACTION, ndrSuccessByCourierAction);
    yield takeLatest(DASHBOARD_NDR_SUCCESS_BY_ZONE_ACTION, ndrSuccessByZoneAction);
}
