import { GET_MOREONORDER_DATA } from "../../constants/moreonorder";

const initialState = {
    moreonorderCard:[]
};

export const moreonorderSectionReducer = (state = initialState, action) => {
    console.log(action.type);
    switch (action.type) {
        case GET_MOREONORDER_DATA:
            console.log(action.type);
            return {
                ...state,
                moreonorderCard: action?.payload.results
            };
       
        default:
            return state
    }
}