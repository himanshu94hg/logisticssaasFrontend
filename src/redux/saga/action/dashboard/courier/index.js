

import axios from "../../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { BASE_URL_ORDER ,API_URL} from "../../../../../axios/config";
import { GET_DASHBOARD_COURIER_DATA } from "../../../../constants/dashboard/courier";
import { DASHBOARD_COURIER_ACTION } from "../../../constant/dashboard/courier";
import { customErrorFunction } from "../../../../../customFunction/errorHandling";


// GET_DASHBOARD_COURIER_DATA API 
async function courierDataAPI(data) {
    console.log(data,"this is courier action trigger")
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');

    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_COURIER_DATA}?${queryParams}`,
    });
    return listData
}
function* couriersAction(action) {
    let { payload,  } = action;

    try {
        let response = yield call(courierDataAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_COURIER_DATA, payload: response?.data })
        }
    } catch (error) {
        customErrorFunction(error);
    }
}

export function* getDashboardCouriersWatcher() {
    yield takeLatest(DASHBOARD_COURIER_ACTION, couriersAction);
}
