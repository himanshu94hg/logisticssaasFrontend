import axios from "../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_DUMMY } from "../../../../axios/config";
import { SHIPMENT_DATA_ACTION } from "../../constant/shipment";
import { GET_SHIPMENT_DATA } from "../../../constants/shipment";



async function shipmentFileAPI(data) {
    console.log(data,"Shipment Data All")
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_DUMMY}${API_URL.GET_BILLING_URL}?action=${data}`,
        data: data
    });
    return listData;
}

function* shipmentFilesAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(shipmentFileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_SHIPMENT_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

export function* getshipmentWatcher() {
    yield takeLatest(SHIPMENT_DATA_ACTION,shipmentFilesAction);
}
