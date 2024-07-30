import axios from "../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_DUMMY } from "../../../../axios/config";
import { SHIPMENT_DATA_ACTION,SHIPMENT_REATTEMPT_DATA_ACTION,SHIPMENT_RTO_DATA_ACTION } from "../../constant/shipment";
import { GET_SHIPMENT_DATA,GET_SHIPMENT_REATTEMPT_DATA,GET_SHIPMENT_RTO_DATA } from "../../../constants/shipment";
import { toast } from "react-toastify";
import { customErrorFunction } from '../../../../customFunction/errorHandling';


async function shipmentFileAPI(data) {
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_DUMMY}${API_URL.GET_BILLING_URL}?action=${data}`,
        data: data
    });
    return listData;
}

function* shipmentFilesAction(action) {
    let { payload} = action;
    try {
        let response = yield call(shipmentFileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_SHIPMENT_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
       customErrorFunction(error)
    }
}

async function shipmentReattemptFileAPI(data) {
    let listData = axios.request({
        method: "POST",
        url: `${BASE_URL_DUMMY}${API_URL.GET_SHIPMENT_REATTEMPT_URL}`,
        data: data
    });
    return listData;
}

function* shipmentReattemptFilesAction(action) {
    let { payload} = action;
    try {
        let response = yield call(shipmentReattemptFileAPI, payload);
        if (response.status === 200) {
            toast.success("Order Reattempt successfully")
            yield put({ type: GET_SHIPMENT_REATTEMPT_DATA, payload: response?.data })
        }
    } catch (error) {
        customErrorFunction(error);
    }
}

async function shipmentRtoFileAPI(data) {
    let listData = axios.request({
        method: "POST",
        url: `${BASE_URL_DUMMY}${API_URL.GET_SHIPMENT_RTO_URL}`,
        data: data
    });
    return listData;
}

function* shipmentRtoFilesAction(action) {
    let { payload} = action;
    try {
        let response = yield call(shipmentRtoFileAPI, payload);
        if (response.status === 200) {
            toast.success("Order RTO successfully")
            yield put({ type: GET_SHIPMENT_RTO_DATA, payload: response?.data })
        }
    } catch (error) {
        customErrorFunction(error);
    }
}

export function* getshipmentWatcher() {
    yield takeLatest(SHIPMENT_DATA_ACTION,shipmentFilesAction);
    yield takeLatest(SHIPMENT_REATTEMPT_DATA_ACTION,shipmentReattemptFilesAction);
    yield takeLatest(SHIPMENT_RTO_DATA_ACTION,shipmentRtoFilesAction);
}
