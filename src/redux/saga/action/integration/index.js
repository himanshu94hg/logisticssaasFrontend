import axios from "../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_CORE, } from "../../../../axios/config";
import { toast } from "react-toastify";
import { GENERATE_API_KEY_ACTION, GET_API_KEY_ACTION } from "../../constant/integration";
import { GET_API_KEY } from "../../../constants/integration";


async function postGenerateApiKeyApi(data) {
    return axios.request({
        method: "POST",
        url: `${BASE_URL_CORE}${API_URL.POST_GENERATE_API_KEY}`,
        data: data
    });
}
function* postGenerateApiKeyAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(postGenerateApiKeyApi, payload);
        if (response.status === 200) {
            toast.success("API key generated successfully")
            yield put({ type: GET_API_KEY_ACTION });
        }

    } catch (error) {
        toast.error("Something went wrong!")
    }
}


async function getApiKeyApi(data) {
    return axios.request({
        method: "GET",
        url: `${BASE_URL_CORE}${API_URL.POST_GENERATE_API_KEY}`,
        data: data
    });
}
function* getApiKeyAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(getApiKeyApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_API_KEY, payload: response?.data?.api_key })
        }

    } catch (error) {
        toast.error("Something went wrong!")
    }
}

export function* getIntegrationWatcher() {
    yield takeLatest(GENERATE_API_KEY_ACTION, postGenerateApiKeyAction);
    yield takeLatest(GET_API_KEY_ACTION, getApiKeyAction);
}
