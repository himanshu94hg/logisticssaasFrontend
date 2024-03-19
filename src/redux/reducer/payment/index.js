import { GET_PAYMENT_DATA,SET_PAYMENT_DATA } from "../../constants/payment";

const initialState = {
    paymentCard:null,
    paymentSetCard:[],
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
       
        default:
            return state
    }
}