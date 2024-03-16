
import axios from "../../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { BASE_URL_ORDER, API_URL } from "../../../../../axios/config";
import { DASHBOARD_SHIPMENT_OFD_DATA_ACTION ,DASHBOARD_SHIPMENT_WEIGHT_PROFILE_ACTION,DASHBOARD_SHIPMENT_ZONEWISE_DATA_ACTION} from "../../../constant/dashboard/shipment";
import { GET_DASHBOARD_SHIPMENT_OFD_DATA, GET_DASHBOARD_SHIPMENT_WEIGHT_PROFILE_DATA, GET_DASHBOARD_SHIPMENT_ZONEWISE_DATA } from "../../../../constants/dashboard/shipment";


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
    let { payload, reject } = action;
    try {
        let response = yield call(weightProfileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_SHIPMENT_WEIGHT_PROFILE_DATA, payload: response?.data })
        }
    } catch (error) {
        if (reject) reject(error);
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
    let { payload, reject } = action;
    try {
        let response = yield call(ofdDataApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_SHIPMENT_OFD_DATA, payload: response?.data })
        }
    } catch (error) {
        if (reject) reject(error);
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
    let { payload, reject } = action;
    try {
        let response = yield call(zoneWiseDataApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_SHIPMENT_ZONEWISE_DATA, payload: response?.data })
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

export function* getShipmentTabWatcher() {
    yield takeLatest(DASHBOARD_SHIPMENT_WEIGHT_PROFILE_ACTION, weightProfileAction);
    yield takeLatest(DASHBOARD_SHIPMENT_OFD_DATA_ACTION, ofdDataAction);
    yield takeLatest(DASHBOARD_SHIPMENT_ZONEWISE_DATA_ACTION, zoneWiseDataAction);
  
}
