import axios from "../../../../axios/index"
import {call, put, takeLatest} from "@redux-saga/core/effects";
import {API_URL,  BASE_URL_ORDER} from "../../../../axios/config";
import {MOREONORDER_DATA_ACTION} from "../../constant/moreonorder";
import {GET_MOREONORDER_DATA} from "../../../constants/moreonorder";


async function moreonorderFileAPI(data) {
    return axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_MOREONORDER_URL}${data}`,
        data: data
    });
}

function* moreonorderFilesAction(action) {
    let { payload} = action;
    try {
        let response = yield call(moreonorderFileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_MOREONORDER_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
       customErrorFunction(error)
    }
}

export function* getmoreonorderWatcher() {
    yield takeLatest(MOREONORDER_DATA_ACTION,moreonorderFilesAction);
}
