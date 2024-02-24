import axios from "../../../../axios/index"
import {  REPORT_SCHEDULER_ACTION } from "../../constant/tools";
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_ORDER } from "../../../../axios/config";
import {  GET_REPORT_SCHEDULER_DATA } from "../../../constants/tools";

async function reportSchedulerAPI(data) {
    let listData = axios.request({
        method: "GET",
        url:  `${BASE_URL_ORDER}${API_URL.GET_REPORT_SCHEDULER}`,
        data: data
    });
    return listData
}

function* reportSchedulerAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(reportSchedulerAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_REPORT_SCHEDULER_DATA, payload: response })
        }
        else {

        }
    } catch (error) {
        if (reject) reject(error);
    }
}

export function* getReportSchedulerWatcher(data) {
    yield takeLatest(REPORT_SCHEDULER_ACTION, reportSchedulerAction);
}
