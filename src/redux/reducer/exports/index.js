import { GET_EXPORT_DATA,GET_EXPORT_PASSBOOK_DATA,GET_EXPORT_SHIPPING_DATA,GET_EXPORT_RECHARGE_DATA,GET_EXPORT_INVOICE_DATA,GET_EXPORT_WEIGHT_DATA } from "../../constants/exports";

const initialState = {
    exportCard:[],
    exportPassbookCard:[],
    exportShippingCard:[],
    exportRechargeCard:[],
    exportInvoiceCard:[],
    exportWeightCard:[]
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
        case GET_EXPORT_INVOICE_DATA:
            return {
                ...state,
                exportInvoiceCard: action?.payload
            };
        case GET_EXPORT_WEIGHT_DATA:
            return {
                ...state,
                exportWeightCard: action?.payload
            };
        default:
            return state
    }
}