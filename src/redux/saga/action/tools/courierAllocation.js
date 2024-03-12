import axios from "../../../../axios/index"
import { COURIER_ALLOCATION_ACTION,  } from "../../constant/tools";
import { call,  takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_CORE } from "../../../../axios/config";

async function courierAllocationAPI(data) {
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_CORE}${API_URL.GET_COURIER_ALLOCATION}`,
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

export function* courierAllocationWatcher() {
    yield takeLatest(COURIER_ALLOCATION_ACTION, courierAllocationAction);
}
