import axios from "../../../../axios/index"
import {call, put, takeLatest} from "@redux-saga/core/effects";
import {API_URL, BASE_URL_CORE, } from "../../../../axios/config";
import { UPDATE_TICKET_STATUS_ACTION } from "../../constant/customerSupport";
import { toast } from "react-toastify";


async function updateTicketAPI(data,status) {

    console.log(data,status,"this is saga")

    return axios.request({
        method: "PUT",
        url: `${BASE_URL_CORE}${API_URL.GET_CUSTOMER_SUPPORT}${data}/`,
        data: status
    });
}

function*  updateTicketStatusAction(action) {
    let { payload, status } = action;
    console.log(action,"MoreOnOrder")
    try {
        let response = yield call(updateTicketAPI, payload,status);
        if (response.status === 200) {
            toast.success("Ticket closed successfully!")
        }
        else {
        }
    } catch (error) {
        toast.error("Something went wrong!")
    }
}

export function* getupdateTicketStatusWatcher() {
    console.log("MoreOnOrder");
    yield takeLatest(UPDATE_TICKET_STATUS_ACTION, updateTicketStatusAction);
}
