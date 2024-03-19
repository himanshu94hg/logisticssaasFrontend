import { GET_DASHBOARD_RTO_COUNT_MONTH_DATA, GET_DASHBOARD_RTO_TOP_CITY_DATA, GET_DASHBOARD_RTO_TOP_COURIER_DATA, GET_DASHBOARD_RTO_TOP_DATA } from "../../../constants/dashboard/rto";

const initialState = {
    rtoTop: [],
    rtoTopCity: [],
    rtoCountMonthwise: [],
    rtoTopCourier: [],
};

export const dashboardRtoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DASHBOARD_RTO_TOP_DATA:
            return {
                ...state,
                rtoTop: action?.payload
            };
        case GET_DASHBOARD_RTO_TOP_CITY_DATA:
            return {
                ...state,
                rtoTopCity: action?.payload
            };
        case GET_DASHBOARD_RTO_COUNT_MONTH_DATA:
            return {
                ...state,
                rtoCountMonthwise: action?.payload
            };
        case GET_DASHBOARD_RTO_TOP_COURIER_DATA:
            return {
                ...state,
                rtoTopCourier: action?.payload
            };
        default:
            return state
    }
}