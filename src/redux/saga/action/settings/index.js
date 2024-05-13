import axios from "../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_CORE, BASE_URL_DUMMY } from "../../../../axios/config";
import { DELETE_WAREHOUSE_ACTION, EDIT_WAREHOUSE_ACTION, GET_WAREHOUSE_DETAILS_ACTION, MAKE_WAREHOUSE_DEFAULT_ACTION } from "../../constant/settings";
import { GET_DEFAULT_WAREHOUSE_UPDATE, GET_WAREHOUSE_DETAILS_DATA } from "../../../constants/settings";
import { toast } from "react-toastify";
import { customErrorFunction, errorHandleSecond, errorHandlefirst, errorinApi } from '../../../../customFunction/errorHandling';

// SETTINGS_MAKE_WAREHOUSE_DEFAULT_API
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
    } catch (error) {
       customErrorFunction(error)
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
    } catch (error) {
        customErrorFunction(error)
    }
}

// SETTINGS_GET_WAREHOUSE_DETAILS_API
async function warehouseDetailsApi(data) {
    console.log(data,"this is a code data")
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_CORE}${API_URL.SETTINGS_EDIT_WAREHOUSE_API}${data}/`,
        // data: data?.formData
    });
    return listData;
}

function* warehouseDetailsAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(warehouseDetailsApi, payload);
        if (response.status === 200) {
            // toast("Warehouse Edited successfully!")
            yield put({ type: GET_WAREHOUSE_DETAILS_DATA, payload: response?.data })
            
        }
    } catch (error) {
        customErrorFunction(error)
    }
}

// SETTINGS_EDIT_WAREHOUSE_API
async function editWarehouseApi(data) {
    let listData = axios.request({
        method: "PUT",
        url: `${BASE_URL_CORE}${API_URL.SETTINGS_EDIT_WAREHOUSE_API}${data?.wareHouseId}/`,
        data: data?.formData
    });
    return listData;
}

function* editWarehouseAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(editWarehouseApi, payload);
        if (response.status === 200) {
            toast.success("Warehouse Updated successfully!")
            yield put({ type: GET_DEFAULT_WAREHOUSE_UPDATE, payload: response?.status })
        }
    } catch (error) {
        customErrorFunction(error)
    }
}

export function* getSettingsWatcher() {
    yield takeLatest(MAKE_WAREHOUSE_DEFAULT_ACTION,makeWareHouseDefaultAction);
    yield takeLatest(DELETE_WAREHOUSE_ACTION,deleteWarehouseAction);
    yield takeLatest(GET_WAREHOUSE_DETAILS_ACTION,warehouseDetailsAction);
    yield takeLatest(EDIT_WAREHOUSE_ACTION,editWarehouseAction);
 
}
