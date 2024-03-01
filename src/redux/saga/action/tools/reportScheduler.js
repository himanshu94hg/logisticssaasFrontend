
import axios from "../../../../axios/index";
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_ORDER } from "../../../../axios/config";
import { GET_REPORT_SCHEDULER_DATA,  } from "../../../constants/tools";
import { REPORT_SCHEDULER_DELETE_ACTION, REPORT_SCHEDULER_GET_ACTION, REPORT_SCHEDULER_POST_ACTION } from "../../constant/tools";

async function getReportSchedulerAPI() {
    try {
        const response = await axios.get(`${BASE_URL_ORDER}${API_URL.GET_REPORT_SCHEDULER}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

async function postReportSchedulerAPI(data) {
    try {
        const response = await axios.post(`${BASE_URL_ORDER}${API_URL.GET_REPORT_SCHEDULER}`, data);
        return response;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

async function deleteReportSchedulerAPI(data) {
    try {
        const response = await axios.delete(`${BASE_URL_ORDER}${API_URL.GET_REPORT_SCHEDULER}${data}`, );
        return response;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

function* getReportSchedulerAction() {
    try {
        const data = yield call(getReportSchedulerAPI);
        yield put({ type: GET_REPORT_SCHEDULER_DATA, payload: data });
    } catch (error) {
        console.log(error)
    }
}

function* postReportSchedulerAction(action) {
    const { payload } = action;
    try {
       const response= yield call(postReportSchedulerAPI, payload);
       if(response.status){
    
       }
       console.log(response,"this is post response")
    } catch (error) {
        console.log(error)
    }
}

function* deleteReportSchedulerAction(action) {
    const { payload } = action;
    try {
       const response= yield call(deleteReportSchedulerAPI, payload);
       if(response.status){
        getReportSchedulerAPI()
        
       }
       console.log(response,"this is post response")
    } catch (error) {
        console.log(error)
    }
}

export function* reportSchedulerWatcher() {
    yield takeLatest(REPORT_SCHEDULER_GET_ACTION, getReportSchedulerAction); 
    yield takeLatest(REPORT_SCHEDULER_POST_ACTION, postReportSchedulerAction); 
    yield takeLatest(REPORT_SCHEDULER_DELETE_ACTION, deleteReportSchedulerAction); 
}
