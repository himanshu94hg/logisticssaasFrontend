


import axios from "../../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { BASE_URL_ORDER ,API_URL} from "../../../../../axios/config";
import { DASHBOARD_OVERVIEW_SHIPMENTCARD_ACTION } from "../../../constant/dashboard/overview";
import { GET_DASHBOARD_OVERVIEW_SHIPMENTCARD_DATA } from "../../../../constants/dashboard/overview";
import { customErrorFunction } from "../../../../../customFunction/errorHandling";

async function shipmentCardAPI(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');

    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_OVERVIEW_SHIPMENT_CARD}?${queryParams}`,
        // data: data
    });
    return listData
}
function* shipmentCardAction(action) {
    let { payload} = action;
    try {
        let response = yield call(shipmentCardAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_OVERVIEW_SHIPMENTCARD_DATA, payload: response?.data })
        }
    } catch (error) {
       customErrorFunction(error)
    }
}

export function* getshipmentCardWatcher() {
    yield takeLatest(DASHBOARD_OVERVIEW_SHIPMENTCARD_ACTION, shipmentCardAction);
}
