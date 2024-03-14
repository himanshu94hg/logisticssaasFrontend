import { GET_DASHBOARD_ORDERS_BUYERDEMOGRAPHIC_DATA } from "../../../constants/dashboard/orders";

const initialState = {
    buyerDemographicCard: null,
};

export const dashboardOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DASHBOARD_ORDERS_BUYERDEMOGRAPHIC_DATA:
            return {
                ...state,
                buyerDemographicCard: action?.payload
            };

        default:
            return state
    }
}