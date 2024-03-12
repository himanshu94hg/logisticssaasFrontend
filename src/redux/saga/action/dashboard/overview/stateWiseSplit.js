

import axios from "../../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { BASE_URL_ORDER, API_URL } from "../../../../../axios/config";
import { DASHBOARD_OVERVIEW_STATEWISE_SPLIT_ACTION, } from "../../../constant/dashboard/overview";
import { GET_DASHBOARD_OVERVIEW_STATEWISE_DATA, } from "../../../../constants/dashboard/overview";


//LAST ORDER API'S
async function splitWiseStateAPI(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');

    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_OVERVIEW_STATEWISE_SPLIT}?${queryParams}`,
        // data: data
    });
    return listData
}
function* splitWiseStateAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(splitWiseStateAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_OVERVIEW_STATEWISE_DATA, payload: response?.data })
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

export function* getSplitWiseStateWatcher() {
    yield takeLatest(DASHBOARD_OVERVIEW_STATEWISE_SPLIT_ACTION, splitWiseStateAction);
}