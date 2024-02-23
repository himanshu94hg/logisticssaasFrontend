import { BASE_URL_CORE } from "../../../../axios/config";
import axios from "../../../../axios/index"
import { USER_DATA_ACTION } from "../../constant";  
import { call, takeLatest } from "@redux-saga/core/effects";


async function contactFileAPI(data) {
        let listData= axios.request({
            method: "GET",
            url: `${BASE_URL_CORE}${BASE_URL_CORE.GET_USERS}`,
            data: data
          });
          return listData
}

function* conatctFilesAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(contactFileAPI, payload);
        if (response.status === 200) {
        }
        else {
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

export function* contactFilesData() {
    yield takeLatest(USER_DATA_ACTION, conatctFilesAction);
}
