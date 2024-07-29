import axios from "../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { customErrorFunction } from '../../../../customFunction/errorHandling';
import { API_URL, BASE_URL_DUMMY, BASE_URL_ORDER, GET_WEIGHT } from "../../../../axios/config";
import { COURIER_WEIGHT_RECO_ACTION, WEIGHT_ACTION, HOLD_ACTION, SETTELED_ACTION, HISTORY_ACTION, ACCEPT_ACTION, COMMENT_ACTION, DISPUTE_ACTION } from "../../constant/weightReco";
import { GET_WEIGHT_RECO_DATA, GET_WEIGHT_DATA, GET_HOLD_DATA, GET_SETTELED_DATA, GET_HISTORY_DATA, GET_ACCEPT_DATA, GET_COMMENT_DATA, GET_DISPUTE_DATA } from "../../../constants/weightReco";

async function weightRecoApi(data) {
    let getData = axios.request({
        method: "GET",
        url: `https://fakestoreapi.com/products`,
    });
    return getData
}

function* weightRecoAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(weightRecoApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_WEIGHT_RECO_DATA, payload: response?.data })
        }
    } catch (error) {
        customErrorFunction(error);
    }
}

async function weightApi(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    let getData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_WEIGHT}?${queryParams}`,
    });
    return getData
}

function* weightAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(weightApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_WEIGHT_DATA, payload: response?.data })
        }
    } catch (error) {
        customErrorFunction(error);
    }
}

async function holdApi(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    let getData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_HOLD}?${queryParams}`,
    });
    return getData
}

function* holdAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(holdApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_HOLD_DATA, payload: response?.data })
        }
    } catch (error) {
        customErrorFunction(error);
    }
}

async function setteledApi(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    let getData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_SETTELED}?${queryParams}`,
    });
    return getData
}

function* setteledAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(setteledApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_SETTELED_DATA, payload: response?.data })
        }
    } catch (error) {
        customErrorFunction(error);
    }
}

async function historyApi(data) {
    let getData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_HISTORY}?weight_id=${data}`,
    });
    return getData
}

function* historyAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(historyApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_HISTORY_DATA, payload: response?.data })
        }
    } catch (error) {
        customErrorFunction(error);
    }
}

async function acceptApi(data) {
    let getData = axios.request({
        method: "POST",
        url: `${BASE_URL_ORDER}${API_URL.GET_ACCEPT}`,
        data
    });
    return getData
}

function* acceptAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(acceptApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_ACCEPT_DATA, payload: response?.data })
        }
    } catch (error) {
        customErrorFunction(error);
    }
}

async function commentApi(data) {
    let getData = axios.request({
        method: "POST",
        url: `${BASE_URL_ORDER}${API_URL.GET_COMMENT}`,
        data
    });
    return getData
}

function* commentAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(commentApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_COMMENT_DATA, payload: response?.data })
        }
    } catch (error) {
        customErrorFunction(error);
    }
}

async function disputeApi(data) {
    let getData = axios.request({
        method: "POST",
        url: `${BASE_URL_DUMMY}${API_URL.GET_DISPUTE}`,
        data
    });
    return getData
}

function* disputeAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(disputeApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_DISPUTE_DATA, payload: response?.data })
        }
    } catch (error) {
        customErrorFunction(error);
    }
}

export function* getWeightRecoWatcher() {
    yield takeLatest(COURIER_WEIGHT_RECO_ACTION, weightRecoAction);
    yield takeLatest(WEIGHT_ACTION, weightAction);
    yield takeLatest(HOLD_ACTION, holdAction);
    yield takeLatest(SETTELED_ACTION, setteledAction);
    yield takeLatest(HISTORY_ACTION, historyAction);
    yield takeLatest(ACCEPT_ACTION, acceptAction);
    yield takeLatest(COMMENT_ACTION, commentAction);
    yield takeLatest(DISPUTE_ACTION, disputeAction);
}
