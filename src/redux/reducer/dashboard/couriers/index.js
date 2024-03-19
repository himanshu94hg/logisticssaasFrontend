import { GET_DASHBOARD_COURIER_DATA } from "../../../constants/dashboard/courier";


const initialState = {
    courierData: null,
};

export const dashboardCourierReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DASHBOARD_COURIER_DATA:
            return {
                ...state,
                courierData: action?.payload
            };
        default:
            return state
    }
}