import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "../../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_CORE } from "../../../../../axios/config";
import {  MANIFEST_LIST_API_ACTION, } from "../../../constant/orders";
import { MANIFEST_LIST_DATA,   } from "../../../../constants/orders";


const sellerData = Cookies.get("user_id")

async function orderManifestTabApi(data) {
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_CORE}${API_URL.MANIFEST_LIST_API}`,
    });
    return listData
}
function* orderManifestTabAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(orderManifestTabApi, payload);
        if (response.status === 200) {
            yield put({ type: MANIFEST_LIST_DATA, payload: response?.data?.results })
        }

    } catch (error) {
        toast.error("Api Call failed!")
    }
}



export function* orderManifestTabWatcher() {
    yield takeLatest(MANIFEST_LIST_API_ACTION, orderManifestTabAction);
  
}
