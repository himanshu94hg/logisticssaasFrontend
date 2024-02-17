import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL } from "../../../axios/config";
import axios from "../../../axios/index"
import { USER_DATA_ACTION } from "../constant";

const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA4NTk3MzUzLCJpYXQiOjE3MDc5OTI1NTMsImp0aSI6IjAwNWM3ZmIxMDQxZTQxYzc5NTRmNjAwYWQ0YzNiYjRiIiwidXNlcl9pZCI6Mn0.4CguGzX19NlJqf8763AepYZ7s9-ouL52isQzaiUS5nY"

async function contactFileAPI(data) {
    


        let listData= axios.request({
            method: "GET",
            url: `${BASE_URL}${API_URL.GET_USERS}`,
            data: data
          });
          
          console.log("this is url endpint file action",listData);
          return listData

}

function* conatctFilesAction(action) {
    let { payload, reject } = action;

    console.log("this is api call  file action");

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
    console.log("wactcher file action");
    yield takeLatest(USER_DATA_ACTION, conatctFilesAction);
}
