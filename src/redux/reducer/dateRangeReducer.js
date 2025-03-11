import { SET_DATE_RANGE } from "../constants/actionTypes";
import { addDays } from "date-fns";


const defaultStartDate = addDays(new Date(), -30);
const defaultEndDate = new Date();


const initialState = {
    startDate: defaultStartDate,
    endDate: defaultEndDate,
};

export const dateRangeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATE_RANGE:
            return {
                ...state,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate,
            };
        default:
            return state;
    }
};
