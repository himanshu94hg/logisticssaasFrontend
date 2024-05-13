import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_CORE, BASE_URL_ORDER } from "../../../../axios/config";
import axios from "../../../../axios/index"
import { RATE_CALCULATOR_ACTION, RATE_CALCULATOR_ACTION_ORDER_ID } from "../../constant/tools";
import { GET_RATE_CALCULATOR_DATA, RATE_CALCULATOR_PREFILLED_DATA } from "../../../constants/tools";
import { toast } from "react-toastify";
import { customErrorFunction } from "../../../../customFunction/errorHandling";



async function rateCalcultorAPI(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');

    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_CORE}${API_URL.GET_RATE_CALCULATOR}?${queryParams}`,
        data: data
    });
    return listData
}

async function rateCalcultorAPIOrderId(data) {
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_RATE_THROUGH_ORDERID}${data}/`,
        data: data
    });
    return listData
}

function* rateCalculatorAction(action) {
    let { payload } = action;
    try {
        let response = yield call(rateCalcultorAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_RATE_CALCULATOR_DATA, payload: response })
        }

    } catch (error) {
        customErrorFunction(error)
    }
}

function* rateCalculatorActionByOrderId(action) {
    let { payload, } = action;
    try {
        let response = yield call(rateCalcultorAPIOrderId, payload);
        if (response.status === 200) {
            yield put({ type: RATE_CALCULATOR_PREFILLED_DATA, payload: response?.data })
        }

    } catch (error) {
        customErrorFunction(error);
    }
}

export function* rateCalculatorWatcher() {
    yield takeLatest(RATE_CALCULATOR_ACTION, rateCalculatorAction);
    yield takeLatest(RATE_CALCULATOR_ACTION_ORDER_ID, rateCalculatorActionByOrderId);
}
