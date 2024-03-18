

import axios from "../../../../../axios/index"
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { BASE_URL_ORDER, API_URL } from "../../../../../axios/config";
import { DASHBOARD_ORDERS_ASSIGNED_PICKED_ACTION, DASHBOARD_ORDERS_BUYER_DEMOGRAPHIC_ACTION, DASHBOARD_ORDERS_CANCELLED_ACTION, DASHBOARD_ORDERS_COUNT_ACTION, DASHBOARD_ORDERS_INTVSDOM_ACTION, DASHBOARD_ORDERS_MPS_ACTION, DASHBOARD_ORDERS_POPULAR_LOCATION_ACTION, DASHBOARD_ORDERS_PREPAID_COD_ACTION, DASHBOARD_ORDERS_SKU_PROJECT_ACTION, DASHBOARD_ORDERS_STORE_BASED_ACTION, DASHBOARD_ORDERS_WAREHOUSE_INFO_ACTION } from "../../../constant/dashboard/orders";
import { GET_DASHBOARD_ORDERS_ASSIGNED_PICKED_DATA, GET_DASHBOARD_ORDERS_BUYERDEMOGRAPHIC_DATA, GET_DASHBOARD_ORDERS_CANCELLED_DATA, GET_DASHBOARD_ORDERS_COUNT_DATA, GET_DASHBOARD_ORDERS_INTVSDOM_DATA, GET_DASHBOARD_ORDERS_MPS_DATA, GET_DASHBOARD_ORDERS_POPULAR_LOCATION_DATA, GET_DASHBOARD_ORDERS_PREPAID_COD_DATA, GET_DASHBOARD_ORDERS_SKU_PROJECT_DATA, GET_DASHBOARD_ORDERS_STORE_BASED_DATA, GET_DASHBOARD_ORDERS_WAREHOUSE_INFO_DATA } from "../../../../constants/dashboard/orders";


//1.GET_DASHBOARD_ORDERS_STORE_BASED
async function ordersStoreBasedAPI(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_ORDERS_STORE_BASED}?${queryParams}`,
    });
    return listData
}
function* ordersStoreBasedAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(ordersStoreBasedAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_ORDERS_STORE_BASED_DATA, payload: response?.data })
        }
    } catch (error) {
        if (reject) reject(error);
    }
}


//2. GET_DASHBOARD_ORDERS_COUNT
async function ordersCountAPI(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_ORDERS_COUNT}?${queryParams}`,
    });
    return listData
}
function* ordersCountAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(ordersCountAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_ORDERS_COUNT_DATA, payload: response?.data })
        }
    } catch (error) {
        if (reject) reject(error);
    }
}


//3. GET_DASHBOARD_ORDERS_CANCELLED_ORDERS
async function ordersCancelledAPI(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_ORDERS_CANCELLED_ORDERS}?${queryParams}`,
    });
    return listData
}
function* ordersCancelledAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(ordersCancelledAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_ORDERS_CANCELLED_DATA, payload: response?.data })
        }
    } catch (error) {
        if (reject) reject(error);
    }
}


//4. GET_DASHBOARD_ORDERS_MPS_ORDER
async function ordersMpsAPI(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_ORDERS_MPS_ORDER}?${queryParams}`,
    });
    return listData
}
function* ordersMpsAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(ordersMpsAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_ORDERS_MPS_DATA, payload: response?.data })
        }
    } catch (error) {
        if (reject) reject(error);
    }
}


//5.GET_DASHBOARD_ORDERS_ASSIGNED_PICKED_ORDER
async function  assignedPickedAPI(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_ORDERS_ASSIGNED_PICKED_ORDER}?${queryParams}`,
    });
    return listData
}
function* assignedPickedAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call( assignedPickedAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_ORDERS_ASSIGNED_PICKED_DATA, payload: response?.data })
        }
    } catch (error) {
        if (reject) reject(error);
    }
}


//6. GET_DASHBOARD_ORDERS_BUYERDEMOGRAPHIC
async function ordersBuyerDemoAPI(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_ORDERS_BUYERDEMOGRAPHIC}?${queryParams}`,
    });
    return listData
}
function* ordersBuyerDemoAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(ordersBuyerDemoAPI, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_ORDERS_BUYERDEMOGRAPHIC_DATA, payload: response?.data?.data })
        }
    } catch (error) {
        if (reject) reject(error);
    }
}


