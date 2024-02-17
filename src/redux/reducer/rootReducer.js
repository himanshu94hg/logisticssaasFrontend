import { combineReducers } from "redux";
import { authDataReducer } from "./auth";

export const rootReducer = combineReducers({
    authDataReducer,
})