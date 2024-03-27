import axios from "../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_DUMMY,GET_WEIGHT } from "../../../../axios/config";
import { COURIER_WEIGHT_RECO_ACTION,WEIGHT_ACTION,HOLD_ACTION,SETTELED_ACTION } from "../../constant/weightReco";
import { GET_WEIGHT_RECO_DATA,GET_WEIGHT_DATA,GET_HOLD_DATA,GET_SETTELED_DATA } from "../../../constants/weightReco";

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
        else {
        }
    } catch (error) {

    }
}

async function weightApi(data) {
    console.log(data)
    let getData = axios.request({
        method: "GET",
        url: `${BASE_URL_DUMMY}${API_URL.GET_WEIGHT}?page_size=${data?.itemsPerPage}&page=${data?.currentPage}`,
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
        else {
        }
    } catch (error) {

    }
}

async function holdApi(data) {
    let getData = axios.request({
        method: "GET",
        url: `${BASE_URL_DUMMY}${API_URL.GET_HOLD}?page_size=${data?.itemsPerPage}&page=${data?.currentPage}`,
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
        else {
        }
    } catch (error) {

    }
}

async function setteledApi(data) {
    let getData = axios.request({
        method: "GET",
        url: `${BASE_URL_DUMMY}${API_URL.GET_SETTELED}?page_size=${data?.itemsPerPage}&page=${data?.currentPage}`,
    });
    return getData
}

function* setteledAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(setteledApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_HOLD_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {

    }
}

export function* getWeightRecoWatcher() {
    yield takeLatest(COURIER_WEIGHT_RECO_ACTION, weightRecoAction);
    yield takeLatest(WEIGHT_ACTION, weightAction);
    yield takeLatest(HOLD_ACTION, holdAction);
    yield takeLatest(SETTELED_ACTION, setteledAction);
}
