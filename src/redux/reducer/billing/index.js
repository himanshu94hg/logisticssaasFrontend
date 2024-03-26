import { GET_BILLING_DATA,GET_BILLING_SHIPING_DATA,GET_BILLING_SHIPING_REMITANCE_DATA ,GET_BILLING_SHIPING_RECHARGE_DATA,GET_BILLING_SHIPING_INVOICE_DATA,GET_BILLING_SHIPING_RECEIPT_DATA } from "../../constants/billing";


const initialState = {
    billingCard:[],
    billingShipingCard:[],
    billingShipingRemitanceCard:[],
    billingShipingRechargeCard:[],
    billingShipingInvoiceCard:[],
    billingShipingReceiptCard:[]
};

export const billingSectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BILLING_DATA:
            return {
                ...state,
                billingCard: action?.payload?.results
            };
        case GET_BILLING_SHIPING_DATA:
            return {
                ...state,
                billingShipingCard: action?.payload?.results
            };

        case GET_BILLING_SHIPING_REMITANCE_DATA:
            return {
                ...state,
                billingShipingRemitanceCard: action?.payload?.results
            };
        case GET_BILLING_SHIPING_RECHARGE_DATA:
            return {
                ...state,
                billingShipingRechargeCard: action?.payload?.results
            };
        case GET_BILLING_SHIPING_INVOICE_DATA:
            return {
                ...state,
                billingShipingInvoiceCard: action?.payload?.results
            };
        case GET_BILLING_SHIPING_RECEIPT_DATA:
            return {
                ...state,
                billingShipingReceiptCard: action?.payload?.results
            };
        default:
            return state
    }
}