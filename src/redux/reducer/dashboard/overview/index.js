import {
    GET_DASHBOARD_OVERVIEW_COD_DETAILS_DATA, GET_DASHBOARD_OVERVIEW_COUNTER_CARD_DATA,
    GET_DASHBOARD_OVERVIEW_LAST_ORDERS_DATA, GET_DASHBOARD_OVERVIEW_NDR_DETAILS_DATA, GET_DASHBOARD_OVERVIEW_REVENUE_CARD_DATA,
    GET_DASHBOARD_OVERVIEW_RTO_DETAILS_DATA, GET_DASHBOARD_OVERVIEW_SHIPMENTCARD_DATA, GET_DASHBOARD_OVERVIEW_STATEWISE_DATA,
    GET_DASHBOARD_OVERVIEW_TOPSELL_DATA,
} from "../../../constants/dashboard/overview";

const initialState = {
    shimpmetCard: null,
    ndrDetails: null,
    codDetails: null,
    rtoDetails: null,
    lastOrders: [],
    revenueCard: null,
    counterCard: null,
    topSellCard: [],
    stateWiseData: null

};

export const dashboardOverviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DASHBOARD_OVERVIEW_SHIPMENTCARD_DATA:
            return {
                ...state,
                shimpmetCard: action?.payload
            };
        case GET_DASHBOARD_OVERVIEW_NDR_DETAILS_DATA:
            return {
                ...state,
                ndrDetails: action?.payload
            };
        case GET_DASHBOARD_OVERVIEW_COD_DETAILS_DATA:
            return {
                ...state,
                codDetails: action?.payload
            };
        case GET_DASHBOARD_OVERVIEW_RTO_DETAILS_DATA:
            return {
                ...state,
                rtoDetails: action?.payload
            };
        case GET_DASHBOARD_OVERVIEW_LAST_ORDERS_DATA:
            return {
                ...state,
                lastOrders: action?.payload
            };
        case GET_DASHBOARD_OVERVIEW_REVENUE_CARD_DATA:
            return {
                ...state,
                revenueCard: action?.payload
            };
        case GET_DASHBOARD_OVERVIEW_COUNTER_CARD_DATA:
            return {
                ...state,
                counterCard: action?.payload
            };
        case GET_DASHBOARD_OVERVIEW_TOPSELL_DATA:
            return {
                ...state,
                topSellCard: action?.payload
            };
        case GET_DASHBOARD_OVERVIEW_STATEWISE_DATA:
            return {
                ...state,
                stateWiseData: action?.payload
            };

        default:
            return state
    }
}