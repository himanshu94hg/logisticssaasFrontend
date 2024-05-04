import { GET_REASSIGN_DATA,GET_REASSIGN_SHIP_DATA, GET_REASSIGN_SHIP_DATA_STATUS } from "../../constants/moreorder";

const initialState = {
    moreorderCard:[],
    moreorderShipCard:null,
    moreorderShipCardStatus:null

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
        case GET_REASSIGN_SHIP_DATA_STATUS:
            return {
                ...state,
                moreorderShipCardStatus: action?.payload+ new Date()
            };
        default:
            return state
    }
}