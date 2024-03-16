

import axios from "../../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { BASE_URL_ORDER, API_URL } from "../../../../../axios/config";
import { DASHBOARD_OVERVIEW_LAST_ORDERS_ACTION, DASHBOARD_OVERVIEW_STATEWISE_SPLIT_ACTION, DASHBOARD_OVERVIEW_TOPSELL_ACTION, } from "../../../constant/dashboard/overview";
import { GET_DASHBOARD_OVERVIEW_LAST_ORDERS_DATA, GET_DASHBOARD_OVERVIEW_STATEWISE_DATA, GET_DASHBOARD_OVERVIEW_TOPSELL_DATA, } from "../../../../constants/dashboard/overview";


//LAST ORDER API'S
async function lastOrderAPI(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');

    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_OVERVIEW_LAST_ORDERS}?${queryParams}`,
        // data: data
    });
    return listData
}
function* lastOrderAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(lastOrderAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_OVERVIEW_LAST_ORDERS_DATA, payload: response?.data?.orders })
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

//TOP SAIL PRODUCTS API'S
async function topSellApi(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_OVERVIEW_TOPSELL_CARD}?${queryParams}`,
        // data: data
    });
    return listData
}
function* topSellAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(topSellApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_OVERVIEW_TOPSELL_DATA, payload: response?.data })
        }
    } catch (error) {
        if (reject) reject(error);
    }
}



export function* getLastOrderWatcher() {
    yield takeLatest(DASHBOARD_OVERVIEW_LAST_ORDERS_ACTION, lastOrderAction);
    yield takeLatest(DASHBOARD_OVERVIEW_TOPSELL_ACTION, topSellAction);
}

