import { toast } from 'react-toastify';
import axios from "../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_CORE } from "../../../../axios/config";
import { customErrorFunction } from '../../../../customFunction/errorHandling';
import { REASSIGN_DATA_ACTION, REASSIGN_SHIP_DATA_ACTION } from "../../constant/moreorder";
import { GET_REASSIGN_DATA, GET_REASSIGN_SHIP_DATA, GET_REASSIGN_SHIP_DATA_STATUS } from "../../../constants/moreorder";
import { ERROR_RESPONSE_DATA } from '../../../constants/error';


async function moreorderFileAPI(data) {
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_CORE}${API_URL.GET_REASSIGN_URL}?order_id=${data}`,

    });
    return listData;
}

async function moreorderShipFileAPI(data) {
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_CORE}${API_URL.GET_REASSIGN_SHIP_URL}${data?.order_id}/?courier_partner=${data?.courier}`,
        data: data
    });
    return listData;
}

function* moreorderFilesAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(moreorderFileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_REASSIGN_DATA, payload: response?.data })
        }
    } catch (error) {
        customErrorFunction(error)
    }
}

function* moreorderShipFilesAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(moreorderShipFileAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_REASSIGN_SHIP_DATA, payload: response?.data });
            yield put({ type: GET_REASSIGN_SHIP_DATA_STATUS, payload: response?.status });
            toast.success("Order Reassigned successfully!");
        }
    } catch (error) {
        customErrorFunction(error)
        yield put({ type: ERROR_RESPONSE_DATA, payload: error + new Date() })
    }
}

export function* getmoreorderWatcher() {
    yield takeLatest(REASSIGN_DATA_ACTION, moreorderFilesAction);
    yield takeLatest(REASSIGN_SHIP_DATA_ACTION, moreorderShipFilesAction);
}
