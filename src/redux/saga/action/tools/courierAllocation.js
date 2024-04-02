import axios from "../../../../axios/index"
import { COURIER_ALLOCATION_ACTION,COURIER_ALLOCATION_PARTNER_ACTION,COURIER_ALLOCATION_PARTNER_POST_ACTION,COURIER_ALLOCATION_RULE_ACTION,COURIER_ALLOCATION_RULE_POST_ACTION } from "../../constant/tools";
import { call,put,takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_CORE } from "../../../../axios/config";
import {GET_COURIER_ALLOCATION_DATA,GET_COURIER_ALLOCATION_POST_DATA,GET_COURIER_ALLOCATION_RULE_DATA,GET_COURIER_ALLOCATION_RULE_POST_DATA} from "../../../constants/tools";

async function courierAllocationAPI(data) {
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_CORE}${API_URL.GET_COURIER_ALLOCATION}`,
    });
    return listData
}

async function courierAllocationGetAPI(data) {
    let getData = axios.request({
        method: "GET",
        url: `${BASE_URL_CORE}${API_URL.GET_COURIER_ALLOCATION_PARTNER}`,
    });
    return getData
}

async function courierAllocationPostAPI(data) {
    console.log("GET_COURIER_POST_ALLOCATION ",data);
    try {
        const response = await axios.post(`${BASE_URL_CORE}${API_URL.GET_COURIER_POST_ALLOCATION}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

function* courierAllocationAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(courierAllocationAPI, payload);
        if (response.status === 200) {
            // yield put({ type: GET_RATE_CARD_DATA, payload: response })
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

function* courierAllocationGetAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(courierAllocationGetAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_COURIER_ALLOCATION_DATA, payload: response?.data })
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

function* courierAllocationPostAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(courierAllocationPostAPI, payload);
        if (response) {
            yield put({ type: GET_COURIER_ALLOCATION_POST_DATA, payload: response });
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

async function courierAllocationRuleAPI(data) {
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_CORE}${API_URL.GET_COURIER_ALLOCATION_RULE}`,
    });
    return listData
}

function* courierAllocationRuleAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(courierAllocationRuleAPI, payload);
        if (response) {
            yield put({ type: GET_COURIER_ALLOCATION_RULE_DATA, payload: response });
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

async function courierAllocationRulePostAPI(data) {
    let listData = axios.request({
        method: "POST",
        url: `${BASE_URL_CORE}${API_URL.GET_COURIER_ALLOCATION_RULE}`,
        data
    });
    return listData
}

function* courierAllocationRulePostAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(courierAllocationRulePostAPI, payload);
        if (response) {
            yield put({ type: GET_COURIER_ALLOCATION_RULE_POST_DATA, payload: response });
        }
    } catch (error) {
        if (reject) reject(error);
    }
}


export function* courierAllocationWatcher() {
    yield takeLatest(COURIER_ALLOCATION_ACTION, courierAllocationAction);
    yield takeLatest(COURIER_ALLOCATION_PARTNER_ACTION, courierAllocationGetAction);
    yield takeLatest(COURIER_ALLOCATION_PARTNER_POST_ACTION, courierAllocationPostAction);
    yield takeLatest(COURIER_ALLOCATION_RULE_ACTION, courierAllocationRuleAction);
    yield takeLatest(COURIER_ALLOCATION_RULE_POST_ACTION, courierAllocationRulePostAction);
}
