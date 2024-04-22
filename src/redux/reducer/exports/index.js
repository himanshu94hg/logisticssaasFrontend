import { GET_EXPORT_DATA,GET_EXPORT_PASSBOOK_DATA,GET_EXPORT_SHIPPING_DATA,GET_EXPORT_RECHARGE_DATA } from "../../constants/exports";

const initialState = {
    exportCard:[],
    exportPassbookCard:[],
    exportShippingCard:[],
    exportRechargeCard:[]
};

export const exportSectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EXPORT_DATA:
            return {
                ...state,
                exportCard: action?.payload
            };
        case GET_EXPORT_PASSBOOK_DATA:
            return {
                ...state,
                exportPassbookCard: action?.payload
            };
        case GET_EXPORT_SHIPPING_DATA:
            return {
                ...state,
                exportShippingCard: action?.payload
            };
        case GET_EXPORT_RECHARGE_DATA:
            return {
                ...state,
                exportRechargeCard: action?.payload
            };
        default:
            return state
    }
}