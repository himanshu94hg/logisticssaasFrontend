import { GET_BILLING_DATA } from "../../constants/billing";


const initialState = {
    billingCard:[]
};

export const billingSectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BILLING_DATA:
            return {
                ...state,
                billingCard: action?.payload
            };
       
        default:
            return state
    }
}