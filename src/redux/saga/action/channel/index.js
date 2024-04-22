import axios from "../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_DUMMY } from "../../../../axios/config";
import { CHANNEL_SET_DATA_ACTION } from "../../constant/channel";
import { SET_CHANNEL_DATA } from "../../../constants/channel";



async function channelSetFileAPI(data) {
    let listData = axios.request({
        method: "POST",
        url: `${BASE_URL_DUMMY}${API_URL.GET_CHANNEL_URL}`,
        data: data
    });
    return listData;
}

function* channelSetFilesAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(channelSetFileAPI, payload);
        if (response.status === 201) {
            yield put({ type: SET_CHANNEL_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        if (reject) reject(error);
    }
}


export function* getpaymentWatcher() {
    yield takeLatest(CHANNEL_SET_DATA_ACTION,channelSetFilesAction);
}
