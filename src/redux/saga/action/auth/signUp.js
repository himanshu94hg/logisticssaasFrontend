import axios from "../../../../axios/index"
import { SELLER_SIGNUP_ACTION } from "../../constant/auth";
import {call, put, takeLatest} from "@redux-saga/core/effects";
import {API_URL, BASE_URL_MOREON} from "../../../../axios/config";


async function signUpAPI(data) {
    console.log(data,"MoreOnOrder")
    return axios.request({
        method: "GET",
        url: `${BASE_URL_MOREON}${API_URL.GET_MOREONORDER_URL}${data}`,
        data: data
    });
}

function* signUpAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(signUpAPI, payload);
        if (response.status === 200) {
            // yield put({ type: GET_MOREONORDER_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

export function* getSignupWatcher() {
    yield takeLatest(SELLER_SIGNUP_ACTION,signUpAction);
}
