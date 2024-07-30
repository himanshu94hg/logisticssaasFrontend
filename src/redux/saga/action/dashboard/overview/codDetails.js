

import axios from "../../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { BASE_URL_ORDER ,API_URL} from "../../../../../axios/config";
import { DASHBOARD_OVERVIEW_COD_DETAILS_ACTION, DASHBOARD_OVERVIEW_NDR_DETAILS_ACTION, DASHBOARD_OVERVIEW_RTO_DETAILS_ACTION,  } from "../../../constant/dashboard/overview";
import { GET_DASHBOARD_OVERVIEW_COD_DETAILS_DATA, GET_DASHBOARD_OVERVIEW_NDR_DETAILS_DATA, GET_DASHBOARD_OVERVIEW_RTO_DETAILS_DATA,  } from "../../../../constants/dashboard/overview";
import { customErrorFunction } from "../../../../../customFunction/errorHandling";


//NDR API 
async function ndrDetailsAPI(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');

    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_OVERVIEW_NDR_DETAILS}?${queryParams}`,
        // data: data
    });
    return listData
}
function* ndrDetailsAction(action) {
    let { payload} = action;
    try {
        let response = yield call(ndrDetailsAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_OVERVIEW_NDR_DETAILS_DATA, payload: response?.data })
        }
    } catch (error) {
       customErrorFunction(error)
    }
}

// COD API
async function codDetailsAPI(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');

    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_OVERVIEW_COD_DETAILS}?${queryParams}`,
        // data: data
    });
    return listData
}
function* codDetailsAction(action) {
    let { payload} = action;
    try {
        let response = yield call(codDetailsAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_OVERVIEW_COD_DETAILS_DATA, payload: response?.data })
        }
    } catch (error) {
       customErrorFunction(error)
    }
}

// RTO API
async function rtoDetailsAPI(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');

    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_OVERVIEW_RTO_DETAILS}?${queryParams}`,
        // data: data
    });
    return listData
}
function* rtoDetailsAction(action) {
    let { payload} = action;
    try {
        let response = yield call(rtoDetailsAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_OVERVIEW_RTO_DETAILS_DATA, payload: response?.data })
        }
    } catch (error) {
       customErrorFunction(error)
    }
}

export function* getCodDetailsWatcher() {
    yield takeLatest(DASHBOARD_OVERVIEW_NDR_DETAILS_ACTION, ndrDetailsAction);
    yield takeLatest(DASHBOARD_OVERVIEW_COD_DETAILS_ACTION, codDetailsAction);
    yield takeLatest(DASHBOARD_OVERVIEW_RTO_DETAILS_ACTION, rtoDetailsAction);
}
