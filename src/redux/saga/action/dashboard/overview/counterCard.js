

import axios from "../../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { BASE_URL_ORDER, API_URL } from "../../../../../axios/config";
import { DASHBOARD_OVERVIEW_COUNTER_CARD_ACTION,  } from "../../../constant/dashboard/overview";
import { GET_DASHBOARD_OVERVIEW_COUNTER_CARD_DATA,  } from "../../../../constants/dashboard/overview";

async function counterCardAPI(data) {
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_OVERVIEW_COUNTER_CARD}`,
        // data: data
    });
    return listData
}
function* counterCardAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(counterCardAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_OVERVIEW_COUNTER_CARD_DATA, payload: response?.data })
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

export function* getCounterCardWatcher() {
    yield takeLatest(DASHBOARD_OVERVIEW_COUNTER_CARD_ACTION, counterCardAction);
}
