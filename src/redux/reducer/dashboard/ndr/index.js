import { GET_DASHBOARD_NDR_COUNTER_CARDS_DATA, GET_DASHBOARD_NDR_STATUS_DATA, GET_DASHBOARD_NDR_SUCCESS_BY_COURIER_DATA, GET_DASHBOARD_NDR_SUCCESS_BY_ZONE_DATA } from "../../../constants/dashboard/ndr";


const initialState = {
    counterData: null,
    ndrStatus:[],
    successByCourier:null,
    successByZone:null
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
        default:
            return state
    }
}