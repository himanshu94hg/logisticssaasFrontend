
import axios from "../../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { BASE_URL_ORDER, API_URL } from "../../../../../axios/config";
import { DASHBOARD_SHIPMENT_OFD_DATA_ACTION ,DASHBOARD_SHIPMENT_WEIGHT_PROFILE_ACTION,DASHBOARD_SHIPMENT_ZONEWISE_DATA_ACTION,DASHBOARD_SHIPMENT_OVERVIEW_COURIER_DATA_ACTION, DASHBOARD_SHIPMENT_PERFORMANCE_METRIX_ACTION} from "../../../constant/dashboard/shipment";
import { GET_DASHBOARD_SHIPMENT_OFD_DATA, GET_DASHBOARD_SHIPMENT_WEIGHT_PROFILE_DATA, GET_DASHBOARD_SHIPMENT_ZONEWISE_DATA,GET_DASHBOARD_SHIPMENT_OVERVIEW_COURIER_DATA, GET_DASHBOARD_SHIPMENT_PERFORMANCE_METRIX_DATA} from "../../../../constants/dashboard/shipment";
import { customErrorFunction } from "../../../../../customFunction/errorHandling";


//1.GET_DASHBOARD_SHIPMENT_WEIGHT_PROFILE
async function weightProfileAPI(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_SHIPMENT_WEIGHT_PROFILE}?${queryParams}`,
    });
    return listData
}
function* weightProfileAction(action) {
    let { payload} = action;
    try {
        let response = yield call(weightProfileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_SHIPMENT_WEIGHT_PROFILE_DATA, payload: response?.data })
        }
    } catch (error) {
       customErrorFunction(error)
    }
}

//2.GET_DASHBOARD_SHIPMENT_OFD_DATA
async function ofdDataApi(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_SHIPMENT_OFD_DATA}?${queryParams}`,
    });
    return listData
}
function* ofdDataAction(action) {
    let { payload} = action;
    try {
        let response = yield call(ofdDataApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_SHIPMENT_OFD_DATA, payload: response?.data })
        }
    } catch (error) {
       customErrorFunction(error)
    }
}

//3.GET_DASHBOARD_SHIPMENT_OFD_DATA
async function zoneWiseDataApi(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_SHIPMENT_ZONE_WISE_DATA}?${queryParams}`,
    });
    return listData
}
function* zoneWiseDataAction(action) {
    let { payload} = action;
    try {
        let response = yield call(zoneWiseDataApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_SHIPMENT_ZONEWISE_DATA, payload: response?.data })
        }
    } catch (error) {
       customErrorFunction(error)
    }
}

//4.GET_DASHBOARD_SHIPMENT_OVERVIEW_COURIER
async function courierserviceDataApi(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_SHIPMENT_OVERVIEW_COURIER_DATA}?${queryParams}`,
    });
    return listData
}
function* courierserviceDataAction(action) {
    let { payload} = action;
    try {
        let response = yield call(courierserviceDataApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_SHIPMENT_OVERVIEW_COURIER_DATA, payload: response?.data })
        }
    } catch (error) {
       customErrorFunction(error)
    }
}

//5.GET_DASHBOARD_SHIPMENT_PERFORMANCE_METRIX
async function performanceMetrixApi(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_SHIPMENT_PERFORMANCE_METRIX}?${queryParams}`,
    });
    return listData
}
function* performanceMetrixAction(action) {
    let { payload} = action;
    try {
        let response = yield call(performanceMetrixApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_SHIPMENT_PERFORMANCE_METRIX_DATA, payload: response?.data })
        }
    } catch (error) {
       customErrorFunction(error)
    }
}

export function* getShipmentTabWatcher() {
    yield takeLatest(DASHBOARD_SHIPMENT_WEIGHT_PROFILE_ACTION, weightProfileAction);
    yield takeLatest(DASHBOARD_SHIPMENT_OFD_DATA_ACTION, ofdDataAction);
    yield takeLatest(DASHBOARD_SHIPMENT_ZONEWISE_DATA_ACTION, zoneWiseDataAction);
    yield takeLatest(DASHBOARD_SHIPMENT_OVERVIEW_COURIER_DATA_ACTION, courierserviceDataAction);
    yield takeLatest(DASHBOARD_SHIPMENT_PERFORMANCE_METRIX_ACTION, performanceMetrixAction);
  
}
