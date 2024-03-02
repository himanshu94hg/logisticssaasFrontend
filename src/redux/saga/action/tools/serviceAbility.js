import axios from "../../../../axios/index"
import { SERVICE_ABILITY_ACTION } from "../../constant/tools";
import { call,put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_COURIER } from "../../../../axios/config";
import { GET_SERVICE_ABILITY_DATA } from "../../../constants/tools";


async function serviceAbilityAPI(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_COURIER}${API_URL.GET_SERVICE_ABILITY}?${queryParams}`,
        // data: data
    });
    return listData

}

function* serviceAbilityAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(serviceAbilityAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_SERVICE_ABILITY_DATA, payload: response?.data })
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

export function* serviceAbilityWatcher() {
    yield takeLatest(SERVICE_ABILITY_ACTION, serviceAbilityAction);
}
