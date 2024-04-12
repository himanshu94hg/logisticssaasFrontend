import axios from "../../../../axios/index"
import {call, put, takeLatest} from "@redux-saga/core/effects";
import {API_URL, BASE_URL_CORE, } from "../../../../axios/config";
import { TICKET_ESCALATE_ACTION, UPDATE_TICKET_STATUS_ACTION } from "../../constant/customerSupport";
import { toast } from "react-toastify";
import { TICKET_UPDATE_DATA } from "../../../constants/customerSupport";

async function updateTicketAPI(data) {
    return axios.request({
        method: "PUT",
        url: `${BASE_URL_CORE}${API_URL.CUSTOMER_SUPPORT_STATUS_REOPEN_CLOSE}`,
        data: data
    });
}

function*  updateTicketStatusAction(action) {
    let { payload } = action;
    try {
        let response = yield call(updateTicketAPI, payload);
        if (response.status === 200) {
            toast.success(`Ticket ${payload?.status} successfully!`)
            yield put({ type: TICKET_UPDATE_DATA, payload: response?.status })
        }
        else {
        }
    } catch (error) {
        toast.error("Something went wrong!")
    }
}



async function updateTicketEscalateApi(data) {
    return axios.request({
        method: "PUT",
        url: `${BASE_URL_CORE}${API_URL.CUSTOMER_SUPPORT_STATUS_ESCALATE}`,
        data: data
    });
}

function*  updateTicketEscalateAction(action) {
    let { payload } = action;
    try {
        let response = yield call(updateTicketEscalateApi, payload);
        if (response.status === 200) {
            toast.success(`Ticket Escalate successfully!`)
            yield put({ type: TICKET_UPDATE_DATA, payload: response?.status })
        }
        else {
        }
    } catch (error) {
        toast.error("Something went wrong!")
    }
}

export function* getupdateTicketStatusWatcher() {
    yield takeLatest(UPDATE_TICKET_STATUS_ACTION, updateTicketStatusAction);
    yield takeLatest(TICKET_ESCALATE_ACTION, updateTicketEscalateAction);
}
