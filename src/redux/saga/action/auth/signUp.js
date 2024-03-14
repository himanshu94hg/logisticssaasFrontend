import axios from "../../../../axios/index"
import { SELLER_SIGNUP_ACTION } from "../../constant/auth";
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_CORE, } from "../../../../axios/config";
import { SIGN_UP_DATA } from "../../../constants/auth";
import { toast } from "react-toastify";


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
        console.log(error?.response?.data,"this is error handing data")
        {  
         
            Object.entries(error?.response?.data).map(([key, value]) => (
                <>
                    {toast.error(value[0])}
                </>
            ))
        }
    }
}

export function* getSignupWatcher() {
    yield takeLatest(SELLER_SIGNUP_ACTION, signUpAction);
}
