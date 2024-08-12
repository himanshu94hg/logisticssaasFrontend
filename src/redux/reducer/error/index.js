import { ERROR_RESPONSE_DATA } from "../../constants/error";

const initialState = {
    loaderState: null
}

export const errorLoaderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ERROR_RESPONSE_DATA:
            return {
                ...state,
                loaderState: action?.payload
            };

        default:
            return state;
    }
}