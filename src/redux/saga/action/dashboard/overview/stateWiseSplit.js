

import axios from "../../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { BASE_URL_ORDER, API_URL } from "../../../../../axios/config";
import {  DASHBOARD_OVERVIEW_COURIERWISE_ALLOCATION_ACTION, DASHBOARD_OVERVIEW_DELIVERY_PERFORMANCE_ACTION, DASHBOARD_OVERVIEW_MOSTPOPULAR_CUSTOMER_ACTION, DASHBOARD_OVERVIEW_STATEWISE_SPLIT_ACTION, DASHBOARD_OVERVIEW_WEIGHT_DISCREPANCIES_ACTION, } from "../../../constant/dashboard/overview";
import { GET_DASHBOARD_OVERVIEW_STATEWISE_DATA, } from "../../../../constants/dashboard/overview";

//LAST ORDER API'S
async function splitWiseStateAPI(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');

    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_OVERVIEW_STATEWISE_SPLIT}?${queryParams}`,
        // data: data
    });
    return listData
}
function* splitWiseStateAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(splitWiseStateAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_OVERVIEW_STATEWISE_DATA, payload: response?.data })
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

//GET_DASHBOARD_OVERVIEW_DELIVERY_PERFORMANCE API'S
async function deliveryPerformanceAPI(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');

    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_OVERVIEW_DELIVERY_PERFORMANCE}?${queryParams}`,
        data: data
    });
    return listData
}
function* deliveryPerformanceAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(deliveryPerformanceAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_OVERVIEW_STATEWISE_DATA, payload: response?.data })
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

// GET_DASHBOARD_OVERVIEW_COURIERISE_ALLOCATION API'S
async function courierwiseAllocationAPI(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');

    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_OVERVIEW_COURIERISE_ALLOCATION}?${queryParams}`,
        // data: data
    });
    return listData
}
function* courierwiseAllocationAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(courierwiseAllocationAPI, payload);
        if (response.status === 200) {
            // yield put({ type: GET_DASHBOARD_OVERVIEW_STATEWISE_DATA, payload: response?.data })
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

//GET_DASHBOARD_OVERVIEW_MOST_POPULAR CUSTOMER API'S
async function mostPopularCustomerAPI(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');

    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_OVERVIEW_MOST_POPULAR}?${queryParams}`,
        // data: data
    });
    return listData
}
function* mostPopularCustomerAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(mostPopularCustomerAPI, payload);
        if (response.status === 200) {
            // yield put({ type: GET_DASHBOARD_OVERVIEW_STATEWISE_DATA, payload: response?.data })
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

//GET_DASHBOARD_OVERVIEW_WEIGHT_DISCREPANCIES API'S
async function  weightDiscrepanciesAPI(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');

    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_OVERVIEW_WEIGHT_DISCREPANCIES}?${queryParams}`,
        // data: data
    });
    return listData
}
function*  weightDiscrepanciesAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call( weightDiscrepanciesAPI, payload);
        if (response.status === 200) {
            // yield put({ type: GET_DASHBOARD_OVERVIEW_STATEWISE_DATA, payload: response?.data })
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

export function* getSplitWiseStateWatcher() {
    yield takeLatest(DASHBOARD_OVERVIEW_STATEWISE_SPLIT_ACTION, splitWiseStateAction);
    yield takeLatest(DASHBOARD_OVERVIEW_DELIVERY_PERFORMANCE_ACTION, deliveryPerformanceAction);
    yield takeLatest(DASHBOARD_OVERVIEW_COURIERWISE_ALLOCATION_ACTION, courierwiseAllocationAction);
    yield takeLatest(DASHBOARD_OVERVIEW_MOSTPOPULAR_CUSTOMER_ACTION, mostPopularCustomerAction);
    yield takeLatest(DASHBOARD_OVERVIEW_WEIGHT_DISCREPANCIES_ACTION, weightDiscrepanciesAction);
}
