import axios from "../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_CORE, BASE_URL_DUMMY } from "../../../../axios/config";
import { MAKE_WAREHOUSE_DEFAULT_ACTION } from "../../constant/settings";

async function makeWareHouseDefaultApi(data) {
    let listData = axios.request({
        method: "PUT",
        url: `${BASE_URL_CORE}${API_URL.SETTINGS_MAKE_WAREHOUSE_DEFAULT_API}${data}/`,
        //data: data
    });
    return listData;
}

function* makeWareHouseDefaultAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(makeWareHouseDefaultApi, payload);
        if (response.status === 200) {
            // yield put({ type: GET_CONFIGURATION_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        if (reject) reject(error);
    }
}


export function* getSettingsWatcher() {
    yield takeLatest(MAKE_WAREHOUSE_DEFAULT_ACTION,makeWareHouseDefaultAction);
 
}
