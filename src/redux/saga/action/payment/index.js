import axios from "../../../../axios/index"
import { CHECK_AUTH_DATA } from "../../../constants/auth";
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_CORE } from "../../../../axios/config";
import { customErrorFunction } from "../../../../customFunction/errorHandling";
import { GET_PAYMENT_DATA, SET_PAYMENT_DATA, GET_CONFIGURATION_DATA, GET_SELLER_PROFILE_DATA } from "../../../constants/payment";
import { PAYMENT_DATA_ACTION, PAYMENT_SET_DATA_ACTION, CONFIGURATION_DATA_ACTION, SELLER_PROFILE_DATA_ACTION } from "../../constant/payment";



async function paymentFileAPI(data) {
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_CORE}${API_URL.GET_PAYMENT_URL}`,

    });
    return listData;
}

async function paymentSetFileAPI(data) {
    let listData = axios.request({
        method: "POST",
        url: `${BASE_URL_CORE}${API_URL.GET_PAYMENT_URL}`,
        data: data
    });
    return listData;
}

async function configurationFileAPI(data) {
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_CORE}${API_URL.GET_CONFIGURATION_URL}`,

    });
    return listData;
}

async function profileFileAPI(data) {
    let url = `${BASE_URL_CORE}${API_URL.GET_PROFILE_URL}`;
    if (data) {
        url += `?subaccount=${data}`;
    }
    const response = await axios.request({
        method: "GET",
        url: url,
    });

    return response;

}

function* paymentFilesAction(action) {
    let { payload } = action;
    try {
        let response = yield call(paymentFileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_PAYMENT_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        customErrorFunction(error);
    }
}

function* paymentSetFilesAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(paymentSetFileAPI, payload);
        if (response.status === 200) {
            yield put({ type: SET_PAYMENT_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        customErrorFunction(error);
    }
}

function* configurationFilesAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(configurationFileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_CONFIGURATION_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        customErrorFunction(error);
    }
}

function* profileFilesAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(profileFileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_SELLER_PROFILE_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        customErrorFunction(error);
        if (error.response.data.code === "token_not_valid") {
            yield put({ type: CHECK_AUTH_DATA, payload: error.response.data.code })
        }
    }
}

export function* getpaymentWatcher() {
    yield takeLatest(PAYMENT_DATA_ACTION, paymentFilesAction);
    yield takeLatest(PAYMENT_SET_DATA_ACTION, paymentSetFilesAction);
    yield takeLatest(CONFIGURATION_DATA_ACTION, configurationFilesAction);
    yield takeLatest(SELLER_PROFILE_DATA_ACTION, profileFilesAction);
}
