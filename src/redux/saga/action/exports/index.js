import axios from "../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_DUMMY } from "../../../../axios/config";
import { EXPORT_DATA_ACTION } from "../../constant/exports";
import { GET_EXPORT_DATA, } from "../../../constants/exports";



async function exportFileAPI(data) {
    console.log("All Export Data",data)
    let listData = axios.request({
        method: "POST",
        responseType: 'blob',
        url: `${BASE_URL_DUMMY}${API_URL.GET_EXPORT_URL}`,
        data: data
    });
    return listData;
}


function* exportFilesAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(exportFileAPI, payload);

        console.log(response,"All Blob Data ....")
        if (response.status === 200) {
            yield put({ type: GET_EXPORT_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        if (reject) reject(error);
    }
}


export function* getexportWatcher() {
    yield takeLatest(EXPORT_DATA_ACTION,exportFilesAction);
}
