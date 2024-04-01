import axios from "../../../../axios/index"
import {call, put, takeLatest} from "@redux-saga/core/effects";
import {API_URL, BASE_URL_MOREON} from "../../../../axios/config";
import {MOREONORDER_DATA_ACTION} from "../../constant/moreonorder";
import {GET_MOREONORDER_DATA} from "../../../constants/moreonorder";


async function moreonorderFileAPI(data) {
    console.log(data,"MoreOnOrder")
    return axios.request({
        method: "GET",
        url: `${BASE_URL_MOREON}${API_URL.GET_MOREONORDER_URL}${data}`,
        data: data
    });
}

function* moreonorderFilesAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(moreonorderFileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_MOREONORDER_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

export function* getmoreonorderWatcher() {
    yield takeLatest(MOREONORDER_DATA_ACTION,moreonorderFilesAction);
}
