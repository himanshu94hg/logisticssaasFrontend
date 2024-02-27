import Cookies from "js-cookie";
import axios from "../../../../axios/index"
import { SERVICE_ABILITY_ACTION } from "../../constant/tools";
import { call, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_COURIER } from "../../../../axios/config";


async function serviceAbilityAPI(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
   console.log(queryParams,"this is a query data")
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
            // Swal.fire({
            //     title: "Rate Calculated successfully",
            //     icon: "success"
            // });
            // yield put({ type: GET_, payload: response })
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

export function* serviceAbilityWatcher() {
    yield takeLatest(SERVICE_ABILITY_ACTION, serviceAbilityAction);
}
