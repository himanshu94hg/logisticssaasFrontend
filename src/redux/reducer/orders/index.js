import { GET_ORDERS_DATA, GET_ORDERS_DETAILS_DATA, GET_ORDER_ID_DATA, ORDERS_CANCEL_RES_DATA, ORDERS_CLONE_RES_DATA, ORDERS_DELETE_RES_DATA, ORDERS_DETAILS_RES_DATA,BULK_SHIP_DATA, SHIP_NOW_DATA, MANIFEST_LIST_DATA, BULK_ORDERS_TAG_LIST_DATA } from "../../constants/orders";

const initialState = {
    ordersData: [],
    orderDetailsData: [],
    orderUpdateRes: null,
    orderCancelled: null,
    orderdelete: null,
    orderClone: null,
    orderId: null,
    bulkShipData: [],
    manifestList:[],
    tagListData:[]
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
                orderUpdateRes: action?.payload+new Date()
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
        case BULK_SHIP_DATA:
            return {
                ...state,
                bulkShipData: action?.payload
            };
        case SHIP_NOW_DATA:
            return {
                ...state,
                orderClone: action?.payload
            };
        case MANIFEST_LIST_DATA:
            return {
                ...state,
                manifestList: action?.payload
            };
        case BULK_ORDERS_TAG_LIST_DATA:
            return {
                ...state,
                tagListData: action?.payload
            };
        default:
            return state
    }
}