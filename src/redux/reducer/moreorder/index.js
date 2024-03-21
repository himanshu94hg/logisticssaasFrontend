import { GET_REASSIGN_DATA,GET_REASSIGN_SHIP_DATA } from "../../constants/moreorder";

const initialState = {
    moreorderCard:[],
    moreorderShipCard:null
};

export const moreorderSectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REASSIGN_DATA:
            return {
                ...state,
                moreorderCard: action?.payload  
            };
        case GET_REASSIGN_SHIP_DATA:
            return {
                ...state,
                moreorderShipCard: action?.payload  
            };
        default:
            return state
    }
}