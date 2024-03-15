import {
    GET_DASHBOARD_ORDERS_ASSIGNED_PICKED_DATA,
    GET_DASHBOARD_ORDERS_BUYERDEMOGRAPHIC_DATA, GET_DASHBOARD_ORDERS_CANCELLED_DATA,
    GET_DASHBOARD_ORDERS_COUNT_DATA, GET_DASHBOARD_ORDERS_MPS_DATA,
    GET_DASHBOARD_ORDERS_PREPAID_COD_DATA, GET_DASHBOARD_ORDERS_SKU_PROJECT_DATA,
    GET_DASHBOARD_ORDERS_STORE_BASED_DATA, GET_DASHBOARD_ORDERS_WAREHOUSE_INFO_DATA
} from "../../../constants/dashboard/orders";

const initialState = {
    storeBasedData: [],
    orderCount: null,
    orderCancel: null,
    mpsData: [],
    assignPick: [],
    buyerDemographicCard: null,
    orderPrepaidData: [],
    warehouseData: null,
    skuProductData: []
};

export const dashboardOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DASHBOARD_ORDERS_STORE_BASED_DATA:
            return {
                ...state,
                storeBasedData: action?.payload
            };
        case GET_DASHBOARD_ORDERS_COUNT_DATA:
            return {
                ...state,
                orderCount: action?.payload
            };
        case GET_DASHBOARD_ORDERS_CANCELLED_DATA:
            return {
                ...state,
                orderCancel: action?.payload
            };
        case GET_DASHBOARD_ORDERS_MPS_DATA:
            return {
                ...state,
                mpsData: action?.payload
            };
        case GET_DASHBOARD_ORDERS_ASSIGNED_PICKED_DATA:
            return {
                ...state,
                assignPick: action?.payload
            };
        case GET_DASHBOARD_ORDERS_BUYERDEMOGRAPHIC_DATA:
            return {
                ...state,
                buyerDemographicCard: action?.payload
            };
        case GET_DASHBOARD_ORDERS_PREPAID_COD_DATA:
            return {
                ...state,
                orderPrepaidData: action?.payload
            };
        case GET_DASHBOARD_ORDERS_WAREHOUSE_INFO_DATA:
            return {
                ...state,
                warehouseData: action?.payload
            };
        case GET_DASHBOARD_ORDERS_SKU_PROJECT_DATA:
            return {
                ...state,
                skuProductData: action?.payload
            };
        default:
            return state
    }
}