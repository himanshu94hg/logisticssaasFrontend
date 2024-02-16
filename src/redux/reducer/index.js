import { ORDERS_DATA } from "../constants";


const initialState = {
  contactFileData: null,
};

export default function contactReducer(state = initialState, action) {
  switch (action.type) {
    case ORDERS_DATA:
      console.log( action?.payload?.status,"i am in contact reducer");
      return {
        ...state,
        contactFileData: action?.payload?.status
      };
    default:
      return state;
  }
}