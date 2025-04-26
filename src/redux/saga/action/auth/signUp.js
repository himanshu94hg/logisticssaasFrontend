import { toast } from "react-toastify";
import axios from "../../../../axios/index"
import { SIGN_UP_DATA } from "../../../constants/auth";
import { SELLER_SIGNUP_ACTION } from "../../constant/auth";
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_CORE, } from "../../../../axios/config";
import { customErrorFunction } from "../../../../customFunction/errorHandling";


async function signUpAPI(data) {
    return axios.request({
        method: "POST",
        url: `${BASE_URL_CORE}${API_URL.POST_SELLER_SIGNUP}`,
        data: data
    });
}
function* signUpAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(signUpAPI, payload);
        if (response.status === 201) {
            toast.success("User Registered successfully")
            yield put({ type: SIGN_UP_DATA, payload: response?.status })
        }
        else {
        }
    } catch (error) {
        const data = error.response?.data;

        if (data) {
            const message = typeof data === "string"
                ? data
                : Object.values(data)[0]; // e.g. "Contact Number must be 10 digits."

            toast.error(Array.isArray(message) ? message[0] : message);
        } else {
            customErrorFunction(error);
        }
    }
}

export function* getSignupWatcher() {
    yield takeLatest(SELLER_SIGNUP_ACTION, signUpAction);
}
