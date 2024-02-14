import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL } from "../../axios/config";
import axios from "../../axios/index"
import { USER_DATA_ACTION } from "./constant";


async function contactFileAPI(data) {
    console.log(API_URL.GET_USERS, ">>>>", BASE_URL, "I AM BASE URL")
    return axios.request({
        method: "GET",
        headers: {},
        url:"https://jsonplaceholder.typicode.com/posts",   
        // url: `${BASE_URL} + ${API_URL.GET_USERS}`,
        data: data
    });
}

function* conatctFilesAction(action) {
    let { payload, reject } = action;

    try {
        let response = yield call(contactFileAPI, payload);

        if (response.status === 200) {

            // toast.success(response.data.message)

            //   yield put({ type: CONTACT_DATA, payload: response?.data })
        }

        else {


        }
    } catch (error) {
        if (reject) reject(error);
    }
}

export function* contactFilesData() {
    console.log("sagaa");
    yield takeLatest(USER_DATA_ACTION, conatctFilesAction);
}
