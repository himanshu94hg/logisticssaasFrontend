import { GET_DASHBOARD_SHIPMENT_OFD_DATA, GET_DASHBOARD_SHIPMENT_WEIGHT_PROFILE_DATA, GET_DASHBOARD_SHIPMENT_ZONEWISE_DATA,GET_DASHBOARD_SHIPMENT_OVERVIEW_COURIER_DATA } from "../../../constants/dashboard/shipment";

const initialState = {
    weightProfile: null,
    ofdData:[],
    zoneWiseData:null,
    overviewCourier:null    
};

export const dashboardShipmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DASHBOARD_SHIPMENT_WEIGHT_PROFILE_DATA:
            return {
                ...state,
                weightProfile: action?.payload
            };
        case GET_DASHBOARD_SHIPMENT_OFD_DATA:
            return {
                ...state,
                ofdData: action?.payload
            };
        case GET_DASHBOARD_SHIPMENT_ZONEWISE_DATA:
            return {
                ...state,
                zoneWiseData: action?.payload
            };
        case GET_DASHBOARD_SHIPMENT_OVERVIEW_COURIER_DATA:
            return{
                ...state,
                overviewCourier: action?.payload
            }
        default:
            return state
    }
}