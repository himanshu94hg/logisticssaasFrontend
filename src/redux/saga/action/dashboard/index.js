// <<<<<<< HEAD
// =======
// <<<<<<<< HEAD:src/redux/saga/dashboard/index.js
// >>>>>>> 3-orders-api-integration-Sanjeev
// import axios from "../../../../axios/index"
// import { call, takeLatest } from "@redux-saga/core/effects";
// import { API_URL, BASE_URL_CORE } from "../../../../axios/config";


// async function contactFileAPI(data) {
//     let listData = axios.request({
//         method: "GET",
//         url: `${BASE_URL_CORE}${API_URL.GET_USERS}`,
//         data: data
//     });
//     console.log("this is url endpint file action", listData);
//     return listData
// <<<<<<< HEAD
// =======
// ========
// import { call,  takeLatest } from "@redux-saga/core/effects";
// import { API_URL, BASE_URL } from "../../../../axios/config";
// import axios from "../../../../axios/index"
// import { USER_DATA_ACTION } from "../../constant";

// async function contactFileAPI(data) {

//         let listData= axios.request({
//             method: "GET",
//             url: `${BASE_URL}${API_URL.GET_USERS}`,
//             data: data
//           });
          
//           console.log("this is url endpint file action",listData);
//           return listData

// >>>>>>>> 3-orders-api-integration-Sanjeev:src/redux/saga/action/dashboard/index.js
// >>>>>>> 3-orders-api-integration-Sanjeev
// }

// function* conatctFilesAction(action) {
//     let { payload, reject } = action;
//     try {
//         let response = yield call(contactFileAPI, payload);
//         if (response.status === 200) {
//             // toast.success(response.data.message)
//             //   yield put({ type: CONTACT_DATA, payload: response?.data })
//         }
//         else {
//         }
//     } catch (error) {
//         if (reject) reject(error);
//     }
// }

// export function* contactFilesData() {
//     console.log("wactcher file action");
//     yield takeLatest(conatctFilesAction);
// }
