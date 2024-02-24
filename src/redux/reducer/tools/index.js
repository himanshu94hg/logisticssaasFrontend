import { GET_RATE_CALCULATOR_DATA, GET_RATE_CARD_DATA, GET_REPORT_SCHEDULER_DATA } from "../../constants/tools";

const initialState = {
    sellerData: [],
    ratingCardData:[],
    reportSchedularData:[]
};

export const toolsSectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RATE_CARD_DATA:
            return {
                ...state,
                ratingCardData: action?.payload?.data
            };
        case GET_RATE_CALCULATOR_DATA:
            return {
                ...state,
                sellerData: action?.payload?.data
            };
        case GET_REPORT_SCHEDULER_DATA:
            console.log(action,"this is dummay data")
            return {
                ...state,
                reportSchedularData: action?.payload?.data
            };
        default:
            return state
    }
}