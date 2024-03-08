import Cookies from "js-cookie";
import axios from "../../../../axios/index"
import {  RATE_CARD_ACTION } from "../../constant/tools";
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_CORE } from "../../../../axios/config";
import {  GET_RATE_CARD_DATA } from "../../../constants/tools";



const sellerId=Cookies.get("user_id")

async function rateCardAPI(data) {
    let listData = axios.request({
        method: "GET",
        url:  `${BASE_URL_CORE}${API_URL.GET_RATE_CARD}`,
        // data: data
    });
    return listData

}

function* rateCardAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(rateCardAPI, payload);
        if (response.status === 200) {
         
            yield put({ type: GET_RATE_CARD_DATA, payload: response })

        }

        else {

        }
    } catch (error) {
        if (reject) reject(error);
    }
}

export function* rateCardWatcher() {
    yield takeLatest(RATE_CARD_ACTION, rateCardAction);
}
