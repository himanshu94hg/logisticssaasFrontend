import { GET_EXPORT_DATA } from "../../constants/exports";

const initialState = {
    exportCard:[],
};

export const exportSectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EXPORT_DATA:
            return {
                ...state,
                exportCard: action?.payload
            };
        default:
            return state
    }
}