import { GET_ORDERS_DATA, GET_ORDERS_DETAILS_DATA, GET_ORDER_ID_DATA, ORDERS_CANCEL_RES_DATA, ORDERS_CLONE_RES_DATA, ORDERS_DELETE_RES_DATA, ORDERS_DETAILS_RES_DATA } from "../../constants/orders";

const initialState = {
    ordersData: [],
    orderDetailsData: [],
    orderUpdateRes: null,
    orderCancelled: null,
    orderdelete: null,
    orderClone: null,
    orderId: null
};

export const orderSectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDERS_DATA:
            return {
                ...state,
                ordersData: action?.payload
            };
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
        case ORDERS_CANCEL_RES_DATA:
            return {
                ...state,
                orderCancelled: action?.payload+ new Date()
            };
        case ORDERS_DELETE_RES_DATA:
            return {
                ...state,
                orderdelete: action?.payload+ new Date()
            };
        case ORDERS_CLONE_RES_DATA:
            return {
                ...state,
                orderClone: action?.payload+ new Date()
            };
        case GET_ORDER_ID_DATA:
            return {
                ...state,
                orderId: action?.payload
            };
        default:
            return state
    }
}