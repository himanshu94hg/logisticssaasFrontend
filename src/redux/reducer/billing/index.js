import { GET_BILLING_DATA,GET_BILLING_SHIPING_DATA,GET_BILLING_SHIPING_REMITANCE_DATA ,GET_BILLING_SHIPING_RECHARGE_DATA,GET_BILLING_SHIPING_INVOICE_DATA,GET_BILLING_SHIPING_RECEIPT_DATA,GET_BILLING_SHIPING_RECEIPT_EXPORT_DATA,GET_BILLING_SHIPING_REMITANCE_DOWNLOAD_DATA } from "../../constants/billing";


const initialState = {
    billingCard:[],
    billingShipingCard:[],
    billingShipingRemitanceCard:[],
    billingShipingRechargeCard:[],
    billingShipingInvoiceCard:[],
    billingShipingReceiptCard:[],
    billingShipingReceiptExportCard:[],
    billingShipingRemitanceDOWNLOADCard:null
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
        case GET_BILLING_SHIPING_RECEIPT_EXPORT_DATA:
            return {
                ...state,
                billingShipingReceiptExportCard: action?.payload
            };

        case GET_BILLING_SHIPING_REMITANCE_DOWNLOAD_DATA:
            return {
                ...state,
                billingShipingRemitanceDOWNLOADCard: action?.payload
            };
        default:
            return state
    }
}