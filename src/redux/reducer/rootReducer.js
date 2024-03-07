import { combineReducers } from "redux";
import { authDataReducer } from "./auth";
import { toolsSectionReducer } from "./tools";
import { billingSectionReducer } from "./billing";
import { shipmentSectionReducer } from "./shipment";
import { moreonorderSectionReducer } from "./moreonorder";

export const rootReducer = combineReducers({
    authDataReducer,
    toolsSectionReducer,
    billingSectionReducer,
    shipmentSectionReducer,
    moreonorderSectionReducer
})