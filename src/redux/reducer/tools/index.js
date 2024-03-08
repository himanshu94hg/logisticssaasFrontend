import { GET_RATE_CALCULATOR_DATA, GET_RATE_CARD_DATA, GET_REPORT_SCHEDULER_DATA, GET_SERVICE_ABILITY_DATA, GET_SHIPEASE_SERVICE_PINCODE, GET_ZONE_MAPPING_DATA, RATE_CALCULATOR_PREFILLED_DATA } from "../../constants/tools";

const initialState = {
    sellerData: [],
    ratingCardData: [],
    reportSchedularData: [],
    ratePrefilledData: null,
    serviceAbility: [],
    zoneMapping:[],
    shipeaseServicePincode:null,
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
            return {
                ...state,
                reportSchedularData: action?.payload
            };
        case RATE_CALCULATOR_PREFILLED_DATA:
            return {
                ...state,
                ratePrefilledData: action?.payload
            };
        case GET_SERVICE_ABILITY_DATA:
            return {
                ...state,
                serviceAbility: action?.payload
            };
        case GET_ZONE_MAPPING_DATA:
            return {
                ...state,
                zoneMapping: action?.payload
            };
        case GET_SHIPEASE_SERVICE_PINCODE:
            return {
                ...state,
                shipeaseServicePincode: action?.payload
            };

        default:
            return state
    }
}