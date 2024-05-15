import axios from "../../../../axios/index"
import { COURIER_ALLOCATION_ACTION,COURIER_ALLOCATION_PARTNER_ACTION,COURIER_ALLOCATION_PARTNER_POST_ACTION,COURIER_ALLOCATION_RULE_ACTION,COURIER_ALLOCATION_RULE_POST_ACTION,COURIER_ALLOCATION_RULE_DELETE_ACTION,COURIER_ALLOCATION_RULE_EDIT_ACTION,COURIER_ALLOCATION_RULE_EDIT_POST_ACTION,COURIER_ALLOCATION_RULE_STATUS_ACTION,COURIER_PARTNER_ACTION } from "../../constant/tools";
import { call,put,takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_CORE } from "../../../../axios/config";
import {GET_COURIER_ALLOCATION_DATA,GET_COURIER_ALLOCATION_POST_DATA,GET_COURIER_ALLOCATION_RULE_DATA,GET_COURIER_ALLOCATION_RULE_POST_DATA,GET_COURIER_ALLOCATION_RULE_DELETE_DATA,GET_COURIER_ALLOCATION_RULE_EDIT_DATA,GET_COURIER_ALLOCATION_RULE_EDIT_POST_DATA,GET_COURIER_ALLOCATION_RULE_STATUS_DATA,GET_COURIER_PARTNER_DATA} from "../../../constants/tools";
import { toast } from "react-toastify";
import { customErrorFunction } from "../../../../customFunction/errorHandling";

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

    let listData = axios.request({
        method: "POST",
        url: `${BASE_URL_CORE}${API_URL.GET_COURIER_POST_ALLOCATION}`,
        data:data
    });
    return listData
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
        console.log(response,"this is api call")
        if (response) {
             toast.success("Set courier preference successfully!")
            yield put({ type: GET_COURIER_ALLOCATION_POST_DATA, payload: response });
        }
    } catch (error) {
       customErrorFunction(error)
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
        customErrorFunction(error)
    }
}

function courierAllocationRulePostAPI(data) {
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
        console.log("courierAllocationRulePostAction",response);
        if (response.status === 201) {
            yield put({ type: GET_COURIER_ALLOCATION_RULE_POST_DATA, payload: response });
            toast.success(response.data.message);
        }
    } catch (error) {
       customErrorFunction(error)
    }
}

async function courierAllocationRuleDeleteAPI(data) {
    let listData = axios.request({
        method: "DELETE",
        url: `${BASE_URL_CORE}${API_URL.GET_COURIER_ALLOCATION_RULE}${data}`,
        data
    });
    return listData
}

function* courierAllocationRuleDeleteAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(courierAllocationRuleDeleteAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_COURIER_ALLOCATION_RULE_DELETE_DATA, payload: response });
            toast.success(response.data.message);
        }
    } catch (error) {
       customErrorFunction(error)
    }
}

async function courierAllocationRuleEditAPI(data) {
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_CORE}${API_URL.GET_COURIER_ALLOCATION_RULE}${data}`,
        data:data
    });
    return listData
}

function* courierAllocationRuleEditAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(courierAllocationRuleEditAPI, payload);
        if (response) {
            yield put({ type: GET_COURIER_ALLOCATION_RULE_EDIT_DATA, payload: response });
        }
    } catch (error) {
        customErrorFunction(error)
    }
}

async function courierAllocationRuleEditPostAPI(data) {
    console.log("All Log Response Data",data.requestData);
    let listData = axios.request({
        method: "POST",
        url: `${BASE_URL_CORE}${API_URL.GET_COURIER_ALLOCATION_RULE}${data.id}/`,
        data:data.requestData
    });
    return listData
}

function* courierAllocationRuleEditPostAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(courierAllocationRuleEditPostAPI, payload);
        if (response.status === 201) {
            yield put({ type: GET_COURIER_ALLOCATION_RULE_EDIT_POST_DATA, payload: response });
            toast.success(response.data.message);
        }
    } catch (error) {
        customErrorFunction(error)
    }
}

async function courierAllocationRuleStatusAPI(data) {
    console.log("All Status Rules",data);
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_CORE}${API_URL.GET_COURIER_ALLOCATION_STATUS_RULE}?preference_id=${data?.id}&status=${data?.togglestatus}`,
        data:data
    });
    return listData
}

function* courierAllocationRuleStatusAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(courierAllocationRuleStatusAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_COURIER_ALLOCATION_RULE_STATUS_DATA, payload: response });
            toast.success(response.data.message);
        }
    } catch (error) {
        customErrorFunction(error)
    }
}

async function courierPartnerListAPI(data) {
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_CORE}${API_URL.GET_COURIER_PARTNER}`,
        data:data
    });
    return listData
}

function* courierPartnerListAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(courierPartnerListAPI, payload);
        if (response) {
            yield put({ type: GET_COURIER_PARTNER_DATA, payload: response });
        }
    } catch (error) {
        customErrorFunction(error)
    }
}

export function* courierAllocationWatcher() {
    yield takeLatest(COURIER_ALLOCATION_ACTION, courierAllocationAction);
    yield takeLatest(COURIER_ALLOCATION_PARTNER_ACTION, courierAllocationGetAction);
    yield takeLatest(COURIER_ALLOCATION_PARTNER_POST_ACTION, courierAllocationPostAction);
    yield takeLatest(COURIER_ALLOCATION_RULE_ACTION, courierAllocationRuleAction);
    yield takeLatest(COURIER_ALLOCATION_RULE_POST_ACTION, courierAllocationRulePostAction);
    yield takeLatest(COURIER_ALLOCATION_RULE_DELETE_ACTION, courierAllocationRuleDeleteAction);
    yield takeLatest(COURIER_ALLOCATION_RULE_EDIT_ACTION, courierAllocationRuleEditAction);
    yield takeLatest(COURIER_ALLOCATION_RULE_EDIT_POST_ACTION, courierAllocationRuleEditPostAction);
    yield takeLatest(COURIER_ALLOCATION_RULE_STATUS_ACTION, courierAllocationRuleStatusAction);

    yield takeLatest(COURIER_PARTNER_ACTION, courierPartnerListAction);
}
