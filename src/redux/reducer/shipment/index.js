import { GET_SHIPMENT_DATA,GET_SHIPMENT_REATTEMPT_DATA,GET_SHIPMENT_RTO_DATA } from "../../constants/shipment";

const initialState = {
    shipmentCard:[],
    shipmentReattemptCard:null,
    shipmentRtoCard:null
};

export const shipmentSectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SHIPMENT_DATA:
            return {
                ...state,
                shipmentCard: action?.payload.results
            };
        case GET_SHIPMENT_REATTEMPT_DATA:
                return {
                    ...state,
                    shipmentReattemptCard: action?.payload
                };
            case GET_SHIPMENT_RTO_DATA:
                return {
                    ...state,
                    shipmentRtoCard: action?.payload
                };
        default:
            return state
    }
}