import axios from "../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { COURIER_WEIGHT_RECO_ACTION } from "../../constant/weightReco";
import { GET_WEIGHT_RECO_DATA } from "../../../constants/weightReco";

async function weightRecoApi(data) {
    let getData = axios.request({
        method: "GET",
        url: `https://fakestoreapi.com/products`,
    });
    return getData
}

function* weightRecoAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(weightRecoApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_WEIGHT_RECO_DATA, payload: response?.data })
        }
        else {
        }
    } catch (error) {

    }
}

export function* getWeightRecoWatcher() {
    yield takeLatest(COURIER_WEIGHT_RECO_ACTION, weightRecoAction);
}
