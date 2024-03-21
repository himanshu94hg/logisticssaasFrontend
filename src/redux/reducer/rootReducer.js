import { combineReducers } from "redux";
import { authDataReducer } from "./auth";
import { toolsSectionReducer } from "./tools"; 
import { billingSectionReducer } from "./billing";
import { shipmentSectionReducer } from "./shipment";  
import { dashboardOverviewReducer } from "./dashboard/overview"; 
import { dashboardOrderReducer } from "./dashboard/orders";
import { dashboardShipmentReducer } from "./dashboard/shipment";
import { paymentSectionReducer } from "./payment";
import { dashboardCourierReducer } from "./dashboard/couriers";
import { dashboardNdrReducer } from "./dashboard/ndr";
import { dashboardRtoReducer } from "./dashboard/rto";
import { weightRecoReducer } from "./weightReco";
import { moreorderSectionReducer } from "./moreorder";
import { orderSectionReducer } from "./orders";
import { exportSectionReducer } from "./exports";

export const rootReducer = combineReducers({
    authDataReducer,
    toolsSectionReducer,
    billingSectionReducer,
    shipmentSectionReducer,
    dashboardOverviewReducer,
    dashboardOrderReducer,
    dashboardShipmentReducer,
    paymentSectionReducer,
    dashboardCourierReducer,
    dashboardNdrReducer,
    dashboardRtoReducer,
    weightRecoReducer,
    moreorderSectionReducer,
    orderSectionReducer,
    exportSectionReducer
})