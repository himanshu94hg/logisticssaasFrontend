
import axios from "../../../../axios/index";
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_ORDER } from "../../../../axios/config";
import { GET_REPORT_SCHEDULER_DATA,  } from "../../../constants/tools";
import { POST_REPORT_SCHEDULER_RESPONSE, REPORT_SCHEDULER_DELETE_ACTION, REPORT_SCHEDULER_GET_ACTION, REPORT_SCHEDULER_POST_ACTION } from "../../constant/tools";
import { toast } from "react-toastify";


//GET REPORT SCHEDULER LIST API
async function getReportSchedulerAPI() {
    try {
        const response = await axios.get(`${BASE_URL_ORDER}${API_URL.GET_REPORT_SCHEDULER}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}
function* getReportSchedulerAction() {
    try {
        const response = yield call(getReportSchedulerAPI);
        yield put({ type: GET_REPORT_SCHEDULER_DATA, payload: response });
    } catch (error) {
        console.log(error)
    }
}

//CREATE REPORT SCHEDULER API
async function postReportSchedulerAPI(data) {
    try {
        const response = await axios.post(`${BASE_URL_ORDER}${API_URL.GET_REPORT_SCHEDULER}`, data);
        return response;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}
function* postReportSchedulerAction(action) {
    const { payload } = action;
    try {
        const response= yield call(postReportSchedulerAPI, payload);
        if (response.status === 201) {
            toast.success("Reports created successfully!")
            yield put({ type: POST_REPORT_SCHEDULER_RESPONSE, payload: response?.status});
            yield call(getReportSchedulerAction);
        }
    } catch (error) {
        console.log(error)
    }
}

//DELETE REPORT SCHEDULER API
async function deleteReportSchedulerAPI(data) {
    try {
        const response = await axios.delete(`${BASE_URL_ORDER}${API_URL.GET_REPORT_SCHEDULER}${data}`, );
         return response
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

function* deleteReportSchedulerAction(action) {
    const { payload } = action;
    try {
       const response= yield call(deleteReportSchedulerAPI, payload);
       if (response.status === 204) {
        toast.success("Reports Deleted successfully!")
        yield call(getReportSchedulerAction);
    }
    } catch (error) {
        console.log(error)
    }
}

export function* reportSchedulerWatcher() {
    yield takeLatest(REPORT_SCHEDULER_GET_ACTION, getReportSchedulerAction); 
    yield takeLatest(REPORT_SCHEDULER_POST_ACTION, postReportSchedulerAction); 
    yield takeLatest(REPORT_SCHEDULER_DELETE_ACTION, deleteReportSchedulerAction); 
}
