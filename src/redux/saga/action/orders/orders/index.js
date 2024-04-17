import { toast } from "react-toastify";
import axios from "../../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { API_URL, BASE_URL_ORDER } from "../../../../../axios/config";
import { GET_ORDERS_DETAILS_DATA, ORDERS_DETAILS_RES_DATA,BULK_SHIP_DATA, BULK_ORDERS_TAG_LIST_DATA, SAVE_FAV_LIST_DATA,ORDERS_DETAILS_CLONE_DATA, ORDERS_CLONE_RES_DATA } from "../../../../constants/orders";
import { ORDERS_DETAILS_GET_ACTION, ORDERS_DETAILS_UPDATE_ACTION, SAVE_FAVOURITE_ORDERS_ACTION,BULK_SHIP_ORDERS_ACTION, ORDERS_TAG_LIST_API_ACTION, GET_SAVE_FAVOURITE_ORDERS_ACTION,ORDERS_DETAILS_CLONE_ACTION, CREATE_ORDERS_TAG_ACTION } from "../../../constant/orders";

async function fetchOrderListDataApi(data) {
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.ORDER_DETAILS_API}${data}/`,
        data: data
    });
    return listData
}
function* fetchOrderListDataAction(action) {
    let { payload } = action;
    try {
        let response = yield call(fetchOrderListDataApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_ORDERS_DETAILS_DATA, payload: response?.data })
        }

    } catch (error) {
    }
}

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

//UPDATE_ORDERS_API
async function updateOrderApi(data) {
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
        console.log(response, "this is reponse data")
        if (response.status === 200) {
            yield put({ type: ORDERS_DETAILS_RES_DATA, payload: response?.status })
            toast.success("Order update successfully")
        }

    } catch (error) {
        console.log(error, "this is oder id data")
        toast.error(`Please enter valid order id!`)
    }
}

//SAVE_FAVOURITE_ORDERS_API
async function saveFavouriteOrderAPI(data) {
    return axios.request({
        method: "POST",
        url: `${BASE_URL_ORDER}${API_URL.SAVE_FAVOURITE_ORDERS_API}`,
        data: data
    });
}
function* saveFavouriteOrdersAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(saveFavouriteOrderAPI, payload);
        if (response.status === 201) {
            toast.success("Filter added successfully!")
        }

    } catch (error) {
        if (reject) reject(error);
    }
}


async function saveFavListApi(data) {
    return axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.SAVE_FAVOURITE_ORDERS_API}`,
        data: data
    });
}
function* saveFavListAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(saveFavListApi, payload);
        if (response.status === 200) {
            yield put({ type: SAVE_FAV_LIST_DATA, payload: response?.data })
        }

    } catch (error) {
        if (reject) reject(error);
    }
}

async function bulkShipOrderAPI(data) {
    return axios.request({
        method: "POST",
        url: `${BASE_URL_ORDER}${API_URL.BULK_SHIP_ORDERS_API}`,
        data: data
    });
}
function* bulkShipOrdersAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(bulkShipOrderAPI, payload);
        if (response.status === 200) {
            yield put({ type: BULK_SHIP_DATA, payload: response?.data })
        }

    } catch (error) {
        if (reject) reject(error);
    }
}

async function bulkGetOrdersTagApi(data) {
    return axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.ORDER_TAGS_LIST_API}`,
        data: data
    });
}
function* bulkGetOrdersTagAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(bulkGetOrdersTagApi, payload);
        if (response.status === 200) {

            yield put({ type: BULK_ORDERS_TAG_LIST_DATA, payload: response?.data })
        }

    } catch (error) {
        if (reject) reject(error);
    }
}


//CLONE_ORDERS_API
async function cloneOrderApi(data) {
    let listData = axios.request({
        method: "POST",
        url: `${BASE_URL_ORDER}${API_URL.ORDER_CLONE_API}`,
        data: data.formData
    });
    return listData
}
function* cloneOrderAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(cloneOrderApi, payload);
        if (response.status === 201) {
            yield put({ type: ORDERS_DETAILS_CLONE_DATA, payload: response?.status })
            yield put({ type: ORDERS_CLONE_RES_DATA, payload: response?.status })
            toast.success("Order Clone successfully")
        }

    } catch (error) {
        console.log(error, "this is oder id data")
        toast.error(`Please enter valid order id!`)
    }
}

async function createOrderTagApi(data) {
    let listData = axios.request({
        method: "POST",
        url: `${BASE_URL_ORDER}${API_URL.ORDER_TAG_CREATED_API}`,
        data: data
    });
    return listData
}
function* createOrderTagAction(action) {
    let { payload, } = action;
    try {
        let response = yield call(createOrderTagApi, payload);
        if (response.status === 201) {
            yield put({ type: ORDERS_TAG_LIST_API_ACTION })
            toast.success("Tag created successfully!")
        }

    } catch (error) {
        toast.error(error?.response?.data?.detail)
    }
}


export function* ordersTabWatcher() {
    // yield takeLatest(ORDERS_GET_ACTION, orderListDataAction);
    // yield takeLatest(ORDERS_DETAILS_GET_ACTION, fetchOrderListDataAction);
    yield takeLatest(ORDERS_DETAILS_GET_ACTION, fetchOrderDataAction);
    yield takeLatest(ORDERS_DETAILS_UPDATE_ACTION, updateOrderAction);
    yield takeLatest(SAVE_FAVOURITE_ORDERS_ACTION, saveFavouriteOrdersAction);
    yield takeLatest(BULK_SHIP_ORDERS_ACTION, bulkShipOrdersAction);
    yield takeLatest(ORDERS_TAG_LIST_API_ACTION, bulkGetOrdersTagAction);
    yield takeLatest(GET_SAVE_FAVOURITE_ORDERS_ACTION, saveFavListAction);
    yield takeLatest(ORDERS_DETAILS_CLONE_ACTION, cloneOrderAction);
    yield takeLatest(CREATE_ORDERS_TAG_ACTION, createOrderTagAction);

    

}
