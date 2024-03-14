import { combineReducers } from "redux";
import { authDataReducer } from "./auth";
import { toolsSectionReducer } from "./tools"; 
import { billingSectionReducer } from "./billing";
import { shipmentSectionReducer } from "./shipment";  
import { dashboardOverviewReducer } from "./dashboard/overview"; 
import { dashboardOrderReducer } from "./dashboard/orders";

export const rootReducer = combineReducers({
    authDataReducer,
    toolsSectionReducer,
    billingSectionReducer,
    shipmentSectionReducer,
    dashboardOverviewReducer,
    dashboardOrderReducer
})