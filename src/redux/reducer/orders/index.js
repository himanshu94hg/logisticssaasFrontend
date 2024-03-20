import { GET_ORDERS_DETAILS_DATA, ORDERS_DETAILS_RES_DATA } from "../../constants/orders";

const initialState = {
    orderDetailsData:[],
    orderUpdateRes:null,
};

export const orderSectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDERS_DETAILS_DATA:
            return {
                ...state,
                orderDetailsData: action?.payload
            };
        case ORDERS_DETAILS_RES_DATA:
            return {
                ...state,
                orderUpdateRes: action?.payload
            };
        default:
            return state
    }
}