import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_CORE } from "../../../axios/config";
import axios from "../../../axios/index"
import { GET_RATE_CALCULATOR } from "../constant/tools";
import Swal from 'sweetalert2'
import { GET_RATE_CALCULATOR_DATA } from "../../constants/tools";



async function rateCalcultorAPI(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');

    let listData = axios.request({
        method: "GET",
        url:  `${BASE_URL_CORE}${API_URL.GET_RATE_CALCULATOR}?${queryParams}`,
        data: data
    });
    return listData

}

function* rateCalculatorAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(rateCalcultorAPI, payload);
        if (response.status === 200) {
            Swal.fire({
                title: "Rate Calculated successfully",
                icon: "success"
            });
            yield put({ type: GET_RATE_CALCULATOR_DATA, payload: response })
        }
        else {

        }
    } catch (error) {
        if (reject) reject(error);
    }
}

export function* getRateCalculatorWatcher(data) {
    console.log("wactcher file action", data);
    yield takeLatest(GET_RATE_CALCULATOR, rateCalculatorAction);
}
