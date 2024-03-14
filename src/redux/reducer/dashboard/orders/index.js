import { GET_DASHBOARD_ORDERS_BUYERDEMOGRAPHIC_DATA, GET_DASHBOARD_ORDERS_CANCELLED_DATA, GET_DASHBOARD_ORDERS_COUNT_DATA, GET_DASHBOARD_ORDERS_MPS_DATA, GET_DASHBOARD_ORDERS_PREPAID_COD_DATA, GET_DASHBOARD_ORDERS_SKU_PROJECT_DATA, GET_DASHBOARD_ORDERS_STORE_BASED_DATA, GET_DASHBOARD_ORDERS_WAREHOUSE_INFO_DATA } from "../../../constants/dashboard/orders";

const initialState = {
    storeBasedData:[],
    orderCount:null,
    orderCancelled:null,
    mpsData:[],
    buyerDemographicCard: null,
    orderPrepaidData:[],
    warehouseData:null,
    skuProductData:[]
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
                orderCancelled: action?.payload
            };
        case GET_DASHBOARD_ORDERS_MPS_DATA:
            return {
                ...state,
                mpsData: action?.payload
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
          console.log(action,"this is my sku data")
            return {
                ...state,
                skuProductData: action?.payload
            };

        default:
            return state
    }
}