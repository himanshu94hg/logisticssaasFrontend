import { combineReducers } from "redux";
import { authDataReducer } from "./auth";
import { toolsSectionReducer } from "./tools"; 

export const rootReducer = combineReducers({
    authDataReducer,
    toolsSectionReducer,
    
})