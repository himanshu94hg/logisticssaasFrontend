import axios from "../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_DUMMY } from "../../../../axios/config";
import { BILLING_DATA_ACTION } from "../../constant/billing";
import { GET_BILLING_DATA } from "../../../constants/billing";


async function billingFileAPI(data) {
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_DUMMY}${API_URL.GET_BILLING_URLW}`,
        data: data
    });
    return listData;
}

function* billingFilesAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(billingFileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_BILLING_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

export function* getBillingWatcher() {
    yield takeLatest(BILLING_DATA_ACTION,billingFilesAction);
}
