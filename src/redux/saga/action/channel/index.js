import axios from "../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_DUMMY } from "../../../../axios/config";
import { CHANNEL_SET_DATA_ACTION,CHANNEL_GET_DATA_ACTION } from "../../constant/channel";
import { SET_CHANNEL_DATA,GET_CHANNEL_DATA } from "../../../constants/channel";
import { customErrorFunction } from "../../../../customFunction/errorHandling";



async function channelSetFileAPI(data) {
    let listData = axios.request({
        method: "POST",
        url: `${BASE_URL_DUMMY}${API_URL.GET_CHANNEL_URL}`,
        data: data
    });
    return listData;
}

function* channelSetFilesAction(action) {
    let { payload } = action;
    try {
        let response = yield call(channelSetFileAPI, payload);
        if (response.status === 201) {
            yield put({ type: SET_CHANNEL_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        customErrorFunction(error);
    }
}

async function channelGetFileAPI(data) {
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_DUMMY}${API_URL.GET_CHANNEL_API_URL}`,
    });
    return listData;
}

function* channelGetFilesAction(action) {
    let { payload } = action;
    try {
        let response = yield call(channelGetFileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_CHANNEL_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        customErrorFunction(error);
    }
}



export function* getChannelWatcher() {
    yield takeLatest(CHANNEL_SET_DATA_ACTION,channelSetFilesAction);
    yield takeLatest(CHANNEL_GET_DATA_ACTION,channelGetFilesAction);
}