//7. GET_DASHBOARD_ORDERS_PREPAID_COD_COUNTER
async function prepaidCodApi(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_ORDERS_PREPAID_COD_COUNTER}?${queryParams}`,
    });
    return listData
}
function* prepaidCodAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(prepaidCodApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_ORDERS_PREPAID_COD_DATA, payload: response?.data })
        }
    } catch (error) {
        if (reject) reject(error);
    }
}


//8. GET_DASHBOARD_ORDERS_PREPAID_COD_COUNTER
async function wareHouseInfoApi(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_ORDERS_WAREHOUSE_INFN}?${queryParams}`,
    });
    return listData
}
function* wareHouseInfoAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(wareHouseInfoApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_ORDERS_WAREHOUSE_INFO_DATA, payload: response?.data })
        }
    } catch (error) {
        if (reject) reject(error);
    }
}


//9. GET_DASHBOARD_ORDERS_BEST_SKU_PROJECT
async function skuProductApi(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_ORDERS_BEST_SKU_PROJECT}?${queryParams}`,
    });
    return listData
}
function* skuProductAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(skuProductApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_ORDERS_SKU_PROJECT_DATA, payload: response?.data })
        }
    } catch (error) {
        if (reject) reject(error);
    }
}


//10. GET_DASHBOARD_ORDERS_BEST_SKU_PROJECT
async function orderPopularApi(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_ORDERS_POPULAR_LOACTION}?${queryParams}`,
    });
    return listData
}
function* orderPopularAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(orderPopularApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_ORDERS_POPULAR_LOCATION_DATA, payload: response?.data })
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

//11. GET_DASHBOARD_ORDERS_INTVSDOM
async function intVsDomApi(data) {
    const queryParams = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    let listData = axios.request({
        method: "GET",
        url: `${BASE_URL_ORDER}${API_URL.GET_DASHBOARD_ORDERS_INTERVSDOM}?${queryParams}`,
    });
    return listData
}
function* intVsDomAction(action) {
    let { payload, reject } = action;
    try {
        let response = yield call(intVsDomApi, payload);
        if (response.status === 200) {
            yield put({ type: GET_DASHBOARD_ORDERS_INTVSDOM_DATA, payload: response?.data })
        }
    } catch (error) {
        if (reject) reject(error);
    }
}

export function* getOrdersTabWatcher() {
    yield takeLatest(DASHBOARD_ORDERS_STORE_BASED_ACTION, ordersStoreBasedAction);
    yield takeLatest(DASHBOARD_ORDERS_COUNT_ACTION, ordersCountAction);
    yield takeLatest(DASHBOARD_ORDERS_CANCELLED_ACTION, ordersCancelledAction);
    yield takeLatest(DASHBOARD_ORDERS_MPS_ACTION, ordersMpsAction);
    yield takeLatest(DASHBOARD_ORDERS_ASSIGNED_PICKED_ACTION, assignedPickedAction);
    yield takeLatest(DASHBOARD_ORDERS_BUYER_DEMOGRAPHIC_ACTION, ordersBuyerDemoAction);
    yield takeLatest(DASHBOARD_ORDERS_PREPAID_COD_ACTION, prepaidCodAction);
    yield takeLatest(DASHBOARD_ORDERS_WAREHOUSE_INFO_ACTION, wareHouseInfoAction);
    yield takeLatest(DASHBOARD_ORDERS_SKU_PROJECT_ACTION, skuProductAction);
    yield takeLatest(DASHBOARD_ORDERS_POPULAR_LOCATION_ACTION, orderPopularAction);
    yield takeLatest(DASHBOARD_ORDERS_INTVSDOM_ACTION, intVsDomAction);
}
