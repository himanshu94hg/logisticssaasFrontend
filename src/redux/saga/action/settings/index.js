import axios from "../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_CORE, BASE_URL_DUMMY } from "../../../../axios/config";
import { DELETE_WAREHOUSE_ACTION, MAKE_WAREHOUSE_DEFAULT_ACTION } from "../../constant/settings";
import { GET_DEFAULT_WAREHOUSE_UPDATE } from "../../../constants/settings";
import { toast } from "react-toastify";

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
            yield put({ type: GET_DEFAULT_WAREHOUSE_UPDATE, payload: response?.status })
        }
        else {
        }
    } catch (error) {
        if (reject) reject(error);
    }
}


//SETTINGS_DELETE_WAREHOUSE_API
async function deleteWarehouseApi(data) {
    let listData = axios.request({
        method: "DELETE",
        url: `${BASE_URL_CORE}${API_URL.SETTINGS_DELETE_WAREHOUSE_API}${data}/`,
        //data: data
    });
    return listData;
}

function* deleteWarehouseAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(deleteWarehouseApi, payload);
        if (response.status === 204) {
            toast("Warehouse Deleted successfully!")
            yield put({ type: GET_DEFAULT_WAREHOUSE_UPDATE, payload: response?.status })
        }
        else {
        }
    } catch (error) {
        if (reject) reject(error);
    }
}


export function* getSettingsWatcher() {
    yield takeLatest(MAKE_WAREHOUSE_DEFAULT_ACTION,makeWareHouseDefaultAction);
    yield takeLatest(DELETE_WAREHOUSE_ACTION,deleteWarehouseAction);
 
}
