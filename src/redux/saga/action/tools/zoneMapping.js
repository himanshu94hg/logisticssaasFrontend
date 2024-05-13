import axios from "../../../../axios/index"
import { ZONE_MAPPING_ACTION } from "../../constant/tools";
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_CORE, } from "../../../../axios/config";
import { GET_ZONE_MAPPING_DATA } from "../../../constants/tools";
import { toast } from "react-toastify";
import { customErrorFunction } from "../../../../customFunction/errorHandling";


async function zoneMappingAPI(data) {

    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_CORE}${API_URL.GET_ZONE_MAPPING}?pin_code=${data}`,
        // data: data
    });
    return listData

}

function* zoneMappingAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(zoneMappingAPI, payload);
        if (response.status === 200) {
            toast.success(response?.data?.detail)
            yield put({ type: GET_ZONE_MAPPING_DATA, payload: response?.data })
        }
    } catch (error) {
        customErrorFunction(error)
    }
}

export function* zoneMappingWatcher() {
    yield takeLatest(ZONE_MAPPING_ACTION, zoneMappingAction);
}
