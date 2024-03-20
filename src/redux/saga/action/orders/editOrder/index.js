import { call, put, takeLatest } from "@redux-saga/core/effects";
import axios from "../../../../../axios/index"
import { toast } from "react-toastify";
import { API_URL, BASE_URL_ORDER } from "../../../../../axios/config";
import { ORDERS_DETAILS_GET_ACTION, ORDERS_DETAILS_UPDATE_ACTION } from "../../../constant/orders";
import { GET_ORDERS_DETAILS_DATA, ORDERS_DETAILS_RES_DATA } from "../../../../constants/orders";


// async function fetchOrderListDataApi(data) {
//     let listData = axios.request({
//         method: "GET",
//         url: `${BASE_URL_ORDER}${API_URL.ORDER_DETAILS_API}${data}/`,
//         data: data
//     });
//     return listData
// }
// function* fetchOrderListDataAction(action) {
//     let { payload } = action;
//     try {
//         let response = yield call(fetchOrderListDataApi, payload);
//         if (response.status === 200) {
//             yield put({ type: GET_ORDERS_DETAILS_DATA, payload: response?.data })
//         }

//     } catch (error) {
//     }
// }

async function getOrderDataAPI(data) {
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.ORDER_DETAILS_API}${data}/`,
        data: data
    });
    return listData
}
function* fetchOrderDataAction(action) {
    let { payload } = action;
    try {
        let response = yield call(getOrderDataAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_ORDERS_DETAILS_DATA, payload: response?.data })
        }

    } catch (error) {
    }
}

async function updateOrderApi(data) {
    console.log(data,"this is put data")
    let listData = axios.request({
        method: "PUT",
        url: `${BASE_URL_ORDER}${API_URL.ORDER_DETAILS_API}${data.orderId}/`,
        data: data.formData
    });
    return listData
}
function* updateOrderAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(updateOrderApi, payload);
        console.log(response,"this is reponse data")
        if (response.status === 200) {
            yield put({ type: ORDERS_DETAILS_RES_DATA, payload: response?.status })
            toast.success("Order update successfully")
        }

    } catch (error) {
        console.log(error?.response?.data?.detail, "this is oder id data")
        toast.error(`Please enter valid order id!`)
    }
}

export function* ordersTabWatcher() {
    // yield takeLatest(ORDERS_DETAILS_GET_ACTION, fetchOrderListDataAction);
    yield takeLatest(ORDERS_DETAILS_GET_ACTION, fetchOrderDataAction);
    yield takeLatest(ORDERS_DETAILS_UPDATE_ACTION, updateOrderAction);
}
