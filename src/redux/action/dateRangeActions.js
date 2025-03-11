import { SET_DATE_RANGE } from "../constants/actionTypes";

export const setDateRange = (startDate, endDate) => ({
  type: SET_DATE_RANGE,
  payload: { startDate, endDate },
});
