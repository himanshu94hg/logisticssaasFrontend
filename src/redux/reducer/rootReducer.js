import { combineReducers } from "redux";
import { authDataReducer } from "./auth";
import { toolsSectionReducer } from "./tools"; 
import { billingSectionReducer } from "./billing";
import { shipmentSectionReducer } from "./shipment";  

export const rootReducer = combineReducers({
    authDataReducer,
    toolsSectionReducer,
    billingSectionReducer,
    shipmentSectionReducer
})