

import axios from "../../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { BASE_URL_ORDER, API_URL } from "../../../../../axios/config";
import { DASHBOARD_OVERVIEW_REVENUE_CARD_ACTION, } from "../../../constant/dashboard/overview";
import { GET_DASHBOARD_OVERVIEW_REVENUE_CARD_DATA, } from "../../../../constants/dashboard/overview";
import { customErrorFunction } from "../../../../../customFunction/errorHandling";

async function revenueCardAPI(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');

    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_OVERVIEW_REVENUE_CARD}?${queryParams}`,
        // data: data
    });
    return listData
}
function* revenueCardAction(action) {
    let { payload} = action;
    try {
        let response = yield call(revenueCardAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_OVERVIEW_REVENUE_CARD_DATA, payload: response?.data })
        }
    } catch (error) {
       customErrorFunction(error)
    }
}

export function* getRevenueCardWatcher() {
    yield takeLatest(DASHBOARD_OVERVIEW_REVENUE_CARD_ACTION, revenueCardAction);
}
