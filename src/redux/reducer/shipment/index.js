import { GET_SHIPMENT_DATA } from "../../constants/shipment";

const initialState = {
    shipmentCard:[]
};

export const shipmentSectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SHIPMENT_DATA:
            return {
                ...state,
                shipmentCard: action?.payload
            };
       
        default:
            return state
    }
}