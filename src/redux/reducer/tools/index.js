import { GET_COURIER_PARTNER_NAME_DATA, GET_COURIER_SERVICEABLE_PINCODE_DATA, GET_RATE_CALCULATOR_DATA, GET_RATE_CARD_DATA, GET_REPORT_SCHEDULER_DATA, GET_SERVICE_ABILITY_DATA, GET_SHIPEASE_SERVICE_PINCODE, GET_ZONE_MAPPING_DATA, RATE_CALCULATOR_PREFILLED_DATA } from "../../constants/tools";
import { POST_REPORT_SCHEDULER_RESPONSE } from "../../saga/constant/tools";

const initialState = {
    sellerData: [],
    ratingCardData: [],
    reportSchedularData: [],
    reportSchedulerRes:null,
    ratePrefilledData: null,
    serviceAbility: [],
    zoneMapping: [],
    shipeaseServicePincode: null,
    courierPartnerName: [],
    serviceCourierPincode: null
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
        case POST_REPORT_SCHEDULER_RESPONSE:
            console.log(action?.payload,"reportSchedulerRes")
            return {
                ...state,
                reportSchedulerRes: action?.payload
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
        case GET_COURIER_PARTNER_NAME_DATA:
            return {
                ...state,
                courierPartnerName: action?.payload
            };
        case GET_COURIER_SERVICEABLE_PINCODE_DATA:
            return {
                ...state,
                serviceCourierPincode: action?.payload
            };
        default:
            return state
    }
}

