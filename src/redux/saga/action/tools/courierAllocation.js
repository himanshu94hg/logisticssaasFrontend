import axios from "../../../../axios/index"
import { COURIER_ALLOCATION_ACTION,COURIER_ALLOCATION_PARTNER_ACTION,COURIER_ALLOCATION_PARTNER_POST_ACTION,COURIER_ALLOCATION_RULE_ACTION,COURIER_ALLOCATION_RULE_POST_ACTION,COURIER_ALLOCATION_RULE_DELETE_ACTION,COURIER_ALLOCATION_RULE_EDIT_ACTION,COURIER_ALLOCATION_RULE_EDIT_POST_ACTION,COURIER_ALLOCATION_RULE_STATUS_ACTION } from "../../constant/tools";
import { call,put,takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_CORE } from "../../../../axios/config";
import {GET_COURIER_ALLOCATION_DATA,GET_COURIER_ALLOCATION_POST_DATA,GET_COURIER_ALLOCATION_RULE_DATA,GET_COURIER_ALLOCATION_RULE_POST_DATA,GET_COURIER_ALLOCATION_RULE_DELETE_DATA,GET_COURIER_ALLOCATION_RULE_EDIT_DATA,GET_COURIER_ALLOCATION_RULE_EDIT_POST_DATA,GET_COURIER_ALLOCATION_RULE_STATUS_DATA} from "../../../constants/tools";
import { toast } from "react-toastify";

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
            toast.success("Rules Added successfully.");
        }
    } catch (error) {
        if (reject) reject(error);
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
        if (response) {
            yield put({ type: GET_COURIER_ALLOCATION_RULE_DELETE_DATA, payload: response });
            toast.success("Record deleted successfully");
        }
    } catch (error) {
        if (reject) reject(error);
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
        if (reject) reject(error);
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
        if (response) {
            yield put({ type: GET_COURIER_ALLOCATION_RULE_EDIT_POST_DATA, payload: response });
            toast.success("Record Updated successfully");
        }
        else
        {
            toast.error(response.message);
        }
    } catch (error) {
        toast.error(error.message);
        if (reject) reject(error);
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
        if (response) {
            yield put({ type: GET_COURIER_ALLOCATION_RULE_STATUS_DATA, payload: response });
            toast.success("Status Changed successfully");
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
    yield takeLatest(COURIER_ALLOCATION_RULE_DELETE_ACTION, courierAllocationRuleDeleteAction);
    yield takeLatest(COURIER_ALLOCATION_RULE_EDIT_ACTION, courierAllocationRuleEditAction);
    yield takeLatest(COURIER_ALLOCATION_RULE_EDIT_POST_ACTION, courierAllocationRuleEditPostAction);
    yield takeLatest(COURIER_ALLOCATION_RULE_STATUS_ACTION, courierAllocationRuleStatusAction);
}
