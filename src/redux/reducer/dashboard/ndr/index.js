import { GET_DASHBOARD_NDR_COUNTER_CARDS_DATA, GET_DASHBOARD_NDR_STATUS_DATA, GET_DASHBOARD_NDR_SUCCESS_BY_COURIER_DATA, GET_DASHBOARD_NDR_SUCCESS_BY_ZONE_DATA,GET_DASHBOARD_NDR_DELIVERY_COUNTER_CARDS_DATA,GET_DASHBOARD_NDR_FUNNEL_COUNTER_CARDS_DATA,GET_DASHBOARD_NDR_RESPONSE_COUNTER_CARDS_DATA,GET_DASHBOARD_NDR_SPLIT_COUNTER_CARDS_DATA,GET_DASHBOARD_NDR_BUYER_COUNTER_CARDS_DATA } from "../../../constants/dashboard/ndr";


const initialState = {
    counterData: null,
    ndrStatus:[],
    successByCourier:null,
    successByZone:null,
    deliveryStatus:null,
    funnelStatus:null,
    responseStatus:null,
    splitStatus:null,
    buyerStatus:null
};

export const dashboardNdrReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DASHBOARD_NDR_COUNTER_CARDS_DATA:
            return {
                ...state,
                counterData: action?.payload
            };
        case GET_DASHBOARD_NDR_STATUS_DATA:
            return {
                ...state,
                ndrStatus: action?.payload
            };
        case GET_DASHBOARD_NDR_SUCCESS_BY_COURIER_DATA:
            return {
                ...state,
                successByCourier: action?.payload
            };
        case GET_DASHBOARD_NDR_SUCCESS_BY_ZONE_DATA:
            return {
                ...state,
                successByZone: action?.payload
            };
        case GET_DASHBOARD_NDR_DELIVERY_COUNTER_CARDS_DATA:
            return {
                ...state,
                deliveryStatus: action?.payload
            };
        case GET_DASHBOARD_NDR_FUNNEL_COUNTER_CARDS_DATA:
            return {
                ...state,
                funnelStatus: action?.payload
            };
        case GET_DASHBOARD_NDR_RESPONSE_COUNTER_CARDS_DATA:
            return {
                ...state,
                responseStatus: action?.payload
            };
        case GET_DASHBOARD_NDR_SPLIT_COUNTER_CARDS_DATA:
            return {
                ...state,
                splitStatus: action?.payload
            };
        case GET_DASHBOARD_NDR_BUYER_COUNTER_CARDS_DATA:
            return {
                ...state,
                buyerStatus: action?.payload
            };
        default:
            return state
    }
}