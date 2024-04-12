import { ACTIVIES_LOG_DATA, GET_MIS_DOWNLOAD_DATA, GET_REPORTS_BILLING_DATA, GET_REPORTS_ORDERS_DATA, GET_REPORTS_RETURNS_DATA, GET_REPORTS_SHIPMENTS_DATA, GET_SCHEDULE_REPORTS_DATA } from "../../constants/mis";

const initialState = {
    scheduleReportsData:[],
    activitiesLog:[],
    misDownloadData:[],
    reportsOrderData:[],
    reportShipmentsData:[],
    reportsReturnsData:[],
    reportsBillingData:[]
};

export const misSectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SCHEDULE_REPORTS_DATA:
            return {
                ...state,
                scheduleReportsData: action?.payload  
            };
        case GET_MIS_DOWNLOAD_DATA:
            return {
                ...state,
                misDownloadData: action?.payload  
            };
        case ACTIVIES_LOG_DATA:
            return {
                ...state,
                activitiesLog: action?.payload  
            };
        case GET_REPORTS_ORDERS_DATA:
            return {
                ...state,
                reportsOrderData: action?.payload  
            };
        case GET_REPORTS_SHIPMENTS_DATA:
            return {
                ...state,
                reportShipmentsData: action?.payload  
            };
        case GET_REPORTS_RETURNS_DATA:
            return {
                ...state,
                reportsReturnsData: action?.payload  
            };
        case GET_REPORTS_BILLING_DATA:
            return {
                ...state,
                reportsBillingData: action?.payload  
            };
      
        default:
            return state
    }
}