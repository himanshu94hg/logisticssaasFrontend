

import axios from "../../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { BASE_URL_ORDER, API_URL } from "../../../../../axios/config";
import { DASHBOARD_ORDERS_BUYER_DEMOGRAPHIC_ACTION } from "../../../constant/dashboard/orders";
import { GET_DASHBOARD_ORDERS_BUYERDEMOGRAPHIC_DATA } from "../../../../constants/dashboard/orders";

async function ordersTabAPI(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_ORDERS_BUYERDEMOGRAPHIC}?${queryParams}`,
    });
    return listData
}
function* ordersTabAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(ordersTabAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_ORDERS_BUYERDEMOGRAPHIC_DATA, payload: response?.data?.data })
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

export function* getOrdersTabWatcher() {
    yield takeLatest(DASHBOARD_ORDERS_BUYER_DEMOGRAPHIC_ACTION, ordersTabAction);
}
