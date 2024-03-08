import axios from "../../../../axios/index"
import { GET_COURIER_SERVICE_ABILITY_ACTION, GET_SHIPEASE_SERVICE_ABILITY_ACTION, SERVICE_ABILITY_ACTION, SERVICE_ABILITY_ACTION_PAIR, SHIPEASE_SERVICE_ABILITY_ACTION } from "../../constant/tools";
import { call,put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_COURIER } from "../../../../axios/config";
import { GET_SERVICE_ABILITY_DATA, GET_SHIPEASE_SERVICE_PINCODE } from "../../../constants/tools";



//CHECK SERVICEABILITY SINGLE PINCODE SEARCH API
async function serviceAbilityAPI(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_COURIER}${API_URL.CHECK_SERVICE_ABILITY_PINCODE}?${queryParams}`,
    });
    return listData

}
function* serviceAbilityAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(serviceAbilityAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_SERVICE_ABILITY_DATA, payload: response?.data })
        }
    } catch (error) {
        if (reject) reject(error);
    }
}


//CHECK SERVICEABILITY PAIR PINCODE SEARCH API
async function serviceAbilityPairAPI(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_COURIER}${API_URL.CHECK_SERVICE_ABILITY_PINCODE_PAIR}?${queryParams}`,
    });
    return listData

}
function* serviceAbilityPairAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(serviceAbilityPairAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_SERVICE_ABILITY_DATA, payload: response?.data })
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

//GET COURIER SERVICEABILITY PINCODE API
async function serviceAbilityCourierAPI() {
    let listData = axios.request({
        method: "GET",
        // responseType: 'blob',
        url: `${BASE_URL_COURIER}${API_URL.GET_COURIER_SERVICEABILITY_PINCODE}`,
    });
    return listData
}
function* serviceAbilityCourierAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(serviceAbilityCourierAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_SHIPEASE_SERVICE_PINCODE, payload: response?.data })
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

//GET SHIPEASE SERVICEABILITY PINCODE API
async function serviceAbilityShipeaseAPI() {
    let listData = axios.request({
        method: "GET",
        responseType: 'blob',
        url: `${BASE_URL_COURIER}${API_URL.GET_SHIPEASE_SERVICEABILITY_PINCODE}`,
    });
    return listData
}
function* serviceAbilityShipeaseAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(serviceAbilityShipeaseAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_SHIPEASE_SERVICE_PINCODE, payload: response?.data })
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

export function* serviceAbilityWatcher() {
    yield takeLatest(SERVICE_ABILITY_ACTION, serviceAbilityAction);
    yield takeLatest(SERVICE_ABILITY_ACTION_PAIR, serviceAbilityPairAction);
    yield takeLatest(GET_COURIER_SERVICE_ABILITY_ACTION, serviceAbilityCourierAction);
    yield takeLatest(GET_SHIPEASE_SERVICE_ABILITY_ACTION, serviceAbilityShipeaseAction);
}
