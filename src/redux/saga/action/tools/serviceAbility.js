import { toast } from "react-toastify";
import axios from "../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_COURIER } from "../../../../axios/config";
import { GET_COURIER_PARTNER_NAME_DATA, GET_COURIER_SERVICEABLE_PINCODE_DATA, GET_SERVICE_ABILITY_DATA, GET_SHIPEASE_SERVICE_PINCODE } from "../../../constants/tools";
import { GET_COURIER_PATNER_NAME_ACTION, GET_COURIER_SERVICE_ABILITY_FILTER_ACTION, GET_SHIPEASE_SERVICE_ABILITY_ACTION, SERVICE_ABILITY_PAIR_ACTION, SERVICE_ABILITY_SINGLE_ACTION } from "../../constant/tools";

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

//CHECK SERVICEABILITY SINGLE PINCODE SEARCH API
async function serviceAbilityAPI(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_COURIER}${API_URL.CHECK_SERVICE_ABILITY_PINCODE}?${queryParams}`,
    });
    return listData

}
function* serviceAbilitySingleAction(action) {
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
            toast.success("File downloaded successfully!")
            yield put({ type: GET_SHIPEASE_SERVICE_PINCODE, payload: response?.data })
        }
    } catch (error) {
        if (reject) reject(error);
        toast.error("Something went wrong!")
    }
}

//GET COURIER PARTNER SERVICEABILITY PINCODE API
async function serviceAbilityCourierPartnerAPI() {
    console.log("object")
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_COURIER}${API_URL.GET_COURIER_PARTNER_NAME}`,
    });
    return listData
}
function* serviceAbilityCourierPartnernNameAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(serviceAbilityCourierPartnerAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_COURIER_PARTNER_NAME_DATA, payload: response?.data })
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

//GET COURIER PARTNER SERVICEABILITY FILTER PINCODE API
async function serviceAbilityCourierPartnerFilterAPI(data) {
    let listData = axios.request({
        method: "GET",
        responseType: 'blob',
        url: `${BASE_URL_COURIER}${API_URL.GET_COURIER_SERVICE_PINCODE}?partner_ids=${data}`,
    });
    return listData
}
function* serviceAbilityCourierPartnerFilterAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(serviceAbilityCourierPartnerFilterAPI, payload);
        console.log(response,"this is also a blob obj")
        if (response.status === 200) {
            toast.success("File downloaded successfully!")
            yield put({ type: GET_COURIER_SERVICEABLE_PINCODE_DATA, payload: response?.data })
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

export function* serviceAbilityWatcher() {
    yield takeLatest(SERVICE_ABILITY_PAIR_ACTION, serviceAbilityPairAction);
    yield takeLatest(SERVICE_ABILITY_SINGLE_ACTION, serviceAbilitySingleAction);
    yield takeLatest(GET_SHIPEASE_SERVICE_ABILITY_ACTION, serviceAbilityShipeaseAction);
    yield takeLatest(GET_COURIER_PATNER_NAME_ACTION, serviceAbilityCourierPartnernNameAction);
    yield takeLatest(GET_COURIER_SERVICE_ABILITY_FILTER_ACTION, serviceAbilityCourierPartnerFilterAction);
}
