import { GET_PAYMENT_DATA,SET_PAYMENT_DATA,GET_CONFIGURATION_DATA,GET_SELLER_PROFILE_DATA } from "../../constants/payment";

const initialState = {
    paymentCard:null,
    paymentSetCard:[],
    configurationCard:null,
    sellerProfileCard:[]
};

export const paymentSectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PAYMENT_DATA:
            return {
                ...state,
                paymentCard: action?.payload
            };
        case SET_PAYMENT_DATA:
            return {
                ...state,
                paymentSetCard: action?.payload
            };
        case GET_CONFIGURATION_DATA:
            return {
                ...state,
                configurationCard: action?.payload
            };
        case GET_SELLER_PROFILE_DATA:
            return {
                ...state,
                sellerProfileCard: action?.payload
            };
       
        default:
            return state
    }
}